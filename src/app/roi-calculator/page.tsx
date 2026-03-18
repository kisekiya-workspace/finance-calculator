import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import ROIClient from './ROIClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ROI Calculator: Real Estate, Stock & Rental Property Profit Analysis",
  description: "Calculate the return on investment for your real estate or stock portfolio. Professional ROI analysis tool for rental property profitability in 2026.",
  alternates: {
    canonical: 'https://finance.sociials.online/roi-calculator',
  },
};

export default function ROICalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "ROI Calculator",
    "description": "Calculate Return on Investment for any asset.",
    "url": "https://finance.sociials.online/roi-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <ROIClient />
    </>
  );
}
