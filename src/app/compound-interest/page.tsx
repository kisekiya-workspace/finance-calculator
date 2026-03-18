import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import CompoundInterestClient from './CompoundInterestClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compound Interest Calculator: Daily, Monthly & Yearly Compounding 2026",
  description: "Calculate your investment growth with various compounding frequencies. Elite tool for daily compound interest calculations with deposits in 2026.",
  alternates: {
    canonical: 'https://finance.sociials.online/compound-interest',
  },
};

export default function CompoundInterestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Compound Interest Calculator",
    "description": "Calculate compound interest with various frequencies.",
    "url": "https://finance.sociials.online/compound-interest",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <CompoundInterestClient />
    </>
  );
}
