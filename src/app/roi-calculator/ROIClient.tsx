'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateROI } from '@/lib/formulas';
import { Info } from 'lucide-react';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from '../compound-interest/page.module.css';

export default function ROIClient() {
  const [initial, setInitial] = useState<number>(1000);
  const [final, setFinal] = useState<number>(1500);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const roi = calculateROI(initial, final);
    setResult(roi);
  }, [initial, final]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>ROI Calculator: Stocks & Real Estate</h1>
            <p className={styles.subtitle}>Measure return on investment for rental properties, stocks, and projects.</p>
          </div>
        </header>

        <section className="container">
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

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#10b981' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  ROI stands for Return on Investment. It is a financial ratio used to calculate the benefit an investor will receive in relation to their investment cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="Return on Investment (ROI): Real Estate & Stock Portfolio Analysis"
          description="Return on Investment (ROI) is a popular profitability ratio used to evaluate the efficiency of an investment. Our real estate ROI calculator for rental properties and stock investment ROI tools help you measure your portfolio's performance relative to its cost."
          howToUse={[
            "Enter the total amount initially invested.",
            "Enter the final value of the investment (or expected exit value).",
            "View the ROI percentage instantly.",
            "Analyze the absolute profit generated in dollar terms."
          ]}
          benefits={[
            "Simple and easy to understand.",
            "Universal metric for investment performance.",
            "Helps in ranking different investment opportunities.",
            "Crucial for business project feasibility analysis."
          ]}
          formula="ROI = ((Final Value - Initial Value) / Initial Value) * 100"
        />
      </div>
    </>
  );
}
