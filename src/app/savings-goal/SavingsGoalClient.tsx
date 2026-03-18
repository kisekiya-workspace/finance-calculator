'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateSavingsGoal } from '@/lib/formulas';
import { Info } from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '../compound-interest/page.module.css';

export default function SavingsGoalClient() {
  const [target, setTarget] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(10);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const monthly = calculateSavingsGoal(target, rate / 100, years);
    setResult(monthly);
  }, [target, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Savings Goal Calculator 2026</h1>
            <p className={styles.subtitle}>Find out how much to save for a house calculator 2026 or down payment targets.</p>
          </div>
        </header>

        <section className="container">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Target Amount" 
                  type="number" 
                  value={target} 
                  onChange={(e) => setTarget(Number(e.target.value))}
                  prefix="₹"
                />
                <Input 
                  label="Expected Annual Return (%)" 
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
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <h2 className={styles.resultLabel}>Required Monthly Savings</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Target Amount</span>
                    <span className={styles.statVal}>{formatCurrency(target)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Contributions</span>
                    <span className={styles.statVal}>{formatCurrency(result * years * 12)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download Savings Plan
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#f59e0b' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  Setting a financial goal helps you stay focused and motivated. This tool calculates the systematic monthly investment needed to reach your goal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Savings Goal Calculator 2026: Plan for a House Down Payment or Milestone"
          description={`Financial success is rarely an accident; it is the result of a deliberate and disciplined saving strategy. Whether you are wondering how much to save for a house calculator 2026 or planning a down payment for a milestone, having a specific 'Savings Goal' is the first step. Our savings goal calculator for down payment transforms abstract desires into concrete, actionable steps.

This is where a savings goal calculator becomes essential. By working backward from your target amount, the tool determines the monthly contribution required to cross the finish line on time. It accounts for the power of compounding, which means if you invest your savings in interest-bearing assets, you actually need to contribute less out of your own pocket. For instance, saving for a $50,000 goal over 10 years requires a much smaller monthly effort than saving for the same amount over 2 years.

Beyond just the numbers, goal-oriented saving helps in prioritizing your spending. When you have a clear target in sight, it becomes easier to skip unnecessary expenses in favor of your long-term vision. Our tool is designed to provide this clarity, allowing you to simulate different timeframes and interest rates. By visualizing your progress and understanding the regular effort required, you can stay motivated and turn your financial aspirations into a reality.`}
          howToUse={[
            "Begin by defining your Target Goal Amount (e.g., the cost of a car or a home down payment).",
            "Specify the Time Horizon—the number of years or months you have to reach this goal.",
            "Input the Expected Annual Return Rate if you plan to invest these savings in a bank account or fund.",
            "Review the Required Monthly Saving amount calculated by the tool.",
            "Analyze the 'Total Contributions' vs. 'Target Amount' to see the impact of interest earned.",
            "If the monthly amount is too high, experiment with extending the timeline or increasing your return expectations."
          ]}
          benefits={[
            "Clarity & Focus: Know exactly what you need to do every month to hit your target.",
            "Motivation: Seeing a clear path to your goal makes it easier to stay disciplined with your budget.",
            "Informed Investing: Understand how higher returns can drastically reduce your required monthly effort.",
            "Risk Management: Account for inflation and potential market changes in your long-term plans.",
            "Financial Peace: Reduce stress by having a pre-planned roadmap for your major life expenses."
          ]}
        />
      </div>
    </>
  );
}
