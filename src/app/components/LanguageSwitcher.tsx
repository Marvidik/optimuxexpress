"use client";

import React, { useState, useEffect } from "react";
import styles from "./languageSwitcher.module.css";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  useEffect(() => {
    // Check if google translate cookie exists to set initial state (Optional)
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const parts = match[2].split('/');
      const code = parts[parts.length - 1];
      const found = languages.find((l) => l.code === code);
      if (found) setCurrentLang(found);
    }
  }, []);

  const changeLanguage = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Set google translate cookie and reload to ensure the language changes reliably
    document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${lang.code}; path=/;`;
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <span className={styles.flag}>{currentLang.flag}</span>
        <span className={styles.name}>{currentLang.name}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.item} ${currentLang.code === lang.code ? styles.active : ""}`}
              onClick={() => changeLanguage(lang)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
