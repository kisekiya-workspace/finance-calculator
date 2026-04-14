import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import FDClient from './FDClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fixed Deposit (FD) Calculator 2026 | Maturity Value & Interest | Toolioz",
  description: "Check your bank FD maturity value and total interest returns for 2026. Accurate quarterly compounding results in seconds with FinanceCalc.",
  keywords: 'FD calculator online, bank fixed deposit returns, maturity amount calculator, fd interest calculator india, quarterly compounding fd',
  alternates: {
    canonical: 'https://toolioz.com/finance/fd-calculator',
  },
  openGraph: {
    title: 'Precision Fixed Deposit Calculator | Toolioz',
    description: 'Accurately project your FD maturity amounts with compounding logic.',
    url: 'https://toolioz.com/finance/fd-calculator',
    type: 'website',
  }
};

export default function FDCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Fixed Deposit Calculator",
    "description": "Calculate FD maturity amount and total interest.",
    "url": "https://toolioz.com/finance/fd-calculator",
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

      "ratingCount": "8950"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <FDClient />
    </>
  );
}
