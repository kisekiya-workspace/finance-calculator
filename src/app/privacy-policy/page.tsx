import React from 'react';
import PrivacyClient from './PrivacyClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Your Data Security Matters | Toolioz",
  description: "Our commitment to 100% client-side data privacy. Learn how Toolioz handles information without server storage for maximum transparency.",
  keywords: 'Privacy policy, client-side security, no server storage, data protection transparency',
  alternates: {
    canonical: 'https://toolioz.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy & Data Security Policy | Toolioz',
    description: 'Transparency in how we handle your data—mostly by not handling it at all.',
    url: 'https://toolioz.com/privacy-policy',
    type: 'website',
  }
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
