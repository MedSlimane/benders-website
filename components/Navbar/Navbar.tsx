"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Navbar.css";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#soul-science" },
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Show navbar after preloader delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500); // Match your preloader duration
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Update active pill position (blue - stays on current page)
  const updateActivePillPosition = useCallback((targetHref: string) => {
    const targetElement = linkRefs.current.get(targetHref);
    const pill = activePillRef.current;
    const nav = desktopNavRef.current;

    if (!targetElement || !pill || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = targetElement.getBoundingClientRect();

    gsap.to(pill, {
      x: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, []);

  // Update hover pill position (mint-cyan - appears on hover)
  const updateHoverPillPosition = useCallback((targetHref: string | null) => {
    const pill = hoverPillRef.current;
    const nav = desktopNavRef.current;

    if (!pill || !nav) return;

    if (!targetHref || targetHref === activeLink) {
      // Hide hover pill if not hovering or hovering over active link
      gsap.to(pill, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
      return;
    }

    const targetElement = linkRefs.current.get(targetHref);
    if (!targetElement) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = targetElement.getBoundingClientRect();

    gsap.to(pill, {
      x: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [activeLink]);

  // Initial active pill position
  useEffect(() => {
    const timer = setTimeout(() => {
      updateActivePillPosition(activeLink);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeLink, updateActivePillPosition]);

  // Update active pill when active link changes
  useGSAP(() => {
    updateActivePillPosition(activeLink);
  }, [activeLink, updateActivePillPosition]);

  // Update hover pill when hovering
  useGSAP(() => {
    updateHoverPillPosition(hoveredLink);
  }, [hoveredLink, updateHoverPillPosition]);

  // GSAP animation for hamburger
  useGSAP(() => {
    if (!hamburgerRef.current) return;
    
    const lines = hamburgerRef.current.querySelectorAll(".hamburger-line");
    
    if (isMenuOpen) {
      gsap.to(lines[0], {
        rotate: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(lines[1], {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(lines[2], {
        rotate: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(lines[0], {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(lines[1], {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(lines[2], {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(href);
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Menu animation variants
  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 48px) 48px)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 48px) 48px)",
      transition: {
        type: "spring" as const,
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const linkContainerVariants: Variants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants: Variants = {
    closed: {
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1] as const,
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0.55, 0.45, 1] as const,
      },
    },
  };

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""} ${
          isMenuOpen ? "navbar--menu-open" : ""
        } ${isVisible ? "navbar--visible" : "navbar--hidden"}`}
      >
        <div className="navbar__container">
          {/* Desktop Navigation - Horizontal Links */}
          <nav className="navbar__desktop" ref={desktopNavRef}>
            {/* Active Pill Background - Blue */}
            <div ref={activePillRef} className="navbar__pill navbar__pill--active" />
            {/* Hover Pill Background - Mint Cyan */}
            <div ref={hoverPillRef} className="navbar__pill navbar__pill--hover" />
            
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                }}
                className={`navbar__link ${
                  activeLink === link.href ? "navbar__link--active" : ""
                }`}
                onClick={(e) => handleLinkClick(link.href, e)}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hamburger Button - Mobile Only */}
          <button
            ref={hamburgerRef}
            className="navbar__hamburger"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line hamburger-line--top" />
            <span className="hamburger-line hamburger-line--middle" />
            <span className="hamburger-line hamburger-line--bottom" />
          </button>
        </div>
      </header>

      {/* Full Screen Menu - Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fullscreen-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="fullscreen-menu__content">
              <motion.nav
                className="fullscreen-menu__nav"
                variants={linkContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navLinks.map((link, index) => (
                  <div key={link.href} className="fullscreen-menu__link-wrapper">
                    <motion.div variants={linkVariants}>
                      <a
                        href={link.href}
                        className={`fullscreen-menu__link ${
                          activeLink === link.href ? "fullscreen-menu__link--active" : ""
                        }`}
                        onClick={(e) => handleLinkClick(link.href, e)}
                      >
                        <span className="fullscreen-menu__link-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="fullscreen-menu__link-text">
                          {link.label}
                        </span>
                      </a>
                    </motion.div>
                  </div>
                ))}
              </motion.nav>

              {/* Footer Info in Menu */}
              <motion.div
                className="fullscreen-menu__footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="fullscreen-menu__contact">
                  <span className="fullscreen-menu__label">Get in touch</span>
                  <a
                    href="mailto:contact@benders.io"
                    className="fullscreen-menu__email"
                  >
                    contact@benders.io
                  </a>
                </div>
                <div className="fullscreen-menu__socials">
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fullscreen-menu__social-link"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fullscreen-menu__social-link"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fullscreen-menu__social-link"
                  >
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
