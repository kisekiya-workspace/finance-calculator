'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto flex max-w-4xl flex-col gap-2">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={[
                  'overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] transition-colors duration-200',
                  openIndex === i ? 'border-[var(--primary)]' : 'hover:border-[var(--primary)]',
                ].join(' ')}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 bg-[var(--bg-secondary)] px-5 py-4 text-left text-[0.95rem] font-semibold leading-6 text-[var(--text-primary)] sm:px-6"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={[
                      'shrink-0 text-[var(--text-secondary)] transition-transform duration-200',
                      openIndex === i ? 'rotate-180' : '',
                    ].join(' ')}
                  />
                </button>
                <div
                  className={[
                    'overflow-hidden px-5 transition-all duration-300 sm:px-6',
                    openIndex === i ? 'max-h-96 pb-6' : 'max-h-0 pb-0',
                  ].join(' ')}
                >
                  <p className="text-[0.9rem] leading-7 text-[var(--text-secondary)]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
