import React from 'react';
import PrivacyClient from './PrivacyClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Sociials / FinanceCalc",
  description: "Our commitment to your data privacy. Learn how Sociials / FinanceCalc handles information with transparency and security.",
  alternates: {
    canonical: 'https://finance.sociials.online/privacy-policy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
