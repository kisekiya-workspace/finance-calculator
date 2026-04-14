import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JSONLD } from "@/components/ui/JSONLD";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://toolioz.com'),
  title: {
    default: "Toolioz | Professional Finance & Developer Utilities",
    template: "%s | Toolioz"
  },
  description: "The ultimate developer and finance utility suite. Accurate tax calculators (Budget 2026), SIP planners, CSS grid generators, and secure PDF tools.",
  keywords: [
    "toolioz", 
    "income tax calculator 2026 india", 
    "sip calculator", 
    "css grid generator pro", 
    "v4 uuid generator", 
    "secure pdf merge", 
    "image compressor without data leak"
  ],
  authors: [{ name: "Toolioz Professional" }],
  icons: {
    icon: "/finance_toolioz.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Toolioz | Expert Multi-Utility Platform",
    description: "Free, high-performance tools for financial planning and software development.",
    url: "https://toolioz.com",
    siteName: "Toolioz",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "Toolioz Utility Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolioz | Professional Utilities",
    description: "Finance, DevTools & PDF processing at your fingertips.",
    images: ["/og-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Toolioz",
    "url": "https://toolioz.com",
    "logo": "https://toolioz.com/finance_toolioz.png"
  };

  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VM8TJM1RER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VM8TJM1RER');
          `}
        </Script>
        <JSONLD data={orgJsonLd} />
        <Navbar />
        <Breadcrumbs />
        <main>{children}</main>
      </body>
    </html>
  );
}
