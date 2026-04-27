'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateROI } from '@/lib/formulas';
import { Info, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { calculatorPageStyles as styles } from '@/app/finance/compound-interest/page.styles';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function ROIClient() {
  const [initial, setInitial] = useState<number>(1000);
  const [final, setFinal] = useState<number>(1500);
  const [holdingYears, setHoldingYears] = useState<number>(3);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const roi = calculateROI(initial, final);
    setResult(roi);
  }, [initial, final]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // CAGR = (FV/IV)^(1/n) - 1
  const cagr = initial > 0 && holdingYears > 0
    ? (Math.pow(final / initial, 1 / holdingYears) - 1) * 100
    : 0;

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="mx-auto max-w-6xl">
            <h1 className={styles.title}>ROI &amp; CAGR Calculator 2026</h1>
            <p className={styles.subtitle}>Measure return on investment and annualized growth rate (CAGR) for stocks, real estate &amp; projects.</p>
            <div className="mx-auto mt-6 max-w-[700px] rounded-lg border border-[#fbbf24] bg-[#fffbeb] px-4 py-3 text-left text-[0.8rem] leading-[1.6] text-[#92400e]">
              <strong>⚠️ Disclaimer:</strong> ROI and CAGR are <strong>simplified metrics</strong> that don&apos;t account for dividends, taxes, fees, or inflation. For <strong>assumption &amp; planning purposes only</strong>. Consult a financial advisor for investment decisions.
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl py-16">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Initial Investment" 
                  type="number" 
                  value={initial} 
                  onChange={(e) => setInitial(Number(e.target.value))}
                  prefix="$"
                />
                <Input 
                  label="Final Value (at Exit)" 
                  type="number" 
                  value={final} 
                  onChange={(e) => setFinal(Number(e.target.value))}
                  prefix="$"
                />
                <Input 
                  label="Holding Period (Years)" 
                  type="number" 
                  value={holdingYears} 
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  suffix="years"
                />
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <h2 className={styles.resultLabel}>Total Return (ROI)</h2>
                <div className={styles.resultValue}>{result.toFixed(2)}%</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Absolute Profit</span>
                    <span className={styles.statVal}>{formatCurrency(final - initial)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Initial Capital</span>
                    <span className={styles.statVal}>{formatCurrency(initial)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download Report
                </Button>
              </Card>

              {/* CAGR Card */}
              <Card className="!rounded-[var(--radius-lg)] !border !border-[var(--border)] !bg-white !p-5">
                <h3 className="mb-2 text-[0.95rem] font-bold text-[var(--text-primary)]">📈 Annualized Return (CAGR)</h3>
                <p className="text-[2rem] font-black" style={{ color: cagr >= 0 ? '#16a34a' : '#dc2626' }}>
                  {cagr.toFixed(2)}%
                </p>
                <p className="mt-2 text-[0.8rem] text-[var(--text-tertiary)]">
                  Compound Annual Growth Rate over {holdingYears} year{holdingYears !== 1 ? 's' : ''}. CAGR is more accurate than simple ROI for multi-year investments.
                </p>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#10b981' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  ROI measures total return regardless of time. CAGR (Compound Annual Growth Rate) shows the smoothed annual rate of return, making it ideal for comparing investments of different durations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Return on Investment (ROI) & CAGR: Investment Performance Analysis"
          description="Return on Investment (ROI) is a popular profitability ratio used to evaluate the efficiency of an investment. Our calculator also computes CAGR (Compound Annual Growth Rate), which provides the annualized return rate — essential for comparing investments held over different time periods."
          howToUse={[
            "Enter the total amount initially invested.",
            "Enter the final value of the investment (or expected exit value).",
            "Enter the Holding Period in years for CAGR calculation.",
            "View the ROI percentage (total return) and CAGR (annualized return) instantly.",
            "Analyze the absolute profit generated in dollar terms."
          ]}
          benefits={[
            "Simple ROI for quick profitability check.",
            "CAGR for accurate annualized comparison across investments.",
            "Universal metric for stocks, real estate, and business projects.",
            "Crucial for business project feasibility analysis.",
            "Compare investments with different holding periods fairly."
          ]}
          formula="ROI = ((FV - IV) / IV) × 100 | CAGR = (FV/IV)^(1/n) - 1"
        />
        <RelatedTools currentToolId="roi-calculator" categoryId="finance" />

        {/* Tax & Returns Section */}
        <div className="mx-auto mt-12 max-w-[900px]">
          <Card className="!p-8 border-l-4 border-l-[#10b981] bg-[#f0fdf4]">
            <h2 className="mb-6 text-[1.4rem] font-bold text-[#065f46] flex items-center gap-2">
              <ShieldCheck className="text-[#10b981]" /> 💸 Post-Tax & Real Returns (2026-27)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#065f46]">The Tax Impact</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#065f46]/80">
                  <li><strong>Equity ROI:</strong> Deduct 12.5% for LTCG (&gt;1 year) or 20% for STCG (&lt;1 year) from your total gains.</li>
                  <li><strong>Debt ROI:</strong> Deduct your income tax slab rate (e.g., 30%) from the total interest earned.</li>
                  <li><strong>Dividend Tax:</strong> Dividends are taxed at your slab rate. Growth plans are usually more tax-efficient.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#065f46]">The Inflation Impact</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#065f46]/80">
                  <li><strong>Real ROI Formula:</strong> <code>[(1 + ROI) / (1 + Inflation)] - 1</code>. This is your actual purchasing power growth.</li>
                  <li><strong>Nominal vs Real:</strong> A 12% nominal return with 6% inflation means your &quot;real&quot; wealth grew by only ~5.66%.</li>
                  <li><strong>Goal:</strong> Always target a post-tax, post-inflation ROI of at least 3-4% for true wealth creation.</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Real-World Tips Section */}
        <section className="mx-auto max-w-[900px] px-6 py-12">
          <Card className="!p-8">
            <h2 className="mb-6 text-[1.5rem] font-extrabold text-[var(--text-primary)]">📊 Investment Returns — What Every Investor Should Know</h2>
            
            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#10b981]">📋 ROI vs CAGR vs XIRR — Which to Use?</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>ROI:</strong> Simple total return. Use for quick one-time investments. Flaw: doesn&apos;t consider time (100% in 1 year ≠ 100% in 10 years).</li>
                <li><strong>CAGR:</strong> Annualized return assuming constant growth. Best for comparing lump-sum investments of different durations.</li>
                <li><strong>XIRR:</strong> Most accurate for SIPs and irregular cash flows. Accounts for timing of each investment/withdrawal.</li>
                <li><strong>Absolute vs Annualized:</strong> A mutual fund showing &quot;200% return&quot; over 10 years sounds great, but its CAGR is only ~11.6%.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#10b981]">⚡ Common Investment Mistakes</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>Ignoring fees and taxes:</strong> A fund with 15% gross return becomes ~11% after expense ratio + 12.5% LTCG tax + exit load.</li>
                <li><strong>Confusing paper gains with real gains:</strong> Your stock portfolio shows +50%? That&apos;s unrealized. You haven&apos;t made money until you sell.</li>
                <li><strong>Anchoring bias:</strong> Holding a losing investment because you paid ₹500 for it and it&apos;s now ₹300. The right question is: would you buy it today at ₹300?</li>
                <li><strong>Not accounting for inflation:</strong> A &quot;10% return&quot; with 6% inflation is really only 4% real growth.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#10b981]">💡 Due Diligence Checklist Before Investing</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li>✅ Check the <strong>3, 5, and 10-year CAGR</strong> — not just recent 1-year performance.</li>
                <li>✅ Compare against a <strong>benchmark</strong> (Nifty 50, Sensex). If the fund consistently underperforms the benchmark, switch to an index fund.</li>
                <li>✅ <strong>Never invest money you&apos;ll need in 1–2 years</strong> in equity. Short-term volatility can destroy returns.</li>
                <li>✅ Diversify across <strong>asset classes</strong> (equity, debt, gold, real estate), not just across stocks.</li>
                <li>✅ Factor in <strong>tax impact</strong>: ELSS gives 80C benefit, debt funds have different tax treatment than equity funds.</li>
              </ul>
            </div>
          </Card>
        </section>
      <Footer />
    </div>
    </>
  );
}
