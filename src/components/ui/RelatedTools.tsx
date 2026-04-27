'use client';

import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { ChevronRight } from 'lucide-react';

interface RelatedToolsProps {
  currentToolId: string;
  categoryId: string;
  limit?: number;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  currentToolId,
  categoryId,
  limit = 3,
}) => {
  const related = TOOLS
    .filter((tool) => tool.category === categoryId && tool.id !== currentToolId)
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-[var(--border)] pt-12 sm:mt-24 sm:pt-16">
      <h3 className="mb-8 text-center text-2xl font-extrabold text-[var(--text-primary)]">
        Continue Your Workflow
      </h3>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex items-center gap-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-6 text-inherit transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)]"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-secondary)]"
              style={{ color: tool.color }}
            >
              <tool.icon size={24} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-base font-bold text-[var(--text-primary)]">{tool.title}</h4>
              <p className="line-clamp-2 text-[0.8125rem] leading-6 text-[var(--text-secondary)]">
                {tool.desc}
              </p>
            </div>
            <ChevronRight
              className="translate-x-[-10px] text-[var(--text-tertiary)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[var(--primary)] group-hover:opacity-100"
              size={18}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
