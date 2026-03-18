import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import HomeClient from './HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sociials / FinanceCalc | Accurate Financial Tools & Tax Calculators 2026",
  description: "Free, professional-grade financial calculators for SIP for 1 crore, New Tax Regime 2026 comparisons, and premium Mortgage/ROI projections. Precise and minimal.",
  alternates: {
    canonical: 'https://finance.sociials.online',
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sociials / FinanceCalc",
    "url": "https://finance.sociials.online",
    "description": "Free, professional finance calculators for global users.",
    "publisher": {
      "@type": "Organization",
      "name": "Sociials",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finance.sociials.online/logo.png"
      }
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <HomeClient />
    </>
  );
}
