'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateInflation } from '@/lib/formulas';
import { Info } from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '../compound-interest/page.module.css';

export default function InflationClient() {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const futureVal = calculateInflation(amount, rate / 100, years);
    setResult(futureVal);
  }, [amount, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Inflation Adjustment Calculator 2026</h1>
            <p className={styles.subtitle}>Analyze purchasing power loss and adjust your future savings with precision.</p>
          </div>
        </header>

        <section className="container">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Current Value / Amount" 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  prefix="₹"
                />
                <Input 
                  label="Average Inflation Rate (%)" 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  suffix="%"
                />
                <Input 
                  label="Time Period (Years)" 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  suffix="years"
                />
              </div>
            </Card>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
                <h2 className={styles.resultLabel}>Future Value (Inflation Adjusted)</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Purchasing Power Loss</span>
                    <span className={styles.statVal}>{((1 - amount / result) * 100).toFixed(1)}%</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Current Value</span>
                    <span className={styles.statVal}>{formatCurrency(amount)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Get Savings Guide
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#ef4444' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                   Inflation is the rate at which the general level of prices for goods and services is rising and, consequently, the purchasing power of currency is falling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Inflation Adjustment Calculator 2026: Protecting Your Purchasing Power"
          description={`Inflation is the silent killer of wealth. Our inflation adjustment calculator 2026 helps you understand how the general level of prices for goods and services is rising and how much your future purchasing power is falling. Whether planning for retirement or long-term purchases, adjust your strategy to combat the cumulative effect of inflation.

Historically, average inflation rates hover around 2% to 6% depending on the region and economic climate. While this might seem small annually, the cumulative effect over 20 or 30 years is staggering. For example, at a 5% inflation rate, the cost of living doubles roughly every 14 years. This means if you need $50,000 today to maintain your lifestyle, you might need $100,000 in just 14 years to buy the same goods and services. Our inflation calculator helps you see this future reality clearly so you can adjust your investment strategies accordingly.

The only way to effectively combat inflation is through "Real Returns"—returns that exceed the inflation rate. If your savings account offers 4% interest but inflation is 6%, you are actually losing 2% in purchasing power every year. By using this tool to project future costs, you can better understand the necessity of investing in growth assets like stocks or real estate, which historically offer higher returns than inflation. Use our precision tool to safeguard your future and ensure your long-term financial goals remain reachable.`}
          howToUse={[
            "Enter a Current Amount or the price of an item you wish to track into the future.",
            "Input the Average Annual Inflation Rate (historical averages for your country are a good benchmark).",
            "Select the Time Period in years you want to project into.",
            "Instantly view the Inflation-Adjusted Future Value of that amount.",
            "Analyze the 'Purchasing Power Loss' percentage to understand the impact on your wealth.",
            "Use the results to determine how much more you truly need to save for retirement or long-term purchases."
          ]}
          benefits={[
            "Realistic Planning: Avoid the 'Money Illusion' by focusing on real future costs, not just nominal numbers.",
            "Portfolio Optimization: Identify whether your current investments are actually growing your wealth or just losing to inflation.",
            "Cost of Living Awareness: Understand how everyday expenses like healthcare and housing might escalate over time.",
            "Retirement Safety: Ensure your future nest egg is large enough to sustain your desired lifestyle decades from now.",
            "Business Strategy: Help entrepreneurs project future operational costs and adjust pricing models accordingly."
          ]}
          formula="Future Value = Current Value * (1 + inflationRate)^years"
        />
      </div>
    </>
  );
}
