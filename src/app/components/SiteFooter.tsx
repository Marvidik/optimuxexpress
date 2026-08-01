import Link from "next/link";
import styles from "./footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLogo}>
          <img src="/newlog.png" alt="OptimuxExpress" style={{ height: '100px', objectFit: 'contain' }} />
        </div>
      </div>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.footerCol}>
          <h4>Services</h4>
          <Link href="/services#sea-shipping">Sea Shipping</Link>
          <Link href="/services#air-freight">Air Freight</Link>
          <Link href="/services#ground-logistics">Ground Logistics</Link>
          <Link href="/services#warehousing">Warehousing</Link>
          <Link href="/services#customs-clearance">Customs Clearance</Link>
          <Link href="/services#express-delivery">Express Delivery</Link>
        </div>
        <div className={styles.footerCol}>
          <h4>Support</h4>
          <Link href="/contact">Contact us</Link>
          <Link href="/contact">FAQ</Link>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerContact}>
            <span>contact@optimuxexpress.com </span>
          </div>
          <p><strong>Canada</strong></p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© OptimuxExpress, LLC.</p>
      </div>
    </footer>
  );
}
