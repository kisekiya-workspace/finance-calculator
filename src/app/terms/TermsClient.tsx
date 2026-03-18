'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import styles from '../compound-interest/page.module.css';

export default function TermsClient() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.subtitle}>Legal guidelines for using Sociials / FinanceCalc.</p>
          </div>
        </header>

        <section className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Card style={{ padding: '2.5rem', lineHeight: '1.8', fontSize: '0.925rem' }}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Sociials / FinanceCalc, you agree to be bound by these terms and all applicable laws and regulations.</p>

            <h2 style={{ marginTop: '1.5rem' }}>2. Use License</h2>
            <p>
              Our calculators are for personal, informational use only. The results provided are estimates. 
              We do not guarantee the 100% accuracy of calculations as tax laws and financial regulations are subject to frequent changes.
            </p>

            <h2 style={{ marginTop: '1.5rem' }}>3. Disclaimer</h2>
            <p>
              The tools on this site are provided "as is". Sociials makes no warranties, expressed or implied. 
              Financial decisions should not be made solely based on the results of these calculators. 
              Always consult with a professional financial advisor or tax consultant.
            </p>

            <h2 style={{ marginTop: '1.5rem' }}>4. Limitations</h2>
            <p>
              In no event shall Sociials be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the tools on this website.
            </p>

            <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
              Last Updated: March 2026
            </p>
          </Card>
        </section>
      </div>
    </>
  );
}
