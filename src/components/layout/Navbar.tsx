'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';

const CATEGORIES = [
  {
    name: 'Tax & GST',
    tools: [
      { name: 'Income Tax', href: '/income-tax' },
      { name: 'GST Calculator', href: '/gst-calculator' },
    ]
  },
  {
    name: 'Investment',
    tools: [
      { name: 'SIP Calculator', href: '/sip-calculator' },
      { name: 'Compound Interest', href: '/compound-interest' },
      { name: 'Fixed Deposit', href: '/fd-calculator' },
      { name: 'ROI Calculator', href: '/roi-calculator' },
    ]
  },
  {
    name: 'Loans',
    tools: [
      { name: 'Mortgage Calc', href: '/mortgage-calculator' },
      { name: 'Car Loan EMI', href: '/car-loan' },
    ]
  },
  {
    name: 'Planning',
    tools: [
      { name: 'Savings Goal', href: '/savings-goal' },
      { name: 'Inflation Calc', href: '/inflation-calculator' },
    ]
  }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setActiveDropdown('tools');
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setCloseTimeout(timeout);
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [closeTimeout]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <span>Sociials / <span className={styles.accent}>FinanceCalc</span></span>
          </Link>

          {/* Desktop Links */}
          <div className={styles.desktopLinks}>
            <div
              className={styles.dropdownTrigger}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={styles.navBtn}>
                All Tools <ChevronDown size={14} className={activeDropdown === 'tools' ? styles.rotate : ''} />
              </button>

              {activeDropdown === 'tools' && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaGrid}>
                    {CATEGORIES.map(cat => (
                      <div key={cat.name} className={styles.megaCat}>
                        <h4 className={styles.catTitle}>{cat.name}</h4>
                        <div className={styles.catLinks}>
                          {cat.tools.map(tool => (
                            <Link key={tool.href} href={tool.href} className={styles.megaLink}>
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          {/* Mobile Toggle */}
          <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileOpen : ''}`}>
        <div className="container">
          <div className={styles.mobileContainer}>
            {CATEGORIES.map(cat => (
              <div key={cat.name} className={styles.mobileCat}>
                <h4 className={styles.mobileCatTitle}>{cat.name}</h4>
                <div className={styles.mobileCatLinks}>
                  {cat.tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={styles.mobileLink}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{tool.name}</span>
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.mobileFooter}>
              <Link href="/about" className={styles.link} onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/contact" className={styles.link} onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
