import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import InflationClient from './InflationClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Inflation Adjustment Calculator 2026 | Purchasing Power Loss | Toolioz",
  description: "Calculate the impact of inflation on your purchasing power in 2026. Adjust your future savings and investments with our precision engine.",
  keywords: 'Inflation calculator online, purchasing power deficit tool, currency devaluation analyzer, future value inflation adjusted, price index calculator',
  alternates: {
    canonical: 'https://toolioz.com/finance/inflation-calculator',
  },
  openGraph: {
    title: 'Inflation Impact & Savings Adjuster | Toolioz',
    description: 'Understand how much your money will be worth in the future with real-time inflation tracking.',
    url: 'https://toolioz.com/finance/inflation-calculator',
    type: 'website',
  }
};

export default function InflationCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Inflation Calculator",
    "description": "Calculate purchasing power loss over time due to inflation.",
    "url": "https://toolioz.com/finance/inflation-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <InflationClient />
    </>
  );
}
