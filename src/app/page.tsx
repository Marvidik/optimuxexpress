"use client";

import styles from "./page.module.css";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SiteFooter from "./components/SiteFooter";
import Navbar from "./components/Navbar";
import {
  Truck,
  Coins,
  FastForward,
  Package,
  PackageOpen,
  Box,
  Plane,
  Warehouse,
  ClipboardList,
  CheckCircle,
  Ship,
  Globe,
  Zap,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */

const homeServices = [
  {
    id: "sea-shipping",
    icon: <Ship size={32} color="#f75d34" />,
    title: "Sea Shipping",
    desc: "We ensure it is as easy as possible to get your shipments moving across oceans worldwide with full container and LCL options.",
    image: "/cargo1.jpg",
  },
  {
    id: "air-freight",
    icon: <Plane size={32} color="#f75d34" />,
    title: "Air Freight",
    desc: "Fast and reliable air freight solutions for time-sensitive shipments with real-time tracking and door-to-door delivery.",
    image: "/air.jpg",
  },
  {
    id: "cargo-trailers",
    icon: <Truck size={32} color="#f75d34" />,
    title: "Ground Logistics",
    desc: "Domestic and international land transport with comprehensive tracking for all your ground shipping needs.",
    image: "/truc.jpg",
  },
  {
    id: "warehousing",
    icon: <Warehouse size={32} color="#f75d34" />,
    title: "Warehousing",
    desc: "Secure, climate-controlled storage facilities with inventory management and distribution services worldwide.",
    image: "/wayhouse.jpg",
  },
  {
    id: "trade-services",
    icon: <ClipboardList size={32} color="#f75d34" />,
    title: "Customs Clearance",
    desc: "Expert customs brokerage and documentation assistance to ensure smooth clearance at all international borders.",
    image: "/custom.jpg",
  },
  {
    id: "intermodal",
    icon: <Zap size={32} color="#f75d34" />,
    title: "Express Delivery",
    desc: "Same-day and next-day express delivery options for urgent shipments with guaranteed delivery windows.",
    image: "/cargo2.jpg",
  },
];

const deliverySteps = [
  {
    step: "01",
    label: "Book",
    title: "Book Shipment",
    desc: "Fill out our simple online form or call us to book your shipment in minutes.",
    icon: <ClipboardList size={32} color="#f75d34" />,
  },
  {
    step: "02",
    label: "Pickup",
    title: "Package Pickup",
    desc: "Our team collects your package from your location at the scheduled time.",
    icon: <Package size={32} color="#f75d34" />,
  },
  {
    step: "03",
    label: "Transit",
    title: "In Transit",
    desc: "Track your shipment in real-time as it moves through our global network.",
    icon: <Globe size={32} color="#f75d34" />,
  },
  {
    step: "04",
    label: "Delivered",
    title: "Delivered",
    desc: "Your package arrives safely at its destination with delivery confirmation.",
    icon: <CheckCircle size={32} color="#f75d34" />,
  },
];

const partners = [
  { name: "FedEx", logo: "/fedex.png" },
  { name: "UPS", logo: "/ups.png" },
  { name: "DHL", logo: "/dhl.jpeg" },
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Maersk", logo: "/maersk.png" },
  { name: "AliExpress", logo: "/ali.png" },
  { name: "Shopify", logo: "/shopify.png" },
  { name: "eBay", logo: "/ebay.jpeg" },
];

const testimonials = [
  {
    name: "Michael Ross",
    role: "Logistics Manager, TechCorp",
    image: "/man4.jpg",
    text: "Their tracking system and on-time delivery rates are unmatched. We've seen a 25% improvement in turnaround time since partnering with them. Absolutely outstanding service every single time.",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "E-commerce Director, StyleHub",
    image: "/profile1.jpg",
    text: "Outstanding service! They handled our fragile shipments with the utmost care. The team is professional, responsive, and always delivers on time. I highly recommend them for sensitive logistics needs.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "CEO, GlobalTrade Inc.",
    image: "/profile2.jpg",
    text: "A truly reliable partner for our e-commerce business. The priority freight service has saved us multiple times during peak seasons. Their customer support is exceptional — available 24/7.",
    stars: 5,
  },
];

const carouselSlides = [
  { image: "/cargo1.jpg", caption: "Container Port Operations" },
  { image: "/air.jpg", caption: "Ocean Freight in Transit" },
  { image: "/wayhouse.jpg", caption: "Warehouse & Distribution" },
  { image: "/truc.jpg", caption: "Last-Mile Delivery" },
  { image: "/air.jpg", caption: "Air Freight Solutions" },
  { image: "/mages4.jpg", caption: "Ground Logistics Fleet" },
];

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function Home() {
  const router = useRouter();
  const [trackId, setTrackId] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  const [quoteStatus, setQuoteStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [quoteData, setQuoteData] = useState({
    type: "",
    email: "",
    name: "",
    phone: "",
    fromCountry: "",
    weight: "",
    toCountry: "",
    deliveryDate: "",
  });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus("loading");
    try {
      const response = await fetch("https://formspree.io/f/meeybjzl", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(quoteData),
      });
      if (response.ok) {
        setQuoteStatus("success");
        setQuoteData({ type: "", email: "", name: "", phone: "", fromCountry: "", weight: "", toCountry: "", deliveryDate: "" });
      } else {
        setQuoteStatus("error");
      }
    } catch {
      setQuoteStatus("error");
    }
  };

  // carousel auto-advance
  useEffect(() => {
    const id = window.setInterval(
      () => setCarouselIdx((c) => (c + 1) % carouselSlides.length),
      4000
    );
    return () => window.clearInterval(id);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) router.push(`/track?id=${encodeURIComponent(trackId.trim())}`);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.heroNew}>
        <div className={styles.heroNewBg}>
          <div className={styles.heroNewOrangeShape}></div>
          <div className={styles.heroNewDarkTriangle}></div>
        </div>
        <div className={styles.heroNewGrid}>
          <div className={styles.heroNewLeft}>
            <p className={styles.heroNewTagline}>SPECIALIST IN MODERN TRANSPORTATION</p>
            <h1 className={styles.heroNewTitle}>
              Optimux LOGISTIC<br />SERVICES
              <span className={styles.heroNewCursor}></span>
            </h1>
            <p className={styles.heroNewText}>
              Our Logistic service provider company plays a pivotal role in the global supply chain ecosystem managing.
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
            <form className={styles.heroTrackForm} onSubmit={handleTrack}>
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
          <div className={styles.heroNewRight}>
            <div className={styles.heroNewTruckWrapper}>
              <img src="/gptruck.png" alt="Logistics Truck" className={styles.heroNewTruckImg} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPREHENSIVE LOGISTICS ── */}
      <section className={styles.logisticsSection}>
        <div className={styles.logisticsInner}>
          <div className={styles.logisticsLeft}>
            <h2 className={styles.logisticsTitle}>
              Comprehensive<br />Logistics<br />Solutions
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
              <div className={styles.lCardContent}><h3>Freight Forwarding</h3></div>
              <div className={styles.lCardArrow}>↗</div>
            </div>
            <div className={styles.lCard}>
              <img src="/cargo2.jpg" alt="Ocean Freight" className={styles.lCardImg} />
              <div className={styles.lCardContent}><h3>Continental Ocean Freight</h3></div>
              <div className={styles.lCardArrow}>↗</div>
            </div>
          </div>
        </div>
        <div className={styles.logisticsStatsRow}>
          <div className={styles.lStat}><h4>24+</h4><p>Years of Experience</p></div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}><h4>67M+</h4><p>Satisfied Clients</p></div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}><h4>83+</h4><p>Delivery Monthly</p></div>
          <div className={styles.lStatDivider}></div>
          <div className={styles.lStat}><h4>3457</h4><p>Total Store</p></div>
        </div>
      </section>

      {/* ── OUR SERVICES GRID ── */}
      <section className={styles.servicesGridSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>WHAT WE OFFER</span>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSub}>From ocean freight to last-mile delivery — we handle every stage of your shipment.</p>
        </div>
        <div className={styles.servicesGrid}>
          {homeServices.map((s) => (
            <Link key={s.id} href={`/services#${s.id}`} className={styles.svcCard}>
              <div className={styles.svcImgWrap}>
                <img src={s.image} alt={s.title} className={styles.svcImg} />
                <div className={styles.svcIconOverlay}>{s.icon}</div>
              </div>
              <div className={styles.svcCardBody}>
                <h3 className={styles.svcTitle}>{s.title}</h3>
                <p className={styles.svcDesc}>{s.desc}</p>
                <span className={styles.svcLearn}>Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.svcViewAll}>
          <Link href="/services" className={styles.svcViewAllBtn}>View All Services →</Link>
        </div>
      </section>

      {/* ── SAFE & RELIABLE ── */}
      <section className={styles.superchargeSection}>
        <div className={styles.superchargeBg}>
          <svg viewBox="0 0 800 600" className={styles.superchargeVector} preserveAspectRatio="xMidYMid slice">
            <path d="M100,500 C150,450 200,550 300,500 C400,450 350,300 450,300 C550,300 500,100 600,100 C700,100 750,200 800,150" fill="none" stroke="#4A56E2" strokeWidth="20" strokeLinecap="round" opacity="0.6" />
            <path d="M0,400 C100,450 150,350 250,400 C350,450 400,200 500,250 C600,300 650,50 800,100" fill="none" stroke="#2E3785" strokeWidth="12" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
        <div className={styles.superchargeContent}>
          <h2 className={styles.superchargeTitle}>Safe &amp; Reliable<br />Delivery Solutions</h2>
          <p className={styles.superchargeText}>Join thousands of businesses already using OptimuxExpress to simplify logistics, cut costs, and scale operations with ease.</p>
          <div className={styles.superchargeServices}>
            <div className={styles.scService}><span>✔</span> Ship &amp; Delivery</div>
            <div className={styles.scService}><span>✔</span> Warehousing &amp; Storage</div>
            <div className={styles.scService}><span>✔</span> Air Freight</div>
            <div className={styles.scService}><span>✔</span> Local Distribution</div>
          </div>
          <div className={styles.superchargeButtons}>
            <button className={styles.scBtnPrimary} onClick={() => router.push("/contact")}>Contact us <span>&rarr;</span></button>
            <button className={styles.scBtnSecondary} onClick={() => router.push("/services")}>Get Started <span>&rarr;</span></button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className={styles.redefineSection}>
        <div className={styles.redefineLeft}>
          <h2 className={styles.redefineTitle}>THE <span>BEST</span> MOVERS AROUND</h2>
          <p className={styles.redefineSubtitle}>Partner With Us For Reliable, Transparent, And Efficient Logistics Solutions Tailored To Your Business Needs.</p>
          <div className={styles.redefineFeatures}>
            <div className={styles.rFeature}><h4>PROFESSIONAL SERVICE</h4><p>Our trained experts handle every parcel with care.</p></div>
            <div className={styles.rFeature}><h4>ALWAYS ON TIME</h4><p>We pride ourselves on our punctuality.</p></div>
            <div className={styles.rFeature}><h4>24/7 EMERGENCY</h4><p>Round-the-clock support for urgent shipments.</p></div>
            <div className={styles.rFeature}><h4>FLAT RATE FEES</h4><p>Transparent and affordable pricing with no hidden charges.</p></div>
          </div>
          <div className={styles.redefineButtons}>
            <button className={styles.rBtnPrimary} onClick={() => router.push("/contact")}>Get A Free Quote &gt;</button>
            <button className={styles.rBtnSecondary} onClick={() => router.push("/track")}>Track Shipment</button>
          </div>
        </div>
        <div className={styles.redefineRight}>
          <div className={styles.rCollage}>
            <div className={`${styles.cBox} ${styles.cYellow}`}></div>
            <div className={`${styles.cImg} ${styles.cPlane}`}><img src="/cargo2.jpg" alt="Plane" /></div>
            <div className={`${styles.cImg} ${styles.cTruck}`}><img src="/man4.jpg" alt="Truck" /></div>
            <div className={`${styles.cImg} ${styles.cWorker}`}><img src="/man1.jpg" alt="Worker" /></div>
            <div className={`${styles.cBox} ${styles.cRed}`}></div>
            <div className={`${styles.cImg} ${styles.cShip}`}><img src="/cargo1.jpg" alt="Ship" /></div>
          </div>
        </div>
      </section>

      {/* ── PREMIUM SECTION ── */}
      <section className={styles.premiumSection}>
        <div className={styles.premiumContent}>
          <div className={styles.premiumBadge}>Premium Service</div>
          <h2 className={styles.premiumTitle}>Special Care Packages,<br />Delivered with Precision</h2>
          <p className={styles.premiumText}>At OptimuxExpress, we understand the importance of handling special care packages with extra attention and precision. Whether it&apos;s fragile, high-value, or time-sensitive, our team ensures secure, on-time delivery.</p>
          <div className={styles.premiumGrid}>
            <div className={styles.pItem}><span className={styles.pIcon}>📦</span><span>Fragile Item Protection</span></div>
            <div className={styles.pItem}><span className={styles.pIcon}>🌡️</span><span>Temperature-Controlled Transport</span></div>
            <div className={styles.pItem}><span className={styles.pIcon}>⭐</span><span>Full Insurance Coverage</span></div>
            <div className={styles.pItem}><span className={styles.pIcon}>⏱️</span><span>Priority Handling</span></div>
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
          <div className={styles.premiumFloatingTop}><span>⭐ Premium Care</span></div>
          <div className={styles.premiumFloatingBottom}>
            <span className={styles.pIcon}>🛡️</span>
            <div><h4>99.9%</h4><p>Safe Delivery</p></div>
          </div>
        </div>
      </section>


      {/* ── DELIVERY PROCESS (USING COMMIT SECTION DESIGN) ── */}
      <section className={styles.commitSection}>
        <div className={styles.commitHeader}>
          <span className={styles.sectionBadge}>HOW IT WORKS</span>
          <h2 className={styles.commitTitle}>Our Simple Delivery Process</h2>
          <p className={styles.commitSubtitle}>Four easy steps from booking to your doorstep delivery.</p>
        </div>
        <div className={styles.commitGrid}>
          {deliverySteps.map((step) => (
            <div className={styles.commitCard} key={step.step}>
              <div className={styles.commitIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMAGE CAROUSEL ── */}
      <section className={styles.carouselSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>GALLERY</span>
          <h2 className={styles.sectionTitle}>Our Operations in Action</h2>
          <p className={styles.sectionSub}>Showcasing our global logistics operations — ports, warehouses, deliveries, and more.</p>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack} style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
            {carouselSlides.map((slide, i) => (
              <div key={i} className={styles.carouselSlide}>
                <img src={slide.image} alt={slide.caption} className={styles.carouselImg} />
                <div className={styles.carouselCaption}>{slide.caption}</div>
              </div>
            ))}
          </div>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} onClick={() => setCarouselIdx((c) => (c - 1 + carouselSlides.length) % carouselSlides.length)}>‹</button>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} onClick={() => setCarouselIdx((c) => (c + 1) % carouselSlides.length)}>›</button>
          <div className={styles.carouselDots}>
            {carouselSlides.map((_, i) => (
              <button key={i} className={`${styles.carouselDot} ${i === carouselIdx ? styles.carouselDotActive : ""}`} onClick={() => setCarouselIdx(i)} />
            ))}
          </div>
        </div>

      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testiBadge}><span>✈</span> Client Testimonials</div>
        <h2 className={styles.testiMainTitle}>What Our Clients<br />Say About Us</h2>
        <div className={styles.testiGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testiCard}>
              <div className={styles.testiCardTop}>
                <img src={t.image} alt={t.name} className={styles.testiCardImg} />
                <div>
                  <div className={styles.testiCardName}>{t.name}</div>
                  <div className={styles.testiCardRole}>{t.role}</div>
                  <div className={styles.testiCardStars}>{"★".repeat(t.stars)}</div>
                </div>
              </div>
              <div className={styles.testiCardQuote}>"</div>
              <p className={styles.testiCardText}>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUSTED PARTNERS ── */}
      <section className={styles.partnersSection}>
        <div className={styles.partnersHeader}>
          <span className={styles.sectionBadge}>TRUSTED BY INDUSTRY LEADERS</span>
          <h2 className={styles.partnerTitle}>Our Trusted Partners</h2>
          <p className={styles.partnerSub}>Global brands that trust OptimuxExpress for their logistics needs.</p>
        </div>
        <div className={styles.partnerTickerOuter}>
          <div className={styles.partnerTicker} ref={tickerRef}>
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className={styles.partnerLogo}>
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{ height: "44px", width: "auto", objectFit: "contain" }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const next = target.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "block";
                  }}
                />
                <span style={{ display: "none", fontWeight: 800, fontSize: "1.2rem", color: "#112c34" }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST A QUOTE ── */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteHeader}>
            <span className={styles.sectionBadge}>GET STARTED</span>
            <h2>Request a Free Quote</h2>
          </div>
          <form className={styles.quoteForm} onSubmit={handleQuoteSubmit}>
            <div className={styles.quoteGroup}>
              <label>Freight Type *</label>
              <select className={styles.quoteSelect} value={quoteData.type} onChange={(e) => setQuoteData({ ...quoteData, type: e.target.value })} required>
                <option value="">-- Select Type --</option>
                <option value="Sea Shipping">Sea Shipping</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Ground Logistics">Ground Logistics</option>
              </select>
            </div>
            <div className={styles.quoteGroup}>
              <label>Email *</label>
              <input type="email" placeholder="your@email.com" className={styles.quoteInput} value={quoteData.email} onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })} required />
            </div>
            <div className={styles.quoteGroup}>
              <label>Full Name *</label>
              <input type="text" placeholder="Full Name" className={styles.quoteInput} value={quoteData.name} onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })} required />
            </div>
            <div className={styles.quoteGroup}>
              <label>Phone</label>
              <input type="tel" placeholder="Phone Number" className={styles.quoteInput} value={quoteData.phone} onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })} />
            </div>
            <div className={styles.quoteGroup}>
              <label>From Country *</label>
              <input type="text" placeholder="Departure Country" className={styles.quoteInput} value={quoteData.fromCountry} onChange={(e) => setQuoteData({ ...quoteData, fromCountry: e.target.value })} required />
            </div>
            <div className={styles.quoteGroup}>
              <label>Weight (KG)</label>
              <input type="number" placeholder="Total Weight" className={styles.quoteInput} value={quoteData.weight} onChange={(e) => setQuoteData({ ...quoteData, weight: e.target.value })} />
            </div>
            <div className={styles.quoteGroup}>
              <label>To Country *</label>
              <input type="text" placeholder="Recipient Country" className={styles.quoteInput} value={quoteData.toCountry} onChange={(e) => setQuoteData({ ...quoteData, toCountry: e.target.value })} required />
            </div>
            <div className={styles.quoteGroup}>
              <label>Expected Delivery</label>
              <input type="date" className={styles.quoteInput} value={quoteData.deliveryDate} onChange={(e) => setQuoteData({ ...quoteData, deliveryDate: e.target.value })} />
            </div>
            <button type="submit" className={styles.quoteSubmitBtn} disabled={quoteStatus === "loading"}>
              {quoteStatus === "loading" ? "Sending Request..." : "Submit Request"}
            </button>
            {quoteStatus === "success" && <p style={{ color: "#2e7d32", gridColumn: "1 / -1", textAlign: "center", marginTop: "1rem" }}>Thanks! Your quote request was sent successfully.</p>}
            {quoteStatus === "error" && <p style={{ color: "#c62828", gridColumn: "1 / -1", textAlign: "center", marginTop: "1rem" }}>Something went wrong. Please try again later.</p>}
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked<br /><span>Questions</span></h2>
        </div>
        <div className={styles.faqContent}>
          <div className={styles.faqLeft}>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>How can I track my shipment?</p><p className={styles.faqAnswer}>You can easily track your shipment by entering your tracking number in the track page or the hero section above.</p></div>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>What are your delivery hours?</p><p className={styles.faqAnswer}>We operate 24/7. Our emergency service ensures your packages are delivered at any time of the day.</p></div>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>Are there any hidden fees?</p><p className={styles.faqAnswer}>No, we pride ourselves on flat rate fees. What you see is what you pay.</p></div>
          </div>
          <div className={styles.faqRight}>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>Do you offer international shipping?</p><p className={styles.faqAnswer}>Yes, we deliver worldwide with reliable customs clearance processes to ensure smooth transit.</p></div>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>How do I file a claim for a lost package?</p><p className={styles.faqAnswer}>You can file a claim through our contact page by providing your tracking number and shipment details.</p></div>
            <div className={styles.faqItem}><p className={styles.faqQuestion}>Can I change my delivery address?</p><p className={styles.faqAnswer}>Address changes can be requested before the package is out for delivery through customer support.</p></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
