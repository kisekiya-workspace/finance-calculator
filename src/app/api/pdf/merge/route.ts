import { PDFDocument } from 'pdf-lib';

const MAX_FILES = 30;
const MAX_FILE_SIZE_BYTES = 75 * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = 200 * 1024 * 1024;
const PDF_SIGNATURE = '%PDF-';
const PDF_SIGNATURE_SCAN_BYTES = 1024;

function sanitizeFileName(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]/g, '_');
  return cleaned.toLowerCase().endsWith('.pdf') ? cleaned : `${cleaned}.pdf`;
}

function isPdfSignature(bytes: Uint8Array): boolean {
  const signatureWindow = new TextDecoder().decode(bytes.slice(0, PDF_SIGNATURE_SCAN_BYTES));
  return signatureWindow.includes(PDF_SIGNATURE);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const files = formData
      .getAll('files')
      .filter((entry): entry is File => entry instanceof File);

    if (files.length < 2) {
      return Response.json({ error: 'Please upload at least two PDF files.' }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return Response.json(
        { error: `You can merge up to ${MAX_FILES} files at once.` },
        { status: 400 },
      );
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_SIZE_BYTES) {
      return Response.json(
        {
          error: `Combined upload size exceeds ${Math.floor(MAX_TOTAL_SIZE_BYTES / (1024 * 1024))}MB.`,
        },
        { status: 413 },
      );
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      if (file.size <= 0) {
        return Response.json(
          { error: `File "${file.name}" is empty.` },
          { status: 400 },
        );
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return Response.json(
          {
            error: `File "${file.name}" exceeds ${Math.floor(MAX_FILE_SIZE_BYTES / (1024 * 1024))}MB.`,
          },
          { status: 413 },
        );
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!isPdfSignature(bytes)) {
        return Response.json(
          { error: `File "${file.name}" is not a valid PDF.` },
          { status: 400 },
        );
      }

      const sourcePdf = await PDFDocument.load(bytes, {
        updateMetadata: false,
      });
      const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    });

    const outputBytes = new Uint8Array(mergedBytes.byteLength);
    outputBytes.set(mergedBytes);

    const outputName = sanitizeFileName(`merged_${Date.now()}.pdf`);

    return new Response(new Blob([outputBytes], { type: 'application/pdf' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Cache-Control': 'no-store',
        'X-Merged-Files': String(files.length),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';

    if (message.includes('encrypted') || message.includes('password')) {
      return Response.json(
        { error: 'One of the PDFs is password-protected. Please unlock files before merging.' },
        { status: 422 },
      );
    }

    return Response.json(
      { error: 'Unable to merge these PDF files right now. Please try different files.' },
      { status: 500 },
    );
  }
}
