import React from 'react';
import TermsClient from './TermsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | Sociials / FinanceCalc",
  description: "Terms and conditions for using the Sociials / FinanceCalc platform and its financial calculation tools.",
  alternates: {
    canonical: 'https://finance.sociials.online/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
