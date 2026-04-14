import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import ROIClient from './ROIClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ROI Calculator | Real Estate, Stock & Rental Profit Analysis | Toolioz",
  description: "Calculate the return on investment for your real estate or stock portfolio. Professional ROI analysis tool for rental property profitability in 2026.",
  keywords: 'ROI calculator online, rental property profit analyzer, stock return calculator, capital gains tool, investment yield calculator',
  alternates: {
    canonical: 'https://toolioz.com/finance/roi-calculator',
  },
  openGraph: {
    title: 'High-Precision ROI Analysis Engine | Toolioz',
    description: 'Analyze net gains and annualized returns for any asset class.',
    url: 'https://toolioz.com/finance/roi-calculator',
    type: 'website',
  }
};

export default function ROICalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "ROI Calculator",
    "description": "Calculate Return on Investment for any asset.",
    "url": "https://toolioz.com/finance/roi-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <ROIClient />
    </>
  );
}
