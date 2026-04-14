'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Heart, Instagram, Twitter, Github, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.brandBox}>
            <Link href="/" className={styles.logo}>
              Toolioz
            </Link>
            <p className={styles.tagline}>
              Empowering your digital life with precision-engineered tools. 
              Always free, always private, always browser-local.
            </p>
            <div className={styles.socials}>
              <Link href="#" className={styles.socialLink}><Instagram size={20} /></Link>
              <Link href="#" className={styles.socialLink}><Twitter size={20} /></Link>
              <Link href="#" className={styles.socialLink}><Mail size={20} /></Link>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h4>Tools Hub</h4>
            <Link href="/finance">Finance Calculators</Link>
            <Link href="/devtools">Developer Tools</Link>
            <Link href="/pdftools">PDF Utilities</Link>
            <Link href="/finance/sip-calculator">SIP Calculator</Link>
          </div>

          <div className={styles.linksColumn}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact Support</Link>
          </div>

          <div className={styles.trustColumn}>
            <div className={styles.trustCard}>
              <ShieldCheck className={styles.trustIcon} />
              <h5>Privacy First</h5>
              <p>We use zero-server processing. Your data never leaves your machine.</p>
            </div>
            <div className={styles.trustCard}>
              <Zap className={styles.trustIcon} />
              <h5>Fast & Free</h5>
              <p>Professional grade tools with no ads and no credit cards required.</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Toolioz. Built with <Heart size={14} className={styles.heartIcon} /> for a smarter web.
          </p>
          <div className={styles.bottomLinks}>
            <span>Version 2.0.4</span>
            <div className={styles.dot} />
            <span>Serverless Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
