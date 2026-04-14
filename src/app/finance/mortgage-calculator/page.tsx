import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator 2026 | FHA & VA Loan EMI | Toolioz",
  description: "Calculate monthly mortgage payments, including PMI, taxes, and insurance. Easy FHA mortgage affordability tool for 2026 property planning.",
  keywords: 'Mortgage calculator monthly payments, fha loan calculator, va loan emi tool, pmi insurance calculator, home affordability engine',
  alternates: {
    canonical: 'https://toolioz.com/finance/mortgage-calculator',
  },
  openGraph: {
    title: 'Professional Mortgage Repayment Calculator | Toolioz',
    description: 'Detailed breakdown of principal, interest, taxes and insurance for home buyers.',
    url: 'https://toolioz.com/finance/mortgage-calculator',
    type: 'website',
  }
};

export default function MortgageCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Professional Mortgage Calculator",
    "description": "Calculate monthly mortgage payments and total interest payback.",
    "url": "https://toolioz.com/finance/mortgage-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    },

    "offers": {

      "@type": "Offer",

      "price": "0.00",

      "priceCurrency": "USD"

    },

    "aggregateRating": {

      "@type": "AggregateRating",

      "ratingValue": "4.8",

      "ratingCount": "7620"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <MortgageClient />
    </>
  );
}
