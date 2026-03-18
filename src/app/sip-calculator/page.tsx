import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import SIPClient from './SIPClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SIP Calculator Online: SIP Return Calculator for 1 Crore Target",
  description: "Calculate SIP returns for mutual funds. Plan your monthly SIP investment growth and learn how much to invest for a 1 crore goal in 2026.",
  alternates: {
    canonical: 'https://finance.sociials.online/sip-calculator',
  },
};

export default function SIPCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "SIP Calculator",
    "description": "Calculate returns on systematic investment plans.",
    "url": "https://finance.sociials.online/sip-calculator",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <SIPClient />
    </>
  );
}
