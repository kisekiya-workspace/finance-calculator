'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import styles from '../compound-interest/page.module.css';

export default function PrivacyClient() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.subtitle}>How we handle your data at Sociials / FinanceCalc.</p>
          </div>
        </header>

        <section className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Card style={{ padding: '2.5rem', lineHeight: '1.8', fontSize: '0.925rem' }}>
            <h2>1. Data Collection</h2>
            <p>
              We believe in "Privacy by Design." Sociials / FinanceCalc does not require any registration or personal identifiable information (PII) 
              to use our calculators. All financial data you enter into our tools is processed locally or in memory and is **never** stored on our servers.
            </p>

            <h2 style={{ marginTop: '1.5rem' }}>2. Cookies and Tracking</h2>
            <p>
              We use standard cookies to improve your user experience and for service-side analytics. 
              We may utilize third-party services like Google AdSense and Google Analytics, which use cookies to serve ads based on your visit to this and other sites on the Internet.
            </p>

            <h2 style={{ marginTop: '1.5rem' }}>3. AdSense Policy</h2>
            <p>
              Google uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet. 
              Users may opt out of personalized advertising by visiting Ads Settings.
            </p>

            <h2 style={{ marginTop: '1.5rem' }}>4. Third-Party Links</h2>
            <p>
              Our site may contain links to external sites. We are not responsible for the privacy practices or the content of such sites.
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
