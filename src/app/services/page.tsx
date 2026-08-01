"use client";

import React from "react";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import Navbar from "../components/Navbar";
import styles from "./services.module.css";
import {
  Globe,
  Package,
  Thermometer,
  Box,
  RefreshCw,
  Warehouse,
  ArrowLeftRight,
  Truck
} from "lucide-react";

const services = [
  {
    id: "trade-services",
    label: "Trade Services",
    icon: <Globe size={28} />,
    title: "Trade Services",
    headline:
      "What makes our service stand out from the crowd, however, is our ability to provide in-depth, expert knowledge of individual geographic trades and markets.",
    body: [
      "Regardless of your ocean freight needs, OptimuxExpress can provide customized, high-quality logistical solutions for all import shipping tasks. Whether it be large or small, valuable or not, or come with a high degree of complexity, our worldwide network of experienced offices and agents can make even the most complex transportation scenario simple and trouble-free.",
      "We are licensed as a Non-Vessel Operating Common Carrier or NVOCC. As such we can offer a comprehensive range of services including:",
    ],
    bullets: [
      "Customized freight solutions at competitive pricing",
      "Timely alerts and notices with track-and-trace monitoring",
      "ISF filing and full customs clearance",
      "Local trucking and door-to-door delivery",
      "Storage and warehouse options",
      "Complete purchase order management",
    ],
    image: "/custom.jpg",
  },
  {
    id: "dry-cargo",
    label: "Dry Cargo",
    icon: <Package size={28} />,
    title: "Dry Cargo",
    headline:
      "Full Container Load (FCL) and Less than Container Load (LCL) solutions for all types of dry goods across global trade lanes.",
    body: [
      "Our dry cargo services cover a comprehensive range of non-perishable goods transported in standard shipping containers. We specialize in FCL shipments for large volumes and LCL consolidation for smaller consignments, ensuring cost-effective solutions regardless of shipment size.",
      "Our network of carriers and agents ensures competitive rates and reliable transit times across all major trade routes.",
    ],
    bullets: [
      "FCL and LCL options for all cargo types",
      "Competitive rates on all major trade lanes",
      "Real-time shipment visibility and tracking",
      "Comprehensive cargo insurance coverage",
      "Expert documentation and customs support",
      "Door-to-door and port-to-port services",
    ],
    image: "/cargo2.jpg",
  },
  {
    id: "reefer-cargo",
    label: "Reefer Cargo",
    icon: <Thermometer size={28} />,
    title: "Reefer Cargo",
    headline:
      "Temperature-controlled shipping solutions that preserve the integrity and quality of your perishable goods throughout transit.",
    body: [
      "Our reefer cargo services are designed for the transportation of temperature-sensitive goods, including pharmaceuticals, fresh produce, seafood, and dairy products. We utilize state-of-the-art refrigerated containers equipped with advanced monitoring technology.",
      "Our 24/7 temperature monitoring ensures your cargo remains within the required temperature range from origin to destination, with real-time alerts and data logging.",
    ],
    bullets: [
      "24/7 temperature monitoring and alerts",
      "Wide range of temperature settings (-25°C to +25°C)",
      "Pharmaceutical-grade cold chain compliance",
      "Fresh produce and perishables specialists",
      "Emergency contingency planning",
      "Complete documentation and health certificates",
    ],
    image: "/mages1.jpg",
  },
  {
    id: "oversized-cargo",
    label: "Oversized Cargo",
    icon: <Box size={28} />,
    title: "Oversized & Breakbulk Cargo",
    headline:
      "Specialized heavy-lift and project cargo solutions for equipment, machinery, and oversized items that exceed standard container dimensions.",
    body: [
      "When your cargo doesn't fit into standard containers, OptimuxExpress has the expertise and equipment to handle it. Our specialist team manages the entire project logistics process from pre-shipment engineering surveys to final delivery.",
      "We work with a global network of specialized carriers, port agents, and heavy-lift specialists to ensure safe and efficient transportation of your most challenging cargo.",
    ],
    bullets: [
      "Pre-shipment engineering assessment",
      "Heavy-lift and project cargo expertise",
      "Flat rack, open-top, and mafi trailer solutions",
      "Port agency and stevedoring coordination",
      "Route surveys and permit acquisition",
      "Lashing, securing, and fumigation services",
    ],
    image: "/mages3.jpg",
  },
  {
    id: "intermodal",
    label: "Intermodal",
    icon: <RefreshCw size={28} />,
    title: "Intermodal Transport",
    headline:
      "Seamlessly combining sea, rail, road, and air transport for optimized supply chain solutions that balance cost and speed.",
    body: [
      "OptimuxExpress's intermodal services connect multiple modes of transport to create the most efficient route for your shipments. By strategically combining sea, rail, road, and air transport, we optimize cost, transit time, and reliability.",
      "Our end-to-end visibility platform provides a single view of your shipment across all transport modes, giving you complete control and transparency throughout the supply chain.",
    ],
    bullets: [
      "Sea-air and sea-rail combination services",
      "Single bill of lading for multi-modal moves",
      "End-to-end visibility across all transport modes",
      "Optimized routing for cost and transit balance",
      "Inland container depot (ICD) access",
      "Customs bonded transport solutions",
    ],
    image: "/mages2.jpg",
  },
  {
    id: "warehousing",
    label: "Warehousing",
    icon: <Warehouse size={28} />,
    title: "Warehousing & Storage",
    headline:
      "Secure, climate-controlled storage facilities with comprehensive inventory management and distribution services worldwide.",
    body: [
      "Our state-of-the-art warehouse facilities are strategically located at key logistics hubs worldwide. We offer flexible short and long-term storage solutions with advanced inventory management systems that give you real-time visibility into your stock levels.",
      "From receipt and put-away to pick-and-pack and distribution, our experienced warehouse teams handle every step of the fulfillment process with precision.",
    ],
    bullets: [
      "Short and long-term storage options",
      "Climate-controlled and bonded warehousing",
      "Advanced warehouse management system (WMS)",
      "Real-time inventory tracking and reporting",
      "Pick-and-pack and kitting services",
      "Last-mile delivery and distribution",
    ],
    image: "/mages4.jpg",
  },
  {
    id: "cross-trading",
    label: "Cross Trading",
    icon: <ArrowLeftRight size={28} />,
    title: "Cross Trading",
    headline:
      "Third-country trade solutions where goods are shipped from one country to another without passing through the exporter's home country.",
    body: [
      "OptimuxExpress excels in cross-trade operations, managing shipments between two countries that don't involve our home base. This is ideal for multinational companies looking to optimize their supply chain by shipping directly between manufacturing and consumption markets.",
      "Our global network ensures we have the local expertise and contacts needed to handle all regulatory, documentation, and logistics requirements in each country.",
    ],
    bullets: [
      "Third-country shipping expertise",
      "Multi-country documentation management",
      "Local regulatory compliance guidance",
      "Competitive cross-trade pricing",
      "Supply chain optimization consulting",
      "Global agent network in 80+ countries",
    ],
    image: "/cargo1.jpg",
  },
  {
    id: "cargo-trailers",
    label: "Cargo Trailers",
    icon: <Truck size={28} />,
    title: "Cargo Trailers",
    headline:
      "A full fleet of modern cargo trailers for domestic and cross-border road freight, ensuring safe and timely ground transportation.",
    body: [
      "Our extensive fleet of modern cargo trailers covers all your road freight needs, from standard dry van trailers to specialized flatbeds, low-boys, and tankers. We maintain our fleet to the highest standards to ensure reliability and safety on every journey.",
      "Our experienced drivers are licensed and trained to handle all types of cargo, ensuring your goods are transported safely and efficiently to their destination.",
    ],
    bullets: [
      "Diverse fleet: dry van, flatbed, refrigerated",
      "Cross-border customs expertise",
      "Real-time GPS tracking on all trailers",
      "Qualified, licensed, and trained drivers",
      "Hazmat transport certification",
      "Full cargo insurance and liability coverage",
    ],
    image: "/cargo2.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrange}></div>
          <div className={styles.heroDark}></div>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <p className={styles.heroTagline}>WHAT WE OFFER</p>
            <h1 className={styles.heroTitle}>
              Our <span>Services</span>
            </h1>
            <p className={styles.heroSub}>
              Comprehensive logistics solutions tailored to every cargo need —
              from trade services to specialized cargo handling.
            </p>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImgWrapper}>
              <img src="/gplane.png" alt="Shipping Services" className={styles.heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Alternating Layout */}
      <section className={styles.mainSection}>
        <div className={styles.mainInner}>
          {services.map((s, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={s.id}
                id={s.id}
                className={`${styles.serviceRow} ${isEven ? styles.serviceRowEven : styles.serviceRowOdd
                  }`}
              >
                <div className={styles.serviceImageCol}>
                  <div className={styles.imageWrapper}>
                    <img src={s.image} alt={s.title} className={styles.serviceImage} />
                    <div className={styles.serviceIconBadge}>{s.icon}</div>
                  </div>
                </div>
                <div className={styles.serviceContentCol}>
                  <h2 className={styles.serviceTitle}>{s.title}</h2>
                  <p className={styles.serviceHeadline}>{s.headline}</p>
                  <div className={styles.serviceBody}>
                    {s.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <ul className={styles.serviceList}>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.serviceCta}>
                    Get a Quote →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Strip */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaStripInner}>
          <div>
            <h3>Ready to ship with confidence?</h3>
            <p>Get in touch with our logistics experts today.</p>
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Contact Us →
            </Link>
            <Link href="/track" className={styles.ctaSecondary}>
              Track Shipment
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
