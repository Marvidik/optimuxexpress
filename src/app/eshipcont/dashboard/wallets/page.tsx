"use client";

import { useState, useEffect } from "react";
import styles from "../../admin.module.css";
import { API_BASE_URL } from "../../../../config";
import { Plus, Edit2, Trash2, CheckCircle, Loader2, Wallet } from "lucide-react";

type WalletData = {
  id: number;
  show_wallet: boolean;
  coin: string;
  wallet_address: string;
  network: string;
  created_at?: string;
  updated_at?: string;
};

export default function WalletsPage() {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: 0,
    show_wallet: true,
    coin: "",
    wallet_address: "",
    network: "",
  });

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public/wallets/`);
      if (res.ok) {
        const data = await res.json();
        setWallets(data);
      }
    } catch (err) {
      console.error("Failed to fetch wallets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const openAddModal = () => {
    setForm({ id: 0, show_wallet: true, coin: "", wallet_address: "", network: "" });
    setSaveError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (wallet: WalletData) => {
    setForm({
      id: wallet.id,
      show_wallet: wallet.show_wallet,
      coin: wallet.coin,
      wallet_address: wallet.wallet_address,
      network: wallet.network,
    });
    setSaveError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    const isEdit = form.id !== 0;
    const url = isEdit
      ? `${API_BASE_URL}/public/administrator/admin/wallets/${form.id}/`
      : `${API_BASE_URL}/public/administrator/admin/wallets/`;
    
    const method = isEdit ? "PATCH" : "POST";

    const payload = {
      show_wallet: form.show_wallet,
      coin: form.coin,
      wallet_address: form.wallet_address,
      network: form.network,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("eshipcont_token")}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchWallets();
      } else {
        const text = await res.text();
        setSaveError(text || "Failed to save wallet.");
      }
    } catch (err: any) {
      setSaveError(err.message || "An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this wallet?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/public/administrator/admin/wallets/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("eshipcont_token")}`
        }
      });
      if (res.ok) {
        fetchWallets();
      } else {
        alert("Failed to delete wallet.");
      }
    } catch (err) {
      alert("Error deleting wallet.");
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Crypto Wallets</h1>
        <button onClick={openAddModal} className={styles.actionBtn}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Wallet
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={30} className={styles.spin} />
        </div>
      ) : wallets.length === 0 ? (
        <div style={{ background: '#fff', padding: '3rem', textAlign: 'center', borderRadius: '12px' }}>
          <Wallet size={40} style={{ color: '#ccc', marginBottom: '1rem' }} />
          <h3>No wallets found</h3>
          <p style={{ color: '#888' }}>Add your first crypto wallet to accept payments.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Network</th>
                <th>Wallet Address</th>
                <th>Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(w => (
                <tr key={w.id}>
                  <td><strong>{w.coin}</strong></td>
                  <td>{w.network}</td>
                  <td style={{ fontFamily: 'monospace' }}>{w.wallet_address}</td>
                  <td>
                    {w.show_wallet ? (
                      <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle size={14} /> Yes</span>
                    ) : (
                      <span style={{ color: '#ef4444' }}>No</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => openEditModal(w)} className={styles.editBtn} style={{ marginRight: '0.5rem' }} title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(w.id)} className={styles.deleteBtn} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#112c34', fontSize: '1.4rem' }}>
              {form.id === 0 ? "Add New Wallet" : "Edit Wallet"}
            </h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem' }}>Coin Name (e.g. Bitcoin, USDT)</label>
                <input 
                  type="text" 
                  value={form.coin} 
                  onChange={e => setForm(prev => ({ ...prev, coin: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem' }}>Network (e.g. BTC, TRC20, ERC20)</label>
                <input 
                  type="text" 
                  value={form.network} 
                  onChange={e => setForm(prev => ({ ...prev, network: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem' }}>Wallet Address</label>
                <input 
                  type="text" 
                  value={form.wallet_address} 
                  onChange={e => setForm(prev => ({ ...prev, wallet_address: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'monospace' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  checked={form.show_wallet} 
                  onChange={e => setForm(prev => ({ ...prev, show_wallet: e.target.checked }))}
                  id="showWallet"
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="showWallet" style={{ fontSize: '0.95rem', color: '#333', cursor: 'pointer' }}>Active (Show to users)</label>
              </div>

              {saveError && (
                <div style={{ padding: '0.8rem', background: '#ffebee', color: '#d32f2f', borderRadius: '8px', fontSize: '0.85rem' }}>
                  {saveError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.9rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} style={{ flex: 1, padding: '0.9rem', background: '#112c34', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isSaving ? <Loader2 size={18} className={styles.spin} /> : "Save Wallet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
