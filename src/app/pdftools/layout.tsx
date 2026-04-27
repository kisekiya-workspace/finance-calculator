import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'PDF utilities to merge, compress, convert, and optimize documents quickly with browser-safe workflows.',
  keywords: [
    'pdf tools',
    'merge pdf',
    'compress pdf',
    'pdf to image',
    'image compressor',
    'online pdf utility',
  ],
  openGraph: {
    siteName: 'Toolioz',
    type: 'website',
    images: [
      {
        url: '/tooliozLogo.png',
        width: 512,
        height: 512,
        alt: 'Toolioz PDF Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/tooliozLogo.png'],
  },
};

export default function PdfToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
