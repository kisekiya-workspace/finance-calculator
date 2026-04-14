'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MessageCircle } from 'lucide-react';
import styles from '@/app/SecondaryPage.module.css';

export default function ContactClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>We'd love to hear your feedback or suggestions for new tools.</p>
          </div>
        </header>

        <section className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <Card style={{ padding: '2rem' }}>
               <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Get in Touch</h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Mail style={{ color: 'var(--primary)' }} />
                    <span>support@toolioz.online</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MessageCircle style={{ color: 'var(--primary)' }} />
                    <span>@TooliozCorp (Twitter)</span>
                 </div>
               </div>
            </Card>

            <Card style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Quick Message</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input label="Your Name" placeholder="John Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" />
                <textarea 
                  placeholder="How can we help you?" 
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border)',
                    minHeight: '120px',
                    fontFamily: 'inherit'
                  }} 
                />
                <Button fullWidth>Send Message</Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
