import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import IncomeTaxClient from './IncomeTaxClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Income Tax Calculator 2026-27 | New Slab ₹75k Standard Deduction | Toolioz",
  description: "Calculate mid-range and high-income tax for FY 2026-27. Compare New vs Old Tax Regime with latest Section 87A rebate and rebate u/s 115BAC.",
  keywords: 'Income tax calculator india 2026, new tax slabs fy 2026-27, standard deduction 75000, income tax on 12 lakh salary, rebate 87A 2026 budget',
  alternates: {
    canonical: 'https://toolioz.com/finance/income-tax',
  },
  openGraph: {
    title: 'Toolioz Income Tax Calculator FY 2026-27 | India New Budget',
    description: 'Expert comparison tool for New vs Old Tax Regimes in India with latest 2026 budget updates.',
    url: 'https://toolioz.com/finance/income-tax',
    type: 'website',
  }
};

export default function IncomeTaxPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Global Income Tax Calculator",
    "description": "Calculate income tax for India, US, and UK.",
    "url": "https://toolioz.com/finance/income-tax",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <IncomeTaxClient />
    </>
  );
}
