'use client';

import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { ChevronRight } from 'lucide-react';
import styles from './RelatedTools.module.css';

interface RelatedToolsProps {
  currentToolId: string;
  categoryId: string;
  limit?: number;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ 
  currentToolId, 
  categoryId,
  limit = 3 
}) => {
  const related = TOOLS
    .filter(tool => tool.category === categoryId && tool.id !== currentToolId)
    .sort(() => 0.5 - Math.random()) // Randomize for varied internal linkage
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Continue Your Workflow</h3>
      <div className={styles.grid}>
        {related.map((tool) => (
          <Link key={tool.id} href={tool.href} className={styles.card}>
            <div className={styles.iconWrapper} style={{ color: tool.color }}>
              <tool.icon size={24} />
            </div>
            <div className={styles.content}>
              <h4 className={styles.toolName}>{tool.title}</h4>
              <p className={styles.toolDesc}>{tool.desc}</p>
            </div>
            <ChevronRight className={styles.arrow} size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
};
