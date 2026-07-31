"use client";

import styles from "./page.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteFooter from "./components/SiteFooter";
import Navbar from "./components/Navbar";
import { Truck, Coins, FastForward, Package, PackageOpen, Box } from "lucide-react";

const homeHeroSlides = [
  {
    image: "/cargo1.jpg",
    subtitle: "OPTIMUXEXPRESS DELIVERY",
    title: (
      <>
        Delivering Efficiency.<br />
        Driving Growth.
      </>
    ),
  },
  {
    image: "/cargo2.jpg",
    subtitle: "REAL-TIME TRACKING",
    title: (
      <>
        Delivering Growth<br />
        Through Reliability
      </>
    ),
  },
];

const testimonials = [
  {
    name: "Michael Ross",
    image: "/man4.jpg",
    text: "Their tracking system and on-time delivery rates are unmatched. We've seen a 25% improvement in turnaround time since partnering with them."
  },
  {
    name: "Sarah Jenkins",
    image: "/profile1.jpg",
    text: "Outstanding service! They handled our fragile shipments with the utmost care. I highly recommend them for any sensitive logistics needs."
  },
  {
    name: "David Chen",
    image: "/profile2.jpg",
    text: "A truly reliable partner for our e-commerce business. The priority freight service has saved us multiple times during peak seasons."
  }
];

export default function Home() {
  const router = useRouter();
  const [trackId, setTrackId] = useState("");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);

  useEffect(() => {
    const heroInterval = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % homeHeroSlides.length);
    }, 3000);

    const testiInterval = window.setInterval(() => {
      setActiveTestiIndex((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => {
      window.clearInterval(heroInterval);
      window.clearInterval(testiInterval);
    };
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) {
      router.push(`/track?id=${encodeURIComponent(trackId.trim())}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero Section (Tanspot Style) */}
      <section className={styles.heroNew}>
        <div className={styles.heroNewBg}>
          <div className={styles.heroNewOrangeShape}></div>
          <div className={styles.heroNewDarkTriangle}></div>
        </div>

        <div className={styles.heroNewGrid}>
          {/* LEFT COLUMN */}
          <div className={styles.heroNewLeft}>
            <p className={styles.heroNewTagline}>SPECIALIST IN MODERN TRANSPORTATION</p>
            <h1 className={styles.heroNewTitle}>
              MODERN LOGISTIC<br />
              SERVICES<span className={styles.heroNewCursor}></span>
            </h1>
            <p className={styles.heroNewText}>
              Logistic service provider company plays a pivotal role in the global supply chain ecosystem managing.
            </p>
            <div className={styles.heroNewBottomRow}>
              <button className={styles.heroNewBtn} onClick={() => router.push("/contact")}>
                Discover More <span className={styles.heroNewBtnArrow}>&rarr;</span>
              </button>
              <div className={styles.heroNewReviews}>
                <div className={styles.heroNewAvatars}>
                  <img src="/profile1.jpg" alt="User" />
                  <img src="/profile2.jpg" alt="User" />
                  <img src="/profile3.jpg" alt="User" />
                </div>
                <div className={styles.heroNewReviewText}>
                  <strong>Customer Satisfied</strong>
                  <span>4.9 (15k reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Tracking Form */}
            <form
              className={styles.heroTrackForm}
              onSubmit={(e) => {
                e.preventDefault();
                if (trackId.trim()) router.push(`/track?id=${encodeURIComponent(trackId.trim())}`);
              }}
            >
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. EXSD-000001)"
                className={styles.heroTrackInput}
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
              />
              <button type="submit" className={styles.heroTrackBtn}>Track</button>
            </form>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.heroNewRight}>
            <div className={styles.heroNewTruckWrapper}>
              <img src="/gptruck.png" alt="Logistics Truck" className={styles.heroNewTruckImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Logistics Solutions */}
      <section className={styles.logisticsSection}>
        <div className={styles.logisticsInner}>
          <div className={styles.logisticsLeft}>
            <h2 className={styles.logisticsTitle}>
              Comprehensive<br />
              Logistics<br />
              Solutions
            </h2>
            <p className={styles.logisticsText}>
              Our comprehensive logistics services are designed to handle every stage of your supply chain with precision. From freight forwarding and warehousing .
            </p>
            <button type="button" className={styles.exploreBtn} onClick={() => router.push("/services")}>
              Explore Services &gt;
            </button>
          </div>

          <div className={styles.logisticsCards}>
            <div className={styles.lCard}>
              <img src="/cargo1.jpg" alt="Freight Forwarding" className={styles.lCardImg} />
              <div className={styles.lCardContent}>
                <h3>Freight Forwarding</h3>
              </div>
              <div className={styles.lCardArrow}>↗</div>
            </div>
            <div className={styles.lCard}>
              <img src="/cargo2.jpg" alt="Continental Ocean Freight" className={styles.lCardImg} />
              <div className={styles.lCardContent}>
                <h3>Continental Ocean Freight</h3>
              </div>
              <div className={styles.lCardArrow}>↗</div>
            </div>
          </div>
        </div>

        <div className={styles.logisticsStatsRow}>
          <div className={styles.lStat}>
            <h4>24+</h4>
            <p>Years of Experience</p>
          </div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}>
            <h4>67M+</h4>
            <p>Satisfied Clients</p>
          </div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}>
            <h4>83+</h4>
            <p>Delivery Monthly</p>
          </div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}>
            <h4>3457</h4>
            <p>Total Store</p>
          </div>
        </div>
      </section>

      {/* Supercharge Section (Replacing What We Do) */}
      <section className={styles.superchargeSection}>
        <div className={styles.superchargeBg}>
          <svg viewBox="0 0 800 600" className={styles.superchargeVector} preserveAspectRatio="xMidYMid slice">
            <path
              d="M100,500 C150,450 200,550 300,500 C400,450 350,300 450,300 C550,300 500,100 600,100 C700,100 750,200 800,150"
              fill="none"
              stroke="#4A56E2"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M0,400 C100,450 150,350 250,400 C350,450 400,200 500,250 C600,300 650,50 800,100"
              fill="none"
              stroke="#2E3785"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>
        <div className={styles.superchargeContent}>
          <h2 className={styles.superchargeTitle}>
            Safe & Reliable<br />Delivery Solutions
          </h2>
          <p className={styles.superchargeText}>
            Join thousands of businesses already using OptimuxExpress to simplify logistics, cut costs, and scale operations with ease.
          </p>
          <div className={styles.superchargeServices}>
            <div className={styles.scService}><span>✔</span> Ship & Delivery</div>
            <div className={styles.scService}><span>✔</span> Warehousing & Storage</div>
            <div className={styles.scService}><span>✔</span> Air Freight</div>
            <div className={styles.scService}><span>✔</span> Local Distribution</div>
          </div>
          <div className={styles.superchargeButtons}>
            <button className={styles.scBtnPrimary} onClick={() => router.push("/contact")}>
              Contact us <span>&rarr;</span>
            </button>
            <button className={styles.scBtnSecondary} onClick={() => router.push("/services")}>
              Get Started <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Redefine Logistics Section (Why Choose Us) */}
      <section className={styles.redefineSection}>
        <div className={styles.redefineLeft}>
          <h2 className={styles.redefineTitle}>
            THE <span>BEST</span> MOVERS AROUND
          </h2>
          <p className={styles.redefineSubtitle}>
            Partner With Us For Reliable, Transparent, And Efficient Logistics Solutions Tailored To Your Business Needs.
          </p>
          <div className={styles.redefineFeatures}>
            <div className={styles.rFeature}>
              <h4>PROFESSIONAL SERVICE</h4>
              <p>Our trained experts handle every parcel with care.</p>
            </div>
            <div className={styles.rFeature}>
              <h4>ALWAYS ON TIME</h4>
              <p>We pride ourselves on our punctuality.</p>
            </div>
            <div className={styles.rFeature}>
              <h4>24/7 EMERGENCY</h4>
              <p>Round-the-clock support for urgent shipments.</p>
            </div>
            <div className={styles.rFeature}>
              <h4>FLAT RATE FEES</h4>
              <p>Transparent and affordable pricing with no hidden charges.</p>
            </div>
          </div>
          <div className={styles.redefineButtons}>
            <button className={styles.rBtnPrimary} onClick={() => router.push("/contact")}>Get A Free Quote &gt;</button>
            <button className={styles.rBtnSecondary} onClick={() => router.push("/track")}>Track Shipment</button>
          </div>
        </div>

        <div className={styles.redefineRight}>
          <div className={styles.rCollage}>
            <div className={`${styles.cBox} ${styles.cYellow}`}></div>
            <div className={`${styles.cImg} ${styles.cPlane}`}>
              <img src="/cargo2.jpg" alt="Plane" />
            </div>
            <div className={`${styles.cImg} ${styles.cTruck}`}>
              <img src="/man4.jpg" alt="Truck" />
            </div>
            <div className={`${styles.cImg} ${styles.cWorker}`}>
              <img src="/man1.jpg" alt="Worker" />
            </div>
            <div className={`${styles.cBox} ${styles.cRed}`}></div>
            <div className={`${styles.cImg} ${styles.cShip}`}>
              <img src="/cargo1.jpg" alt="Ship" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Service / Special Care */}
      <section className={styles.premiumSection}>
        <div className={styles.premiumContent}>
          <div className={styles.premiumBadge}>Premium Service</div>
          <h2 className={styles.premiumTitle}>Special Care Packages,<br />Delivered with Precision</h2>
          <p className={styles.premiumText}>At OptimuxExpress, we understand the importance of handling special care packages with extra attention and precision. Whether it&apos;s fragile, high-value, or time-sensitive, our team ensures secure, on-time delivery with top-notch tracking and support.</p>

          <div className={styles.premiumGrid}>
            <div className={styles.pItem}>
              <span className={styles.pIcon}>📦</span>
              <span>Fragile Item Protection</span>
            </div>
            <div className={styles.pItem}>
              <span className={styles.pIcon}>🌡️</span>
              <span>Temperature-Controlled Transport</span>
            </div>
            <div className={styles.pItem}>
              <span className={styles.pIcon}>⭐</span>
              <span>Full Insurance Coverage</span>
            </div>
            <div className={styles.pItem}>
              <span className={styles.pIcon}>⏱️</span>
              <span>Priority Handling</span>
            </div>
          </div>

          <button type="button" className={styles.premiumBtn} onClick={() => router.push("/about")}>Learn More &rarr;</button>

          <div className={styles.premiumChecks}>
            <span><span className={styles.pCheck}>✔</span> Insured Shipping</span>
            <span><span className={styles.pCheck}>✔</span> Real-time Tracking</span>
            <span><span className={styles.pCheck}>✔</span> 24/7 Support</span>
          </div>
        </div>
        <div className={styles.premiumImageWrapper}>
          <img src="/man5.jpg" alt="Premium Care" className={styles.premiumImg} />
          <div className={styles.premiumFloatingTop}>
            <span>⭐ Premium Care</span>
          </div>
          <div className={styles.premiumFloatingBottom}>
            <span className={styles.pIcon}>🛡️</span>
            <div>
              <h4>99.9%</h4>
              <p>Safe Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className={styles.commitSection}>
        <div className={styles.commitHeader}>
          <h2 className={styles.commitTitle}>Our Commitment to Seamless Logistics</h2>
          <p className={styles.commitSubtitle}>Delivering efficiency, security, and reliability—tailored to your needs.</p>
        </div>

        <div className={styles.commitGrid}>
          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><Truck size={32} /></div>
            <h3>Express Last-Mile Delivery</h3>
            <p>Distance is never a challenge. We pick up directly from your location and ensure safe, timely delivery anywhere you need. From urgent documents to large shipments, our dedicated fleet is ready for same-day deliveries.</p>
          </div>

          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><Coins size={32} /></div>
            <h3>OptimuxExpress Partner Program</h3>
            <p>Join our network and turn your vehicle into a steady source of income. Whether you have a bike, van, or truck, OptimuxExpress connects you with delivery requests while ensuring fair earnings.</p>
          </div>

          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><FastForward size={32} /></div>
            <h3>Priority Freight Services</h3>
            <p>Need your shipment to arrive on time, every time? Our priority shipping ensures your package is handled with urgency and care, making timely delivery a guarantee, not a possibility.</p>
          </div>

          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><Package size={32} /></div>
            <h3>Secure Storage Solutions</h3>
            <p>Whether you need short-term warehousing or long-term storage, OptimuxExpress offers secure, climate-controlled facilities to keep your goods safe until they're ready for transport.</p>
          </div>

          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><PackageOpen size={32} /></div>
            <h3>E-Commerce Fulfillment</h3>
            <p>Sell online? We handle inventory storage, order processing, and nationwide delivery—so you can focus on growing your business while we take care of logistics.</p>
          </div>

          <div className={styles.commitCard}>
            <div className={styles.commitIcon}><Box size={32} /></div>
            <h3>Specialized Cargo Handling</h3>
            <p>From medical equipment to high-tech devices, we specialize in handling delicate and valuable shipments with precision and care, ensuring they arrive in perfect condition.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testiBadge}>
          <span>✈</span> Client Testimonials
        </div>
        <h2 className={styles.testiMainTitle}>
          What Our Partners<br />Say About Us
        </h2>

        <div className={styles.testiCarousel}>
          <div className={styles.testiSide}>
            <img src={testimonials[(activeTestiIndex + testimonials.length - 1) % testimonials.length].image} alt="User" className={styles.testiPicSideActive} />
          </div>

          <div className={styles.testiActiveCard}>
            <img src={testimonials[activeTestiIndex].image} alt={testimonials[activeTestiIndex].name} className={styles.testiMainImg} />
            <div className={styles.testiContent}>
              <div className={styles.testiQuoteMark}>“</div>
              <p className={styles.testiText}>
                {testimonials[activeTestiIndex].text}
              </p>
              <div className={styles.testiAuthorInfo}>
                <span className={styles.testiAuthorName}>— {testimonials[activeTestiIndex].name}</span>
                <div className={styles.testiStars}>★★★★★</div>
              </div>
            </div>
          </div>

          <div className={styles.testiSide}>
            <img src={testimonials[(activeTestiIndex + 1) % testimonials.length].image} alt="User" className={styles.testiPicSideActive} />
          </div>
        </div>

        <div className={styles.testiControls}>
          <button className={styles.testiControlBtn} onClick={() => setActiveTestiIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}>&lt;</button>
          <button className={styles.testiControlBtn} onClick={() => setActiveTestiIndex((current) => (current + 1) % testimonials.length)}>&gt;</button>
        </div>
      </section>


      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked<br /><span>Questions</span></h2>
        </div>
        <div className={styles.faqContent}>
          <div className={styles.faqLeft}>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>How can I track my shipment?</p>
              <p className={styles.faqAnswer}>You can easily track your shipment by entering your tracking number in the track page or the hero section above.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>What are your delivery hours?</p>
              <p className={styles.faqAnswer}>We operate 24/7. Our emergency service ensures your packages are delivered at any time of the day.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Are there any hidden fees?</p>
              <p className={styles.faqAnswer}>No, we pride ourselves on flat rate fees. What you see is what you pay.</p>
            </div>
          </div>
          <div className={styles.faqRight}>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Do you offer international shipping?</p>
              <p className={styles.faqAnswer}>Yes, we deliver worldwide with reliable customs clearance processes to ensure smooth transit.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>How do I file a claim for a lost package?</p>
              <p className={styles.faqAnswer}>You can file a claim through our contact page by providing your tracking number and shipment details.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Can I change my delivery address?</p>
              <p className={styles.faqAnswer}>Address changes can be requested before the package is out for delivery through customer support.</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// Icons for Services
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <div className={styles.serviceInfo}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function ShipIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12l2-4h16l2 4M2 12v6h20v-6M6 8V4h12v4M9 4v4M15 4v4" />
      <path className="highlight" d="M12 4v4" />
      <path className="highlight" d="M4 14l16 2" />
    </svg>
  );
}

function WarehouseIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22V6l6-4 6 4v16M4 22h12M16 22v-8l6-3v11H16" />
      <path className="highlight" d="M8 12v4h4v-4H8z" />
      <rect className="highlight" x="18" y="14" width="2" height="4" />
    </svg>
  );
}

function AirplaneIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z" />
      <path className="highlight" d="M3 20h10" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16H2V6h14v10M16 8h4l3 4v4h-2M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm11 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path className="highlight" d="M16 12h5" />
    </svg>
  );
}

function ProfessionalIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
      <path d="M16 8h4v8h-4z" />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 8l-4 4h3c0 3.3-2.7 6-6 6-1 0-2-.3-2.8-.8l-1.5 1.5c1.2.9 2.7 1.3 4.3 1.3 4.4 0 8-3.6 8-8h3l-4-4zM6 12c0-3.3 2.7-6 6-6 1 0 2 .3 2.8.8l1.5-1.5C15.1 4.4 13.6 4 12 4 7.6 4 4 7.6 4 12H1l4 4 4-4H6z" />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
      <path d="M18 4h3v4h-3zM3 4h3v4H3z" />
    </svg>
  );
}

function FeesIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
    </svg>
  );
}
