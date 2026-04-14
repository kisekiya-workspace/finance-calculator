'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import { SearchCode, AlertCircle, Copy, Check } from 'lucide-react';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function RegexTesterClient() {
    const [pattern, setPattern] = useState('([A-Z])\\w+');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('Hello world! testing RegExp tools is Fun.\nMatches Capitalized123.');
    const [replaceString, setReplaceString] = useState('-$1-');

    const [mode, setMode] = useState<'match' | 'replace' | 'code'>('match');

    // Derived States
    const [matches, setMatches] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [replacedOutput, setReplacedOutput] = useState<string>('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!pattern) {
            setMatches([]);
            setReplacedOutput(testString);
            setError(null);
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const results = [];
            let match;

            if (mode === 'replace') {
                setReplacedOutput(testString.replace(regex, replaceString));
            }

            // Ensure global flag is set to get multiple matches, otherwise just run once
            if (regex.global) {
                while ((match = regex.exec(testString)) !== null) {
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                    results.push({ value: match[0], index: match.index, groups: match.slice(1) });
                }
            } else {
                match = regex.exec(testString);
                if (match) results.push({ value: match[0], index: match.index, groups: match.slice(1) });
            }

            setMatches(results);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setMatches([]);
            setReplacedOutput('');
        }
    }, [pattern, flags, testString, replaceString, mode]);

    const toggleFlag = (flag: string) => {
        if (flags.includes(flag)) {
            setFlags(flags.replace(flag, ''));
        } else {
            setFlags(flags + flag);
        }
    };

    const copyCode = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateJsCode = () => {
        return `// JavaScript RegExp Code Snippet
const regex = /${pattern}/${flags};
const str = \`${testString.replace(/`/g, '\\`')}\`;
${mode === 'replace' ? `\nconst subst = \`${replaceString}\`;\nconst result = str.replace(regex, subst);\nconsole.log(result);` : `\nlet m;\nwhile ((m = regex.exec(str)) !== null) {\n    if (m.index === regex.lastIndex) { regex.lastIndex++; }\n    console.log(\`Found match, group 0: \${m[0]}\`);\n}`}`;
    };

    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>Advanced RegExp <span className={styles.accent}>Engine</span></h1>
                        <p className={styles.subtitle}>Debug patterns, run complex replacements, and generate exportable code instantly.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className={styles.container}>
                        <Card className={styles.card}>

                            <div className={styles.modeToggleWrap}>
                                <button className={`${styles.modeBtn} ${mode === 'match' ? styles.activeMode : ''}`} onClick={() => setMode('match')}>Match mode</button>
                                <button className={`${styles.modeBtn} ${mode === 'replace' ? styles.activeMode : ''}`} onClick={() => setMode('replace')}>Replace Formatter</button>
                                <button className={`${styles.modeBtn} ${mode === 'code' ? styles.activeMode : ''}`} onClick={() => setMode('code')}>Code Generator</button>
                            </div>

                            <div className={styles.regexBuilder}>
                                <div className={styles.regexInputWrap}>
                                    <span className={styles.regexSlash}>/</span>
                                    <input
                                        type="text"
                                        className={styles.regexInput}
                                        value={pattern}
                                        onChange={(e) => setPattern(e.target.value)}
                                        placeholder="Enter regular expression..."
                                        spellCheck={false}
                                    />
                                    <span className={styles.regexSlash}>/</span>
                                    <input
                                        type="text"
                                        className={styles.flagsInput}
                                        value={flags}
                                        onChange={(e) => setFlags(e.target.value)}
                                        placeholder="flags"
                                        spellCheck={false}
                                    />
                                </div>

                                {mode === 'replace' && (
                                    <div className={styles.replaceInputWrap}>
                                        <span className={styles.regexSlash} style={{ fontSize: '1rem', marginRight: '1rem', color: '#64748b' }}>Replace with: </span>
                                        <input
                                            type="text"
                                            className={styles.replaceInput}
                                            value={replaceString}
                                            onChange={(e) => setReplaceString(e.target.value)}
                                            placeholder="E.g. $1-$2"
                                            spellCheck={false}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.flagToggles}>
                                <button className={`${styles.flagBtn} ${flags.includes('g') ? styles.activeFlag : ''}`} onClick={() => toggleFlag('g')}>Global (g)</button>
                                <button className={`${styles.flagBtn} ${flags.includes('i') ? styles.activeFlag : ''}`} onClick={() => toggleFlag('i')}>Case Insensitive (i)</button>
                                <button className={`${styles.flagBtn} ${flags.includes('m') ? styles.activeFlag : ''}`} onClick={() => toggleFlag('m')}>Multiline (m)</button>
                                <button className={`${styles.flagBtn} ${flags.includes('s') ? styles.activeFlag : ''}`} onClick={() => toggleFlag('s')}>Dot All (s)</button>
                            </div>

                            {error && (
                                <div className={styles.errorBox}>
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            {mode === 'code' ? (
                                <div className={styles.testArea}>
                                    <div className={styles.sectionHeader}>
                                        <h3>JavaScript Implementation Snippet</h3>
                                        <button className={styles.copyCodeBtn} onClick={() => copyCode(generateJsCode())}>
                                            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                                            {copied ? 'Copied' : 'Copy Code'}
                                        </button>
                                    </div>
                                    <pre className={styles.codeArea}>{generateJsCode()}</pre>
                                </div>
                            ) : (
                                <div className={styles.gridSystem} style={{ gridTemplateColumns: mode === 'replace' ? '1fr 1fr' : '1fr' }}>
                                    <div className={styles.testArea}>
                                        <div className={styles.sectionHeader}>
                                            <h3>Test String Input</h3>
                                            <span className={styles.matchBadge}>
                                                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                                            </span>
                                        </div>
                                        <textarea
                                            className={styles.testInput}
                                            value={testString}
                                            onChange={(e) => setTestString(e.target.value)}
                                            placeholder="Insert the text you want to test against your regex here..."
                                            spellCheck={false}
                                        />
                                    </div>

                                    {mode === 'replace' && (
                                        <div className={styles.testArea}>
                                            <div className={styles.sectionHeader}>
                                                <h3>Substitution Result</h3>
                                            </div>
                                            <div className={styles.resultOutput}>
                                                {replacedOutput || <span style={{ opacity: 0.5 }}>(Empty result)</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {mode !== 'code' && matches.length > 0 && (
                                <div className={styles.matchesList}>
                                    <h3>Match Extractions & Capture Groups</h3>
                                    <div className={styles.matchesGrid}>
                                        {matches.map((m, idx) => (
                                            <div key={idx} className={styles.matchItem}>
                                                <div className={styles.matchHeader}>
                                                    <span className={styles.matchIndex}>Match {idx + 1}</span>
                                                    <span className={styles.matchPos}>pos: {m.index}-{m.index + m.value.length}</span>
                                                </div>
                                                <div className={styles.matchValue}>{m.value}</div>
                                                {m.groups.length > 0 && m.groups.some(Boolean) && (
                                                    <div className={styles.groupsWrap}>
                                                        <span className={styles.groupLabel}>Groups ($1+):</span>
                                                        {m.groups.map((g: string, i: number) => g ? (
                                                            <span key={i} className={styles.groupItem}>${i + 1}: {g}</span>
                                                        ) : null)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </section>

                <SEOSection
                    title="Live RegExp Replace Engine & Capture Group Tester"
                    description="Build, test, debug, and execute complex Regular Expressions with string substitution support online. Extract data into capture groups and natively generate implementation code snippets in Javascript."
                    howToUse={[
                        "Enter your regex pattern between the forward slashes (e.g. '([A-Z])\\w+').",
                        "Toggle to 'Replace Formatter' mode to test $1, $2 capture group substitutions dynamically.",
                        "Switch to 'Code Generator' to instantly export the backend code needed to execute your exact regex scenario natively.",
                        "Scroll down to cleanly review arrays of extracted matches and highly specific index tracking positions."
                    ]}
                    benefits={[
                        "Dynamic Replacements: Visualize what your Regex substitute string will yield before committing it to a database parser.",
                        "Code Generation: Immediately maps out valid Javascript regex loops and execution states ready for copy-pasting.",
                        "Capture Groups Analysis: Dissects `$1`, `$2` bindings in a highly scalable card array interface.",
                        "Strict Security Privacy: Guaranteed zero-server payload evaluation using strictly ECMA browser evaluation engines."
                    ]}
                />

                <section className="container section" style={{ padding: '2rem 0 6rem' }}>
                    <Card style={{ padding: '3rem', background: 'var(--bg-secondary)', border: 'none' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Regex Replacement Syntax Explained</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            A massive capability of our <strong>Regex Replacement Tester</strong> includes execution of native Javascript substitution strings. When your regex contains parentheses `( )`, it automatically captures that sub-string into memory. You can then toggle to <strong>Replace Formatter</strong> mode and use `$1`, `$2`, or `$3` in the substitution input to inject those specific captured words directly into a completely new formatted string.
                        </p>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Why Export Generated Code?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Writing comprehensive Regular Expressions is famously difficult, but implementing them cleanly inside web infrastructure can be worse. The native `RegExp.exec()` while loop in JavaScript is notoriously prone to infinite loops if flags are managed incorrectly (specifically the `global` incrementor). Our <strong>Code Generator toggle</strong> automatically provisions the exact, crash-proof while-loop sequence you need for deep production execution!
                        </p>
                    </Card>
                </section>
            </div>
            <Footer />
        </>
    );
}
