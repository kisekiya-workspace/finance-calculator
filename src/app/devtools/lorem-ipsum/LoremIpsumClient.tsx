'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check, Type, FileText, Blocks, Code2 } from 'lucide-react';


import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
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
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <header className="bg-[radial-gradient(circle_at_0%_0%,rgba(37,99,235,0.05)_0%,transparent_50%)] py-16 text-center md:py-32">
        <div className="container">
          <div className="mb-8 inline-block rounded-full bg-[var(--primary-light)] px-4 py-2 text-[0.8125rem] font-bold uppercase tracking-widest text-[var(--primary)]">Dev Content</div>
          <h1 className="mb-6 text-[2.5rem] font-black tracking-tight md:text-[3.5rem]">Lorem <span className="text-[var(--primary)]">Ipsum</span></h1>
          <p className="mx-auto max-w-[650px] text-xl text-[var(--text-secondary)]">Generate professional placeholder text for your mockups, experiments, and designs.</p>
        </div>
      </header>

      <main className="container section">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[350px_1fr]">
          <Card className="flex flex-col gap-6 !p-8">
            <div className="flex flex-col gap-3">
              <label className="text-[0.8125rem] font-extrabold uppercase tracking-widest text-[var(--text-tertiary)]">Amount</label>
              <Input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} 
                min={1}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-[0.9375rem] font-bold transition-all ${type === 'paragraphs' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white dark:hover:bg-[var(--primary)]' : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] dark:hover:bg-[var(--bg-primary)]'}`} onClick={() => setType('paragraphs')}>
                <Blocks size={18} /> Paragraphs
              </button>
              <button className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-[0.9375rem] font-bold transition-all ${type === 'sentences' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white dark:hover:bg-[var(--primary)]' : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] dark:hover:bg-[var(--bg-primary)]'}`} onClick={() => setType('sentences')}>
                <FileText size={18} /> Sentences
              </button>
              <button className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-[0.9375rem] font-bold transition-all ${type === 'words' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white dark:hover:bg-[var(--primary)]' : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] dark:hover:bg-[var(--bg-primary)]'}`} onClick={() => setType('words')}>
                <Type size={18} /> Words
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex cursor-pointer items-center gap-3 text-[0.9375rem] font-semibold text-[var(--text-secondary)]">
                <input type="checkbox" className="peer hidden" checked={withHTML} onChange={(e) => setWithHTML(e.target.checked)} />
                <span className="flex h-5 w-5 items-center justify-center rounded border-2 border-[var(--border)] text-transparent transition-all peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-white"><Code2 size={14} /></span>
                Include HTML Tags
              </label>
            </div>

            <Button fullWidth size="lg" onClick={generateLorem}>
              Refresh Generator
            </Button>
          </Card>

          <Card className="flex h-[600px] flex-col !p-0">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-8 py-6">
              <h3 className="text-lg font-extrabold">Placeholder Text</h3>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:30px_30px] p-8 text-lg leading-relaxed text-[var(--text-secondary)] md:p-12">
              <div className="max-w-[800px]">
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
