'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check, Type, FileText, Blocks, Code2 } from 'lucide-react';
import styles from './page.module.css';

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", 
  "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", 
  "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", 
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", 
  "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", 
  "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", 
  "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [withHTML, setWithHTML] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLorem = () => {
    let result = '';
    
    const generateSentence = () => {
      const len = Math.floor(Math.random() * 8) + 5;
      const sentence = Array.from({ length: len }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(' ');
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    };

    if (type === 'words') {
      result = Array.from({ length: count }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, generateSentence).join(' ');
    } else {
      const paragraphs = Array.from({ length: count }, () => {
        const pLen = Math.floor(Math.random() * 3) + 3;
        const p = Array.from({ length: pLen }, generateSentence).join(' ');
        return withHTML ? `<p>${p}</p>` : p;
      });
      result = paragraphs.join('\n\n');
    }

    setOutput(result);
  };

  useEffect(() => {
    generateLorem();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.badge}>Dev Content</div>
          <h1 className={styles.title}>Lorem <span className={styles.accent}>Ipsum</span></h1>
          <p className={styles.subtitle}>Generate professional placeholder text for your mockups, experiments, and designs.</p>
        </div>
      </header>

      <main className="container section">
        <div className={styles.mainGrid}>
          <Card className={styles.controlsCard}>
            <div className={styles.controlGroup}>
              <label>Amount</label>
              <Input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} 
                min={1}
              />
            </div>

            <div className={styles.typeSelector}>
              <button className={`${styles.typeBtn} ${type === 'paragraphs' ? styles.activeType : ''}`} onClick={() => setType('paragraphs')}>
                <Blocks size={18} /> Paragraphs
              </button>
              <button className={`${styles.typeBtn} ${type === 'sentences' ? styles.activeType : ''}`} onClick={() => setType('sentences')}>
                <FileText size={18} /> Sentences
              </button>
              <button className={`${styles.typeBtn} ${type === 'words' ? styles.activeType : ''}`} onClick={() => setType('words')}>
                <Type size={18} /> Words
              </button>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={withHTML} onChange={(e) => setWithHTML(e.target.checked)} />
                <span className={styles.checkboxCustom}><Code2 size={14} /></span>
                Include HTML Tags
              </label>
            </div>

            <Button fullWidth size="lg" onClick={generateLorem} className={styles.generateBtn}>
              Refresh Generator
            </Button>
          </Card>

          <Card className={styles.outputCard}>
            <div className={styles.cardHeader}>
              <h3>Placeholder Text</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
            </div>
            <div className={styles.scrollArea}>
              <div className={styles.outputText}>
                {output.split('\n\n').map((p, i) => (
                  <p key={i} style={{ marginBottom: i === output.split('\n\n').length - 1 ? 0 : '1.5rem' }}>{p}</p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
