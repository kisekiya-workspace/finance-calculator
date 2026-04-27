'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MessageCircle } from 'lucide-react';
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

        <section className="mx-auto grid max-w-[800px] gap-8 px-6 pb-16 md:grid-cols-2">
          <Card className="p-8">
            <h2 className="mb-4 text-xl font-bold">Get in Touch</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Mail className="text-[var(--primary)]" />
                <span>support@toolioz.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MessageCircle className="text-[var(--primary)]" />
                <span>@TooliozCorp (Twitter)</span>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="mb-4 text-xl font-bold">Quick Message</h2>
            <div className="flex flex-col gap-4">
              <Input label="Your Name" placeholder="John Doe" />
              <Input label="Email" type="email" placeholder="john@example.com" />
              <textarea
                placeholder="How can we help you?"
                className="min-h-[120px] w-full rounded-[var(--radius-md)] border border-[var(--border)] p-4 outline-none transition-all duration-200 focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
              />
              <Button fullWidth>Send Message</Button>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
