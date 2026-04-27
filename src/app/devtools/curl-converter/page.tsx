import React from 'react';
import type { Metadata } from 'next';
import { JSONLD } from '@/components/ui/JSONLD';
import CurlConverterClient from './CurlConverterClient';

export const metadata: Metadata = {
  title: 'cURL Converter | Convert to Fetch, Axios & Python Requests',
  description:
    'Convert cURL commands into ready-to-use Fetch, Axios, and Python requests snippets in seconds.',
  alternates: {
    canonical: 'https://toolioz.com/devtools/curl-converter',
  },
  openGraph: {
    title: 'cURL Converter | Toolioz DevTools',
    description:
      'Parse cURL commands and generate JavaScript and Python request code instantly.',
    url: 'https://toolioz.com/devtools/curl-converter',
    type: 'website',
  },
};

export default function CurlConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'cURL Converter',
    description:
      'Developer utility to convert cURL commands into Fetch, Axios, and Python requests snippets.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    url: 'https://toolioz.com/devtools/curl-converter',
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <CurlConverterClient />
    </>
  );
}
