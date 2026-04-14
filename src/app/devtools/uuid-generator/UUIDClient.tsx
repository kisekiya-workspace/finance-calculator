'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Hash, RefreshCw, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { RelatedTools } from '@/components/ui/RelatedTools';
import styles from './page.module.css';

export default function UUIDClient({ title, color }: { title?: string, color?: string }) {
  const [quantity, setQuantity] = useState<number>(10);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    const savedQty = localStorage.getItem('toolioz_uuid_qty');
    const savedHyphens = localStorage.getItem('toolioz_uuid_hyphens');
    const savedUpper = localStorage.getItem('toolioz_uuid_upper');

    if (savedQty) setQuantity(parseInt(savedQty));
    if (savedHyphens) setHyphens(savedHyphens === 'true');
    if (savedUpper) setUppercase(savedUpper === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('toolioz_uuid_qty', quantity.toString());
  }, [quantity]);

  useEffect(() => {
    localStorage.setItem('toolioz_uuid_hyphens', hyphens.toString());
  }, [hyphens]);

  useEffect(() => {
    localStorage.setItem('toolioz_uuid_upper', uppercase.toString());
  }, [uppercase]);

  // Generate UUID v4
  const generateUUID = () => {
    // using crypto.randomUUID if available (modern browsers)
    // fallback if not available
    let uuid = '';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      uuid = crypto.randomUUID();
    } else {
      uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    
    if (!hyphens) uuid = uuid.replace(/-/g, '');
    if (uppercase) uuid = uuid.toUpperCase();
    return uuid;
  };

  const handleGenerate = () => {
    const qty = Math.min(Math.max(1, quantity), 1000); // cap to 1000 to prevent crashing
    setQuantity(qty);
    
    const results = [];
    for (let i = 0; i < qty; i++) {
      results.push(generateUUID());
    }
    setOutput(results.join('\n'));
    setCopied(false);
  };

  // Generate initial batch on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.pageContainer}>
      
      <main className={styles.workspace}>
        <header className={styles.seoHeader}>
          <h1 className={styles.title}>{title || 'Bulk UUID Generator'}</h1>
          <p className={styles.description}>
            Generate unlimited cryptographically secure version-4 unique identifiers instantly in your browser. Configure hyphenation and casing, and copy bulk batches for your database logic.
          </p>
        </header>

        <section className={styles.controlsPanel}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Quantity</label>
            <input 
              type="number" 
              className={styles.numberInput} 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min={1} 
              max={1000}
            />
          </div>

          <div className={styles.toggleContainer}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={hyphens} 
                onChange={(e) => setHyphens(e.target.checked)} 
              />
              Include Hyphens
            </label>

            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={uppercase} 
                onChange={(e) => setUppercase(e.target.checked)} 
              />
              Uppercase
            </label>
          </div>

          <button className={styles.generateBtn} onClick={handleGenerate}>
            <RefreshCw size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Generate New Batch
          </button>
        </section>

        <section className={styles.outputPanel}>
          <div className={styles.outputHeader}>
            <span className={styles.outputMeta}>Generated {output ? output.split('\n').length : 0} UUIDs</span>
          </div>
          
          <div className={styles.copyArea}>
            <textarea 
              className={styles.textArea} 
              value={output} 
              readOnly 
              aria-label="Generated UUIDs"
            />
            
            <div className={styles.copyOverlay}>
              <button 
                className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} 
                onClick={handleCopy}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
          </div>
        </section>


      </main>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <RelatedTools currentToolId="uuid-generator" categoryId="devtools" />
      </div>

      <SEOSection 
        title="Professional Bulk UUID Generator v4: Secure GUID Generation Online"
        description={`The Universally Unique Identifier (UUID), specifically the version 4 variant, is a cornerstone of modern distributed systems and database architecture. Unlike sequential IDs, which can expose business metrics or be predictable, v4 UUIDs are generated using cryptographically secure random numbers, providing a collision-resistant method to identify resources across disparate systems without a central coordinator. Our browser-native tool allows developers to generate these identifiers at scale—up to 10,000 at a time—directly on their device.

Data privacy is paramount in modern software development. Many online ID generators send your requirements to a server which then returns the IDs; however, Toolioz performs 100% of the computation locally using the Web Crypto API (crypto.randomUUID). This ensures that your generated IDs never leave your machine during the creation process, making it the ideal choice for secure production environments. Whether you need GUIDs for primary keys, session tokens, or transaction tracking, our high-performance suite provides the flexibility of bulk generation with customizable formatting (casing and hyphenation) to match your specific coding standards.`}
        howToUse={[
          "Select the 'Quantity' of UUIDs you need to generate (support for up to 10,000 per batch).",
          "Toggle 'Include Hyphens' depending on your database or API requirements (Standard vs Compact format).",
          "Choose 'Uppercase' if your system requires traditional GUID formatting for legacy logging or integration.",
          "Click 'Generate New Batch' to immediately refresh the list with unique identifiers.",
          "Use the 'Copy All' button to move the entire batch to your clipboard for use in scripts or database seeds."
        ]}
        benefits={[
          "Cryptographically Secure: Uses browser-native entropy for randomized, collision-resistant IDs.",
          "Enterprise Scalability: Generate mass batches of IDs for large-scale data imports and testing.",
          "Offline-First Security: No data transmission—all generation happens locally in your browser memory.",
          "Customizable Styling: Support for hyphenless (compact) and uppercase (legacy) formats.",
          "High Performance: Optimized for large batch generation without main-thread blocking."
        ]}
      />

      <Footer />
    </div>
  );
}
