import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import DevToolsClient from './DevToolsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Developer Tools | cURL, JSON Diff, JWT, Hash & Regex Utilities",
  description: "Practical, privacy-first developer tools for API debugging, JSON workflows, token inspection, hashing, and automation.",
  alternates: {
    canonical: 'https://toolioz.com/devtools',
  },
  openGraph: {
    title: 'Developer Tools | Toolioz',
    description:
      'Utilities for JSON, regex, JWT, cURL conversion, hashing, and API debugging workflows.',
    url: 'https://toolioz.com/devtools',
    type: 'website',
    images: [
      {
        url: '/tooliozLogo.png',
        width: 512,
        height: 512,
        alt: 'Toolioz Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools | Toolioz',
    description: 'Developer utilities for daily build and debugging workflows.',
    images: ['/tooliozLogo.png'],
  },
};

export default function DevToolsLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Developer Tools Suite",
    "url": "https://toolioz.com/devtools",
    "description": "A curated collection of practical tools for developer workflows, debugging, and security.",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <DevToolsClient />
    </>
  );
}
