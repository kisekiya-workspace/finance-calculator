'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateMonthlyPayment } from '@/lib/formulas';
import { Info, Car, ShieldCheck, TrendingUp } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { calculatorPageStyles as styles } from '@/app/finance/compound-interest/page.styles';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function CarLoanClient() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const emi = calculateMonthlyPayment(principal, rate / 100, years);
    setResult(emi);
  }, [principal, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="mx-auto max-w-6xl">
            <h1 className={styles.title}>Car Loan EMI Calculator 2026</h1>
            <p className={styles.subtitle}>Calculate monthly installments with latest car loan interest rates.</p>
            <div className="mx-auto mt-6 max-w-[700px] rounded-lg border border-[#fbbf24] bg-[#fffbeb] px-4 py-3 text-left text-[0.8rem] leading-[1.6] text-[#92400e]">
              <strong>⚠️ Disclaimer:</strong> Interest rates shown are <strong>illustrative defaults</strong> and may not match actual bank offers. EMI depends on your credit score, loan tenure, and lender. For <strong>assumption &amp; planning purposes only</strong>.
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl py-16">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Loan Amount / Price" 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  prefix="₹"
                />
                <Input 
                  label="Interest Rate (%)" 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  suffix="%"
                />
                <Input 
                  label="Loan Tenure (Years)" 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  suffix="years"
                />
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                <h2 className={styles.resultLabel}>Monthly EMI</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Interest</span>
                    <span className={styles.statVal}>{formatCurrency(result * years * 12 - principal)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Payable</span>
                    <span className={styles.statVal}>{formatCurrency(result * years * 12)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Loan Amount</span>
                    <span className={styles.statVal}>{formatCurrency(principal)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download EMI Schedule
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#06b6d4' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Section */}
        <div className="mx-auto mt-12 max-w-[900px]">
          <Card className="!p-8 border-l-4 border-l-[#06b6d4] bg-[#ecfeff]">
            <h2 className="mb-6 text-[1.4rem] font-bold text-[#0891b2] flex items-center gap-2">
              <ShieldCheck className="text-[#06b6d4]" /> 💸 Tax & Car Loans (2026-27)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#0891b2]">Salaried Individuals</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#0891b2]/80">
                  <li><strong>No Direct Benefit:</strong> Unfortunately, there are <strong>no income tax deductions</strong> for car loan EMI or interest for salaried employees.</li>
                  <li><strong>Electric Vehicles (EV):</strong> Section 80EEB (deduction up to ₹1.5L on interest) was available until March 2023. Check for any 2026 extensions in state-specific EV policies.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[1.05rem] font-bold text-[#0891b2]">Business / Professionals</h3>
                <ul className="flex flex-col gap-3 text-[0.875rem] leading-[1.6] text-[#0891b2]/80">
                  <li><strong>Interest Deduction:</strong> If the car is used for business, the **entire interest amount** can be claimed as a business expense.</li>
                  <li><strong>Depreciation:</strong> You can claim <strong>15% depreciation</strong> (standard) or higher for EVs annually on the car&apos;s value to reduce taxable profit.</li>
                  <li><strong>Fuel & Maintenance:</strong> Expenses like fuel and servicing can also be deducted proportionally for business use.</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Real-World Tips Section */}
        <section className="mx-auto max-w-[900px] px-6 py-12">
          <Card className="!p-8">
            <h2 className="mb-6 text-[1.5rem] font-extrabold text-[var(--text-primary)]">🚗 Before You Take a Car Loan — Must-Know Tips</h2>
            
            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#06b6d4]">📋 Important Terms You Should Know</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>Flat Rate vs Reducing Balance:</strong> Dealers quote &quot;flat rate&quot; (e.g., 5%) which sounds low but is actually ~9-10% on reducing balance. Always ask for the <strong>reducing balance rate</strong> — that&apos;s the real cost.</li>
                <li><strong>Processing Fee:</strong> Usually 0.5–2% of loan amount. This is negotiable — always ask for a waiver or discount.</li>
                <li><strong>Foreclosure Charges:</strong> Banks may charge 2–5% if you repay early. RBI mandates no foreclosure charges on floating-rate loans for individuals.</li>
                <li><strong>Ex-showroom vs On-Road Price:</strong> Loans are usually on ex-showroom price. Registration, insurance, and accessories are extra out-of-pocket costs.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#06b6d4]">⚡ Unwritten Rules Banks Won&apos;t Tell You</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li><strong>Dealer financing is more expensive:</strong> In-house dealer loans carry higher rates. Get pre-approved from your bank first, then use the dealer&apos;s offer as a negotiation tool.</li>
                <li><strong>Credit score below 750?</strong> You&apos;ll pay 1–3% higher interest. Fix your CIBIL score before applying — even waiting 3 months can save lakhs.</li>
                <li><strong>Insurance bundling is optional:</strong> Dealers push you to buy insurance from them. You are legally free to buy from any provider. Shop around.</li>
                <li><strong>&quot;Zero down payment&quot; is a trap:</strong> It means 100% financing = maximum interest. Always pay at least 20% down to reduce total cost significantly.</li>
                <li><strong>Negotiate the car price first, then discuss finance.</strong> Dealers mix discounts with loan terms to confuse you.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[1.1rem] font-bold text-[#06b6d4]">💡 Pro Tips for Smart Borrowers</h3>
              <ul className="flex flex-col gap-2 text-[0.9rem] leading-[1.7] text-[var(--text-secondary)]">
                <li>✅ Keep your EMI below <strong>15% of monthly take-home salary</strong> — this is the golden rule for car affordability.</li>
                <li>✅ A <strong>3-year tenure</strong> is the sweet spot — balances affordable EMIs with minimal interest.</li>
                <li>✅ For used cars, bank interest rates are 2–4% higher. Consider certified pre-owned programs for better rates.</li>
                <li>✅ Calculate <strong>Total Cost of Ownership</strong> (EMI + Insurance + Fuel + Maintenance) — not just the EMI.</li>
                <li>✅ If your CIBIL score is 800+, you can negotiate interest rates 0.5–1% below the advertised rate.</li>
              </ul>
            </div>
          </Card>
        </section>

        <SEOSection 
          title="Car Loan EMI Calculator 2026: Navigating Interest Rates & Tenures"
          description={`Buying a new car is a significant financial decision. Our car loan EMI calculator with interest rates 2026 provides a clear breakdown of your monthly commitment. Plan your vehicle purchase with the latest auto financing rules and ensure your dream drive fits your budget.

When you take out a car loan, you are essentially borrowing the purchase price (minus your down payment) and agreeing to pay it back over a fixed tenure with interest. Unlike home loans, car loans typically have shorter tenures—ranging from 1 to 7 years—and higher interest rates. The shorter the tenure, the higher your monthly EMI will be, but the less interest you will pay in total. Conversely, a longer tenure makes the car more affordable on a month-to-month basis but significantly increases the total cost of ownership due to interest accumulation.

Our car loan calculator helps you find the perfect balance. By experimenting with different down payment amounts and tenures, you can see how to minimize your interest burden while keeping your installments manageable. Beyond just the EMI, remember to factor in other ownership costs like insurance, maintenance, and fuel. By entering your numbers into our precision tool, you gain the power to negotiate better with lenders and choose a financing plan that fits seamlessly into your monthly household budget.`}
          howToUse={[
            "Enter the Full Purchase Price of the car or the loan amount you intend to borrow.",
            "Input the Interest Rate offered by the bank or dealership's finance department.",
            "Select the Loan Tenure (the number of years you have to pay back the loan).",
            "Instantly view the Monthly EMI you will need to pay.",
            "Analyze the Total Interest Cost—this shows the 'extra' you are paying for the convenience of financing.",
            "Compare the 'Total Payback Amount' against the original car price to understand the full cost of the loan."
          ]}
          benefits={[
            "Negotiation Power: Walk into the dealership with a firm understanding of what your monthly payment should be.",
            "Affordability Check: Ensure the car you want fits within your actual monthly income limits.",
            "Interest Minimization: Discover how a larger down payment or a shorter term can save you significant money.",
            "Quick Comparison: Side-by-side comparison of different loan offers from various banks.",
            "Budget Discipline: Plan your monthly expenses with absolute certainty about your auto loan commitment."
          ]}
          formula="M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]"
        />
        <RelatedTools currentToolId="car-loan" categoryId="finance" />
      <Footer />
    </div>
    </>
  );
}
