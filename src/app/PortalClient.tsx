'use client';

import React, { useState, useEffect } from 'react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, TrendingUp, ArrowRight, LayoutGrid, Zap, ShieldCheck, PieChart, Info, Percent, Landmark } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import styles from './page.module.css';

export default function PortalClient() {
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [mounted]);

  const filteredTools = TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  const trendingTools = TOOLS.filter(t => t.isTrending);

  if (!mounted) return null;

  return (
    <div className={styles.portalWrapper}>

      
      {/* Immersive Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`${styles.badge} ${styles.animateFadeIn}`}>All-in-One Utility Hub</div>
            <h1 className={styles.title}>
              Smart Tools for <br/>
              <span className={styles.accent}>Advanced Decision Making</span>
            </h1>
            <p className={styles.subtitle}>
              From complex tax projections to developer utilities and PDF magic. 
              We've built professional-grade tools that run entirely in your browser. 
              Always accurate, always private.
            </p>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Input
                  placeholder="Find a tool (e.g. SIP, JSON, PDF...)"
                  prefix={<Search size={22} className={styles.searchIcon} />}
                  className={styles.search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <strong>20+</strong>
                <span>Pro Tools</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <strong>100%</strong>
                <span>Client Side</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <strong>FREE</strong>
                <span>Forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`${styles.categoriesSection} section ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionDesc}>Specialized toolkits for every professional need.</p>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/${cat.id}`} className={styles.categoryCardLink}>
                <Card className={styles.categoryCard} hoverable>
                  <div className={styles.catIcon} style={{ color: cat.color }}>
                    <cat.icon size={32} />
                  </div>
                  <h3 className={styles.catName}>{cat.title}</h3>
                  <p className={styles.catDesc}>{cat.desc}</p>
                  <div className={styles.catArrow}>
                    <ArrowRight size={18} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending & Search Results */}
      <section className={`${styles.gridSection} section ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {search ? `Search Results for "${search}"` : 'Most Popular Tools'}
            </h2>
          </div>
          <div className={styles.toolGrid}>
            {(search ? filteredTools : trendingTools).map((tool) => (
              <Link key={tool.id} href={tool.href} className={styles.toolCardLink}>
                <Card hoverable className={styles.toolCard}>
                  <div className={styles.toolIcon} style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                    <tool.icon size={24} />
                  </div>
                  <div className={styles.toolInfo}>
                    <h3 className={styles.toolName}>{tool.title}</h3>
                    <p className={styles.toolDesc}>{tool.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Re-integrated: How It Works */}
      <section className={`${styles.howItWorks} section ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>3 Simple Steps</h2>
            <p className={styles.sectionDesc}>Professional results in seconds with our optimized interface.</p>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h4>Pick a Category</h4>
              <p>Navigate to Finance, Dev, or PDF hubs based on your task.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h4>Input Your Data</h4>
              <p>Enter details. Everything stays in your browser for 100% privacy.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h4>Instant Accuracy</h4>
              <p>Get precision results and download professional reports immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Re-integrated: Why Choose Us (Visual Card) */}
      <section className={`${styles.whyUs} section ${styles.reveal}`}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyInfo}>
              <div className={styles.tag}>Why Toolioz</div>
              <h2 className={styles.sectionTitle}>The Most Accurate Tools on the Web</h2>
              <p className={styles.sectionDesc}>We don't just build calculators; we build clarity. Our tools are updated daily to reflect the latest global market conditions and technical standards.</p>
              
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><Zap size={16} /></div>
                  <div>
                    <h5>Instant & Private</h5>
                    <p>No account required. Calculations happen on your machine.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><ShieldCheck size={16} /></div>
                  <div>
                    <h5>Professional Grade</h5>
                    <p>Reflecting the latest 2026 standards and precision math.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureTick}><LayoutGrid size={16} /></div>
                  <div>
                    <h5>Minimalist Design</h5>
                    <p>Clean, ad-free interface focused on your workflow.</p>
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
                  <div className={styles.visualSkeleton} style={{ width: '60%' }} />
                  <div className={styles.visualSkeleton} style={{ width: '85%' }} />
                  <div className={styles.visualSkeleton} style={{ width: '45%' }} />
                  <div className={styles.visualChart}>
                    <div className={styles.bar} style={{ height: '45%' }} />
                    <div className={styles.bar} style={{ height: '75%' }} />
                    <div className={styles.bar} style={{ height: '95%' }} />
                    <div className={styles.bar} style={{ height: '65%' }} />
                  </div>
                </div>
                <div className={styles.visualBadge}>
                  <TrendingUp size={16} />
                  <span>Real-time Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`${styles.faq} section ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Common Questions</h2>
            <p className={styles.sectionDesc}>Everything you need to know about our toolbox.</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h5>Are these tools truly free?</h5>
              <p>Yes, 100%. No hidden trials, no registration, and no credit card required.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>Is my data secure?</h5>
              <p>Absolutely. We follow a "zero-server" approach. Calculations run locally in your browser.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>Who builds these tools?</h5>
              <p>Our team of finance experts and developers ensured every formula meets industry standards.</p>
            </div>
            <div className={styles.faqItem}>
              <h5>Can I request a new tool?</h5>
              <p>We're always expanding! Use the contact page to drop us your suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
