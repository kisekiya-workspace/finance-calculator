import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import CompoundInterestClient from './CompoundInterestClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Daily, Monthly & Yearly Yield | Toolioz",
  description: "Calculate your investment growth with various compounding frequencies. Elite tool for daily compound interest with future value tracking in 2026.",
  keywords: 'Compound interest calculator daily, investment growth engine, high yield compounding tool, periodic deposits calculator, wealth growth visualizer',
  alternates: {
    canonical: 'https://toolioz.com/finance/compound-interest',
  },
  openGraph: {
    title: 'Advanced Compound Interest Engine | Toolioz',
    description: 'Visualize your wealth growth patterns with granular compounding adjustments.',
    url: 'https://toolioz.com/finance/compound-interest',
    type: 'website',
  }
};

export default function CompoundInterestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Compound Interest Calculator",
    "description": "Calculate compound interest with various frequencies.",
    "url": "https://finance.toolioz.online/compound-interest",
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

      "ratingValue": "4.7",

      "ratingCount": "9340"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <CompoundInterestClient />
    </>
  );
}
