'use client';

import React, { useState, useEffect } from 'react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, TrendingUp, ArrowRight, LayoutGrid, Zap, ShieldCheck, PieChart, Info, Percent, Landmark, ChevronDown } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { TOOLS, CATEGORIES } from '@/lib/tools';

export default function PortalClient() {
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const filteredTools = TOOLS.filter(tool =>
    tool.title.toLowerCase().includes(search.toLowerCase()) ||
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  const trendingTools = TOOLS.filter(t => t.isTrending);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!mounted) return null;

  const faqs = [
    {
      q: "Are these tools truly free?",
      a: "Yes, 100%. No hidden trials, no registration, and no credit card required."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We follow a \"zero-server\" approach. Calculations run locally in your browser."
    },
    {
      q: "Who builds these tools?",
      a: "Our team of finance experts and developers ensured every formula meets industry standards."
    },
    {
      q: "Can I request a new tool?",
      a: "We're always expanding! Use the contact page to drop us your suggestions."
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)]">


      {/* Clean & Professional Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-16 text-center md:py-24">
        {/* Colorful Gradient Backgrounds */}
        <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[100px] dark:bg-purple-600/10" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-500/20 blur-[100px] dark:bg-emerald-600/10" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/3 rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-600/10" />

        <div className="relative mx-auto max-w-6xl">
          <div className="relative z-10 mx-auto max-w-[900px]">
            <div className="mb-8 inline-flex animate-[fadeIn_1s_ease-out] rounded-full border border-[var(--border-strong)] bg-white/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-primary)] shadow-sm backdrop-blur-md dark:bg-black/30">All-in-One Utility Hub</div>
            <h1 className="mb-8 text-[clamp(2.75rem,8vw,5rem)] font-black leading-none tracking-[-0.03em] text-[var(--text-primary)]">
              Smart Tools for <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400">Advanced Decision Making</span>
            </h1>
            <p className="mx-auto mb-12 max-w-[700px] text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
              From complex tax projections to developer utilities and PDF magic.
              We've built professional-grade tools that run entirely in your browser.
              Always accurate, always private.
            </p>

            <div className="mx-auto mb-12 max-w-[700px]">
              <div className="rounded-[var(--radius-lg)] border-2 border-[var(--border-strong)] bg-white p-2 shadow-sm transition-all duration-200 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]">
                <div className="flex items-center gap-3 px-2">
                  <Search size={24} className="text-[var(--text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Find a tool (e.g. SIP, JSON, PDF...)"
                    className="w-full flex-1 bg-transparent py-3 text-lg text-[var(--text-primary)] outline-none placeholder:text-(--text-tertiary) md:text-xl border-none"

                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 md:gap-12">
              <div className="flex flex-col gap-1">
                <strong>20+</strong>
                <span>Pro Tools</span>
              </div>
              <div className="h-10 w-px bg-[var(--border)]" />
              <div className="flex flex-col gap-1">
                <strong>100%</strong>
                <span>Client Side</span>
              </div>
              <div className="h-10 w-px bg-[var(--border)]" />
              <div className="flex flex-col gap-1">
                <strong>FREE</strong>
                <span>Forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section (if no search) */}
      {!search && (
        <section className="px-6 py-16 md:py-24 border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center md:mb-20">
              <h2 className="mb-6 text-[2.25rem] font-black tracking-[-0.02em] text-[var(--text-primary)] md:text-[3.5rem]">Explore Categories</h2>
              <p className="mx-auto max-w-[700px] text-lg text-[var(--text-secondary)] md:text-xl">
                Choose from our professional suite of utility tools.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 max-md:flex max-md:overflow-x-auto max-md:gap-4 max-md:pr-10 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} href={`#cat-${cat.id}`} className="max-md:min-w-[280px] max-md:snap-center">
                  <div className="group !flex h-full !flex-col !rounded-[var(--radius-lg)] !border !border-[var(--border)] !bg-white !px-10 !py-12 transition-all duration-200 hover:-translate-y-1 hover:!shadow-[var(--shadow-lg)] dark:!bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border)' }}>
                    <div className="mb-10" style={{ color: cat.color }}>
                      <cat.icon size={32} />
                    </div>
                    <h3 className="mb-4 text-[2rem] font-extrabold text-[var(--text-primary)]">{cat.title}</h3>
                    <p className="flex-1 text-lg leading-8 text-[var(--text-secondary)]">{cat.desc}</p>
                    <ArrowRight className="mt-10 transition-transform duration-300 group-hover:translate-x-2" size={24} style={{ color: cat.color }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools Section (or Search Results) */}
      <section className="px-6 py-16 bg-[var(--bg-secondary)] md:py-24 border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl">
          {search ? (
            <div className="mb-12 text-center md:mb-20">
              <h2 className="mb-6 text-[2.25rem] font-black tracking-[-0.02em] text-[var(--text-primary)] md:text-[3.5rem]">Search Results</h2>
              <p className="mx-auto max-w-[700px] text-lg text-[var(--text-secondary)] md:text-xl">
                Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching "{search}"
              </p>
            </div>
          ) : null}

          {search ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 max-md:flex max-md:overflow-x-auto max-md:gap-4 max-md:pr-10 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
              {filteredTools.map(tool => (
                <Link key={tool.id} href={tool.href} className="block max-md:min-w-[260px] max-md:snap-center">
                  <div className="group !flex items-center gap-5 !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-white !p-6 transition-all duration-200 hover:!shadow-[var(--shadow-md)] dark:!bg-[var(--bg-primary)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                      <tool.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = tool.color} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>{tool.title}</h3>
                      <p className="text-[0.9375rem] leading-6 text-[var(--text-secondary)] line-clamp-2">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            CATEGORIES.map(cat => {
              const catTools = TOOLS.filter(t => t.category === cat.id);
              if (catTools.length === 0) return null;

              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="mb-20 last:mb-0">
                  <div className="mb-10 flex items-center gap-4 border-b border-[var(--border)] pb-4">
                    <div style={{ color: cat.color }}><cat.icon size={24} /></div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">{cat.title}</h2>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 max-md:flex max-md:overflow-x-auto max-md:gap-4 max-md:pr-10 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
                    {catTools.map(tool => (
                      <Link key={tool.id} href={tool.href} className="block max-md:min-w-[260px] max-md:snap-center">
                        <div className="group !flex items-center gap-5 !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-white !p-6 transition-all duration-200 hover:!shadow-[var(--shadow-md)] dark:!bg-[var(--bg-primary)]">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                            <tool.icon size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = tool.color} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>{tool.title}</h3>
                            <p className="text-[0.9375rem] leading-6 text-[var(--text-secondary)] line-clamp-2">{tool.desc}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Why Choose Us (Visual Card) */}
      <section className="px-6 py-16 md:py-24 border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-block rounded-full bg-[var(--bg-tertiary)] px-4 py-1 text-sm font-semibold text-[var(--primary)]">Why Toolioz</div>
              <h2 className="mb-6 text-4xl font-black text-[var(--text-primary)] md:text-5xl">The Most Accurate Tools on the Web</h2>
              <p className="mb-8 text-lg text-[var(--text-secondary)]">We don't just build calculators; we build clarity. Our tools are updated daily to reflect the latest global market conditions and technical standards.</p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]"><Zap size={20} /></div>
                  <div>
                    <h5 className="font-bold text-[var(--text-primary)]">Instant & Private</h5>
                    <p className="text-[var(--text-secondary)]">No account required. Calculations happen on your machine.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]"><ShieldCheck size={20} /></div>
                  <div>
                    <h5 className="font-bold text-[var(--text-primary)]">Professional Grade</h5>
                    <p className="text-[var(--text-secondary)]">Reflecting the latest standards and precision math.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]"><LayoutGrid size={20} /></div>
                  <div>
                    <h5 className="font-bold text-[var(--text-primary)]">Minimalist Design</h5>
                    <p className="text-[var(--text-secondary)]">Clean, ad-free interface focused on your workflow.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex min-h-[300px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))] p-6 sm:p-12">
              <div className="w-full max-w-[400px] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl">
                <div className="flex gap-2 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444] opacity-50" />
                  <div className="h-3 w-3 rounded-full bg-[#f59e0b] opacity-50" />
                  <div className="h-3 w-3 rounded-full bg-[#10b981] opacity-50" />
                </div>
                <div className="p-6">
                  <div className="mb-3 h-3 rounded bg-[var(--bg-secondary)]" style={{ width: '60%' }} />
                  <div className="mb-3 h-3 rounded bg-[var(--bg-secondary)]" style={{ width: '85%' }} />
                  <div className="mb-3 h-3 rounded bg-[var(--bg-secondary)]" style={{ width: '45%' }} />
                  <div className="mt-6 flex h-[100px] items-end gap-3">
                    <div className="flex-1 rounded-t bg-[#3b82f6] opacity-80" style={{ height: '45%' }} />
                    <div className="flex-1 rounded-t bg-[#3b82f6] opacity-80" style={{ height: '75%' }} />
                    <div className="flex-1 rounded-t bg-[#3b82f6] opacity-80" style={{ height: '95%' }} />
                    <div className="flex-1 rounded-t bg-[#3b82f6] opacity-80" style={{ height: '65%' }} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-lg sm:-bottom-6 sm:-right-6">
                  <TrendingUp size={16} className="text-[#10b981]" />
                  <span className="text-[0.8rem] font-bold text-[#1e293b]">Real-time Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      {!search && (
        <section className="px-6 py-16 md:py-24 border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center md:mb-20">
              <h2 className="mb-6 text-[2.25rem] font-black tracking-[-0.02em] text-[var(--text-primary)] md:text-[3.5rem]">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-lg text-[var(--text-secondary)] md:text-xl">
                Zero server processing. Everything runs securely in your browser.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { step: '01', title: 'Select Tool', desc: 'Choose from our categorized suite of professional utilities.' },
                { step: '02', title: 'Input Data', desc: 'Your data stays on your device. We never send it to our servers.' },
                { step: '03', title: 'Instant Result', desc: 'Get immediate calculations and processing right in the browser.' }
              ].map((s, i) => (
                <div key={i} className="text-center max-md:flex max-md:items-start max-md:gap-6 max-md:text-left">
                  <div className="mb-[-2rem] text-[4rem] font-black leading-none opacity-10 max-md:mb-0 max-md:text-[2.5rem]">{s.step}</div>
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">{s.title}</h3>
                    <p className="text-lg leading-7 text-[var(--text-secondary)]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="px-6 py-16 md:py-24 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-[var(--text-primary)]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all dark:bg-[var(--bg-secondary)]"
              >
                <button
                  className="flex w-full items-center justify-between p-6 text-left font-bold"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <ChevronDown size={18} className={`transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-[var(--text-secondary)]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
