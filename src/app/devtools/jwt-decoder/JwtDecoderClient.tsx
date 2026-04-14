'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';
import { Key, AlertCircle, ShieldCheck } from 'lucide-react';

// Help functions
function base64UrlToBase64(str: string) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }
    return base64;
}

async function verifyHS256(token: string, secret: string): Promise<boolean> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const data = parts[0] + '.' + parts[1];
        const signatureBase64Url = parts[2];
        const signatureBase64 = base64UrlToBase64(signatureBase64Url);
        const signatureBytes = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));

        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        return await crypto.subtle.verify(
            'HMAC',
            key,
            signatureBytes,
            encoder.encode(data)
        );
    } catch {
        return false;
    }
}

export default function JwtDecoderClient() {
    const [token, setToken] = useState<string>('');
    const [secret, setSecret] = useState<string>('');

    // Parsed Data
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Verification Status
    const [sigStatus, setSigStatus] = useState<'neutral' | 'verified' | 'invalid'>('neutral');

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setError(null);
            setSigStatus('neutral');
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. Must contain 3 parts separated by dots.');
            }

            const decodedHeader = JSON.parse(atob(base64UrlToBase64(parts[0])));
            const decodedPayload = JSON.parse(atob(base64UrlToBase64(parts[1])));

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError(null);

            // Trigger signature check if secret is provided and algorithm is HS256
            if (decodedHeader.alg === 'HS256') {
                if (secret) {
                    verifyHS256(token, secret).then(isValid => {
                        setSigStatus(isValid ? 'verified' : 'invalid');
                    });
                } else {
                    setSigStatus('neutral');
                }
            } else if (secret) {
                // Not HS256 but secret provided
                setSigStatus('invalid');
            } else {
                setSigStatus('neutral');
            }

        } catch (e: any) {
            setHeader(null);
            setPayload(null);
            setError(e.message || 'Invalid token structure');
            setSigStatus('invalid');
        }
    }, [token, secret]);

    // Parse absolute times
    const renderTimePills = () => {
        if (!payload) return null;

        const now = Math.floor(Date.now() / 1000);
        let expNode = null;
        let iatNode = null;

        if (payload.exp) {
            const isExpired = payload.exp < now;
            const expDate = new Date(payload.exp * 1000).toLocaleString();
            expNode = (
                <div className={`${styles.timePill} ${isExpired ? styles.pillExpired : styles.pillActive}`}>
                    <span>Expiration (exp)</span>
                    <span>{expDate} {isExpired ? '(Expired)' : '(Valid)'}</span>
                </div>
            );
        }

        if (payload.iat) {
            const iatDate = new Date(payload.iat * 1000).toLocaleString();
            iatNode = (
                <div className={styles.timePill}>
                    <span>Issued At (iat)</span>
                    <span>{iatDate}</span>
                </div>
            );
        }

        if (payload.nbf) {
            const nbfDate = new Date(payload.nbf * 1000).toLocaleString();
            iatNode = (
                <>
                    {iatNode}
                    <div className={styles.timePill}>
                        <span>Not Before (nbf)</span>
                        <span>{nbfDate}</span>
                    </div>
                </>
            );
        }

        if (!expNode && !iatNode) return null;

        return (
            <div className={styles.timePills}>
                {iatNode}
                {expNode}
            </div>
        );
    };

    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>Advanced JWT <span className={styles.accent}>Debugger</span></h1>
                        <p className={styles.subtitle}>Decode tokens, verify HS256 signatures, and inspect payload schemas accurately.</p>
                    </div>
                </header>

                <section className="container section">
                    <div className={styles.grid}>
                        <div className={styles.inputCol}>
                            <Card className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <Key className={styles.icon} />
                                    <h3>Encoded Token</h3>
                                </div>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Paste your JWT here (ey...)"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    spellCheck="false"
                                />

                                {/* Signature Verification Block */}
                                <div className={styles.verifySection}>
                                    <div className={styles.verifyHeader}>
                                        <h4>Verify Signature</h4>
                                        {sigStatus === 'neutral' && <span className={`${styles.badge} ${styles.badgeNeutral}`}>Unverified</span>}
                                        {sigStatus === 'verified' && <span className={`${styles.badge} ${styles.badgeVerified}`}>Signature Verified</span>}
                                        {sigStatus === 'invalid' && <span className={`${styles.badge} ${styles.badgeInvalid}`}>Invalid Signature</span>}
                                    </div>
                                    <input
                                        type="text"
                                        className={styles.secretInput}
                                        placeholder="Secret Key (HMAC / HS256)"
                                        value={secret}
                                        onChange={(e) => setSecret(e.target.value)}
                                    />
                                    {header?.alg && header.alg !== 'HS256' && secret && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#ef4444' }}>
                                            Verification is currently only supported for HS256 algorithms. Token specifies: {header.alg}.
                                        </div>
                                    )}
                                </div>

                                <div className={styles.secureNotice}>
                                    <ShieldCheck size={16} color="#10b981" />
                                    <span>Processed securely in your browser using Web Crypto APIs.</span>
                                </div>
                            </Card>
                        </div>

                        <div className={styles.outputCol}>
                            <Card className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3 style={{ color: '#ec4899' }}>Header <span style={{ opacity: 0.7, fontSize: '0.8rem', fontWeight: 500 }}>ALGORITHM & TTYP</span></h3>
                                </div>
                                {error ? (
                                    <div className={styles.errorBox}>
                                        <AlertCircle size={20} />
                                        <span>{error}</span>
                                    </div>
                                ) : header ? (
                                    <pre className={styles.jsonOutput}>{JSON.stringify(header, null, 2)}</pre>
                                ) : (
                                    <div className={styles.emptyState}>Waiting for token...</div>
                                )}
                            </Card>

                            <Card className={styles.card} style={{ marginTop: '1.5rem' }}>
                                <div className={styles.cardHeader}>
                                    <h3 style={{ color: '#8b5cf6' }}>Payload <span style={{ opacity: 0.7, fontSize: '0.8rem', fontWeight: 500 }}>CLAIMS</span></h3>
                                </div>
                                {payload ? (
                                    <>
                                        <pre className={styles.jsonOutput}>{JSON.stringify(payload, null, 2)}</pre>
                                        {renderTimePills()}
                                    </>
                                ) : (
                                    <div className={styles.emptyState}>Waiting for token...</div>
                                )}
                            </Card>
                        </div>
                    </div>
                </section>

                <SEOSection
                    title="Advanced Online JWT Decoder & Verifier"
                    description="A powerful developer tool to decode, inspect, and mathematically verify JSON Web Tokens (JWT) locally. Parse expiration dates, calculate mathematical signatures via HS256, and ensure your identity tokens are secure."
                    howToUse={[
                        "Paste your JSON Web Token (ey...) string into the left input area.",
                        "If you know the symmetric secret used to sign the token (for HS256), enter it into the Verify block to cryptographically check if the token is valid.",
                        "Inspect the parsed JSON structures on the right side. Any Unix timestamps like 'iat' or 'exp' will be automatically parsed into human-readable local time."
                    ]}
                    benefits={[
                        "Cryptographic Verification: Utilize Web Crypto API to ensure your token signatures haven't been tampered.",
                        "Timestamp Expansion: No more opening secondary timestamp converters; expiration states are visually flagged.",
                        "Absolute Privacy: Handled 100% Client-Side. Your tokens or secrets are never dispatched to our networks."
                    ]}
                />

                <section className="container section" style={{ padding: '2rem 0 6rem' }}>
                    <Card style={{ padding: '3rem', background: 'var(--bg-secondary)', border: 'none' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>What is Signature Verification?</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            A standard <strong>JSON Web Token (JWT)</strong> acts as an identity passport. But without checking the cryptographic stamp—the signature—there is no guarantee the passport hasn't been forged. By implementing a <strong>secure JWT verification tool</strong> inside the browser using `crypto.subtle` APIs, developers can input their `HS256` secret and securely test exactly how their token will be processed on backend servers without installing Postman dependencies.
                        </p>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>JWT Expiration Details</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Understanding token validity periods is crucial. Our debugger strictly identifies standard claims like `exp` (Expiration Time), `nbf` (Not Before), and `iat` (Issued At). It natively transforms these obscure Unix Epoch numeric stamps into your browser's localized timezone, rendering clear indicators if a token has breached its allowed lifespan.
                        </p>
                    </Card>
                </section>
            </div>
            <Footer />
        </>
    );
}
