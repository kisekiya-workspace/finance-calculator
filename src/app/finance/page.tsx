import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import FinanceClient from './FinanceClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Finance Tools | Precision Tax & Investment Calculators 2026 | Toolioz",
  description: "Free, professional finance calculators for global users. SIP return calculators, New Tax Regime 2026 planners, EMI engines, and wealth growth analytics.",
  keywords: 'best sip calculator for 1 crore target, new tax regime vs old regime comparison 2026, home loan pre-payment savings calculator, future value of monthly investment 10 years, how much car loan can i afford based on salary, real return after inflation and tax india, systematic investment plan return estimator',
  alternates: {
    canonical: 'https://toolioz.com/finance',
  },
  openGraph: {
    title: 'Finance & Investment Calculator Suite | Toolioz',
    description: 'Empower your wealth management with precision financial utilities.',
    url: 'https://toolioz.com/finance',
    type: 'website',
    images: [
      {
        url: '/tooliozLogo.png',
        width: 512,
        height: 512,
        alt: 'Toolioz Finance Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Tools | Toolioz',
    description: 'Tax, investment, SIP, EMI, and planning calculators.',
    images: ['/tooliozLogo.png'],
  },
};

export default function FinanceLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Finance Tools Suite",
    "url": "https://toolioz.com/finance",
    "description": "A collection of high-precision financial tools for tax and investment planning.",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <FinanceClient />
    </>
  );
}
