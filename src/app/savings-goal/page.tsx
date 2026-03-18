import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import SavingsGoalClient from './SavingsGoalClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Savings Goal Calculator: Save for a House Down Payment by 2026",
  description: "Calculate how much you need to save monthly to reach your financial goals. Perfect for house down payment or emergency fund targets in 2026.",
  alternates: {
    canonical: 'https://finance.sociials.online/savings-goal',
  },
};

export default function SavingsGoalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Savings Goal Calculator",
    "description": "Plan your monthly savings to reach a target amount.",
    "url": "https://finance.sociials.online/savings-goal",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <SavingsGoalClient />
    </>
  );
}
