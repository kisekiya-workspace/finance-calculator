'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateMonthlyPayment } from '@/lib/formulas';
import { Info, Car, ShieldCheck, TrendingUp } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '@/app/finance/compound-interest/page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function CarLoanClient() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(9);
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
          <div className="container">
            <h1 className={styles.title}>Car Loan EMI Calculator 2026</h1>
            <p className={styles.subtitle}>Calculate monthly installments with latest car loan interest rates 2026.</p>
          </div>
        </header>

        <section className="container section">
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
                    <span className={styles.statLabel}>Actual Loan</span>
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
      <Footer />
    </div>
    </>
  );
}
