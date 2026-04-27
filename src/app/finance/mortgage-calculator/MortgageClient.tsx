'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateMonthlyPayment } from '@/lib/formulas';
import { Info, HomeIcon, ShieldCheck, PieChart } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { calculatorPageStyles as styles } from '@/app/finance/compound-interest/page.styles';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function MortgageClient() {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.8);
  const [years, setYears] = useState<number>(30);
  const [result, setResult] = useState<number>(0);

  // Persistence
  useEffect(() => {
    const savedPrincipal = localStorage.getItem('toolioz_mortgage_principal');
    const savedRate = localStorage.getItem('toolioz_mortgage_rate');
    const savedYears = localStorage.getItem('toolioz_mortgage_years');

    if (savedPrincipal) setPrincipal(Number(savedPrincipal));
    if (savedRate) setRate(Number(savedRate));
    if (savedYears) setYears(Number(savedYears));
  }, []);

  useEffect(() => {
    localStorage.setItem('toolioz_mortgage_principal', principal.toString());
    localStorage.setItem('toolioz_mortgage_rate', rate.toString());
    localStorage.setItem('toolioz_mortgage_years', years.toString());

    const payment = calculateMonthlyPayment(principal, rate / 100, years);
    setResult(payment);
  }, [principal, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Mortgage Calculator 2026</h1>
            <p className={styles.subtitle}>Estimate monthly mortgage payments for home buying &amp; property planning.</p>
            <div className="mx-auto mt-6 max-w-[700px] rounded-lg border border-[#fbbf24] bg-[#fffbeb] px-4 py-3 text-left text-[0.8rem] leading-[1.6] text-[#92400e]">
              <strong>⚠️ Disclaimer:</strong> This calculator provides <strong>approximate estimates</strong> and does not include property taxes, insurance (PMI), or HOA fees. Actual payments depend on your lender, credit score, and loan type. For <strong>assumption &amp; planning purposes only</strong>.
            </div>
          </div>
        </header>

        <section className="container section">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Loan Amount" 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  prefix="$"
                />
                <Input 
                  label="Annual Interest Rate (%)" 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  suffix="%"
                />
                <Input 
                  label="Loan Term (Years)" 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  suffix="years"
                />
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                <h2 className={styles.resultLabel}>Monthly Payment</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Payback</span>
                    <span className={styles.statVal}>{formatCurrency(result * years * 12)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Interest</span>
                    <span className={styles.statVal}>{formatCurrency((result * years * 12) - principal)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download Amortization Schedule
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#8b5cf6' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  A mortgage calculator helps you determine how much your monthly payment will be, based on the loan amount, interest rate, and term.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Mortgage Affordability 2026: The Ultimate Guide to FHA & VA Loans"
          description={`Purchasing a home is likely the largest financial commitment you will ever make. Navigating the world of home loans requires a deep understanding of how mortgage payments are structured, particularly the relationship between principal and interest. Our mortgage affordability calculator 2026 is a strategic partner in your home-buying journey, supporting FHA mortgage with PMI and VA loan payment estimates. It allows you to peel back the curtain on your monthly installments and see exactly where every dollar goes.

Most mortgages operate on an amortization schedule, a table that details each periodic payment on a loan. In the early years of your mortgage, a significant portion of your monthly payment is directed toward interest, while only a small fraction reduces the principal balance. As time goes on, this ratio shifts, and you begin to equity much faster. By using our advanced calculator, you can see how even a 0.5% difference in your interest rate can save (or cost) you tens of thousands of dollars over the life of a 30-year loan.

Furthermore, our tool helps you evaluate different loan terms. While a 15-year mortgage typically comes with higher monthly payments, it drastically reduces the total interest paid compared to a traditional 30-year term. Beyond just principal and interest, remember that homeownership involves other costs like property taxes, homeowners insurance, and sometimes private mortgage insurance (PMI). While this calculator focuses on the loan mechanics, it provides the solid foundation you need to determine "How much house can I afford?" before you even speak to a lender.`}
          howToUse={[
            "Enter the Total Home Price or the amount you intend to borrow (Principal).",
            "Adjust the Down Payment amount to see how it reduces your monthly commitment and interest costs.",
            "Input the Annual Interest Rate provided by your bank or mortgage broker.",
            "Select the Loan Term (typically 15, 20, or 30 years) to understand the impact on affordability.",
            "Analyze the Monthly EMI (Equated Monthly Installment) and total interest payable.",
            "View the total cost of ownership over the entire period, including the principal payback."
          ]}
          benefits={[
            "Strategic Home Buying: Know your budget limits before you start house hunting.",
            "Interest Savings: Discover how making extra payments or choosing a shorter term can save you a fortune.",
            "Transparency: Understand exactly how your monthly payment is calculated using standard amortization formulas.",
            "Scenario Testing: Compare different lenders and interest rate offers side-by-side.",
            "Financial Confidence: Approach real estate negotiations with a firm grasp of your numbers."
          ]}
          formula="M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]"
        />
        <RelatedTools currentToolId="mortgage-calculator" categoryId="finance" />

        {/* Tax Benefits Section */}
        <div className="mx-auto mt-12 max-w-[900px]">
          <Card className="!p-8 border-l-4 border-l-[#8b5cf6] bg-[#f5f3ff]">
            <h2 className="mb-6 text-[1.4rem] font-bold text-[#5b21b6] flex items-center gap-2">
              <ShieldCheck className="text-[#8b5cf6]" /> 💸 Home Loan Tax Benefits (India 2026-27)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#5b21b6]">Interest Deductions</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#5b21b6]/80">
                  <li><strong>Section 24(b):</strong> Deduct up to <strong>₹2 Lakh</strong> per year on interest paid for a self-occupied property.</li>
                  <li><strong>Let-out Property:</strong> Entire interest paid can be offset against rental income (capped at ₹2L loss per year).</li>
                  <li><strong>Pre-construction Interest:</strong> Can be claimed in 5 equal installments after possession.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#5b21b6]">Principal & Others</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#5b21b6]/80">
                  <li><strong>Section 80C:</strong> Principal repayment is eligible for deduction up to <strong>₹1.5 Lakh</strong> (Old Regime only).</li>
                  <li><strong>Stamp Duty:</strong> Can also be claimed under Section 80C in the year of purchase.</li>
                  <li><strong>Joint Loans:</strong> If you co-own with a spouse, both can claim separate ₹2L (Interest) and ₹1.5L (Principal) deductions!</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Real-World Tips Section */}
        <section className="mx-auto max-w-[900px] px-6 py-12">
          <Card className="!p-8">
            <h2 className="mb-6 text-[1.5rem] font-extrabold text-[var(--text-primary)]">🏠 Before You Take a Home Loan — Must-Know Tips</h2>
            
            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#8b5cf6]">📋 Important Mortgage Terms</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>PMI (Private Mortgage Insurance):</strong> Required when your down payment is less than 20%. Adds $50–$200/month. Once you hit 20% equity, request removal immediately.</li>
                <li><strong>APR vs Interest Rate:</strong> APR includes fees and closing costs — it&apos;s the true cost. A 6.5% rate could be 6.8% APR after fees.</li>
                <li><strong>Escrow Account:</strong> Lenders may require an escrow account that holds funds for property taxes and insurance, increasing your monthly payment.</li>
                <li><strong>Points:</strong> You can &quot;buy down&quot; your rate by paying points upfront. 1 point = 1% of loan amount = ~0.25% rate reduction. Worth it if you plan to stay 7+ years.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#8b5cf6]">⚡ Hidden Costs Nobody Mentions</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>Closing costs:</strong> 2–5% of the home price (inspections, title insurance, origination fees). Budget $6K–$15K on a $300K home.</li>
                <li><strong>Property tax increases:</strong> Your city can reassess property taxes annually. What&apos;s affordable today may not be in 5 years.</li>
                <li><strong>HOA fees:</strong> Can range from $100 to $1,000+/month in condos. Not included in mortgage calculations but a real cost.</li>
                <li><strong>Maintenance rule:</strong> Budget 1% of home value annually for maintenance ($3,000/year on a $300K home).</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#8b5cf6]">💡 Pro Tips for Smart Home Buyers</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li>✅ Follow the <strong>28/36 rule</strong>: housing costs should be ≤28% of gross income, total debt ≤36%.</li>
                <li>✅ Get pre-approved (not just pre-qualified) — it gives you serious negotiating power.</li>
                <li>✅ A <strong>15-year mortgage</strong> saves 50%+ in total interest vs 30-year, but monthly payments are ~40% higher.</li>
                <li>✅ Even one extra payment per year on a 30-year mortgage can cut your loan by <strong>4–5 years</strong>.</li>
                <li>✅ Don&apos;t drain your emergency fund for the down payment — keep 3–6 months of expenses liquid.</li>
              </ul>
            </div>
          </Card>
        </section>
      <Footer />
    </div>
    </>
  );
}
