import React from 'react';

interface SEOSectionProps {
  title: string;
  description: string;
  howToUse: string[];
  formula?: string;
  benefits: string[];
}

export const SEOSection: React.FC<SEOSectionProps> = ({
  title,
  description,
  howToUse,
  formula,
  benefits
}) => {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-primary)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">About {title}</h2>
          <p className="mb-10 text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
          
          <div className="mb-10 grid gap-8 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">How to Use</h3>
              <ul className="space-y-3">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-2 text-[0.9375rem] text-[var(--text-secondary)]">
                    <span className="font-bold text-[var(--primary)]">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2 text-[0.9375rem] text-[var(--text-secondary)]">
                    <span className="font-bold text-[var(--primary)]">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {formula && (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">Mathematical Formula</h3>
              <code className="mt-4 block rounded-[var(--radius-md)] bg-white p-4 font-mono text-lg text-[var(--primary)]">
                {formula}
              </code>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
