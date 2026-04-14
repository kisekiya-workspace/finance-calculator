'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ChevronRight, LayoutGrid, Landmark, Code, FileText, ExternalLink } from 'lucide-react';
import { CATEGORIES as TOOL_CATEGORIES, TOOLS } from '@/lib/tools';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import styles from './Navbar.module.css';

const MAIN_NAV = [
  { name: 'Finance', href: '/finance', id: 'finance', icon: Landmark, color: '#3b82f6' },
  { name: 'DevTools', href: '/devtools', id: 'devtools', icon: Code, color: '#f59e0b' },
  { name: 'PDFTools', href: '/pdftools', id: 'pdftools', icon: FileText, color: '#ef4444' }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  // Determine current category
  const currentCategoryId = MAIN_NAV.find(item => pathname.startsWith(item.href))?.id;
  const currentCategory = TOOL_CATEGORIES.find(c => c.id === currentCategoryId);
  const categoryTools = TOOLS.filter(t => t.category === currentCategoryId);

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
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.content}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/finance_toolioz.png"
                alt=""
                width={32}
                height={32}
                className={styles.logoImg}
              />
              <span>Toolioz</span>
            </Link>

            {/* Desktop Links */}
            <div className={styles.desktopLinks}>
              {MAIN_NAV.map(item => (
                <Link key={item.href} href={item.href} className={`${styles.link} ${pathname.startsWith(item.href) ? styles.activeLink : ''}`}>
                  <item.icon size={16} className={styles.linkIcon} style={{ color: item.color }} />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div
                className={styles.dropdownTrigger}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`${styles.navBtn} ${currentCategoryId ? styles.activeBtn : ''}`}>
                  <LayoutGrid size={16} />
                  <span>{currentCategoryId ? currentCategory?.title : 'Categories'}</span>
                  <ChevronDown size={14} className={activeDropdown === 'tools' ? styles.rotate : ''} />
                </button>

                {activeDropdown === 'tools' && (
                  <div className={styles.megaMenu}>
                    {currentCategoryId ? (
                      <div className={styles.toolsListing}>
                        <div className={styles.listingHeader}>
                          <h4>{currentCategory?.title} Collection</h4>
                          <Link href={`/${currentCategoryId}`} className={styles.viewAll}>View All <ChevronRight size={14} /></Link>
                        </div>
                        <div className={styles.toolsGrid}>
                          {categoryTools.map(tool => (
                            <Link key={tool.id} href={tool.href} className={styles.toolItem}>
                              <div className={styles.toolIconSm} style={{ color: tool.color }}>
                                <tool.icon size={18} />
                              </div>
                              <div className={styles.toolMeta}>
                                <span className={styles.toolTitle}>{tool.title}</span>
                                <span className={styles.toolDescShort}>{tool.desc}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.megaGrid}>
                        {TOOL_CATEGORIES.map(cat => (
                          <Link key={cat.id} href={`/${cat.id}`} className={styles.megaCat}>
                            <div className={styles.catIcon} style={{ color: cat.color }}>
                              <cat.icon size={20} />
                            </div>
                            <div className={styles.catInfo}>
                              <h4 className={styles.catTitle}>{cat.title}</h4>
                              <p className={styles.catDesc}>{cat.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
              {currentCategoryId && (
                <div className={styles.mobileSection}>
                  <h4 className={styles.mobileSectionTitle}>{currentCategory?.title}</h4>
                  <div className={styles.mobileCatLinks}>
                    {categoryTools.map(tool => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={styles.mobileIconWrapper} style={{ color: tool.color }}>
                          <tool.icon size={20} />
                        </div>
                        <span>{tool.title}</span>
                        <ExternalLink size={12} className={styles.mobileExt} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.mobileSection}>
                <h4 className={styles.mobileSectionTitle}>Categories</h4>
                <div className={styles.mobileCatLinks}>
                  {TOOL_CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/${cat.id}`}
                      className={`${styles.mobileLink} ${pathname === `/${cat.id}` ? styles.activeMobile : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={styles.mobileIconWrapper} style={{ color: cat.color }}>
                        <cat.icon size={20} />
                      </div>
                      <span>{cat.title} Hub</span>
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Breadcrumbs />
    </>
  );
};
