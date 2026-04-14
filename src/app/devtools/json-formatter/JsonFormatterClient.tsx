'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Code, Copy, Trash2, AlignLeft, Check, AlertCircle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import yaml from 'js-yaml';
import JsonToTS from 'json-to-ts';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function JsonFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('Result');

  const executeTransform = (transformFn: (parsed: any) => string, modeName: string) => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      const res = transformFn(parsed);
      setOutput(res);
      setError(null);
      setActiveTab(modeName);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax");
      setOutput('');
      setActiveTab('Error');
    }
  };

  const formatJson = (indent: number) => {
    executeTransform((parsed) => JSON.stringify(parsed, null, indent), 'Beautified JSON');
  };

  const minifyJson = () => {
    executeTransform((parsed) => JSON.stringify(parsed), 'Minified JSON');
  };

  const toYaml = () => {
    executeTransform((parsed) => yaml.dump(parsed, { indent: 2, lineWidth: -1 }), 'YAML Format');
  };

  const toTypeScript = () => {
    executeTransform((parsed) => {
      const interfaces = JsonToTS(parsed);
      return interfaces.join('\n\n');
    }, 'TypeScript Interfaces');
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
    setActiveTab('Result');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Advanced JSON <span className={styles.accent}>Transformer</span></h1>
          <p className={styles.subtitle}>Format, validate, and convert JSON payloads to YAML and TS Interfaces in real-time.</p>
        </div>
      </header>

      <main className="container section">
        <div className={styles.grid}>
          <div className={styles.inputCol}>
            <Card className={styles.toolCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleBox}>
                  <Code size={20} className={styles.icon} />
                  <h3>Raw JSON Input</h3>
                </div>
                <div className={styles.cardActions}>
                  <Button variant="ghost" size="sm" onClick={clearAll} className={styles.actionBtn}>
                    <Trash2 size={16} /> Clear
                  </Button>
                </div>
              </div>
              <textarea
                className={styles.textarea}
                placeholder='Paste your JSON array or object here (e.g. {"name": "Toolioz", "type": "Toolbox"})'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck="false"
              />

              <div className={styles.controlsWrap}>
                <span className={styles.controlsLabel}>Formatting</span>
                <div className={styles.controlsGrid} style={{ marginBottom: '1rem' }}>
                  <button className={styles.controlBtn} onClick={() => formatJson(2)} disabled={!input}>Format (2 Tabs)</button>
                  <button className={styles.controlBtn} onClick={() => formatJson(4)} disabled={!input}>Format (4 Tabs)</button>
                  <button className={styles.controlBtn} onClick={minifyJson} disabled={!input}>Minify payload</button>
                </div>

                <span className={styles.controlsLabel}>Advanced Generics</span>
                <div className={styles.controlsGrid}>
                  <button className={styles.controlBtn} onClick={toYaml} disabled={!input} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>Convert to YAML</button>
                  <button className={styles.controlBtn} onClick={toTypeScript} disabled={!input} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>Generate TS Types</button>
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.outputCol}>
            <Card className={styles.toolCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleBox}>
                  <AlignLeft size={20} className={styles.icon} />
                  <h3 style={{ color: error ? '#ef4444' : 'inherit' }}>{activeTab}</h3>
                </div>
                <div className={styles.cardActions}>
                  {output && (
                    <Button variant="ghost" size="sm" onClick={handleCopy} className={styles.actionBtn}>
                      {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                      {copied ? 'Copied Content' : 'Copy Output'}
                    </Button>
                  )}
                </div>
              </div>
              <div className={styles.outputWrapper}>
                {error ? (
                  <div className={styles.errorBox}>
                    <AlertCircle size={20} />
                    <div>
                      <strong>Syntax Error parsing JSON:</strong>
                      <p>{error}</p>
                    </div>
                  </div>
                ) : (
                  <pre className={styles.pre}>
                    {output || '(Output will appear here after you paste and format)'}
                  </pre>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <SEOSection
        title="Live JSON Formatter, YAML Converter & TS Generics"
        description="A blazing fast, private utility tool to format, beautify, validate, and minify massive JSON files. Automatically convert your endpoints to structural YAML or generate strict Typescript interfaces instantly."
        howToUse={[
          "Paste your raw, messy JSON string directly into the left input window.",
          "Use formatting tools to immediately beautify the JSON with specific 2 or 4 indentations, or squish it utilizing the Minify button.",
          "Use the Advanced Generics panel to effortlessly translate the JSON structure into perfectly nested YAML or explicit TypeScript Interfaces.",
          "Watch for instant syntax errors in the outcome window to trace missing commas or brackets before pushing your code to production."
        ]}
        benefits={[
          "100% Client-Side Privacy: Your payloads are analyzed deeply via local computation power. Nothing is ever saved or routed externally.",
          "Cross-Structural Compiling: Automatically traverse and generate 1:1 mapped TypeScript Types and configurations from unpredictable JSON logic.",
          "Blazing Speed: Render and format several megabytes of complex JSON structures securely inside the browser environment.",
          "Error Tracing: Highlights exactly where the JSON payload failed execution constraints, improving developer QA speeds."
        ]}
      />

    </div>
  );
}
