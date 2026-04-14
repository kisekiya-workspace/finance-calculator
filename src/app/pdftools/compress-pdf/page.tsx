import React from 'react';
import CompressPdfClient from './CompressPdfClient';
import { Metadata } from 'next';
import { JSONLD } from '@/components/ui/JSONLD';

export const metadata: Metadata = {
  title: 'Ultra-Deep PDF Compressor | Reduce PDF Size Online | Toolioz',
  description: 'Pro-grade PDF compression engine. Reduce file sizes significantly (e.g., 2MB to 200KB) while maintaining crisp text and image quality natively in-browser.',
  keywords: 'Compress PDF online fast, reduce pdf size without losing quality, best pdf compressor 2026, lossless pdf reduction, professional document optimizer',
  alternates: {
    canonical: 'https://toolioz.com/pdftools/compress-pdf',
  },
  openGraph: {
    title: 'High-Efficiency PDF Compression | Toolioz',
    description: 'Compress PDF files with surgeon-like precision using our advanced client-side engine.',
    url: 'https://toolioz.com/pdftools/compress-pdf',
    type: 'website',
  }
};

export default function CompressPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ultra-Deep PDF Compressor",
    "description": "Advanced PDF optimization utility that performs stream-level compression on images and document structures.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": "https://toolioz.com/pdftools/compress-pdf"
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <CompressPdfClient />
    </>
  );
}
