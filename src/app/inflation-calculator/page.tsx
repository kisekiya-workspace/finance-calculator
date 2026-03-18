import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import InflationClient from './InflationClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Inflation Adjustment Calculator 2026: Analyze Purchasing Power Loss",
  description: "Calculate the impact of inflation on your purchasing power in 2026. Adjust your future savings and investments with our precision engine.",
  alternates: {
    canonical: 'https://finance.sociials.online/inflation-calculator',
  },
};

export default function InflationCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Inflation Calculator",
    "description": "Calculate purchasing power loss over time due to inflation.",
    "url": "https://finance.sociials.online/inflation-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <InflationClient />
    </>
  );
}
