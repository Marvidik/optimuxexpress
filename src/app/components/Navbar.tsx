"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <Link href="/" className={styles.logo}>
        <img src="/newlog2.png" alt="OptimuxExpress" style={{ height: "60px", objectFit: "contain" }} />
      </Link>

      {/* Hamburger */}
      <div className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
        <div className={`${styles.bar} ${isOpen ? styles.bar1 : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.bar2 : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.bar3 : ""}`}></div>
      </div>

      <div className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <Link href="/" className={pathname === "/" ? styles.navActive : ""} onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/about" className={pathname === "/about" ? styles.navActive : ""} onClick={() => setIsOpen(false)}>About Us</Link>
        <Link href="/track" className={pathname === "/track" ? styles.navActive : ""} onClick={() => setIsOpen(false)}>Tracking</Link>
        <Link href="/contact" className={pathname === "/contact" ? styles.navActive : ""} onClick={() => setIsOpen(false)}>Contact</Link>
        <button
          className={styles.quoteBtn}
          onClick={() => { setIsOpen(false); router.push("/contact"); }}
        >
          Get a Quote
        </button>
      </div>
    </nav>
  );
}
