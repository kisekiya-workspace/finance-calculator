'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, FileText, ShieldCheck, Zap, Lock } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import styles from './PDFToolsClient.module.css';

export default function PDFToolsClient() {
  const [search, setSearch] = useState('');

  const pdfTools = TOOLS.filter(t => t.category === 'pdftools');
  const filteredTools = pdfTools.filter(tool => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.categoryWrapper}>
      
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>PDF Management Suite</div>
            <h1 className={styles.title}>Professional <span className={styles.accent}>PDF</span> Utilities</h1>
            <p className={styles.subtitle}>
              Powerful browser-based PDF tools for merging, splitting, and optimizing 
              your documents. Secure encryption, instant results, 100% private.
            </p>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Input
                  placeholder="Search for a PDF tool (e.g. Merge, Split, Compress)"
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
                <span>Zero Uploads</span>
              </div>
              <div className={styles.trustItem}>
                <Zap size={18} />
                <span>Fast Processing</span>
              </div>
              <div className={styles.trustItem}>
                <Lock size={18} />
                <span>End-to-End Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.gridSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {search ? `Search Results for "${search}"` : 'PDF Toolbox'}
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
                    <div className={styles.trendingBadge}>Popular</div>
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
