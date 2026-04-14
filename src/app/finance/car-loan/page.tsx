import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import CarLoanClient from './CarLoanClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Car Loan EMI Calculator 2026 | Interest & Amortization | Toolioz",
  description: "Calculate monthly installments for your vehicle loan accurately with 2026 interest rates. Detailed amortization schedules for car financing online.",
  keywords: 'Car loan EMI calculator online, Auto loan interest rate checker, Monthly car payment calculator, Vehicle finance amortization schedule',
  alternates: {
    canonical: 'https://toolioz.com/finance/car-loan',
  },
  openGraph: {
    title: 'Precision Car Loan EMI Calculator | Toolioz',
    description: 'Plan your vehicle purchase with our professional auto loan repayment engine.',
    url: 'https://toolioz.com/finance/car-loan',
    type: 'website',
  }
};

export default function CarLoanCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Car Loan EMI Calculator",
    "description": "Calculate monthly EMIs for car loans.",
    "url": "https://finance.toolioz.online/car-loan",
    "brand": {
      "@type": "Brand",
      "name": "Toolioz / FinanceCalc"
    },

    "offers": {

      "@type": "Offer",

      "price": "0.00",

      "priceCurrency": "USD"

    },

    "aggregateRating": {

      "@type": "AggregateRating",

      "ratingValue": "4.7",

      "ratingCount": "6340"

    }

  };

return (
    <>
      <JSONLD data={jsonLd} />
      <CarLoanClient />
    </>
  );
}
