'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Upload,
  FileImage,
  Download,
  Zap,
  ShieldCheck,
  Loader2,
  ImageIcon,
  Settings,
  Server,
} from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';

type OutputFormat = 'png' | 'jpeg';
type ScaleOption = 1 | 2 | 3;

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
}

const FAQS = [
  {
    question: 'Does this tool upload my PDF to a server?',
    answer:
      'Yes — the PDF is sent to our secure backend for rendering using a professional-grade engine. Files are processed for the request only and are not stored permanently.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'You can export pages as high-resolution PNG (lossless) or JPEG (smaller file size) images.',
  },
  {
    question: 'Is there a page limit?',
    answer:
      'The tool supports up to 30 pages per PDF to ensure fast and reliable processing.',
  },
  {
    question: 'Can I convert password-protected PDFs?',
    answer:
      'Not directly. Please unlock the PDF first, then upload the unlocked version for conversion.',
  },
];

export default function PDFToImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<RenderedPage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputFormat>('png');
  const [scale, setScale] = useState<ScaleOption>(2);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImages([]);
      setErrorMessage(null);
    }
  };

  const convertToImages = async () => {
    if (!file) return;

    setIsProcessing(true);
    setImages([]);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);
      formData.append('scale', String(scale));

      const response = await fetch('/api/pdf/to-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let message = 'Failed to convert PDF to images.';
        try {
          const errorPayload = (await response.json()) as { error?: string };
          if (errorPayload.error) message = errorPayload.error;
        } catch {
          // fall back to generic message
        }
        throw new Error(message);
      }

      const data = (await response.json()) as {
        images: RenderedPage[];
        pageCount: number;
        format: string;
      };

      setImages(data.images);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong during conversion.';
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    const ext = format === 'jpeg' ? 'jpg' : 'png';
    link.download = `${file?.name.replace(/\.pdf$/i, '')}_page_${index + 1}.${ext}`;
    link.click();
  };

  const downloadAllImages = () => {
    images.forEach((img, i) => {
      setTimeout(() => downloadImage(img.dataUrl, i), i * 300);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)] py-16 pb-12 text-center md:py-24 md:pb-16">
          <div className="container">
            <h1 className="mb-4 text-[2.25rem] font-black sm:text-[3.5rem]">PDF to Image Converter</h1>
            <p className="mx-auto max-w-[700px] text-[1.25rem] text-[var(--text-secondary)]">
              Convert PDF pages to high-resolution PNG or JPEG images using secure server-side rendering.
            </p>
          </div>
        </header>

        <section className="container section">
          <div className={`mx-auto grid max-w-[1100px] gap-12 ${file && images.length > 0 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            <div>
              <Card className="!flex min-h-[400px] flex-col !rounded-[var(--radius-xl)] !border-2 !border-dashed !border-[var(--border)] !bg-[var(--bg-secondary)] !p-6 transition-all duration-300 sm:!p-10">
                {!file ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      id="pdf-upload"
                      className="hidden"
                    />
                    <label htmlFor="pdf-upload" className="w-full cursor-pointer">
                      <div className="mx-auto mb-8 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white text-[#ef4444] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                        <ImageIcon size={32} />
                      </div>
                      <h3 className="mb-2 text-[1.5rem] font-extrabold">Drop your PDF file</h3>
                      <p className="mb-10 text-[var(--text-secondary)]">to extract high-quality images</p>
                      <span className="mt-6 inline-flex rounded-full border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-4 py-2 text-[0.875rem] font-bold text-[#dc2626]">Max 60MB · Up to 30 pages</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    <div
                      className="relative flex items-center justify-between gap-4 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] p-4 sm:gap-6 sm:p-5"
                    >
                      <div className="flex flex-1 items-center gap-4">
                        <FileImage className="text-[#ef4444]" size={28} />
                        <div>
                          <span className="block text-[0.9375rem] font-bold">{file.name}</span>
                          <span className="block text-[0.75rem] text-[var(--text-secondary)]">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFile(null);
                          setImages([]);
                          setErrorMessage(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '1.5rem',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <Settings size={18} />
                        <span style={{ fontWeight: 700 }}>Output Settings</span>
                      </div>

                      {/* Format Selection */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            display: 'block',
                            marginBottom: '8px',
                          }}
                        >
                          Image Format
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {(['png', 'jpeg'] as const).map((f) => (
                            <button
                              key={f}
                              style={{
                                flex: 1,
                                padding: '10px 6px',
                                borderRadius: '8px',
                                border: '2px solid',
                                borderColor:
                                  format === f ? 'var(--primary)' : 'var(--border)',
                                background:
                                  format === f
                                    ? 'rgba(59, 130, 246, 0.1)'
                                    : 'transparent',
                                color:
                                  format === f
                                    ? 'var(--primary)'
                                    : 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                              onClick={() => setFormat(f)}
                            >
                              {f === 'png' ? 'PNG (Lossless)' : 'JPEG (Smaller)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Scale Selection */}
                      <div>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            display: 'block',
                            marginBottom: '8px',
                          }}
                        >
                          Resolution Scale
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          {([1, 2, 3] as const).map((s) => (
                            <button
                              key={s}
                              style={{
                                flex: 1,
                                padding: '10px 6px',
                                borderRadius: '8px',
                                border: '2px solid',
                                borderColor:
                                  scale === s ? 'var(--primary)' : 'var(--border)',
                                background:
                                  scale === s
                                    ? 'rgba(59, 130, 246, 0.1)'
                                    : 'transparent',
                                color:
                                  scale === s
                                    ? 'var(--primary)'
                                    : 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                              onClick={() => setScale(s)}
                            >
                              {s}x{' '}
                              {s === 1
                                ? '(Fast)'
                                : s === 2
                                  ? '(Default)'
                                  : '(HD)'}
                            </button>
                          ))}
                        </div>
                        <p
                          style={{
                            color: 'var(--text-tertiary)',
                            fontSize: '0.8rem',
                            marginTop: '8px',
                          }}
                        >
                          Higher scale = sharper images but larger file size.
                        </p>
                      </div>
                    </div>

                    {errorMessage && (
                      <p
                        style={{
                          color: 'var(--error)',
                          marginTop: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {errorMessage}
                      </p>
                    )}

                    {!isProcessing && images.length === 0 && (
                      <Button
                        fullWidth
                        className="!h-14 !rounded-full !bg-[#ef4444] !text-[1rem] !font-extrabold sm:!h-16 sm:!text-[1.125rem] mt-8"
                        onClick={convertToImages}
                      >
                        Convert to Images
                        <Server size={20} style={{ marginLeft: '10px' }} />
                      </Button>
                    )}

                    {isProcessing && (
                      <Button
                        fullWidth
                        className="!h-14 !rounded-full !bg-[#ef4444] !text-[1rem] !font-extrabold sm:!h-16 sm:!text-[1.125rem] mt-8"
                        disabled
                      >
                        <Loader2
                          className="animate-spin"
                          size={20}
                          style={{ marginRight: '10px' }}
                        />
                        Converting Pages...
                      </Button>
                    )}
                  </div>
                )}
              </Card>

              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <Server
                    className="mb-6"
                    size={24}
                    style={{ color: '#0ea5e9' }}
                  />
                  <h4 className="mb-3 text-[1.125rem] font-extrabold">Server-Side Rendering</h4>
                  <p className="text-[0.9375rem] leading-[1.6] text-[var(--text-secondary)]">
                    Pages are rendered on our backend using a professional engine for
                    consistent, high-fidelity output.
                  </p>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <Zap
                    className="mb-6"
                    size={24}
                    style={{ color: '#f59e0b' }}
                  />
                  <h4 className="mb-3 text-[1.125rem] font-extrabold">High Resolution</h4>
                  <p className="text-[0.9375rem] leading-[1.6] text-[var(--text-secondary)]">
                    Up to 3x scale rendering ensures your images remain crisp and
                    professional for any use case.
                  </p>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <ShieldCheck
                    className="mb-6"
                    size={24}
                    style={{ color: '#10b981' }}
                  />
                  <h4 className="mb-3 text-[1.125rem] font-extrabold">Secure Processing</h4>
                  <p className="text-[0.9375rem] leading-[1.6] text-[var(--text-secondary)]">
                    Files are validated and processed per-request. Nothing is stored
                    after your conversion completes.
                  </p>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {images.map((img) => (
                    <Card
                      key={img.pageNumber}
                      style={{
                        padding: '8px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={img.dataUrl}
                        alt={`Page ${img.pageNumber}`}
                        style={{
                          width: '100%',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                        }}
                      />
                      <div
                        style={{
                          marginTop: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        <span>Page {img.pageNumber}</span>
                        <button
                          onClick={() =>
                            downloadImage(img.dataUrl, img.pageNumber - 1)
                          }
                          style={{
                            color: 'var(--primary)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {!isProcessing && (
                  <Button
                    fullWidth
                    size="lg"
                    onClick={downloadAllImages}
                    style={{ marginTop: '2rem' }}
                  >
                    <Download size={20} style={{ marginRight: '8px' }} />
                    Download All {images.length} Pages
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        <SEOSection
          title="PDF to Image Converter"
          description="Convert PDF documents into high-resolution PNG or JPEG images using a reliable server-side rendering pipeline. Upload your file, choose format and resolution, and download crisp images."
          howToUse={[
            'Upload your PDF document (up to 60MB, 30 pages max).',
            'Select the output format: PNG for lossless quality or JPEG for smaller files.',
            'Choose a resolution scale from 1x (fast) to 3x (HD).',
            'Click Convert to Images and wait for server processing.',
            'Download individual pages or all pages at once.',
          ]}
          benefits={[
            'Professional server-side rendering for consistent output quality.',
            'Multiple format options to match your needs.',
            'Adjustable resolution scale up to 3x for print-ready images.',
            'Secure processing with no permanent file storage.',
            'Perfect for presentations, social media, or extracting visual content.',
          ]}
        />

        <FAQSchema faqs={FAQS} />

        <section className="container section !pt-0">
          <RelatedTools currentToolId="pdf-to-image" categoryId="pdftools" />
        </section>
      </div>
      <Footer />
    </>
  );
}
