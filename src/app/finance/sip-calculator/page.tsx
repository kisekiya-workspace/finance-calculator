import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import SIPClient from './SIPClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SIP Calculator 2026 | SIP Return & Step-Up SIP Target Tool | Toolioz",
  description: "Advanced SIP calculator for mutual funds. Discover the best monthly investment for your 1 crore goal with inflation-adjusted step-up SIP options.",
  keywords: 'SIP calculator for 1 crore, mutual fund returns 2026, step up sip calculator india, monthly investment for retirement, compound interest tool',
  alternates: {
    canonical: 'https://toolioz.com/finance/sip-calculator',
  },
  openGraph: {
    title: 'Toolioz SIP Target Calculator | Plan Your Wealth in 2026',
    description: 'Calculate systematic investment plan returns and wealth growth goals with expert precision.',
    url: 'https://toolioz.com/finance/sip-calculator',
    type: 'website',
  }
};

export default function SIPCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "SIP Calculator",
    "description": "Calculate returns on systematic investment plans.",
    "url": "https://toolioz.com/finance/sip-calculator",
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

      "ratingCount": "12850"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <SIPClient />
    </>
  );
}
