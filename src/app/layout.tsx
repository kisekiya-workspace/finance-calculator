import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sociials / FinanceCalc | Expert Finance Calculators",
  description: "Highly accurate and free finance calculators for tax, compound interest, loans, and ROI. A Sociials project for financial clarity.",
  keywords: ["sociials", "financecalc", "income tax calculator 2026", "global tax calculator", "compound interest", "mortgage calculator"],
  authors: [{ name: "Sociials" }],
  openGraph: {
    title: "Sociials / FinanceCalc",
    description: "Expert finance calculators for daily use.",
    url: "https://finance.sociials.online",
    siteName: "Sociials FinanceCalc",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
