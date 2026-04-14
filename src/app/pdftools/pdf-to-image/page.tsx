import React from 'react';
import PDFToImageClient from './PDFToImageClient';
import { Metadata } from 'next';
import { JSONLD } from '@/components/ui/JSONLD';

export const metadata: Metadata = {
  title: 'PDF to Image Converter | Export PDF to PNG/JPG | Toolioz',
  description: 'Convert your PDF pages into high-resolution PNG or JPG images instantly. Extract crisp visual assets from any PDF document natively in-browser.',
  keywords: 'PDF to image converter, export pdf to png online, convert pdf to jpg high quality, extract images from pdf, free pdf picture extractor',
  alternates: {
    canonical: 'https://toolioz.com/pdftools/pdf-to-image',
  },
  openGraph: {
    title: 'High-Fidelity PDF to Image Exporter | Toolioz',
    description: 'Transform your document pages into professional image assets instantly.',
    url: 'https://toolioz.com/pdftools/pdf-to-image',
    type: 'website',
  }
};

export default function PDFToImagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF Visual Asset Extractor",
    "description": "Conversion engine for transforming portable document pages into raster image formats like PNG and JPEG.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "url": "https://toolioz.com/pdftools/pdf-to-image"
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <PDFToImageClient />
    </>
  );
}
