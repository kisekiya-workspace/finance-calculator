'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateFD } from '@/lib/formulas';
import { Info, Banknote, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '@/app/finance/compound-interest/page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
export default function FDClient() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const maturityVal = calculateFD(principal, rate / 100, years);
    setResult(maturityVal);
  }, [principal, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Fixed Deposit (FD)</h1>
            <p className={styles.subtitle}>Secure your future with guaranteed returns on fixed deposits.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Principal Amount" 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  prefix="₹"
                />
                <Input 
                  label="Annual Interest Rate (%)" 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  suffix="%"
                />
                <Input 
                  label="Tenure (Years)" 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  suffix="years"
                />
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #0369a1, #075985)' }}>
                <h2 className={styles.resultLabel}>Maturity Value</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Interest</span>
                    <span className={styles.statVal}>{formatCurrency(result - principal)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Investment</span>
                    <span className={styles.statVal}>{formatCurrency(principal)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download FD Summary
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#0369a1' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  A Fixed Deposit (FD) is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Fixed Deposits (FD): The Bedrock of a Secure Savings Strategy"
          description={`A Fixed Deposit (FD) has long been considered one of the safest and most reliable investment instruments, particularly for those who prioritize capital preservation over high-risk growth. When you open an FD, you agree to leave a specific amount of money with a bank or non-banking financial company (NBFC) for a set tenure at a fixed interest rate. Unlike market-linked investments like stocks or mutual funds, the returns on an FD are guaranteed and unaffected by market volatility.

The efficiency of a fixed deposit depends largely on its compounding frequency. Most banks in India and other regions compound interest on a quarterly basis, which means your interest earns interest four times a year. This leads to a slightly higher 'effective' yield compared to the nominal interest rate. Our FD calculator simplifies this complex math, allowing you to see the exact maturity value of your deposit based on the principal, tenure, and current bank rates.

For many, FDs serve as an emergency fund or a way to save for specific future milestones, such as a down payment on a home or post-graduation expenses. Some FDs also offer tax-saving benefits under Section 80C (in India), though these typically come with a mandatory 5-year lock-in period. By comparing the maturity amounts across different interest rates and tenures using our tool, you can make an informed decision on where to park your hard-earned money for the best guaranteed returns.`}
          howToUse={[
            "Enter the Principal Deposit Amount you wish to invest in the bank.",
            "Input the Annual Interest Rate offered by the financial institution (Bank/NBFC).",
            "Select the Tenure or duration of the deposit in years or months.",
            "Determine the compounding frequency (our calculator defaults to quarterly compounding for accuracy).",
            "Instantly view the Final Maturity Amount you will receive at the end of the term.",
            "Check the Total Interest Earned—this is the profit your money has generated over the period."
          ]}
          benefits={[
            "Capital Security: Your principal amount is safe and guaranteed by the institution.",
            "Predictable Income: Know exactly how much you will receive on the day of maturity.",
            "Wealth Protection: Provides a steady hedge against short-term market fluctuations.",
            "Flexible Tenures: Choose a term that perfectly matches your future financial needs.",
            "Tax Planning: Utilize tax-saving FD schemes to reduce your annual tax liability."
          ]}
          formula="A = P(1 + r/n)^(nt)"
        />
      <Footer />
    </div>
    </>
  );
}
