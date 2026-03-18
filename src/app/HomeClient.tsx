'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, TrendingUp, HomeIcon, Landmark, PiggyBank, Briefcase, Percent, CreditCard, Banknote, Car, Wallet, Calculator } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

const TOOLS = [
  {
    title: 'Compound Interest',
    desc: 'Calculate how your money grows over time with interest compounding.',
    icon: TrendingUp,
    href: '/compound-interest',
    color: '#3b82f6'
  },
  {
    title: 'Mortgage Calc',
    desc: 'Estimate your monthly mortgage payments and total interest.',
    icon: HomeIcon,
    href: '/mortgage-calculator',
    color: '#8b5cf6'
  },
  {
    title: 'ROI Calculator',
    desc: 'Measure the profitability of an investment quickly.',
    icon: Briefcase,
    href: '/roi-calculator',
    color: '#10b981'
  },
  {
    title: 'SIP Calculator',
    desc: 'Wealth generation through systematic monthly investments.',
    icon: Percent,
    href: '/sip-calculator',
    color: '#2563eb'
  },
  {
    title: 'GST/Tax Calc',
    desc: 'Calculate tax amounts and total costs in seconds.',
    icon: CreditCard,
    href: '/gst-calculator',
    color: '#374151'
  },
  {
    title: 'Fixed Deposit',
    desc: 'Guaranteed returns on your lump sum bank deposits.',
    icon: Banknote,
    href: '/fd-calculator',
    color: '#0369a1'
  },
  {
    title: 'Savings Goal',
    desc: 'Find out how much you need to save each month to hit your target.',
    icon: PiggyBank,
    href: '/savings-goal',
    color: '#f59e0b'
  },
  {
    title: 'Inflation Calc',
    desc: 'See how inflation affects the purchasing power of your money.',
    icon: Landmark,
    href: '/inflation-calculator',
    color: '#ef4444'
  },
  {
    title: 'Car Loan EMI',
    desc: 'Calculate monthly installments for your dream vehicle.',
    icon: Car,
    href: '/car-loan',
    color: '#06b6d4'
  },
  {
    title: 'Income Tax',
    desc: 'Professional Old vs New regime tax comparison & planning.',
    icon: Wallet,
    href: '/income-tax',
    color: '#6366f1'
  }
];

export default function HomeClient() {
  const [search, setSearch] = useState('');

  const filteredTools = TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredTools]);

  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>Trust by 10k+ Monthly Users</div>
            <h1 className={styles.title}>Precision Finance Tools for <span className={styles.accent}>Everyone</span></h1>
            <p className={styles.subtitle}>Stop guessing your financial future. Use our professional-grade calculators for tax planning, investments, and loans. Accurate, minimal, and 100% free.</p>
            
            <div className={styles.heroActions}>
              <div className={styles.searchBox}>
                <Input
                  placeholder="Search for a tool (e.g. Mortgage)"
                  prefix={<Search size={18} />}
                  className={styles.search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.heroHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}><Percent size={16} /></span>
                <span>Latest 2026 Tax Rules</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}><Landmark size={16} /></span>
                <span>Bank-Grade Precision</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightIcon}><TrendingUp size={16} /></span>
                <span>Real-time Projections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.gridSection} ${styles.reveal}`} id="tools">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Financial Suite</h2>
            <p className={styles.sectionDesc}>Choose from our range of precision-engineered calculators.</p>
          </div>
          <div className={styles.grid}>
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link key={tool.title} href={tool.href} className={styles.cardLink}>
                  <Card hoverable className={styles.toolCard}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                      <tool.icon size={24} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.toolTitle}>{tool.title}</h3>
                      <p className={styles.toolDesc}>{tool.desc}</p>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No calculators found matching "{search}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.howItWorks} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>3 Simple Steps</h2>
            <p className={styles.sectionDesc}>Get accurate financial results in seconds with our optimized interface.</p>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h4>Select a Tool</h4>
              <p>Browse our extensive collection of tax, investment, and loan calculators.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h4>Input Data</h4>
              <p>Enter your financial details. Our tools handle the heavy math for you.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h4>Get Insights</h4>
              <p>Review detailed breakdowns, future projections, and downloadable reports.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.whyUs} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyInfo}>
              <div className={styles.tag}>Why Choose Us</div>
              <h2 className={styles.sectionTitle}>The Most Accurate Tools on the Web</h2>
              <p className={styles.sectionDesc}>We don't just build calculators; we build financial clarity. Our engines are updated daily to reflect the latest global market conditions and tax slabs.</p>
              
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><TrendingUp size={16} /></div>
                  <div>
                    <h5>Always Updated</h5>
                    <p>Reflecting 2024-2026 tax regimes and bank interest rates.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><Search size={16} /></div>
                  <div>
                    <h5>No Data Storage</h5>
                    <p>Your financial information stays in your browser. Total privacy.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><CreditCard size={16} /></div>
                  <div>
                    <h5>Ad-Free Experience</h5>
                    <p>Clean, focused interface without intrusive popups or clutter.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.whyVisual}>
              <div className={styles.visualCard}>
                <div className={styles.visualHeader}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
                <div className={styles.visualContent}>
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '80%' }} />
                  <div className={styles.skeletonLine} style={{ width: '40%' }} />
                  <div className={styles.visualChart}>
                    <div className={styles.bar} style={{ height: '40%' }} />
                    <div className={styles.bar} style={{ height: '70%' }} />
                    <div className={styles.bar} style={{ height: '90%' }} />
                    <div className={styles.bar} style={{ height: '60%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.faq} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDesc}>Everything you need to know about our calculators.</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h5>Are these calculators free to use?</h5>
              <p>Yes, 100% free. No registration or hidden fees required for any of our tools.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>How accurate are the tax calculations?</h5>
              <p>Our engines use the latest official government slabs for 2024-2026 for India, USA, and UK.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>Is my data safe?</h5>
              <p>Your data never leaves your device. All calculations happen locally in your browser memory.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>Can I download the results?</h5>
              <p>Yes, every tool comes with a "Download Report" function that generates a clean PDF-ready view.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <Calculator className={styles.icon} />
                <span>Sociials / FinanceCalc</span>
              </div>
              <p>Democratizing financial literacy with precision tools. Built for speed, privacy, and accuracy.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.linkGroup}>
                <h6>Tools</h6>
                <Link href="/income-tax">Income Tax</Link>
                <Link href="/sip-calculator">SIP Calc</Link>
                <Link href="/mortgage-calculator">Mortgage</Link>
              </div>
              <div className={styles.linkGroup}>
                <h6>Company</h6>
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
              </div>
              <div className={styles.linkGroup}>
                <h6>Legal</h6>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Sociials / FinanceCalc. Empowering your financial future.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
