'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateTax } from '@/lib/formulas';
import { CreditCard, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { SEOSection } from '@/components/ui/SEOSection';
import styles from './page.module.css';

const TAX_SLABS = [5, 12, 18, 28];

export default function GSTClient() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [result, setResult] = useState({ taxAmount: 0, totalAmount: 0, baseAmount: 0 });

  useEffect(() => {
    setResult(calculateTax(amount, rate, isInclusive));
  }, [amount, rate, isInclusive]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 2 
    }).format(val);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>GST Calculator Online India</h1>
            <p className={styles.subtitle}>Calculate GST on services India with Reverse Charge Mechanism (RCM) support.</p>
          </div>
        </header>

        <section className="container section">
          <div className={styles.mainGrid}>
            <div className={styles.calcCol}>
              <Card className={styles.inputCard}>
                <div className={styles.toggleGroup}>
                  <button 
                    className={`${styles.toggleBtn} ${!isInclusive ? styles.activeToggle : ''}`}
                    onClick={() => setIsInclusive(false)}
                  >
                    Tax Exclusive (Add Tax)
                  </button>
                  <button 
                    className={`${styles.toggleBtn} ${isInclusive ? styles.activeToggle : ''}`}
                    onClick={() => setIsInclusive(true)}
                  >
                    Tax Inclusive (Remove Tax)
                  </button>
                </div>

                <div className={styles.inputGroup}>
                  <Input 
                    label={isInclusive ? "Total Amount (Incl. Tax)" : "Amount (Excl. Tax)"}
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    prefix="₹"
                  />
                  <div className={styles.rateField}>
                    <Input 
                      label="GST Rate (%)" 
                      type="number" 
                      value={rate} 
                      onChange={(e) => setRate(Number(e.target.value))}
                      suffix="%"
                    />
                    <div className={styles.slabs}>
                      {TAX_SLABS.map(s => (
                        <button key={s} className={styles.slabBtn} onClick={() => setRate(s)}>
                          {s}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.disclaimerBox}>
                  <AlertTriangle size={16} className={styles.warningIcon} />
                  <p>
                    <strong>Disclaimer:</strong> This tool provides estimated values for informational purposes only. Tax laws vary by jurisdiction. Please consult a qualified tax professional before filing.
                  </p>
                </div>
              </Card>

              <div className={styles.detailsBox}>
                <h3 className={styles.detailsTitle}>Calculation Breakdown</h3>
                <div className={styles.breakdownRow}>
                  <span>Net Amount</span>
                  <span>{formatCurrency(result.baseAmount)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>GST Amount ({rate}%)</span>
                  <span>{formatCurrency(result.taxAmount)}</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.breakdownRow} ${styles.totalRow}`}>
                  <span>Total Payable</span>
                  <span>{formatCurrency(result.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className={styles.resultCol}>
              <Card className={styles.resultCard} style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
                <h2 className={styles.resultLabel}>{isInclusive ? "Total Tax Included" : "Grand Total Amount"}</h2>
                <div className={styles.resultValue}>
                  {formatCurrency(isInclusive ? result.taxAmount : result.totalAmount)}
                </div>
                <div className={styles.benefitList}>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> Instant precise computation</div>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> Dual-mode computation</div>
                  <div className={styles.benefitItem}><CheckCircle2 size={16} /> Error-free formula</div>
                </div>
                <Button 
                  fullWidth 
                  className={styles.btn}
                  onClick={() => window.print()}
                >
                  Download Tax Invoice
                </Button>
              </Card>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon} style={{ color: '#1e293b' }}><Info size={20} /></div>
                <p className={styles.infoText}>
                  Accurate tax calculation is critical for business compliance. Our engine uses standard accounting rounding to ensure your numbers stay consistent with professional software.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection 
          title="GST Online: Reverse Charge Mechanism & Tax Computation 2026"
          description={`The Goods and Services Tax (GST) is a comprehensive, destination-based tax. Our GST online calculator for India 2026 helps businesses and accountants calculate GST on services India seamlessly, supporting the Reverse Charge Mechanism (RCM) for accurate tax filing and invoice generation.

One of the most common challenges in GST is distinguishing between GST-inclusive and GST-exclusive prices. An inclusive price means the tax is already part of the total amount shown to the consumer, while an exclusive price means the tax will be added on top of the base cost. Our advanced calculator handles both scenarios seamlessly. Whether you are a retailer trying to extract the tax component from your daily sales or a service provider calculating the total billable amount for a client, this tool provides the precision you need.

Beyond just basic calculation, our tool serves as an educational resource to understand the different tax slabs (typically 5%, 12%, 18%, and 28%). Different products and services fall into different categories, and knowing how these rates impact your profit margins is essential for competitive pricing. By using our unified tax engine, you can ensure your business accounting stays robust, minimize the risk of manual errors, and better manage your cash flow for quarterly tax payments.`}
          howToUse={[
            "Select the appropriate mode: 'Tax Exclusive' to add tax to a base price, or 'Tax Inclusive' to find the base price from a total.",
            "Enter the Principal Amount in your local currency.",
            "Choose a standard tax slab (5%, 12%, 18%, 28%) or input a custom percentage rate.",
            "Review the detailed breakdown, including the Net Amount, the GST Amount, and the Final Total.",
            "Verify the calculation against your invoice or purchase receipt for total accuracy.",
            "Use the 'Download Tax Invoice' button to generate a quick summary for your records."
          ]}
          benefits={[
            "Compliance Accuracy: Ensure your tax calculations align with government standards.",
            "Seamless Invoicing: Quickly calculate the tax component for both B2B and B2C transactions.",
            "Error Elimination: Avoid costly manual mistakes in GST filings and accounting books.",
            "Transparency: Clearly understand the tax burden being passed on to the consumer.",
            "Versatility: Suitable for freelancers, small business owners, and large corporations alike."
          ]}
        />
      <Footer />
    </div>
    </>
  );
}
