import React from 'react';
import AboutClient from './AboutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Sociials / FinanceCalc",
  description: "Learn about Sociials / FinanceCalc's mission to provide precision financial tools and global tax calculations for everyone.",
  alternates: {
    canonical: 'https://finance.sociials.online/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
