"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import styles from "./admin.module.css";

import { API_BASE_URL } from "../../config";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("eshipcont_auth", "true");
        localStorage.setItem("eshipcont_token", data.Token || data.token); // saving the token
        router.push("/eshipcont/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    setError("");
    setMsg("");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public/password-change/request-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      if (res.ok) {
        setMsg("OTP has been sent to the admin email.");
        setView("reset");
      } else {
        const text = await res.text();
        setError(text || "Failed to request OTP.");
      }
    } catch (err) {
      setError("An error occurred requesting OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public/password-change/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, new_password: newPassword })
      });
      if (res.ok) {
        setMsg("Password changed successfully. You can now log in.");
        setView("login");
        setOtp("");
        setNewPassword("");
      } else {
        const text = await res.text();
        setError(text || "Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred resetting password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img src="/newlog.png" alt="OptimuxExpress" style={{ height: "60px", marginBottom: "1rem", objectFit: "contain" }} />

        {view === "login" && (
          <>
            <h2>Admin Portal</h2>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
              Sign in to manage shipments and tracking
            </p>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button type="button" onClick={() => { setView("forgot"); setError(""); setMsg(""); }} style={{ background: 'none', border: 'none', color: '#f75d34', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot Password?
                </button>
              </div>
              {error && <p style={{ color: "#ff3b30", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>}
              {msg && <p style={{ color: "#34c759", marginBottom: "1rem", fontSize: "0.9rem" }}>{msg}</p>}
              <button type="submit" disabled={isLoading} className={styles.loginBtn} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? <Loader2 size={18} className={styles.spin} /> : null}
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <p style={{ marginTop: "1.5rem", color: "#aaa", fontSize: "0.8rem" }}>
              Default: contact@optimuxexpress.com  / Admin@1234
            </p>
          </>
        )}

        {view === "forgot" && (
          <>
            <h2>Forgot Password</h2>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
              Click the button below to receive an OTP at the administrator email address.
            </p>
            {error && <p style={{ color: "#ff3b30", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>}
            <button type="button" onClick={handleRequestOtp} disabled={isLoading} className={styles.loginBtn} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1, marginBottom: '1rem' }}>
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : null}
              {isLoading ? "Requesting..." : "Get OTP"}
            </button>
            <button type="button" onClick={() => { setView("login"); setError(""); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.9rem', cursor: 'pointer' }}>
              Back to Login
            </button>
          </>
        )}

        {view === "reset" && (
          <>
            <h2>Reset Password</h2>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
              Enter the OTP sent to your email and your new password.
            </p>
            <form onSubmit={handleResetPassword}>
              <div className={styles.inputGroup}>
                <label>OTP Code</label>
                <input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "#ff3b30", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>}
              {msg && <p style={{ color: "#34c759", marginBottom: "1rem", fontSize: "0.9rem" }}>{msg}</p>}
              <button type="submit" disabled={isLoading} className={styles.loginBtn} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1, marginBottom: '1rem' }}>
                {isLoading ? <Loader2 size={18} className={styles.spin} /> : null}
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
              <button type="button" onClick={() => { setView("login"); setError(""); setMsg(""); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.9rem', cursor: 'pointer' }}>
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
