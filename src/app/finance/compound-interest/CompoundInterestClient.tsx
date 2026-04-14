'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateCompoundInterest } from '@/lib/formulas';
import { TrendingUp, Info, Sparkles, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';

export default function CompoundInterestClient() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [freq, setFreq] = useState<number>(12); // Monthly
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const finalAmount = calculateCompoundInterest(principal, rate / 100, freq, years);
    setResult(finalAmount);
  }, [principal, rate, years, freq]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Daily Compound Interest Calculator</h1>
            <p className={styles.subtitle}>Future value of investment calculator 2026 with daily compounding and deposits.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Initial Investment" 
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
                  label="Time Horizon (Years)" 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  suffix="years"
                />
                <div className={styles.selectGroup}>
                  <label className={styles.label}>Compounding Frequency</label>
                  <select 
                    className={styles.select}
                    value={freq}
                    onChange={(e) => setFreq(Number(e.target.value))}
                  >
                    <option value={1}>Annually</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                    <option value={365}>Daily</option>
                  </select>
                </div>
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard}>
                <h2 className={styles.resultLabel}>Future Value</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Interest</span>
                    <span className={styles.statVal}>{formatCurrency(result - principal)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Principal</span>
                    <span className={styles.statVal}>{formatCurrency(principal)}</span>
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

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}><Info size={20} /></div>
                <p className={styles.infoText}>
                  Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Compound Interest: Daily Compounding & Future Value Analysis 2026"
          description="Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. Our future value of investment calculator 2026 allows you to simulate daily compound interest with deposits to see how 'interest on interest' makes your wealth grow at a faster rate."
          howToUse={[
            "Enter the initial investment amount (principal).",
            "Specify the annual interest rate as a percentage.",
            "Choose the total number of years you plan to invest.",
            "Select the compounding frequency (monthly, annually, etc.).",
            "Review the future value and total interest earned."
          ]}
          benefits={[
            "Helps in long-term wealth projection.",
            "Demonstrates the power of consistent investing.",
            "Compares different compounding frequencies.",
            "Visualizes the impact of inflationary growth."
          ]}
          formula="A = P(1 + r/n)^(nt)"
        />
      <Footer />
    </div>
    </>
  );
}
