import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import GSTClient from './GSTClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "GST Calculator Online: GST Reverse Charge Mechanism Tool 2026",
  description: "Calculate GST amounts quickly. Supports Reverse Charge Mechanism (RCM) and input tax credit analysis for 2026 tax regulations.",
  alternates: {
    canonical: 'https://finance.sociials.online/gst-calculator',
  },
};

export default function GSTCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Unified GST Calculator",
    "description": "Calculate GST inclusive and exclusive amounts.",
    "url": "https://finance.sociials.online/gst-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <GSTClient />
    </>
  );
}
