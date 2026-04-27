import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

export const runtime = 'nodejs';

const MAX_FILE_SIZE_BYTES = 60 * 1024 * 1024;
const MAX_PAGES = 30;
const PDF_SIGNATURE = '%PDF-';
const PDF_SIGNATURE_SCAN_BYTES = 1024;

type OutputFormat = 'png' | 'jpeg';

function safeScale(value: FormDataEntryValue | null): number {
  if (typeof value !== 'string') return 2;
  const scale = Number.parseFloat(value);
  if (!Number.isFinite(scale)) return 2;
  return Math.min(3, Math.max(1, scale));
}

function safeFormat(value: FormDataEntryValue | null): OutputFormat {
  if (value === 'jpeg' || value === 'jpg') return 'jpeg';
  return 'png';
}

function isPdfSignature(bytes: Uint8Array): boolean {
  const signatureWindow = new TextDecoder().decode(bytes.slice(0, PDF_SIGNATURE_SCAN_BYTES));
  return signatureWindow.includes(PDF_SIGNATURE);
}

function getStandardFontDataUrl(): string {
  const fontsDir = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'standard_fonts');
  return pathToFileURL(`${fontsDir}${path.sep}`).toString();
}

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return Response.json({ error: 'No PDF file was uploaded.' }, { status: 400 });
    }

    if (file.size <= 0) {
      return Response.json({ error: 'Uploaded file is empty.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return Response.json(
        { error: `File exceeds ${Math.floor(MAX_FILE_SIZE_BYTES / (1024 * 1024))}MB limit.` },
        { status: 413 },
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!isPdfSignature(bytes)) {
      return Response.json({ error: 'Invalid file type. Please upload a valid PDF.' }, { status: 400 });
    }

    const format = safeFormat(formData.get('format'));
    const scale = safeScale(formData.get('scale'));

    const loadingTask = getDocument({
      data: bytes,
      standardFontDataUrl: getStandardFontDataUrl(),
      verbosity: 0,
    });

    const pdf = await loadingTask.promise;
    if (pdf.numPages > MAX_PAGES) {
      await pdf.destroy();
      return Response.json(
        { error: `This tool supports up to ${MAX_PAGES} pages per conversion.` },
        { status: 413 },
      );
    }

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const images: RenderedPage[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = createCanvas(
        Math.max(1, Math.ceil(viewport.width)),
        Math.max(1, Math.ceil(viewport.height)),
      );
      const context = canvas.getContext('2d');

      await page.render({
        canvas: null,
        canvasContext: context as unknown as CanvasRenderingContext2D,
        viewport,
      }).promise;

      const dataUrl = canvas.toDataURL(mimeType);
      images.push({
        pageNumber: pageNum,
        dataUrl,
      });

      page.cleanup();
    }

    await pdf.destroy();

    return Response.json(
      {
        images,
        pageCount: images.length,
        format,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';

    if (message.includes('encrypted') || message.includes('password')) {
      return Response.json(
        { error: 'This PDF is password-protected. Please unlock it before conversion.' },
        { status: 422 },
      );
    }

    return Response.json(
      { error: 'Unable to convert this PDF to images right now. Please try another file.' },
      { status: 500 },
    );
  }
}
