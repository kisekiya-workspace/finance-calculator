import React from 'react';
import { CheckCircle2, ArrowRightCircle, Calculator } from 'lucide-react';

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
    <section className="border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-black tracking-tight text-[var(--text-primary)] md:text-4xl">
              About {title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">
              {description}
            </p>
          </div>
          
          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            {/* How to Use Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ArrowRightCircle size={22} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">How to Use</h3>
              </div>
              <ul className="space-y-4">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Benefits Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Key Benefits</h3>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {formula && (
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="border-b border-[var(--border)] bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <Calculator className="text-[var(--primary)]" size={20} />
                  <h3 className="font-bold text-[var(--text-primary)]">Mathematical Formula</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <code className="block whitespace-pre-wrap rounded-xl bg-white px-6 py-5 font-mono text-[1.1rem] font-medium leading-relaxed text-[var(--primary)] shadow-sm">
                  {formula}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
