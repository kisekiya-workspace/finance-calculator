'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Binary, Copy, Trash2, SwitchCamera, Check, FileUp, Download } from 'lucide-react';
import styles from './page.module.css';

export default function Base64Client() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    setError(null);
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input.trim()));
      }
    } catch (e) {
      setError(mode === 'encode' ? 'Unable to encode. String contains non-Latin1 characters.' : 'Invalid Base64 string.');
      setOutput('');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInput(result);
      if (mode === 'encode') {
        // For files, we usually want the data URI base64
        setOutput(result.split(',')[1] || result);
      }
    };
    
    if (mode === 'encode') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.badge}>Security & Data</div>
          <h1 className={styles.title}>Base64 <span className={styles.accent}>Converter</span></h1>
          <p className={styles.subtitle}>Encode text or files to Base64, or decode them back to their original form. 100% private.</p>
        </div>
      </header>

      <main className="container section">
        <div className={styles.toolGrid}>
          <div className={styles.inputArea}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{mode === 'encode' ? 'Binary / Text Input' : 'Base64 Input'}</h3>
                <div className={styles.actions}>
                  <label className={styles.fileBtn}>
                    <FileUp size={16} /> Upload File
                    <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => setInput('')}><Trash2 size={16} /></Button>
                </div>
              </div>
              <textarea
                className={styles.textarea}
                placeholder={mode === 'encode' ? 'Type or paste text here...' : 'Paste Base64 string here...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Card>
          </div>

          <div className={styles.controls}>
            <Button size="lg" onClick={handleProcess} className={styles.processBtn}>
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleMode} className={styles.switchBtn}>
              <SwitchCamera size={16} /> Switch Mode
            </Button>
          </div>

          <div className={styles.outputArea}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Result</h3>
                {output && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                )}
              </div>
              <div className={styles.outputBox}>
                {error ? (
                  <div className={styles.error}>{error}</div>
                ) : (
                  <pre className={styles.pre}>{output || 'Result will appear here...'}</pre>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
