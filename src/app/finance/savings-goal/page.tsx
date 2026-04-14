import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import SavingsGoalClient from './SavingsGoalClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Savings Goal Calculator | Reach Your Target Amount by 2026 | Toolioz",
  description: "Calculate how much you need to save monthly to reach your financial goals. Perfect for house down payment or emergency fund targets in 2026.",
  keywords: 'Savings goal calculator, monthly savings target tool, emergency fund planner, down payment calculator, wealth building tool',
  alternates: {
    canonical: 'https://toolioz.com/finance/savings-goal',
  },
  openGraph: {
    title: 'Financial Milestone Savings Planner | Toolioz',
    description: 'Determine exactly how much you need to set aside to hit your big ticket milestones.',
    url: 'https://toolioz.com/finance/savings-goal',
    type: 'website',
  }
};

export default function SavingsGoalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Savings Goal Calculator",
    "description": "Plan your monthly savings to reach a target amount.",
    "url": "https://toolioz.com/finance/savings-goal",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <SavingsGoalClient />
    </>
  );
}
