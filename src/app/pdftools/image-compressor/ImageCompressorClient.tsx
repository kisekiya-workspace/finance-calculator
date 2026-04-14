'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, ImageIcon, Download, Zap, ShieldCheck, Settings, Info, Loader2, ArrowRight } from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import { RelatedTools } from '@/components/ui/RelatedTools';
import styles from '../merge-pdf/page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
export default function ImageCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [targetSize, setTargetSize] = useState<string>(''); // in KB
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [appliedScale, setAppliedScale] = useState<number>(1);

  // Persistence
  useEffect(() => {
    const savedQuality = localStorage.getItem('toolioz_img_quality');
    const savedTarget = localStorage.getItem('toolioz_img_target');
    if (savedQuality) setQuality(parseFloat(savedQuality));
    if (savedTarget) setTargetSize(savedTarget);
  }, []);

  useEffect(() => {
    localStorage.setItem('toolioz_img_quality', quality.toString());
    localStorage.setItem('toolioz_img_target', targetSize);
  }, [quality, targetSize]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
      img.src = url;

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressedUrl('');
      setCompressedSize(0);
    }
  };

  const getCompressedBlob = async (img: HTMLImageElement, q: number, scale: number = 1): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', q);
    });
  };

  const compressImage = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = originalUrl;
      await new Promise((resolve) => img.onload = resolve);

      let finalBlob: Blob;
      let currentScale = 1;
      
      if (targetSize && parseFloat(targetSize) > 0) {
        const targetBytes = parseFloat(targetSize) * 1024;
        
        // Phase 1: Heuristic Scaling
        // If target is < 1/10th of original, start by halving resolution
        if (targetBytes < file.size * 0.1) currentScale = 0.5;
        if (targetBytes < file.size * 0.02) currentScale = 0.3; // Extreme
        
        let lastBlob: Blob | null = null;
        let bestQ = 0.1;

        // Nested iteration for better convergence
        for (let s = currentScale; s >= 0.1; s -= 0.1) {
          let minQ = 0.05, maxQ = 0.95;
          currentScale = s;
          
          for (let i = 0; i < 8; i++) {
            const midQ = (minQ + maxQ) / 2;
            const blob = await getCompressedBlob(img, midQ, s);
            if (blob.size <= targetBytes) {
              lastBlob = blob;
              minQ = midQ;
              bestQ = midQ;
            } else {
              maxQ = midQ;
            }
          }
          if (lastBlob) break; // Found a working scale/quality
        }
        
        finalBlob = lastBlob || await getCompressedBlob(img, 0.05, 0.1);
        setAppliedScale(currentScale);
      } else {
        // Simple quality based compression
        finalBlob = await getCompressedBlob(img, quality, 1);
        setAppliedScale(1);
      }

      setCompressedSize(finalBlob.size);
      const url = URL.createObjectURL(finalBlob);
      setCompressedUrl(url);
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('Failed to compress image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `compressed_${file?.name.split('.')[0]}.jpg`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Image Compressor</h1>
            <p className={styles.subtitle}>Reduce image file size instantly with professional-grade compression settings.</p>
          </div>
        </header>

        <section className="container section">
          <div className={`${styles.mainGrid} ${file ? styles.withFile : ''}`}>
            <div className={styles.uploadCol}>
              <Card className={styles.dropzoneCard}>
                {!file ? (
                  <div className={styles.dropzone}>
                    <input type="file" accept="image/*" onChange={handleFileChange} id="img-upload" className={styles.fileInput} />
                    <label htmlFor="img-upload" className={styles.dropLabel}>
                      <div className={styles.iconCircle}><Upload size={32} /></div>
                      <h3>Select Image</h3>
                      <p>to optimize quality and size</p>
                    </label>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className={styles.fileItem} style={{ marginBottom: '2rem' }}>
                      <div className={styles.fileInfo}>
                        <ImageIcon className={styles.fileIcon} />
                        <div>
                          <span className={styles.fileName}>{file.name}</span>
                          <span className={styles.fileSize}>{formatSize(file.size)}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setFile(null)}>Change</Button>
                    </div>

                    <div className={styles.optionsBox}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        <Settings size={18} />
                        <span style={{ fontWeight: 700 }}>Compression Settings</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 600 }}>Visual Quality</span>
                            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{Math.round(quality * 100)}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.1" 
                            max="1" 
                            step="0.05" 
                            value={quality} 
                            onChange={(e) => setQuality(parseFloat(e.target.value))} 
                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                            disabled={!!targetSize}
                          />
                        </div>

                        <div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Target Size (KB) - Optional</span>
                          <input 
                            type="number" 
                            placeholder="e.g. 100" 
                            value={targetSize}
                            onChange={(e) => setTargetSize(e.target.value)}
                            style={{ 
                              width: '100%', 
                              padding: '12px', 
                              borderRadius: '10px', 
                              border: '1px solid var(--border)',
                              background: 'white'
                            }}
                          />
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                            Overrides quality to meet your size goal.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      fullWidth 
                      className={styles.processBtn}
                      onClick={compressImage} 
                      disabled={isProcessing}
                      style={{ marginTop: '2rem' }}
                    >
                      {isProcessing ? <Loader2 className="animate-spin" /> : 'Compress Image Now'}
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {file && (
              <div className={styles.previewCol}>
                <Card style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className={styles.previewViewGrid}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>ORIGINAL</p>
                      <div style={{ 
                        height: '240px', 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img src={originalUrl} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <p style={{ marginTop: '0.5rem', fontWeight: 800 }}>{formatSize(file.size)}</p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>OPTIMIZED</p>
                      <div style={{ 
                        height: '240px', 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        border: '1px solid var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        {compressedUrl ? (
                          <img src={compressedUrl} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                          <div style={{ opacity: 0.3 }}><ImageIcon size={48} /></div>
                        )}
                        {compressedSize > 0 && (
                          <div style={{ 
                            position: 'absolute', 
                            bottom: '8px', 
                            right: '8px', 
                            background: 'var(--success)', 
                            color: 'white', 
                            fontSize: '0.7rem', 
                            padding: '4px 8px', 
                            borderRadius: '100px',
                            fontWeight: 700
                          }}>
                            SAVED {Math.round((1 - compressedSize / file.size) * 100)}%
                          </div>
                        )}
                        {appliedScale < 1 && (
                          <div style={{ 
                            position: 'absolute', 
                            top: '8px', 
                            left: '8px', 
                            background: 'var(--primary)', 
                            color: 'white', 
                            fontSize: '0.65rem', 
                            padding: '4px 8px', 
                            borderRadius: '100px',
                            fontWeight: 700
                          }}>
                            SCALED {Math.round(appliedScale * 100)}%
                          </div>
                        )}
                      </div>
                      <p style={{ marginTop: '0.5rem', fontWeight: 800 }}>{compressedSize ? formatSize(compressedSize) : '-'}</p>
                    </div>
                  </div>

                  {compressedUrl && (
                    <div style={{ marginTop: '2rem' }}>
                      <Button fullWidth variant="primary" size="lg" onClick={downloadImage}>
                        <Download size={20} style={{ marginRight: '8px' }} />
                        Download Optimized Image
                      </Button>
                      
                      {dimensions && (
                        <div style={{ 
                          marginTop: '1.5rem', 
                          padding: '1rem', 
                          background: 'rgba(59, 130, 246, 0.05)', 
                          borderRadius: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.85rem'
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Dimensions</span>
                          <span style={{ fontWeight: 700 }}>{dimensions.width} x {dimensions.height} px</span>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <ShieldCheck size={24} className={styles.featureIcon} style={{ color: '#10b981' }} />
              <div>
                <h4>Secure & Private</h4>
                <p>All processing happens locally in your browser. Your images never leave your device.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Zap size={24} className={styles.featureIcon} style={{ color: '#f59e0b' }} />
              <div>
                <h4>Instant Optimization</h4>
                <p>Our advanced engine compresses your images in milliseconds with pixel-perfect results.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Info size={24} className={styles.featureIcon} style={{ color: '#3b82f6' }} />
              <div>
                <h4>No File Limits</h4>
                <p>Completely free to use with no hidden caps on file size or daily usage counts.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentToolId="image-compressor" categoryId="pdftools" />

        <SEOSection 
          title="Best Online Image Compressor: Reduce Size Without Losing Quality 2026"
          description="Looking to compress images for fast web performance or email? Our professional image optimizer supports JPEG, PNG, and WebP. Set a target file size and let our engine automatically find the perfect balance between quality and compression. Your photos remain sharp while your site stays fast."
          howToUse={[
            "Select or drop your image file into the specialized dropzone.",
            "Adjust the visual quality slider or enter a specific 'Target Size' (e.g. 200KB).",
            "Click on 'Compress Image Now' to run our local optimization engine.",
            "Review the 'Before vs After' preview to ensure visual fidelity is maintained.",
            "Download your optimized image instantly. No uploads, no waiting."
          ]}
          benefits={[
            "Google SEO Boost: Smaller images load faster, improving your search page rankings.",
            "Privacy Assured: Since processing is local, your private photos never hit a server.",
            "Target Size Feature: Perfect for meeting strict upload size limits on portals.",
            "High Fidelity: Intelligent resampling preserves fine details in the output.",
            "Format Support: One-stop tool for all your common web and mobile image formats."
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
