import React from 'react';
import ContactClient from './ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Sociials / FinanceCalc",
  description: "Get in touch with the Sociials / FinanceCalc team for support, feedback, or tool suggestions.",
  alternates: {
    canonical: 'https://finance.sociials.online/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
