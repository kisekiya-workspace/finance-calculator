import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import CarLoanClient from './CarLoanClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator 2026: Auto Loan Interest Rates Online",
  description: "Calculate monthly installments for your vehicle loan accurately with 2026 interest rates. Professional auto loan engine for your dream car.",
  alternates: {
    canonical: 'https://finance.sociials.online/car-loan',
  },
};

export default function CarLoanCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Car Loan EMI Calculator",
    "description": "Calculate monthly EMIs for car loans.",
    "url": "https://finance.sociials.online/car-loan",
    "brand": {
      "@type": "Brand",
      "name": "Sociials / FinanceCalc"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <CarLoanClient />
    </>
  );
}
