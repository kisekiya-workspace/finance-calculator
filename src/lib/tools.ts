import {
  TrendingUp,
  HomeIcon,
  Landmark,
  PiggyBank,
  Briefcase,
  Percent,
  CreditCard,
  Banknote,
  Car,
  Wallet,
  Calculator,
  FileText,
  Binary,
  Settings,
  Wrench,
  Code,
  FileSearch,
  Hash,
  Type,
  ImagePlus,
  Key,
  Clock,
  SearchCode,
  Link as LinkIcon,
  Asterisk,
  LayoutDashboard,
  Palette
} from 'lucide-react';

export type Category = 'finance' | 'devtools' | 'pdftools';

export interface Tool {
  id: string;
  title: string;
  desc: string;
  icon: any;
  href: string;
  color: string;
  category: Category;
  isTrending?: boolean;
}

export const TOOLS: Tool[] = [
  // Finance Tools
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    desc: 'Calculate how your money grows over time with interest compounding.',
    icon: TrendingUp,
    href: '/finance/compound-interest',
    color: '#3b82f6',
    category: 'finance',
    isTrending: true
  },
  {
    id: 'mortgage-calculator',
    title: 'Mortgage Calc',
    desc: 'Estimate your monthly mortgage payments and total interest.',
    icon: HomeIcon,
    href: '/finance/mortgage-calculator',
    color: '#8b5cf6',
    category: 'finance'
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    desc: 'Measure the profitability of an investment quickly.',
    icon: Briefcase,
    href: '/finance/roi-calculator',
    color: '#10b981',
    category: 'finance'
  },
  {
    id: 'sip-calculator',
    title: 'SIP Calculator',
    desc: 'Wealth generation through systematic monthly investments.',
    icon: Percent,
    href: '/finance/sip-calculator',
    color: '#2563eb',
    category: 'finance',
    isTrending: true
  },
  {
    id: 'gst-calculator',
    title: 'GST/Tax Calc',
    desc: 'Calculate tax amounts and total costs in seconds.',
    icon: CreditCard,
    href: '/finance/gst-calculator',
    color: '#374151',
    category: 'finance'
  },
  {
    id: 'fd-calculator',
    title: 'Fixed Deposit',
    desc: 'Guaranteed returns on your lump sum bank deposits.',
    icon: Banknote,
    href: '/finance/fd-calculator',
    color: '#0369a1',
    category: 'finance'
  },
  {
    id: 'savings-goal',
    title: 'Savings Goal',
    desc: 'Find out how much you need to save each month to hit your target.',
    icon: PiggyBank,
    href: '/finance/savings-goal',
    color: '#f59e0b',
    category: 'finance'
  },
  {
    id: 'inflation-calculator',
    title: 'Inflation Calc',
    desc: 'See how inflation affects the purchasing power of your money.',
    icon: Landmark,
    href: '/finance/inflation-calculator',
    color: '#ef4444',
    category: 'finance'
  },
  {
    id: 'car-loan',
    title: 'Car Loan EMI',
    desc: 'Calculate monthly installments for your dream vehicle.',
    icon: Car,
    href: '/finance/car-loan',
    color: '#06b6d4',
    category: 'finance'
  },
  {
    id: 'income-tax',
    title: 'Income Tax',
    desc: 'Professional Old vs New regime tax comparison & planning.',
    icon: Wallet,
    href: '/finance/income-tax',
    color: '#6366f1',
    category: 'finance',
    isTrending: true
  },

  // Dev Tools (Mocks)
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    desc: 'Prettify, validate, and minify your JSON data instantly.',
    icon: Code,
    href: '/devtools/json-formatter',
    color: '#f59e0b',
    category: 'devtools',
    isTrending: true
  },
  {
    id: 'base64-converter',
    title: 'Base64 Converter',
    desc: 'Encode and decode strings to and from Base64 format.',
    icon: Binary,
    href: '/devtools/base64-converter',
    color: '#3b82f6',
    category: 'devtools'
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    desc: 'Convert measurements between different units easily.',
    icon: Wrench,
    href: '/devtools/unit-converter',
    color: '#10b981',
    category: 'devtools'
  },
  {
    id: 'lorem-ipsum',
    title: 'Lorem Ipsum',
    desc: 'Generate placeholder text for your designs and layouts.',
    icon: Type,
    href: '/devtools/lorem-ipsum',
    color: '#6366f1',
    category: 'devtools'
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    desc: 'Decode, verify and inspect JSON Web Tokens securely.',
    icon: Key,
    href: '/devtools/jwt-decoder',
    color: '#f43f5e',
    category: 'devtools',
    isTrending: true
  },
  {
    id: 'cron-generator',
    title: 'Cron Generator',
    desc: 'Generate, parse and explain cron expression schedules.',
    icon: Clock,
    href: '/devtools/cron-generator',
    color: '#8b5cf6',
    category: 'devtools'
  },
  {
    id: 'regex-tester',
    title: 'RegExp Tester',
    desc: 'Test and debug Regular Expressions with live highlighting.',
    icon: SearchCode,
    href: '/devtools/regex-tester',
    color: '#10b981',
    category: 'devtools',
    isTrending: true
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder',
    desc: 'Encode and decode URLs or URI components instantly.',
    icon: LinkIcon,
    href: '/devtools/url-encoder',
    color: '#3b82f6',
    category: 'devtools'
  },
  {
    id: 'bcrypt-generator',
    title: 'Bcrypt Generator',
    desc: 'Generate and verify Bcrypt password hashes securely.',
    icon: Asterisk,
    href: '/devtools/bcrypt-generator',
    color: '#f59e0b',
    category: 'devtools'
  },
  {
    id: 'layout-generator',
    title: 'Layout Generator',
    desc: 'Visually build and test CSS Flexbox and Grid layouts.',
    icon: LayoutDashboard,
    href: '/devtools/layout-generator',
    color: '#ec4899',
    category: 'devtools',
    isTrending: true
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    desc: 'Generate secure v4 UUIDs in bulk effortlessly.',
    icon: Hash,
    href: '/devtools/uuid-generator',
    color: '#10b981',
    category: 'devtools'
  },
  {
    id: 'color-converter',
    title: 'Color Format Suite',
    desc: 'Convert seamlessly between HEX, RGB, HSL and CMYK.',
    icon: Palette,
    href: '/devtools/color-converter',
    color: '#8b5cf6',
    category: 'devtools',
    isTrending: true
  },

  // PDF Tools (Mocks)
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    desc: 'Combine multiple PDF files into one single document.',
    icon: FileText,
    href: '/pdftools/merge-pdf',
    color: '#ef4444',
    category: 'pdftools',
    isTrending: true
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    desc: 'Convert your PDF pages into high-quality JPG or PNG images.',
    icon: FileSearch,
    href: '/pdftools/pdf-to-image',
    color: '#ec4899',
    category: 'pdftools'
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    desc: 'Reduce the file size of your PDF while keeping quality.',
    icon: Settings,
    href: '/pdftools/compress-pdf',
    color: '#14b8a6',
    category: 'pdftools'
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    desc: 'Reduce image file size for web while maintaining visual quality.',
    icon: ImagePlus,
    href: '/pdftools/image-compressor',
    color: '#3b82f6',
    category: 'pdftools',
    isTrending: true
  }
];

export const CATEGORIES = [
  {
    id: 'finance',
    title: 'Finance Tools',
    desc: 'Calculators for tax, investments, and personal finance.',
    color: '#3b82f6',
    icon: Landmark
  },
  {
    id: 'devtools',
    title: 'Developer Tools',
    desc: 'Utilities for coding, formatting, and data conversion.',
    color: '#f59e0b',
    icon: Code
  },
  {
    id: 'pdftools',
    title: 'PDF Utilities',
    desc: 'Simple tools to merge, split, and compress PDF files.',
    color: '#ef4444',
    icon: FileText
  }
];
