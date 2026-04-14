'use client';

import React, { useState, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Plus, X, ShieldCheck, Zap, Download, FileUp, ArrowDownWideNarrow, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import styles from './page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function MergePdfClient() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: FileItem[] = selectedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: formatFileSize(file.size)
    }));
    setFiles(prev => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const startMerge = async () => {
    if (files.length < 2) return;

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const fileItem of files) {
        const fileContent = await fileItem.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileContent);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Merge failed:', error);
      alert('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.badge}>PDF Suite Professional</div>
          <h1 className={styles.title}>Merge <span className={styles.accent}>PDF</span> Files</h1>
          <p className={styles.subtitle}>Combine multiple PDF documents into one professional file. Secure, fast, and stays in your browser.</p>
        </div>
      </header>

      <main className="container section">
        <div className={styles.mainBox}>
          <Card className={styles.dropzoneCard}>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {files.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.uploadIcon}>
                  <FileUp size={48} />
                </div>
                <h3>Select PDF Files</h3>
                <p>or click to browse your documents</p>
                <Button size="lg" className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                  <Plus size={20} /> Choose Files
                </Button>
              </div>
            ) : (
              <div className={styles.fileListLayout}>
                <div className={styles.listHeader}>
                  <h3>Selected Files ({files.length})</h3>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Plus size={16} /> Add More
                  </Button>
                </div>

                <div className={styles.fileGrid}>
                  {files.map((file, index) => (
                    <div key={file.id} className={styles.fileItem}>
                      <div className={styles.fileOrder}>{index + 1}</div>
                      <FileText size={24} className={styles.fileIcon} />
                      <div className={styles.fileInfo}>
                        <span className={styles.fileName}>{file.name}</span>
                        <span className={styles.fileSize}>{file.size}</span>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeFile(file.id)}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.listFooter}>
                  <div className={styles.mergeInfo}>
                    <ArrowDownWideNarrow size={20} />
                    <span>Files will be merged in the order shown above.</span>
                  </div>
                  <Button
                    size="lg"
                    className={styles.mergeBtn}
                    onClick={startMerge}
                    disabled={isMerging || files.length < 2}
                  >
                    {isMerging ? (
                      <>
                        <Loader2 className="animate-spin" size={20} style={{ marginRight: '10px' }} />
                        Merging Files...
                      </>
                    ) : (
                      <>
                        Merge PDF Now
                        <Download size={20} style={{ marginLeft: '10px' }} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className={styles.trustBranding}>
            <div className={styles.trustItem}>
              <ShieldCheck size={24} />
              <div>
                <h5>Secure Processing</h5>
                <p>Files never leave your computer. We use local browser memory for binary merging.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <Zap size={24} />
              <div>
                <h5>Instant Results</h5>
                <p>Binary-level merging optimized for large document sets.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="container section">
        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}><FileText size={24} /></div>
            <h4>Why Merge PDFs?</h4>
            <p>Combine multiple reports, invoices, or scanned documents into a single, easy-to-manage file for sharing or archiving.</p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}><ShieldCheck size={24} /></div>
            <h4>Local Binary Processing</h4>
            <p>Unlike other online tools, we process your PDF on your machine using the <strong>pdf-lib</strong> engine. Your sensitive data stays under your control.</p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}><ArrowDownWideNarrow size={24} /></div>
            <h4>Easy Sorting</h4>
            <p>The output PDF will follow your exact specified order. Simply add files in the sequence you need them to appear.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
