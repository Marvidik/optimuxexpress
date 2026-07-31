"use client";

import React, { useState, useEffect } from "react";
import styles from "./track.module.css";
import dynamic from "next/dynamic";
import SiteFooter from "../components/SiteFooter";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../../config";
import { useRouter } from "next/navigation";

const RealMap = dynamic(() => import("../components/RealMap"), { ssr: false });

// Map coin name (any case, short/full) to a logo image URL from cryptologos.cc
function getCoinLogo(coin: string): string {
  const normalized = coin.toLowerCase().replace(/[\s_-]/g, "");
  const mapping: Record<string, string> = {
    bitcoin: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    btc: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    eth: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    usdt: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    tether: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    usdc: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    usdcoin: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    binancecoin: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    solana: "https://cryptologos.cc/logos/solana-sol-logo.png",
    sol: "https://cryptologos.cc/logos/solana-sol-logo.png",
    xrp: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    ripple: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    litecoin: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    ltc: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    dogecoin: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    doge: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    tron: "https://cryptologos.cc/logos/tron-trx-logo.png",
    trx: "https://cryptologos.cc/logos/tron-trx-logo.png",
    polygon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    matic: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    cardano: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    ada: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    ton: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
    toncoin: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
    shiba: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    shib: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    shibainu: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  };
  return mapping[normalized] || `https://cryptologos.cc/logos/${normalized}-logo.png`;
}

interface ShipmentData {
  trackingId: string;
  status: string;
  isMoving: boolean;
  movementStatus: string;
  currentLocation: string;
  currentLocationLatitude: number | null;
  currentLocationLongitude: number | null;
  origin: string;
  destination: string;
  originLatitude: number | null;
  originLongitude: number | null;
  destLatitude: number | null;
  destLongitude: number | null;
  latestUpdate: string;
  expectedDelivery: string;
  receiver: { name: string; phone: string; email: string; address: string; };
  sender: { name: string; phone: string; email: string; address: string; };
  shipment: {
    origin: string; destination: string; package: string; carrier: string;
    type: string; mode: string; referenceNo: string; product: string;
    quantity: number; paymentMode: string; totalFreight: string; totalWeight: string;
  };
  goodsImages: string[];
  timeline: Array<{ status: string; location: string; date: string; done: boolean; active: boolean; latitude: number | null; longitude: number | null; timestamp: number | null }>;
}

function normalizeGoodsImages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function Barcode({ value }: { value: string }) {
  const bars = value.split("").map((c) => c.charCodeAt(0) % 4);
  return (
    <div className={styles.barcodeWrapper}>
      <div className={styles.barcodeStripes}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className={styles.barLine} style={{ width: (bars[i % bars.length] + 1) * 1.5 + "px" }} />
        ))}
      </div>
      <p className={styles.barcodeText}>{value}</p>
    </div>
  );
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [error, setError] = useState("");
  const [heroImage, setHeroImage] = useState("/cargo1.jpg");
  const router = useRouter();

  // Wallet state
  type WalletEntry = { id: number; show_wallet: boolean; coin: string; wallet_address: string; network: string; };
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [wallets, setWallets] = useState<WalletEntry[]>([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handlePayClick = async () => {
    setShowWalletModal(true);
  };

  useEffect(() => {
    // Fetch wallets to determine if the pay button should be shown
    const fetchWallets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/public/wallets/`, { cache: 'no-store' });
        if (res.ok) {
          const data: WalletEntry[] = await res.json();
          setWallets(data.filter(w => w.show_wallet === true || w.show_wallet === "true" as any || w.show_wallet === 1 as any));
        } else {
          setWallets([]);
        }
      } catch {
        setWallets([]);
      }
    };
    fetchWallets();
  }, []);

  const handleCopy = (address: string, id: number) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (id) {
      setTrackingId(id);
      triggerSearch(id);
    }
  }, []);

  const triggerSearch = async (id: string) => {
    setError("");
    setIsProcessing(true);
    setShipment(null);
    try {
      const res = await fetch(`${API_BASE_URL}/public/track/${id.trim()}/`);
      if (res.status === 404 || !res.ok) {
        const data = await res.json();
        setError(data?.detail || "No Shipment matches the given query.");
      } else {
        const data = await res.json();
        const contact = data.delivery_contacts?.[0] || {};
        const movementLocations = data.movement_locations || [];
        const currentLoc = (data.info.current_location || "").toLowerCase().trim();

        // Find the index of the active (current) stop by matching current_location
        let currentIdx = movementLocations.findIndex(
          (loc: any) => loc.location.toLowerCase().trim() === currentLoc
        );
        // If not found by name, default to last stop
        if (currentIdx === -1) currentIdx = movementLocations.length - 1;

        // Build timeline:
        // idx < currentIdx  → done (✓)
        // idx === currentIdx → active (pulse, no ✓)
        // idx > currentIdx  → pending (no mark)
        const timeline = movementLocations.map((loc: any, idx: number) => ({
          status: loc.status,
          location: loc.location,
          date: new Date(loc.timestamp).toLocaleString(),
          done: idx < currentIdx || (idx === currentIdx && currentIdx === movementLocations.length - 1),
          active: idx === currentIdx && currentIdx !== movementLocations.length - 1,
          latitude: loc.latitude != null ? Number(loc.latitude) : null,
          longitude: loc.longitude != null ? Number(loc.longitude) : null,
          timestamp: new Date(loc.timestamp).getTime(),
        }));

        const mapped: ShipmentData = {
          trackingId: data.tracking_id,
          status: data.info.status,
          isMoving: data.info.movement_status === "Moving",
          movementStatus: data.info.movement_status || "",
          currentLocation: data.info.current_location || "",
          currentLocationLatitude: data.info.current_location_latitude != null ? Number(data.info.current_location_latitude) : null,
          currentLocationLongitude: data.info.current_location_longitude != null ? Number(data.info.current_location_longitude) : null,
          origin: data.origin || "",
          destination: data.destination || "",
          originLatitude: data.origin_latitude != null ? Number(data.origin_latitude) : null,
          originLongitude: data.origin_longitude != null ? Number(data.origin_longitude) : null,
          destLatitude: data.destination_latitude != null ? Number(data.destination_latitude) : null,
          destLongitude: data.destination_longitude != null ? Number(data.destination_longitude) : null,
          latestUpdate: data.info.latest_message || "No updates available.",
          expectedDelivery: data.info.expected_delivery_date || "-",
          receiver: {
            name: contact.contact_name || "-",
            phone: contact.contact_phone || "-",
            email: contact.contact_email || "-",
            address: contact.contact_address || "-",
          },
          sender: {
            name: contact.sender_name || "-",
            phone: contact.sender_phone || "-",
            email: contact.sender_email || "-",
            address: contact.sender_address || "-",
          },
          shipment: {
            origin: data.origin || "-",
            destination: data.destination || "-",
            package: data.package_type || "-",
            carrier: data.carrier || "-",
            type: data.shipment_type || "-",
            mode: data.shipment_mode || "-",
            referenceNo: data.info.reference || "-",
            product: data.product || "-",
            quantity: data.quantity || 1,
            paymentMode: data.payment_mode || "-",
            totalFreight: data.total_freight || "-",
            totalWeight: data.total_weight || "-",
          },
          goodsImages: normalizeGoodsImages(data.goods_image),
          timeline,
        };
        console.log("track/page: Mapped Shipment Data:", mapped);
        setShipment(mapped);
      }
    } catch {
      setError("An error occurred while tracking the shipment.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) { setError("Please enter a tracking number."); return; }
    const url = new URL(window.location.href);
    url.searchParams.set("id", trackingId.trim());
    window.history.pushState({}, "", url);
    triggerSearch(trackingId.trim());
  };

  const activeIndex = shipment?.timeline.findIndex((t) => t.active) ?? -1;
  const progressPercent = shipment
    ? ((activeIndex < 0 ? shipment.timeline.length - 1 : activeIndex) / Math.max(shipment.timeline.length - 1, 1)) * 100
    : 0;

  const openGallery = () => {
    if (!shipment?.trackingId) return;
    router.push(`/track/gallery?id=${encodeURIComponent(shipment.trackingId)}`);
  };

  console.log("PAY BUTTON DEBUG:", {
    shipmentIsMoving: shipment?.isMoving,
    walletsCount: wallets.length,
    wallets,
    shipmentStatus: shipment?.status,
    movementStatus: shipment?.movementStatus
  });

  return (
    <div className={styles.container}>
      <Navbar />

      {/* Hero Section — Tanspot Style */}
      <section className={styles.trackHero}>
        <div className={styles.trackHeroBg}>
          <div className={styles.trackHeroOrange}></div>
          <div className={styles.trackHeroDark}></div>
        </div>

        <div className={styles.trackHeroInner}>
          <div className={styles.trackHeroLeft}>
            <p className={styles.trackHeroTagline}>OPTIMUXEXPRESS DELIVERY</p>
            <h1 className={styles.trackHeroTitle}>
              Track Your<br />
              <span>Shipment</span>
            </h1>
            <p className={styles.trackHeroSub}>
              Enter your tracking number to get real-time updates on your shipment&apos;s location, status, and expected delivery.
            </p>

            <form onSubmit={handleTrack} className={styles.trackHeroSearch}>
              <input
                type="text"
                placeholder="Enter tracking ID (e.g. EXSD-000001)"
                value={trackingId}
                onChange={(e) => { setTrackingId(e.target.value); setShipment(null); setError(""); }}
                className={styles.trackHeroInput}
              />
              <button type="submit" className={styles.trackHeroBtn} disabled={isProcessing}>
                {isProcessing ? "Searching..." : "Track Now"}
              </button>
            </form>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroTruckWrapper}>
              <img src="/gplane.png" alt="OptimuxExpress Plane" className={styles.heroTruck} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trackSection}>
        {error && <p className={styles.errorMsg}>{error}</p>}

        {!shipment && !isProcessing && !error && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h3>Enter your tracking number above</h3>
            <p>Your full shipment info, timeline, and delivery details will appear here.</p>
          </div>
        )}

        {isProcessing && (
          <div className={styles.emptyState}>
            <div className={`${styles.emptyIcon} ${styles.spin}`}>🔄</div>
            <h3>Locating your shipment…</h3>
          </div>
        )}

        {shipment && (
          <div className={styles.resultWrapper}>
            {/* Status Banner */}
            <div className={styles.statusBanner}>
              <div className={styles.statusLeft}>
                <span className={`${styles.statusPill} ${shipment.isMoving ? styles.statusPillMoving : styles.statusPillStationary}`}>
                  {shipment.isMoving ? "🚛 " : "⏸ "}{shipment.status}
                </span>
                <div>
                  <p className={styles.statusLabel}>Latest Update</p>
                  <p className={styles.statusMsg}>{shipment.latestUpdate}</p>
                </div>
              </div>
              <div className={styles.statusRight}>
                <p className={styles.statusLabel}>Expected Delivery</p>
                <p className={styles.statusDate}>{shipment.expectedDelivery}</p>
                {shipment.currentLocation && (
                  <>
                    <p className={styles.statusLabel} style={{ marginTop: "1rem" }}>Current Location</p>
                    <p className={styles.statusDate} style={{ fontSize: "1rem" }}>{shipment.currentLocation}</p>
                  </>
                )}
              </div>
              {/* Pay button only when not moving and active wallets exist */}
              {!shipment.isMoving && wallets.length > 0 && (
                <button className={styles.payBtn} onClick={handlePayClick}>
                  💳 Pay Now
                </button>
              )}
            </div>

            {/* Origin / Destination Tickers */}
            {(shipment.origin || shipment.destination) && (
              <div className={styles.routeTickers}>
                {shipment.origin && (
                  <div className={styles.tickerOrigin}>
                    <span className={styles.tickerDot} style={{ background: "#34c759" }} />
                    <div>
                      <p className={styles.tickerLabel}>Origin</p>
                      <p className={styles.tickerValue}>{shipment.origin}</p>
                    </div>
                  </div>
                )}
                {shipment.origin && shipment.destination && (
                  <div className={styles.tickerArrow}>✈</div>
                )}
                {shipment.destination && (
                  <div className={styles.tickerDest}>
                    <span className={styles.tickerDot} style={{ background: "#5e5ce6" }} />
                    <div>
                      <p className={styles.tickerLabel}>Destination</p>
                      <p className={styles.tickerValue}>{shipment.destination}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Map Tracker */}
            <div className={styles.infoCard + " " + styles.mapCard}>
              <RealMap
                origin={shipment.origin}
                destination={shipment.destination}
                currentLocation={shipment.currentLocation}
                originLatitude={shipment.originLatitude}
                originLongitude={shipment.originLongitude}
                destLatitude={shipment.destLatitude}
                destLongitude={shipment.destLongitude}
                currentLocationLatitude={shipment.currentLocationLatitude}
                currentLocationLongitude={shipment.currentLocationLongitude}
                timeline={shipment.timeline}
                isMoving={shipment.isMoving}
              />

            </div>



            {shipment.goodsImages.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeaderRow}>
                  <h3 className={styles.cardTitle}>Goods Images</h3>
                  {shipment.goodsImages.length > 1 && <span className={styles.imageCount}>{shipment.goodsImages.length} photos</span>}
                </div>
                <button type="button" className={styles.compactAlbumButton} onClick={openGallery}>
                  Open image album
                </button>
              </div>
            )}

            {/* Timeline + Receiver/Sender */}
            <div className={styles.infoGrid}>
              <div className={styles.timelineCard}>
                <h3 className={styles.cardTitle}>Shipment Timeline</h3>
                {/* Movement status badge */}
                <div className={`${styles.movementBadge} ${shipment.isMoving ? styles.movementBadgeMoving : styles.movementBadgeStationary}`}>
                  {shipment.isMoving ? "🚛 Package is moving" : "⏸ Package is stationary"}
                </div>
                <div className={styles.timeline}>
                  {shipment.timeline.map((step, i) => (
                    <div key={i} className={`${styles.tStep} ${step.active ? styles.tStepActive : ""} ${step.done ? styles.tStepDone : ""}`}>
                      <div className={styles.tDotWrap}>
                        <div className={styles.tDot}>
                          {step.done && <span>✓</span>}
                          {step.active && (
                            <span className={shipment.isMoving ? styles.activePulseSmall : styles.activePulseSmallStatic}></span>
                          )}
                        </div>
                        {i < shipment.timeline.length - 1 && <div className={styles.tLine}></div>}
                      </div>
                      <div className={styles.tContent}>
                        <p className={styles.tStatus}>{step.status}</p>
                        {step.location && <p className={styles.tLocation}>{step.location}</p>}
                        {step.date && <p className={styles.tDate}>({step.date})</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.detailsColumn}>
                <div className={styles.infoCard}>
                  <h3 className={styles.cardTitle}>Receiver Information</h3>
                  <div className={styles.infoRow}><span>Name</span><strong>{shipment.receiver.name}</strong></div>
                  <div className={styles.infoRow}><span>Phone</span><strong>{shipment.receiver.phone}</strong></div>
                  <div className={styles.infoRow}><span>Email</span><strong>{shipment.receiver.email}</strong></div>
                  <div className={styles.infoRow}><span>Shipping Address</span><strong>{shipment.receiver.address}</strong></div>
                </div>
                <div className={styles.infoCard}>
                  <h3 className={styles.cardTitle}>Sender Information</h3>
                  <div className={styles.infoRow}><span>Name</span><strong>{shipment.sender.name}</strong></div>
                  <div className={styles.infoRow}><span>Phone</span><strong>{shipment.sender.phone}</strong></div>
                  <div className={styles.infoRow}><span>Email</span><strong>{shipment.sender.email}</strong></div>
                  <div className={styles.infoRow}><span>Address</span><strong>{shipment.sender.address}</strong></div>
                </div>
              </div>
            </div>

            {/* Shipment Info */}
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Shipment Information</h3>
              <div className={styles.shipGrid}>
                <div className={styles.infoRow}><span>Origin</span><strong>{shipment.shipment.origin}</strong></div>
                <div className={styles.infoRow}><span>Destination</span><strong>{shipment.shipment.destination}</strong></div>
                <div className={styles.infoRow}><span>Package</span><strong>{shipment.shipment.package}</strong></div>
                <div className={styles.infoRow}><span>Carrier</span><strong>{shipment.shipment.carrier}</strong></div>
                <div className={styles.infoRow}><span>Shipment Type</span><strong>{shipment.shipment.type}</strong></div>
                <div className={styles.infoRow}><span>Shipment Mode</span><strong>{shipment.shipment.mode}</strong></div>
                <div className={styles.infoRow}><span>Reference No</span><strong>{shipment.shipment.referenceNo}</strong></div>
                <div className={styles.infoRow}><span>Product</span><strong>{shipment.shipment.product}</strong></div>
                <div className={styles.infoRow}><span>Quantity</span><strong>{shipment.shipment.quantity}</strong></div>
                <div className={styles.infoRow}><span>Payment Mode</span><strong>{shipment.shipment.paymentMode}</strong></div>
                <div className={styles.infoRow}><span>Total Freight</span><strong>{shipment.shipment.totalFreight}</strong></div>
                <div className={styles.infoRow}><span>Total Weight</span><strong>{shipment.shipment.totalWeight}</strong></div>
              </div>
            </div>

            <div className={styles.barcodeCard}>
              <Barcode value={shipment.trackingId} />
              <p className={styles.barcodeHint}>Scan this barcode at any OptimuxExpress service centre</p>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />

      {/* Wallet Payment Modal */}
      {showWalletModal && (
        <div className={styles.walletOverlay} onClick={(e) => { if (e.target === e.currentTarget) setShowWalletModal(false); }}>
          <div className={styles.walletModal}>
            <div className={styles.walletModalHeader}>
              <h3>💳 Pay via Crypto</h3>
              <button className={styles.walletModalClose} onClick={() => setShowWalletModal(false)}>✕</button>
            </div>
            <p className={styles.walletModalSub}>Select a wallet below to copy the address and complete your payment.</p>

            {wallets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                <span style={{ fontSize: '2.5rem' }}>🚫</span>
                <p style={{ marginTop: '0.5rem' }}>No payment wallets are available at this time. Please contact support.</p>
              </div>
            ) : (
              <div className={styles.walletList}>
                {wallets.map(w => (
                  <div key={w.id} className={styles.walletItem}>
                    <img
                      src={getCoinLogo(w.coin)}
                      alt={w.coin}
                      className={styles.walletItemCoin}
                      onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f75d34'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3E₿%3C/text%3E%3C/svg%3E"; }}
                    />
                    <div className={styles.walletItemInfo}>
                      <div className={styles.walletItemCoinName}>{w.coin}</div>
                      <div className={styles.walletItemNetwork}>{w.network}</div>
                      <div className={styles.walletItemAddress}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{w.wallet_address}</span>
                        <button className={styles.copyBtn} onClick={() => handleCopy(w.wallet_address, w.id)}>
                          {copiedId === w.id ? "✓ Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
