'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import { Asterisk, CheckCircle2, XCircle, Copy, Check, Loader2 } from 'lucide-react';
import bcrypt from 'bcryptjs';

export default function BcryptGeneratorClient() {
    // Generator State
    const [plainText, setPlainText] = useState('');
    const [rounds, setRounds] = useState(10);
    const [hashResult, setHashResult] = useState('');
    const [isHashing, setIsHashing] = useState(false);
    const [copied, setCopied] = useState(false);

    // Checker State
    const [checkHash, setCheckHash] = useState('');
    const [checkString, setCheckString] = useState('');
    const [isMatch, setIsMatch] = useState<boolean | null>(null);

    const generateHash = () => {
        if (!plainText) return;
        setIsHashing(true);

        // Use timeout to allow UI to show loader before blocking main thread
        setTimeout(() => {
            try {
                const salt = bcrypt.genSaltSync(rounds);
                const hash = bcrypt.hashSync(plainText, salt);
                setHashResult(hash);
            } catch (e) {
                setHashResult('Error generating hash');
            }
            setIsHashing(false);
        }, 10);
    };

    const copyToClipboard = () => {
        if (!hashResult) return;
        navigator.clipboard.writeText(hashResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if (checkHash && checkString) {
            try {
                const match = bcrypt.compareSync(checkString, checkHash);
                setIsMatch(match);
            } catch (e) {
                setIsMatch(false);
            }
        } else {
            setIsMatch(null);
        }
    }, [checkHash, checkString]);

    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>Bcrypt <span className={styles.accent}>Generator</span></h1>
                        <p className={styles.subtitle}>Generate hashes and verify passwords securely directly in your browser.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className={styles.grid}>

                        {/* Generate Card */}
                        <Card className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrap} style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                                    <Asterisk size={24} />
                                </div>
                                <h3>Generate Hash</h3>
                            </div>

                            <div className={styles.formGroup}>
                                <label>String to Hash</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Enter password or string..."
                                    value={plainText}
                                    onChange={(e) => setPlainText(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Salt Rounds: {rounds}</label>
                                <input
                                    type="range"
                                    min="4"
                                    max="14"
                                    value={rounds}
                                    onChange={(e) => setRounds(parseInt(e.target.value))}
                                    className={styles.range}
                                />
                                <span className={styles.helperText}>Higher rounds = more secure but slower. 10 is standard.</span>
                            </div>

                            <Button
                                onClick={generateHash}
                                className={styles.actionBtn}
                                disabled={isHashing || !plainText}
                                style={{ background: '#f59e0b' }}
                            >
                                {isHashing ? <Loader2 className="animate-spin" /> : 'Generate Bcrypt Hash'}
                            </Button>

                            {hashResult && (
                                <div className={styles.resultBox}>
                                    <div className={styles.resultText}>{hashResult}</div>
                                    <button className={styles.copyBtn} onClick={copyToClipboard} title="Copy Hash">
                                        {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            )}
                        </Card>

                        {/* Check Card */}
                        <Card className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrap} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3>Check Hash Match</h3>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Hash to Check against</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g. $2a$10$..."
                                    value={checkHash}
                                    onChange={(e) => setCheckHash(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>String to Test</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Enter password..."
                                    value={checkString}
                                    onChange={(e) => setCheckString(e.target.value)}
                                />
                            </div>

                            <div className={styles.checkerResult}>
                                {isMatch === null ? (
                                    <div className={styles.neutralState}>Enter hash and string to verify match.</div>
                                ) : isMatch ? (
                                    <div className={styles.successState}>
                                        <CheckCircle2 size={24} />
                                        <span>Match! The string validates against the hash.</span>
                                    </div>
                                ) : (
                                    <div className={styles.errorState}>
                                        <XCircle size={24} />
                                        <span>No Match. The string does not equal the hashed value.</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                    </div>
                </section>

                <SEOSection
                    title="Bcrypt Password Hash Generator & Checker"
                    description="A vital utility for backend developers to quickly generate and verify Bcrypt password hashes without setting up a server or compromising plaintext passwords. Select custom salt rounds securely online."
                    howToUse={[
                        "To generate: Enter your plaintext string and select the cost factor (salt rounds), then click Generate.",
                        "To test: Paste a known Bcrypt hash (e.g. $2a$10$...) and type the suspected string. Verification is instant.",
                        "The check automatically extracts the embedded salt and verifies if the inputted text matches the algorithmic output.",
                        "Easily copy the generated hash output to seed your database or integration tests."
                    ]}
                    benefits={[
                        "100% Client-Side Processing keeps passwords safe from man-in-the-middle attacks.",
                        "Visual verification lets you instantly know if a hash matches.",
                        "Adjustable rounds (cost factors) let you simulate different security setups and compute times."
                    ]}
                />

                <section className="container section" style={{ padding: '2rem 0 6rem' }}>
                    <Card style={{ padding: '3rem', background: 'var(--bg-secondary)', border: 'none' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>What is the Bcrypt Algorithm?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            <strong>Bcrypt</strong> is a highly secure, industry-standard password hashing function based on the Blowfish cipher. Unlike fast algorithms like MD5 or SHA-256, Bcrypt is intentionally slow and computationally expensive. Using a <strong>Bcrypt password hash generator</strong> allows developers to natively apply a randomized "salt" (a random string appended to the password before hashing) to defend effectively against rainbow table and brute-force attacks.
                        </p>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Why adjust the Salt Rounds (Cost Factor)?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Bcrypt allows developers to define "work factors" or salt rounds (typically 10 to 12). As hardware gets faster, you can increase this number to ensure the hashing timeframe remains slow enough to deter attackers while fast enough for legitimate users logging in. Our <strong>verify bcrypt hash online</strong> tool allows you to simulate hashes from 4 rounds up to 14 rounds seamlessly, operating entirely via client-side WebAssembly and JS logic for absolute security.
                        </p>
                    </Card>
                </section>
            </div>
            <Footer />
        </>
    );
}
