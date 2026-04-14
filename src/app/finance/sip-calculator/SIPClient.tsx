'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateSIP } from '@/lib/formulas';
import { Info, TrendingUp, Sparkles, Target } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { RelatedTools } from '@/components/ui/RelatedTools';
import styles from '@/app/finance/compound-interest/page.module.css';

export default function SIPClient() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<number>(0);

  // Persistence
  useEffect(() => {
    const savedMonthly = localStorage.getItem('toolioz_sip_monthly');
    const savedRate = localStorage.getItem('toolioz_sip_rate');
    const savedYears = localStorage.getItem('toolioz_sip_years');

    if (savedMonthly) setMonthlyInvestment(Number(savedMonthly));
    if (savedRate) setRate(Number(savedRate));
    if (savedYears) setYears(Number(savedYears));
  }, []);

  useEffect(() => {
    localStorage.setItem('toolioz_sip_monthly', monthlyInvestment.toString());
    localStorage.setItem('toolioz_sip_rate', rate.toString());
    localStorage.setItem('toolioz_sip_years', years.toString());

    const finalAmount = calculateSIP(monthlyInvestment, rate / 100, years);
    setResult(finalAmount);
  }, [monthlyInvestment, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  };

  const totalInvested = monthlyInvestment * years * 12;
  const wealthGained = result - totalInvested;

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>SIP Return Calculator 2026</h1>
            <p className={styles.subtitle}>Plan your wealth creation with the best monthly SIP return calculator. See how to reach your 1 crore target.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.grid}>
            <Card className={styles.inputCard}>
              <div className={styles.inputGroup}>
                <Input 
                  label="Monthly Investment" 
                  type="number" 
                  value={monthlyInvestment} 
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
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
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                <h2 className={styles.resultLabel}>Estimated Returns</h2>
                <div className={styles.resultValue}>{formatCurrency(result)}</div>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Invested Amount</span>
                    <span className={styles.statVal}>{formatCurrency(totalInvested)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Est. Returns</span>
                    <span className={styles.statVal}>{formatCurrency(wealthGained)}</span>
                  </div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Get Detailed Plan
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#2563eb' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  A Systematic Investment Plan (SIP) is a disciplined way to invest in dynamic financial markets, allowing you to invest small amounts periodically.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools currentToolId="sip-calculator" categoryId="finance" />
        
        <SEOSection 
          title="The Power of SIP: Monthly SIP Return Calculator for 1 Crore Target"
          description={`A Systematic Investment Plan (SIP) is more than just a way to invest in mutual funds; it's a financial philosophy that prioritizes consistency over market timing. In the volatile world of finance, trying to guess when the market will hit its lowest or highest point is often a losing game for retail investors. SIPs solve this by automating your investments, allowing you to buy more units when prices are low and fewer when prices are high. This process, known as Rupee Cost Averaging, significantly reduces the average cost of your investment over time.

The true magic of an SIP, however, lies in the power of compounding. By investing a small amount every month—be it ₹500 or ₹50,000—you are effectively putting your money to work 24/7. Use our tool to calculate how much to invest in SIP for 1 crore target or any other financial goal. Over a span of 10, 20, or 30 years, the interest earned on your contributions starts generating its own interest, leading to an exponential growth curve in the later years. This makes SIPs the ideal tool for long-term goals like buying a house, funding a child's higher education, or building a robust retirement corpus.

Our professional SIP calculator is designed to help you visualize this journey. By adjusting your monthly contribution, duration, and expected rate of return, you can see how even a small increase in your monthly savings can lead to a difference of lakhs or even crores in your final maturity amount. Financial freedom doesn't require a massive windfall; it requires a disciplined plan. Start your journey today by simulating your wealth creation path with our precision-engineered tool.`}
          howToUse={[
            "Enter the Fixed Amount you intend to invest every month (Monthly SIP contribution).",
            "Input the Expected Annual Rate of Return based on the historical performance of your chosen fund.",
            "Select the Investment Period in years to see the long-term impact of compounding.",
            "Instantly view the Total Maturity Value after the specified period.",
            "Analyze the breakdown: See exactly how much you invested vs. how much wealth you gained.",
            "Experiment with the 'Step Up' approach—see what happens if you increase your SIP by 10% every year."
          ]}
          benefits={[
            "Market Volatility Protection: Benefit from Rupee Cost Averaging and ignore market noise.",
            "Wealth Snowball: Harness the compounding effect to grow even small amounts into a fortune.",
            "Discipline & Automation: Build a healthy saving habit without needing to manually invest every month.",
            "Goal-Based Planning: Align your monthly savings with specific future milestones.",
            "Liquidity & Flexibility: Most SIPs allow you to stop, pause, or increase your investments at any time."
          ]}
          formula="M = P * [ ((1 + i)^n - 1) / i ] * (1 + i)"
        />
      <Footer />
    </div>
    </>
  );
}
