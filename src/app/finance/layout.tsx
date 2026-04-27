import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Financial calculators for SIP, ROI, mortgage, income tax, GST, inflation, fixed deposits, and savings planning.',
  keywords: [
    'finance calculator',
    'sip calculator',
    'income tax calculator',
    'roi calculator',
    'mortgage calculator',
    'gst calculator',
    'inflation calculator',
    'fd calculator',
  ],
  openGraph: {
    siteName: 'Toolioz',
    type: 'website',
    images: [
      {
        url: '/tooliozLogo.png',
        width: 512,
        height: 512,
        alt: 'Toolioz Finance Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/tooliozLogo.png'],
  },
};

export default function FinanceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
