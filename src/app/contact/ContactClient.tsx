'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Mail } from 'lucide-react';
import { secondaryPageStyles as styles } from '@/app/SecondaryPage.styles';

export default function ContactClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="mx-auto max-w-6xl px-6">
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>We&apos;d love to hear your feedback or suggestions for new tools.</p>
          </div>
        </header>

        <section className="mx-auto flex max-w-[600px] flex-col gap-8 px-6 pb-16">
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <Mail size={32} />
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Reach Out to Us</h2>
            <p className="mb-8 text-[var(--text-secondary)]">
              If you have any questions, feedback, or suggestions for new tools, feel free to send us an email. We typically respond within 24 hours.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-[var(--bg-secondary)] px-6 py-3 font-medium text-[var(--text-primary)] border border-[var(--border)]">
              <Mail className="text-[var(--primary)]" size={20} />
              <span>asksociials@gmail.com</span>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
