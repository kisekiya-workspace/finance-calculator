'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import { Check, Copy, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
interface QueryParam {
    id: string;
    key: string;
    value: string;
}

export default function UrlEncoderClient() {
    const [mode, setMode] = useState<'encode' | 'decode' | 'builder'>('builder');

    // Basic Encode/Decode State
    const [inputVal, setInputVal] = useState('');
    const [outputVal, setOutputVal] = useState('');

    // Builder State
    const [baseUrl, setBaseUrl] = useState('https://toolioz.online/api/v1/search');
    const [params, setParams] = useState<QueryParam[]>([
        { id: '1', key: 'q', value: 'url encoder' },
        { id: '2', key: 'sort', value: 'desc' },
    ]);

    const [copied, setCopied] = useState(false);

    // Dynamic URL Builder compute
    const builtUrl = useMemo(() => {
        try {
            // First decode base to avoid building on already encoded parts
            const safeBase = baseUrl.trim() || 'https://example.com';

            // Check if user accidentally pasted params in base URL
            const urlObj = new URL(safeBase);

            // Add grid params
            params.forEach(p => {
                if (p.key.trim()) {
                    urlObj.searchParams.append(p.key.trim(), p.value);
                }
            });
            return urlObj.toString();
        } catch (e) {
            return 'Invalid Base URL format';
        }
    }, [baseUrl, params]);

    const handleBasicInput = (val: string, currentMode: 'encode' | 'decode') => {
        setInputVal(val);
        try {
            if (currentMode === 'encode') {
                setOutputVal(encodeURIComponent(val));
            } else {
                setOutputVal(decodeURIComponent(val));
            }
        } catch (e) {
            setOutputVal('Error processing string');
        }
    };

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const addParam = () => {
        setParams([...params, { id: Date.now().toString(), key: '', value: '' }]);
    };

    const updateParam = (id: string, field: 'key' | 'value', val: string) => {
        setParams(params.map(p => p.id === id ? { ...p, [field]: val } : p));
    };

    const removeParam = (id: string) => {
        setParams(params.filter(p => p.id !== id));
    };

    // Auto-parse if user pastes a full URL into BaseURL input in builder mode
    const handleBaseUrlChange = (val: string) => {
        try {
            // Only try to parse if there's a question mark indicating a query string
            if (val.includes('?')) {
                const parsed = new URL(val);
                const newBase = parsed.origin + parsed.pathname;

                const newParams: QueryParam[] = [];
                parsed.searchParams.forEach((value, key) => {
                    newParams.push({ id: Date.now().toString() + Math.random(), key, value });
                });

                setBaseUrl(newBase);
                if (newParams.length > 0) {
                    setParams([...params, ...newParams]);
                }
                return;
            }
        } catch (e) {
            // Not a valid URL or just typing, ignore parsing error
        }
        setBaseUrl(val);
    };


    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>Visual URL <span className={styles.accent}>Builder</span></h1>
                        <p className={styles.subtitle}>Parse, manipulate query strings visually, and encode components securely.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className={styles.container}>
                        <Card className={styles.card}>

                            <div className={styles.modeToggleWrap}>
                                <button
                                    className={`${styles.modeBtn} ${mode === 'builder' ? styles.activeMode : ''}`}
                                    onClick={() => setMode('builder')}
                                >
                                    URL Builder & Parser
                                </button>
                                <button
                                    className={`${styles.modeBtn} ${mode === 'encode' ? styles.activeMode : ''}`}
                                    onClick={() => { setMode('encode'); handleBasicInput(inputVal, 'encode'); }}
                                >
                                    String Encode
                                </button>
                                <button
                                    className={`${styles.modeBtn} ${mode === 'decode' ? styles.activeMode : ''}`}
                                    onClick={() => { setMode('decode'); handleBasicInput(inputVal, 'decode'); }}
                                >
                                    String Decode
                                </button>
                            </div>

                            {mode === 'builder' ? (
                                <div className={styles.builderLayout}>
                                    <div className={styles.builderSection}>
                                        <div className={styles.panelHeader}>
                                            <h3>Base URL (Origin & Path)</h3>
                                        </div>
                                        <input
                                            type="text"
                                            className={`${styles.input} ${styles.fullInput}`}
                                            placeholder="https://example.com/api..."
                                            value={baseUrl}
                                            onChange={(e) => handleBaseUrlChange(e.target.value)}
                                        />

                                        <div className={styles.panelHeader} style={{ marginTop: '1.5rem' }}>
                                            <h3>Query Parameters</h3>
                                            <button className={styles.addBtn} onClick={addParam}>
                                                <Plus size={16} /> Add Key
                                            </button>
                                        </div>

                                        <div className={styles.queryParamsList}>
                                            {params.length === 0 && <span className={styles.placeholder} style={{ display: 'block', marginBottom: '1rem' }}>No parameters added yet.</span>}
                                            {params.map(param => (
                                                <div key={param.id} className={styles.builderRow}>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        placeholder="Key (e.g. search)"
                                                        value={param.key}
                                                        onChange={(e) => updateParam(param.id, 'key', e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        placeholder="Value (automatically encoded)"
                                                        value={param.value}
                                                        onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                                                    />
                                                    <button
                                                        className={styles.removeBtn}
                                                        onClick={() => removeParam(param.id)}
                                                        title="Remove Parameter"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.panel}>
                                        <div className={styles.panelHeader}>
                                            <h3>Final Generated & Encoded URL</h3>
                                            <button className={styles.copyBtn} onClick={() => copyToClipboard(builtUrl)}>
                                                {copied ? <Check size={16} color="#3b82f6" /> : <Copy size={16} />}
                                                <span>{copied ? 'Copied' : 'Copy'}</span>
                                            </button>
                                        </div>
                                        <div className={styles.outputArea} style={{ minHeight: '150px' }}>
                                            {builtUrl}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.panels}>
                                    <div className={styles.panel}>
                                        <div className={styles.panelHeader}>
                                            <h3>Input {mode === 'encode' ? 'Text' : 'Encoded String'}</h3>
                                        </div>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder={mode === 'encode' ? 'Paste raw URI component or text...' : 'Paste encoded string...'}
                                            value={inputVal}
                                            onChange={(e) => handleBasicInput(e.target.value, mode)}
                                            spellCheck="false"
                                        />
                                    </div>

                                    <div className={styles.panel}>
                                        <div className={styles.panelHeader}>
                                            <h3>Output {mode === 'encode' ? 'Encoded' : 'Decoded Text'}</h3>
                                            <button className={styles.copyBtn} onClick={() => copyToClipboard(outputVal)}>
                                                {copied ? <Check size={16} color="#3b82f6" /> : <Copy size={16} />}
                                                <span>{copied ? 'Copied' : 'Copy'}</span>
                                            </button>
                                        </div>
                                        <div className={styles.outputArea}>
                                            {outputVal || <span className={styles.placeholder}>Result will appear here...</span>}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </Card>
                    </div>
                </section>

                <SEOSection
                    title="Visual URL Builder & Base64 Encoder Online"
                    description="A powerful utility for web engineers. Visually build URLs with a dynamic query mapping table, instantly encode raw strings to safely pass through network payloads, or decode malformed URLs cleanly."
                    howToUse={[
                        "Use the URL Builder mode to paste a full URL. It will automatically detect and parse out the query parameters (?key=value) into a manageable grid.",
                        "Add, edit or remove custom parameters; the tool handles URL Percent-Encoding for spaces and symbols natively.",
                        "Switch to String Encode or String Decode for raw string-based URI Component processing.",
                        "Click the copy button when your target URL is generated."
                    ]}
                    benefits={[
                        "Forget manual '?&=' syntax errors when crafting API endpoints by hand.",
                        "Prevents percent-encoding bugs when injecting symbols (spaces, commas, plusses) in the browser.",
                        "100% locally evaluated Javascript APIs (URL interface, encodeURIComponent). No logs sent to server.",
                        "Unified GUI for developers dealing with REST APIs, webhooks, and deep links."
                    ]}
                />

                <section className="container section" style={{ padding: '2rem 0 6rem' }}>
                    <Card style={{ padding: '3rem', background: 'var(--bg-secondary)', border: 'none' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Why Use a Visual URL Parser?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Modern API architectures demand precisely formatted deep links and network payloads. Instead of trying to parse out where `%20` starts and `%3D` ends, our <strong>Visual URL Parser</strong> decompiles the URL mathematically into readable rows, allowing developers to immediately analyze data, inject proper payloads, and avoid notorious errors related to unhandled spaces and symbols natively.
                        </p>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Understanding Percent-Encoding</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            <strong>URL Encoding</strong> (often called Percent-Encoding) is a mechanism for safely encoding information in a Uniform Resource Identifier (URI). Because URLs can only be sent over the Internet using the US-ASCII character set, unsafe ASCII characters must be translated. Our decoder quickly flips string like `%40` back to `@` protecting your production systems from parser crashes.
                        </p>
                    </Card>
                </section>
            </div>
            <Footer />
        </>
    );
}
