import React from "react";
import styles from "./TopBar.module.scss";
import { Facebook, Instagram, Send, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";

const TopBar: React.FC = () => {
  return (
    <div className={styles.headerTopbar}>
      <div className={styles.contact}>
        <a href="#" aria-label="Facebook" className={styles.contactNetwork}>
          <Facebook size={20} />
        </a>
        <a href="#" aria-label="Instagram" className={styles.contactNetwork}>
          <Instagram size={20} />
        </a>
        <span className={styles.contactTel}>
          Dəstək:
          <a href="tel:0125556500">012 555 65 00 | 055 262 65 00 </a>
        </span>
        <a href="#" aria-label="WhatsApp" className={styles.contactNetwork}>
          <MessageSquare size={20} />
        </a>
        <a href="#" aria-label="Telegram" className={styles.contactNetwork}>
          <Send size={20} />
        </a>
      </div>
      <div className={styles.logoutSection}>
        <LogOut size={16} />
        <Link href="/auth/logout/">Çıxış</Link>
      </div>
    </div>
  );
};

export default TopBar;
