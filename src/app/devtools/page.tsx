import React from 'react';
import { JSONLD } from '@/components/ui/JSONLD';
import DevToolsClient from './DevToolsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Developer Tools | JSON, Base64 & Coding Utilities 2026",
  description: "Free, online developer tools. Format JSON, convert Base64, encode URLs, and more in seconds.",
  alternates: {
    canonical: 'https://toolioz.online/devtools',
  },
};

export default function DevToolsLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Developer Tools Suite",
    "url": "https://toolioz.online/devtools",
    "description": "A collection of handy tools for developers and coders.",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <DevToolsClient />
    </>
  );
}
