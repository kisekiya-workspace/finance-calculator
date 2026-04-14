'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Code, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import styles from './DevToolsClient.module.css';

export default function DevToolsClient() {
  const [search, setSearch] = useState('');

  const devTools = TOOLS.filter(t => t.category === 'devtools');
  const filteredTools = devTools.filter(tool => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.categoryWrapper}>
      
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>Dev Productivity Suite</div>
            <h1 className={styles.title}>Essential <span className={styles.accent}>Developer</span> Utilities</h1>
            <p className={styles.subtitle}>
              Accelerate your workflow with precision tools for data formatting, 
              validation, and transformation. Built for developers who value privacy and speed.
            </p>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Input
                  placeholder="Search for a dev tool (e.g. JSON, Base64, SQL)"
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
                <span>100% Client-Side</span>
              </div>
              <div className={styles.trustItem}>
                <Zap size={18} />
                <span>Instant Feedback</span>
              </div>
              <div className={styles.trustItem}>
                <Terminal size={18} />
                <span>Developer-First UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.gridSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {search ? `Search Results for "${search}"` : 'Development Toolkit'}
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
                    <div className={styles.trendingBadge}>New</div>
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
