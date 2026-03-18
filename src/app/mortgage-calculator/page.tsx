import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator 2026: FHA & VA Loan EMI with PMI",
  description: "Calculate monthly mortgage payments, including PMI, taxes, and insurance. Easy FHA mortgage affordability tool for 2026 property planning.",
  alternates: {
    canonical: 'https://finance.sociials.online/mortgage-calculator',
  },
};

export default function MortgageCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Professional Mortgage Calculator",
    "description": "Calculate monthly mortgage payments and total interest payback.",
    "url": "https://finance.sociials.online/mortgage-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <MortgageClient />
    </>
  );
}
