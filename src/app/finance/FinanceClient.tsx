'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, TrendingUp, Landmark, ShieldCheck, Zap } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import styles from './FinanceClient.module.css';

export default function FinanceClient() {
  const [search, setSearch] = useState('');

  const financeTools = TOOLS.filter(t => t.category === 'finance');
  const filteredTools = financeTools.filter(tool => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.categoryWrapper}>
      
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>Finance Suite v2026</div>
            <h1 className={styles.title}>Precision <span className={styles.accent}>Financial</span> Intelligence</h1>
            <p className={styles.subtitle}>
              Take full control of your wealth with our bank-grade mathematical engines. 
              Always updated for the latest 2024-2026 tax regimes for India, USA, and UK.
            </p>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Input
                  placeholder="Search for a finance tool (e.g. SIP, Tax, ROI)"
                  prefix={<Search size={22} className={styles.searchIcon} />}
                  className={styles.search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.heroTrust}>
              <div className={styles.trustItem}>
                <ShieldCheck size={18} />
                <span>Verified Formulas</span>
              </div>
              <div className={styles.trustItem}>
                <Zap size={18} />
                <span>Lump sum & SIP support</span>
              </div>
              <div className={styles.trustItem}>
                <Landmark size={18} />
                <span>Inflation Adjusted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.gridSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {search ? `Search Results for "${search}"` : 'All Financial Calculators'}
            </h2>
          </div>
          <div className={styles.grid}>
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className={styles.cardLink}>
                <Card hoverable className={styles.toolCard}>
                  <div className={styles.iconWrapper} style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                    <tool.icon size={28} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.toolTitle}>{tool.title}</h3>
                    <p className={styles.toolDesc}>{tool.desc}</p>
                  </div>
                  {tool.isTrending && (
                    <div className={styles.trendingBadge}>Trending</div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
