'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import { CalendarClock, Copy, Check, Info } from 'lucide-react';
import * as cronParser from 'cron-parser';
import cronstrue from 'cronstrue';

export default function CronGeneratorClient() {
    const [cronString, setCronString] = useState('*/15 * * * *');
    const [copied, setCopied] = useState(false);

    // Parsed State
    const [translation, setTranslation] = useState('');
    const [nextDates, setNextDates] = useState<{ date: string, time: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            if (!cronString.trim()) {
                throw new Error('Cron string cannot be empty');
            }

            // Generate Human Readable translation
            const humanText = cronstrue.toString(cronString, { verbose: true });

            // Generate Upcoming Executions
            // @ts-ignore
            const interval = cronParser.parseExpression(cronString);
            const dates = [];
            for (let i = 0; i < 5; i++) {
                const obj = interval.next().toDate();
                dates.push({
                    date: obj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
                    time: obj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                });
            }

            setTranslation(humanText);
            setNextDates(dates);
            setError(null);
        } catch (e: any) {
            setTranslation('--');
            setNextDates([]);
            setError(e.message || 'Invalid cron expression');
        }
    }, [cronString]);

    const copyToClipboard = () => {
        if (error) return;
        navigator.clipboard.writeText(cronString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const setPreset = (val: string) => {
        setCronString(val);
    };

    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>Advanced Cron <span className={styles.accent}>Engine</span></h1>
                        <p className={styles.subtitle}>Build valid cron syntax, see plain English translations, and preview execution timelines safely.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className={styles.container}>
                        <Card className={styles.mainCard}>
                            <div className={styles.resultBox}>
                                <div className={styles.cronDisplayWrap}>
                                    <input
                                        type="text"
                                        value={cronString}
                                        onChange={(e) => setCronString(e.target.value)}
                                        className={styles.cronInput}
                                        spellCheck="false"
                                    />
                                    {error ? (
                                        <div className={styles.errorText}>
                                            Error: {error}
                                        </div>
                                    ) : (
                                        <div className={styles.translationBox}>
                                            &quot;{translation}&quot;
                                        </div>
                                    )}
                                </div>
                                <button className={styles.copyBtn} onClick={copyToClipboard} disabled={!!error}>
                                    {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
                                    <span>{copied ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className={styles.gridSystem}>
                                <div className={styles.timelineCard}>
                                    <h3 className={styles.timelineHeader}>
                                        <CalendarClock size={20} color="#8b5cf6" />
                                        Next 5 Executions
                                    </h3>
                                    {error ? (
                                        <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                                            Fix the cron syntax error to preview upcoming executions.
                                        </div>
                                    ) : (
                                        <div className={styles.timelineList}>
                                            {nextDates.map((nd, idx) => (
                                                <div key={idx} className={styles.timelineItem}>
                                                    <div className={styles.timelineDate}>{nd.date}</div>
                                                    <div className={styles.timelineTime}>{nd.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className={styles.presets}>
                                        <h4>Common Presets</h4>
                                        <div className={styles.presetButtons}>
                                            <button onClick={() => setPreset('0 0 * * *')} className={styles.presetBtn}>Daily at Midnight</button>
                                            <button onClick={() => setPreset('0 12 * * *')} className={styles.presetBtn}>Daily at Noon</button>
                                            <button onClick={() => setPreset('0 * * * *')} className={styles.presetBtn}>Top of every Hour</button>
                                            <button onClick={() => setPreset('0 0 * * 1')} className={styles.presetBtn}>Every Monday Midnight</button>
                                            <button onClick={() => setPreset('0 0 1 * *')} className={styles.presetBtn}>1st of the Month</button>
                                            <button onClick={() => setPreset('*/5 * * * *')} className={styles.presetBtn}>Every 5 Minutes</button>
                                            <button onClick={() => setPreset('0 0 * * 1-5')} className={styles.presetBtn}>Weekdays (Mon-Fri)</button>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                            <Info size={16} /> Syntax Reminder
                                        </h4>
                                        <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 1.6 }}>
                                            <li><strong>*</strong> any value</li>
                                            <li><strong>,</strong> value list separator</li>
                                            <li><strong>-</strong> range of values</li>
                                            <li><strong>/</strong> step values</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                <SEOSection
                    title="Online Cron Schedule Predictor & Advanced Parser"
                    description="Automatically decipher complex cron expressions into human readable English. Generate a 5-iteration execution schedule natively in your browser to debug automated background jobs confidently without trial and error."
                    howToUse={[
                        "Type or paste your raw cron expression directly into the purple input header (e.g. '0 22 * * 1-5').",
                        "Instantly see the plain English translation of exactly what the expression will do (e.g. 'At 10:00 PM, Monday through Friday').",
                        "Review the 'Next 5 Executions' timeline on the left to confirm timezones and daylight savings don't disrupt your expected triggers.",
                        "Use the quick presets panel to bootstrap standard infrastructure triggers immediately."
                    ]}
                    benefits={[
                        "Timeline Validation: Avoid catastrophic duplicate executions by verifying the absolute runtime timeline ahead of deployment.",
                        "Human Readable Translation: Instantly converts arbitrary stars and slashes into detailed English logic.",
                        "Native Execution: Uses advanced math libraries entirely in the browser, safeguarding privacy via zero-server communication.",
                        "Syntax Explainer: Handy reference chart directly on screen."
                    ]}
                />

                <section className="container section" style={{ padding: '2rem 0 6rem' }}>
                    <Card style={{ padding: '3rem', background: 'var(--bg-secondary)', border: 'none' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Why check Upcoming Execution Dates?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Advanced backend software processes, Lambda functions, and Kubernetes tasks depend entirely on the archaic <strong>Unix Cron Specification</strong>. Writing an expression that reads `*/15` instead of `15` means triggering a job 4 times an hour instead of once per hour. Our <strong>Advanced Cron Predictor Engine</strong> immediately calculates the absolute next 5 invocation timestamps, so administrators can confidently push schedule architectures to production environments knowing the interval math strictly aligns with their expectations.
                        </p>
                    </Card>
                </section>
            </div>
            <Footer />
        </>
    );
}
