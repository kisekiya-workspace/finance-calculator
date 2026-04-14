import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import PortalClient from './PortalClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Toolioz | Advanced Finance, Developer & PDF Utility Suite",
  description: "Free, professional-grade tools for modern workflows. High-precision Finance calculators, secure Developer utilities, and pro PDF editors. All client-side and private.",
  keywords: 'Finance calculators 2026, professional developer tools, secure pdf editor online, sip return calculator, json formatter pro, high fidelity web tools',
  alternates: {
    canonical: 'https://toolioz.com',
  },
  openGraph: {
    title: 'Toolioz | The Ultimate Productivity Portal',
    description: 'A premium collection of high-accuracy tools for financial planning, software development, and document management.',
    url: 'https://toolioz.com',
    siteName: 'Toolioz',
    type: 'website',
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolioz",
    "url": "https://toolioz.com",
    "description": "All-in-one portal for precision finance, developer, and PDF tools.",
    "publisher": {
      "@type": "Organization",
      "name": "Toolioz",
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <PortalClient />
    </>
  );
}
