'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import styles from '../compound-interest/page.module.css';

export default function AboutClient() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>About Sociials / FinanceCalc </h1>
            <p className={styles.subtitle}>Our mission is to democratize financial literacy through precision tools.</p>
          </div>
        </header>

        <section className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Card style={{ padding: '2.5rem', lineHeight: '1.8' }}>
            <p>
              Welcome to <strong>Sociials / FinanceCalc</strong>, your premier destination for highly accurate, modern, and minimal financial calculation tools.
              In an increasingly complex economic landscape, we believe that everyone deserves access to the same precision logic used by professionals.
            </p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Why We Exist</h2>
            <p>
              Most online calculators are outdated, cluttered with ads, or use simplified formulas that don't account for real-world nuances.
              FinanceCalc was built to change that. We combine beautiful, responsive design with a robust tax and math engine that accounts for
              global regulations, including the latest 2026 tax budget changes for India, USA, and the UK.
            </p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: '700' }}>Our Engineering</h2>
            <p>
              Every tool on this platform is engineered with precision. From our <strong>Compound Interest</strong> engine that handles
              various frequencies to our <strong>Income Tax</strong> module that navigates complex global slabs, we prioritize accuracy above all else.
            </p>
            <p style={{ marginTop: '2rem' }}>
              Sociials / FinanceCalc is a part of the Sociials ecosystem, dedicated to building tools that empower users to make informed life decisions.
            </p>
          </Card>
        </section>
      </div>
    </>
  );
}
