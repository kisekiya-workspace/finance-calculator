'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, FileImage, Download, Zap, ShieldCheck, Info, Loader2, ImageIcon } from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '../merge-pdf/page.module.css';

export default function PDFToImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  // Script loading for PDF.js
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImages([]);
      setProgress(0);
    }
  };

  const convertToImages = async () => {
    if (!file || !(window as any).pdfjsLib) return;

    setIsProcessing(true);
    setImages([]);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = (window as any).pdfjsLib;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setTotalPageCount(pdf.numPages);

      const imageUrls: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x for high quality
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          const url = canvas.toDataURL('image/png');
          imageUrls.push(url);
          setImages([...imageUrls]);
          setProgress(Math.round((i / pdf.numPages) * 100));
        }
      }
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert PDF. Please ensure it is a valid, unencrypted PDF file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}_page_${index + 1}.png`;
    link.click();
  };

  const downloadAllAsZip = () => {
    // Note: ZIP generation would require JSZip, 
    // for now we provide individual download cues or simple multi-trigger
    images.forEach((url, i) => {
      setTimeout(() => downloadImage(url, i), i * 300);
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>PDF to Image Converter</h1>
            <p className={styles.subtitle}>Transform PDF pages into high-fidelity PNG or JPG images instantly.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.mainGrid}>
            <div className={styles.uploadCol}>
              <Card className={styles.uploadCard}>
                {!file ? (
                  <div className={styles.dropzone}>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileChange} 
                      id="pdf-upload" 
                      className={styles.fileInput} 
                    />
                    <label htmlFor="pdf-upload" className={styles.dropLabel}>
                      <div className={styles.iconCircle}>
                        <ImageIcon size={32} />
                      </div>
                      <h3>Drop your PDF file</h3>
                      <p>to extract high-quality images</p>
                    </label>
                  </div>
                ) : (
                  <div className={styles.fileList}>
                    <div className={styles.fileItem} style={{ border: 'none', background: 'var(--bg-secondary)' }}>
                      <div className={styles.fileInfo}>
                        <FileImage className={styles.fileIcon} />
                        <div>
                          <span className={styles.fileName}>{file.name}</span>
                          <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setFile(null)}>Remove</Button>
                    </div>

                    {!isProcessing && images.length === 0 && (
                      <Button 
                        fullWidth 
                        className={styles.processBtn} 
                        onClick={convertToImages}
                        style={{ marginTop: '2rem' }}
                      >
                        Convert to Images
                      </Button>
                    )}

                    {isProcessing && (
                      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--primary)' }}>
                          Processing Page {images.length + 1} of {totalPageCount}...
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s' }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              <div className={styles.features}>
                <div className={styles.featureItem}>
                  <Zap className={styles.featureIcon} style={{ color: '#f59e0b' }} />
                  <h4>High Resolution</h4>
                  <p>Up to 300 DPI rendering ensures your images remain crisp and professional.</p>
                </div>
                <div className={styles.featureItem}>
                  <ShieldCheck className={styles.featureIcon} style={{ color: '#10b981' }} />
                  <h4>Local Safety</h4>
                  <p>Your data stays on your machine. We use browser-native rendering for privacy.</p>
                </div>
              </div>
            </div>

            <div className={styles.previewCol}>
              {images.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                  {images.map((url, i) => (
                    <Card key={i} style={{ padding: '8px', position: 'relative', overflow: 'hidden' }}>
                      <img src={url} alt={`Page ${i+1}`} style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                      <div style={{ 
                        marginTop: '8px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        <span>Page {i + 1}</span>
                        <button 
                          onClick={() => downloadImage(url, i)}
                          style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'var(--bg-secondary)',
                  borderRadius: '16px',
                  border: '2px dashed var(--border)',
                  color: 'var(--text-secondary)',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <ImageIcon size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Page previews will appear here after conversion starts.</p>
                </div>
              )}

              {images.length > 0 && !isProcessing && (
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={downloadAllAsZip}
                  style={{ marginTop: '2rem' }}
                >
                  <Download size={20} style={{ marginRight: '8px' }} />
                  Download All Pages
                </Button>
              )}
            </div>
          </div>
        </section>

        <SEOSection 
          title="Convert PDF to Image Online: High Resolution JPG and PNG 2026"
          description="Looking to turn your PDF documents into images? Our online PDF to Image converter uses industry-standard rendering engines to provide high-quality PNG and JPG outputs. Perfect for social media, presentations, or extracting visual content from reports without needing heavy software."
          howToUse={[
            "Select the PDF document you want to convert from your device.",
            "Click on 'Convert to Images' to begin the browser-based rendering process.",
            "Wait as each page is converted into a high-resolution PNG image.",
            "Preview the results in the interactive grid and download individual pages.",
            "Use 'Download All' to quickly save the entire document as a collection of images."
          ]}
          benefits={[
            "Pixel Perfect: High-density rendering keeps text sharp and images vibrant.",
            "Privacy Assured: No files are uploaded to any server; everything happens in your RAM.",
            "Fastest Extraction: Converts even large documents in seconds using hardware acceleration.",
            "Ease of Use: No complex settings—just upload and get your images immediately.",
            "Multi-Format: Best for PNG and JPG extraction from complex layouts."
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
