'use client';

import React from 'react';

import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import styles from '@/app/SecondaryPage.module.css';

export default function TermsClient() {
  return (
    <div className={styles.wrapper}>

      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>Legal guidelines for using the Toolioz suite.</p>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className="container">
          <Card className={styles.card}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Toolioz, you agree to be bound by these terms and all applicable laws and regulations.
              The tools are provided for your convenience, and use indicates acceptance of our privacy-first, zero-server architecture.
            </p>

            <h2>2. Use License</h2>
            <p>
              Our tools are for personal, professional, and informational use. The results provided are estimates. 
              We do not guarantee the 100% accuracy of calculations as tax laws, data standards, and financial regulations are subject to frequent changes.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The tools on this site are provided "as is". Toolioz makes no warranties, expressed or implied. 
              Strategic decisions (financial, technical, or otherwise) should not be made solely based on the results of these tools. 
              Always consult with a professional advisor when necessary.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall Toolioz be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the tools on this website. All processing happens on your device; we do not store your data.
            </p>

            <h2>5. Service Modifications</h2>
            <p>
              Toolioz may revise these terms of service for its website at any time without notice. 
              By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <p className={styles.lastUpdated}>
              Last Updated: April 2026
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
