import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import PDFToolsClient from './PDFToolsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional PDF Tools | Merge, Split & Compress PDF Online | Toolioz",
  description: "Free, high-performance web-native PDF utilities. Merge PDF documents, compress file size with surgery-deep optimization, and convert formats securely.",
  keywords: 'Professional PDF tools online, merge pdf fast, compress pdf without loss, secure pdf utilities, browser-native pdf editor',
  alternates: {
    canonical: 'https://toolioz.com/pdftools',
  },
  openGraph: {
    title: 'Precision PDF Utility Suite | Toolioz',
    description: 'Manage, compress, and merge PDF files with advanced browser-native algorithms.',
    url: 'https://toolioz.com/pdftools',
    type: 'website',
  }
};

export default function PDFToolsLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "PDF Productivity Tools",
    "url": "https://toolioz.com/pdftools",
    "description": "A collection of secure and high-speed PDF manipulation utilities.",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <PDFToolsClient />
    </>
  );
}
