import React from 'react';
import MergePdfClient from './MergePdfClient';
import type { Metadata } from 'next';
import { JSONLD } from '@/components/ui/JSONLD';

export const metadata: Metadata = {
  title: "Fast Online PDF Merger | Combine PDF Files Securely | Toolioz",
  description: "Merge multiple PDF documents into a single professional file in seconds. High-speed, private, and 100% client-side PDF merging utility.",
  keywords: 'Merge PDF online free, combine pdf documents, join pdf files fast, secure pdf merger, multi-pdf tools',
  alternates: {
    canonical: 'https://toolioz.com/pdftools/merge-pdf',
  },
  openGraph: {
    title: 'Combine PDF Files Instantly | Toolioz',
    description: 'Merge and reorder PDF documents with our intuitive browser-native interface.',
    url: 'https://toolioz.com/pdftools/merge-pdf',
    type: 'website',
  }
};

export default function MergePdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "High-Speed PDF Merger",
    "description": "Utility for combining binary PDF streams into a singular cohesive document.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": "https://toolioz.com/pdftools/merge-pdf",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "16400"
    }
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <MergePdfClient />
    </>
  );
}
