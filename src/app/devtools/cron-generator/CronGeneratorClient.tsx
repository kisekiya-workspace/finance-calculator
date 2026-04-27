'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SEOSection } from '@/components/ui/SEOSection';
import { CalendarClock, Copy, Check, Info } from 'lucide-react';
import { CronExpressionParser } from 'cron-parser';
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

            // Generate Upcoming Executions (cron-parser v5 API)
            const interval = CronExpressionParser.parse(cronString);
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
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Invalid cron expression';
            setTranslation('--');
            setNextDates([]);
            setError(message);
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
            <div className="min-h-screen bg-[var(--bg-primary)]">
                <header className="bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05)_0%,transparent_50%)] py-12 text-center md:py-24">
                    <div className="container">
                        <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-black text-[var(--text-primary)]">Advanced Cron <span className="text-[#8b5cf6]">Engine</span></h1>
                        <p className="text-xl text-[var(--text-secondary)]">Build valid cron syntax, see plain English translations, and preview execution timelines safely.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className="mx-auto max-w-[1000px]">
                        <Card className="!p-6 md:!p-10">
                            <div className="mb-6 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-lg)] bg-[#1e293b] p-6 lg:flex-row lg:p-8">
                                <div className="flex w-full flex-col gap-4">
                                    <input
                                        type="text"
                                        value={cronString}
                                        onChange={(e) => setCronString(e.target.value)}
                                        className="w-full border-none bg-transparent font-mono text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[0.1em] text-[#8b5cf6] outline-none"
                                        spellCheck="false"
                                    />
                                    {error ? (
                                        <div className="mt-2 text-sm font-semibold text-[#ef4444]">
                                            Error: {error}
                                        </div>
                                    ) : (
                                        <div className="inline-block max-w-fit rounded-[var(--radius-sm)] bg-[rgba(139,92,246,0.1)] px-4 py-3 text-lg font-semibold text-[#c4b5fd]">
                                            &quot;{translation}&quot;
                                        </div>
                                    )}
                                </div>
                                <button className="mt-0 flex shrink-0 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border-none bg-[rgba(255,255,255,0.1)] px-5 py-3 font-bold text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.2)] lg:mt-2" onClick={copyToClipboard} disabled={!!error}>
                                    {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
                                    <span>{copied ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                                    <h3 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[var(--text-primary)]">
                                        <CalendarClock size={20} color="#8b5cf6" />
                                        Next 5 Executions
                                    </h3>
                                    {error ? (
                                        <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                                            Fix the cron syntax error to preview upcoming executions.
                                        </div>
                                    ) : (
                                        <div className="ml-2 flex flex-col gap-0 border-l-2 border-[rgba(139,92,246,0.2)] pl-4">
                                            {nextDates.map((nd, idx) => (
                                                <div key={idx} className="relative py-3 before:absolute before:-left-[1.4rem] before:top-1/2 before:h-[12px] before:w-[12px] before:-translate-y-1/2 before:rounded-full before:border-2 before:border-[#8b5cf6] before:bg-[var(--bg-secondary)] before:content-[''] first:before:bg-[#8b5cf6] first:before:shadow-[0_0_10px_rgba(139,92,246,0.4)]">
                                                    <div className="text-[0.9375rem] font-bold text-[var(--text-primary)]">{nd.date}</div>
                                                    <div className="mt-1 font-mono text-[0.8125rem] font-bold text-[#8b5cf6]">{nd.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="mt-0 lg:mt-0">
                                        <h4 className="mb-4 text-base font-extrabold text-[var(--text-primary)]">Common Presets</h4>
                                        <div className="flex flex-wrap gap-4">
                                            <button onClick={() => setPreset('0 0 * * *')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Daily at Midnight</button>
                                            <button onClick={() => setPreset('0 12 * * *')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Daily at Noon</button>
                                            <button onClick={() => setPreset('0 * * * *')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Top of every Hour</button>
                                            <button onClick={() => setPreset('0 0 * * 1')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Every Monday Midnight</button>
                                            <button onClick={() => setPreset('0 0 1 * *')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">1st of the Month</button>
                                            <button onClick={() => setPreset('*/5 * * * *')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Every 5 Minutes</button>
                                            <button onClick={() => setPreset('0 0 * * 1-5')} className="cursor-pointer rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.05)] hover:text-[#8b5cf6]">Weekdays (Mon-Fri)</button>
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
