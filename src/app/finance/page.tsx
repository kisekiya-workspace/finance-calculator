import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import FinanceClient from './FinanceClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Finance Tools | Precision Tax & Investment Calculators 2026 | Toolioz",
  description: "Free, professional finance calculators for global users. SIP return calculators, New Tax Regime 2026 planners, EMI engines, and wealth growth analytics.",
  keywords: 'Finance calculators free, SIP return calculator mutual funds, Income tax regime 2026, EMI calculator car loan mortgage, Investment profit analyzer',
  alternates: {
    canonical: 'https://toolioz.com/finance',
  },
  openGraph: {
    title: 'Finance & Investment Calculator Suite | Toolioz',
    description: 'Empower your wealth management with precision financial utilities.',
    url: 'https://toolioz.com/finance',
    type: 'website',
  }
};

export default function FinanceLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Finance Tools Suite",
    "url": "https://toolioz.online/finance",
    "description": "A collection of high-precision financial tools for tax and investment planning.",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <FinanceClient />
    </>
  );
}
