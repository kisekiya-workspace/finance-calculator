'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateMonthlyPayment } from '@/lib/formulas';
import { Info, HomeIcon, ShieldCheck, PieChart } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '@/app/finance/compound-interest/page.module.css';

export default function MortgageClient() {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(4.5);
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
            <h1 className={styles.title}>Mortgage Affordability Calculator 2026</h1>
            <p className={styles.subtitle}>FHA & VA Loan EMI Calculator with PMI for accurate property planning.</p>
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
      <Footer />
    </div>
    </>
  );
}
