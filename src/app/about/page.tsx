import styles from "./about.module.css";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import Navbar from "../components/Navbar";

import { Ship, Plane, Truck, Warehouse, ClipboardCheck, Zap, FastForward, ShieldCheck, Globe2, Handshake } from "lucide-react";

const aboutServices = [
  { icon: <Ship size={32} color="#f75d34" />, title: "Sea Shipping", desc: "Full container and LCL options across all major ocean trade routes worldwide." },
  { icon: <Plane size={32} color="#f75d34" />, title: "Air Freight", desc: "Fast, reliable air freight for time-sensitive shipments with real-time tracking." },
  { icon: <Truck size={32} color="#f75d34" />, title: "Ground Logistics", desc: "Domestic and cross-border land transport with comprehensive tracking coverage." },
  { icon: <Warehouse size={32} color="#f75d34" />, title: "Warehousing", desc: "Climate-controlled storage with advanced inventory management and fulfillment." },
  { icon: <ClipboardCheck size={32} color="#f75d34" />, title: "Customs Clearance", desc: "Expert brokerage ensuring smooth regulatory compliance at all international borders." },
  { icon: <Zap size={32} color="#f75d34" />, title: "Express Delivery", desc: "Same-day and next-day express delivery with guaranteed delivery windows." },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero — Tanspot Style */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrange}></div>
          <div className={styles.heroDark}></div>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <p className={styles.heroTagline}>OUR STORY</p>
            <h1 className={styles.heroTitle}>
              About<br />
              <span>OptimuxExpress</span>
            </h1>
            <p className={styles.heroSub}>
              Delivering trust and speed across the globe for over 23 years.
            </p>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroTruckWrapper}>
              <img src="/gplane.png" alt="OptimuxExpress Plane" className={styles.heroTruck} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection}>
        <div className={styles.missionLeft}>
          <div className={styles.sectionBadge}>WHO WE ARE</div>
          <h2>A Logistics Company<br /><span>Built on Trust</span></h2>
          <p>OptimuxExpress is a leading global logistics and express delivery company dedicated to providing seamless, fast, and secure transportation solutions. With state-of-the-art tracking systems and a robust international network, we guarantee the safety of your packages from dispatch to delivery.</p>
          <p>Since our founding in 2001, we have grown from a small local courier service into a trusted name in international freight and logistics, serving over 12,000 clients across 80+ countries.</p>
          <div className={styles.statsRow}>
            <div className={styles.stat}><h3>23+</h3><p>Years Experience</p></div>
            <div className={styles.stat}><h3>12K</h3><p>Happy Clients</p></div>
            <div className={styles.stat}><h3>80+</h3><p>Countries</p></div>
          </div>
        </div>
        <div className={styles.missionRight}>
          <img src="/man3.jpg" alt="Our team" className={styles.missionImg} />
          <div className={styles.missionBadge}>
            <span>🏆</span>
            <div>
              <h4>Award Winning</h4>
              <p>Best Logistics Company 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services on About Page */}
      <section className={styles.aboutServicesSection}>
        <div className={styles.sectionBadge}>WHAT WE OFFER</div>
        <h2 className={styles.aboutServicesTitle}>Our Core <span>Services</span></h2>
        <p className={styles.aboutServicesSub}>From ocean freight to last-mile delivery — comprehensive logistics tailored to every need.</p>
        <div className={styles.aboutServicesGrid}>
          {aboutServices.map((s, i) => (
            <Link key={i} href={`/services#${s.title.toLowerCase().replace(/\s+/g, "-")}`} className={styles.aboutSvcCard}>
              <div className={styles.aboutSvcIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className={styles.aboutSvcLearn}>Learn More →</span>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/services" className={styles.aboutSvcViewAll}>View All Services →</Link>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionBadge}>OUR CORE VALUES</div>
        <h2 className={styles.valuesTitle}>What Drives <span>Everything We Do</span></h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><FastForward size={48} color="#f75d34" /></div>
            <h3>Speed</h3>
            <p>We execute every delivery with a sense of urgency, because your time matters.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><ShieldCheck size={48} color="#f75d34" /></div>
            <h3>Security</h3>
            <p>Every shipment is tracked and insured end-to-end for your complete peace of mind.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><Globe2 size={48} color="#f75d34" /></div>
            <h3>Global Reach</h3>
            <p>Our network spans 80+ countries, ensuring no destination is too far.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}><Handshake size={48} color="#f75d34" /></div>
            <h3>Integrity</h3>
            <p>We are transparent in our pricing and honest in every customer interaction.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <p className={styles.ctaBadge}>GET STARTED TODAY</p>
            <h2>Ready to Ship with <span>Confidence?</span></h2>
            <p className={styles.ctaDesc}>Join thousands of satisfied businesses and individuals who trust OptimuxExpress for fast, secure, and affordable delivery solutions worldwide.</p>
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.ctaPrimary}>Contact Us &rarr;</Link>
            <Link href="/track" className={styles.ctaSecondary}>Track Shipment</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
