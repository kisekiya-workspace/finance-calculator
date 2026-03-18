import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import FDClient from './FDClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fixed Deposit (FD) Calculator 2026: Maturity Value & Interest Returns",
  description: "Check your bank FD maturity value and total interest returns for 2026. Accurate quarterly compounding results in seconds with FinanceCalc.",
  alternates: {
    canonical: 'https://finance.sociials.online/fd-calculator',
  },
};

export default function FDCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Fixed Deposit Calculator",
    "description": "Calculate FD maturity amount and total interest.",
    "url": "https://finance.sociials.online/fd-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <FDClient />
    </>
  );
}
