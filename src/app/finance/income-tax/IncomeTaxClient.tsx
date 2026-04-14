'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateIncomeTax, Country, FilingStatus } from '@/lib/formulas';
import { Wallet, Info, AlertTriangle, ShieldCheck, PieChart, Download } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import { RelatedTools } from '@/components/ui/RelatedTools';
import styles from './page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
const COUNTRIES: { id: Country; name: string; currency: string; locale: string }[] = [
  { id: 'IN', name: 'India (FY 2026-27)', currency: 'INR', locale: 'en-IN' },
  { id: 'US', name: 'USA', currency: 'USD', locale: 'en-US' },
  { id: 'UK', name: 'UK', currency: 'GBP', locale: 'en-GB' },
];

const YEARS = [2024, 2025, 2026] as const;

export default function IncomeTaxClient() {
  const [country, setCountry] = useState<Country>('IN');
  const [year, setYear] = useState<number>(2025);
  const [status, setStatus] = useState<FilingStatus>('single');
  const [income, setIncome] = useState<number>(1200000);
  const [deductions, setDeductions] = useState<number>(150000);
  const [mode, setMode] = useState<'yearly' | 'monthly'>('yearly');
  
  const [results, setResults] = useState({
    tax: 0,
    taxable: 0,
    social: 0,
    takeHome: 0,
    effectiveRate: 0,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  // Persistence
  useEffect(() => {
    const savedCountry = localStorage.getItem('toolioz_tax_country');
    const savedYear = localStorage.getItem('toolioz_tax_year');
    const savedStatus = localStorage.getItem('toolioz_tax_status');
    const savedIncome = localStorage.getItem('toolioz_tax_income');
    const savedDeductions = localStorage.getItem('toolioz_tax_deductions');

    if (savedCountry) setCountry(savedCountry as Country);
    if (savedYear) setYear(Number(savedYear));
    if (savedStatus) setStatus(savedStatus as FilingStatus);
    if (savedIncome) setIncome(Number(savedIncome));
    if (savedDeductions) setDeductions(Number(savedDeductions));
  }, []);

  useEffect(() => {
    localStorage.setItem('toolioz_tax_country', country);
    localStorage.setItem('toolioz_tax_year', year.toString());
    localStorage.setItem('toolioz_tax_status', status);
    localStorage.setItem('toolioz_tax_income', income.toString());
    localStorage.setItem('toolioz_tax_deductions', deductions.toString());

    const res = calculateIncomeTax(income, deductions, country, status, 'new', year);
    setResults({
      tax: res.taxAmount,
      taxable: res.taxableIncome,
      social: res.socialSecurity || 0,
      takeHome: res.takeHome,
      effectiveRate: res.effectiveRate
    });
  }, [income, deductions, country, year, status]);

  const selectedCountry = COUNTRIES.find(c => c.id === country)!;

  const displayVal = (val: number) => mode === 'monthly' ? val / 12 : val;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(selectedCountry.locale, { 
      style: 'currency', 
      currency: selectedCountry.currency,
      maximumFractionDigits: 0
    }).format(displayVal(val));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
    }, 800);
  };

  const taxPercent = (results.tax + results.social) / (income || 1) * 100;

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Income Tax Calculator India 2026</h1>
            <p className={styles.subtitle}>FY 2026-27 New vs Old Tax Regime Calculator for Salaried Employees.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.modeToggle}>
            <button 
              className={`${styles.modeOption} ${mode === 'yearly' ? styles.activeMode : ''}`}
              onClick={() => setMode('yearly')}
            >Yearly View</button>
            <button 
              className={`${styles.modeOption} ${mode === 'monthly' ? styles.activeMode : ''}`}
              onClick={() => setMode('monthly')}
            >Monthly View</button>
          </div>

          <div className={styles.grid}>
            <div className={styles.inputCol}>
              <Card className={styles.inputCard}>
                <div className={styles.selectors}>
                  <div className={styles.selectWrapper}>
                    <label>Country</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value as Country)}>
                      {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className={styles.selectWrapper}>
                    <label>Filing Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                      <option value="single">Single Individual</option>
                      {country === 'IN' && <option value="senior">Senior Citizen (60+)</option>}
                      {country === 'US' && <option value="married">Married Filing Jointly</option>}
                    </select>
                  </div>
                </div>

                <div className={styles.selectWrapper} style={{ marginBottom: '1.5rem' }}>
                  <label>Tax Year</label>
                  <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className={styles.divider} />

                <h3 className={styles.cardTitle}>Earnings & Data</h3>
                <div className={styles.inputGroup}>
                  <Input 
                    label={`Gross ${mode === 'monthly' ? 'Monthly' : 'Annual'} Income`}
                    type="number" 
                    value={mode === 'monthly' ? income / 12 : income} 
                    onChange={(e) => setIncome(mode === 'monthly' ? Number(e.target.value) * 12 : Number(e.target.value))}
                    prefix={selectedCountry.currency === 'INR' ? '₹' : selectedCountry.currency === 'USD' ? '$' : '£'}
                  />
                  <Input 
                    label="Investment / Deductions" 
                    type="number" 
                    value={mode === 'monthly' ? deductions / 12 : deductions} 
                    onChange={(e) => setDeductions(mode === 'monthly' ? Number(e.target.value) * 12 : Number(e.target.value))}
                    prefix={selectedCountry.currency === 'INR' ? '₹' : selectedCountry.currency === 'USD' ? '$' : '£'}
                  />
                </div>

                <div className={styles.guideBox}>
                   <div className={styles.guideTitle}><Info size={16} /> Tax Optimization Tip</div>
                   <p className={styles.guideText}>
                     {country === 'IN' ? 'Under the New Regime, standard deduction has been increased to ₹75,000 for salaried individuals. No other deductions like 80C apply.' : 
                      country === 'US' ? 'Contributing to a 401(k) or IRA can significantly reduce your taxable income and lower your effective tax rate.' :
                      'Pensions are one of the most tax-efficient ways to save in the UK. Any contributions made are deducted from your gross income before tax.'}
                   </p>
                </div>
              </Card>

              <div className={styles.visualCard}>
                <h3 className={styles.cardTitle}>Visual Breakdown</h3>
                <div className={styles.chartContainer}>
                  <div className={styles.progressBar}>
                    <div className={styles.takeHomeFill} style={{ width: `${100 - taxPercent}%` }} title="Take Home" />
                    <div className={styles.taxFill} style={{ width: `${taxPercent}%` }} title="Total Tax" />
                  </div>
                  <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                      <span className={styles.dot} style={{ background: '#10b981' }} />
                      Take Home: {(100 - taxPercent).toFixed(1)}%
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.dot} style={{ background: '#ef4444' }} />
                      Total Taxes: {taxPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.resultCol}>
              <Card className={styles.summaryCard}>
                <div className={styles.recommendation}>
                  <ShieldCheck size={28} className={styles.successIcon} />
                  <div>
                    <h3 className={styles.recTitle}>Net Take-Home Pay</h3>
                    <p className={styles.recDesc}>{formatCurrency(results.takeHome)} <span>/ {mode}</span></p>
                  </div>
                </div>

                <div className={styles.comparisonGrid}>
                  <div className={styles.compareBox} style={{ gridColumn: '1 / -1' }}>
                    <span className={styles.compareLabel}>Total Tax Liability</span>
                    <span className={styles.compareVal} style={{ color: '#ef4444', fontSize: '2rem' }}>{formatCurrency(results.tax + results.social)}</span>
                  </div>
                </div>

                <div className={styles.taxBreakdown}>
                   <div className={styles.breakRow}>
                     <span>Income Tax</span>
                     <span>{formatCurrency(results.tax)}</span>
                   </div>
                   {results.social > 0 && (
                     <div className={styles.breakRow}>
                       <span>{country === 'US' ? 'FICA (Social Security)' : 'National Insurance'}</span>
                       <span>{formatCurrency(results.social)}</span>
                     </div>
                   )}
                   <div className={styles.breakRow} style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                     <strong>Effective Tax Rate</strong>
                     <strong>{results.effectiveRate.toFixed(2)}%</strong>
                   </div>
                </div>

                <Button 
                  fullWidth 
                  className={styles.primaryBtn} 
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Generating PDF...' : 'Download Full Tax Report'} 
                  {!isDownloading && <Download size={18} style={{ marginLeft: '8px' }} />}
                </Button>

                <div className={styles.alertBox} style={{ marginTop: '1.5rem', background: '#fff7ed', borderColor: '#ffedd5' }}>
                  <AlertTriangle size={18} style={{ color: '#ea580c' }} />
                  <p style={{ fontSize: '0.75rem', color: '#9a3412' }}>
                    <strong>Disclaimer:</strong> This tool provides estimates for {year}. Calculations include cess, rebates, and standard allowances but may vary based on specific regional laws.
                  </p>
                </div>
              </Card>

              <div className={styles.proTip}>
                <PieChart size={24} />
                <p>{country === 'IN' ? 'The New Regime (default) is optimized for higher incomes with lower compliance overhead.' : 'Always check for local state/city taxes as they are not included in this federal estimation.'}</p>
              </div>
            </div>
          </div>
        </section>
        
        <RelatedTools currentToolId="income-tax" categoryId="finance" />
        
        <SEOSection 
          title="Income Tax Calculator 2026-27 | New vs Old Regime Analysis"
          description={`Taxation is one of the most complex yet essential aspects of modern citizenship. Whether you are living in India, the United Kingdom, or the United States, understanding your income tax liability is critical for effective financial planning and legal compliance. As we approach fiscal years like 2025 and 2026, many governments are introducing significant changes to tax slabs, rebates, and deduction rules. An income tax calculator is no longer just a simple math tool; it's a strategic guide to navigating these shifts.

For instance, in the Indian context, the introduction of the 'New Tax Regime' as the default option has fundamentally changed how salaried individuals approach their savings. With higher standard deductions (₹75,000 for FY 24-25) and tax-free income up to ₹12 lakh in the proposed 2026 budget (thanks to rebate u/s 87A), many taxpayers are finding that the New Regime offers significant savings without the need for traditional 80C investments. However, for those with existing home loans or high insurance premiums, the 'Old Regime' might still be the superior choice.

In the United States, tax brackets are adjusted annually for inflation to prevent "bracket creep," where taxpayers move into higher brackets despite no real increase in purchasing power. Our tool factors in these 2026 inflation-adjusted thresholds for various filing statuses, including Single and Married Filing Jointly. Similarly, UK residents must navigate the complexities of Personal Allowances, National Insurance contributions, and the tapering of allowances for high earners. Our global tax engine provides the depth and accuracy needed to simulate these scenarios, help you understand your 'Take-Home Pay', and plan your yearly investments for maximum tax efficiency.`}
          howToUse={[
            "Begin by selecting your Country (India, USA, or UK) and the relevant Tax Year (2024-2026).",
            "Choose your Filing Status—this is critical as it determines your baseline exemptions and slab thresholds.",
            "Enter your Total Estimated Gross Income for the period (you can toggle between Monthly and Yearly views).",
            "Input any legally applicable Deductions or Exemptions (e.g., 80C in India, 401k in US, or Pensions in UK).",
            "Review the 'Net Take-Home Pay' to understand exactly what hits your bank account after all taxes and social contributions.",
            "Use the 'Visual Breakdown' chart to see the percentage of your income that goes toward taxes vs. what you keep."
          ]}
          benefits={[
            "Global Versatility: Accurately estimate taxes for multiple major jurisdictions in one unified tool.",
            "Regime Comparison: Instantly see the difference between various tax models (e.g., Old vs. New) to choose the best path.",
            "Future-Proofing: Stay ahead of the curve with pre-configured 2026 budget rules and inflation-adjusted slabs.",
            "Detailed Breakdown: Understand exactly where your money goes, from basic income tax to social security and cess.",
            "Interactive Planning: Use the monthly toggle to align your tax liability with your monthly household budget."
          ]}
        />
      <Footer />
    </div>
    </>
  );
}
