import React from 'react';
import ImageCompressorClient from './ImageCompressorClient';
import { Metadata } from 'next';
import { JSONLD } from '@/components/ui/JSONLD';

export const metadata: Metadata = {
  title: 'Advanced Image Compressor | Secure Offline Optimization | Toolioz',
  description: 'Shrink JPEG, PNG, and WebP images with 100% data privacy. Use target file size logic and pro-grade quality controls. Zero-data-leak browser-native compression.',
  keywords: 'Image compressor online pro, zero loss jpeg compression, png optimizer secure, bulk image size reducer, offline image compression tool, webp converter',
  alternates: {
    canonical: 'https://toolioz.com/pdftools/image-compressor',
  },
  openGraph: {
    title: 'Toolioz Secure Image Optimizer | Professional Web Performance',
    description: 'Compress high-res images for the web instantly and securely without uploading to any server.',
    url: 'https://toolioz.com/pdftools/image-compressor',
    type: 'website',
  }
};

export default function ImageCompressorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Advanced Image Optimizer",
    "description": "Multi-format image compression engine with granular quality control and target file size logic.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "url": "https://toolioz.com/pdftools/image-compressor"
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <ImageCompressorClient />
    </>
  );
}
