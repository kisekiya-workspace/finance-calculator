import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import IncomeTaxClient from './IncomeTaxClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Income Tax Calculator India FY 2026-27 | New vs Old Tax Regime Calculator",
  description: "Calculate your income tax liability for FY 2026-27 (AY 2027-28) with HRA exemptions and 80C deductions. Compare New vs Old regime easily.",
  alternates: {
    canonical: 'https://finance.sociials.online/income-tax',
  },
};

export default function IncomeTaxPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Global Income Tax Calculator",
    "description": "Calculate income tax for India, US, and UK.",
    "url": "https://finance.sociials.online/income-tax",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <IncomeTaxClient />
    </>
  );
}
