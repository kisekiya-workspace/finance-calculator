import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import GSTClient from './GSTClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "GST Calculator Online | GST Reverse Charge Mechanism Tool 2026 | Toolioz",
  description: "Calculate GST amounts quickly. Supports Reverse Charge Mechanism (RCM) and input tax credit analysis for 2026 tax regulations.",
  keywords: 'GST calculator online free, reverse charge mechanism tool, gst inclusive exclusive calculator, tax credit analyzer, gst rate checker',
  alternates: {
    canonical: 'https://toolioz.com/finance/gst-calculator',
  },
  openGraph: {
    title: 'Fast GST & RCM Calculator | Toolioz',
    description: 'Calculate net and gross values for GST compliant invoicing.',
    url: 'https://toolioz.com/finance/gst-calculator',
    type: 'website',
  }
};

export default function GSTCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Unified GST Calculator",
    "description": "Calculate GST inclusive and exclusive amounts.",
    "url": "https://toolioz.com/finance/gst-calculator",
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

      "ratingValue": "4.9",

      "ratingCount": "14200"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <GSTClient />
    </>
  );
}
