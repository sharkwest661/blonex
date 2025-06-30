import React from "react";
import styles from "./TopBar.module.scss";
import Link from "next/link";

const TopBar: React.FC = () => {
  return (
    <div className={styles.header__topbar}>
      <div className={styles.contact}>
        <a
          href="#"
          aria-label="Facebook"
          className={`${styles.contact__network} ${styles.facebook}`}
        >
          {/* Icon handled by CSS background-image */}
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className={`${styles.contact__network} ${styles.instagram}`}
        >
          {/* Icon handled by CSS background-image */}
        </a>
        <span className={styles.contact__tel}>
          Dəstək:
          <a href="tel:0125556500">012 555 65 00 | 055 262 65 00 </a>
        </span>
        <a
          href="#"
          aria-label="WhatsApp"
          className={`${styles.contact__network} ${styles.whatsapp}`}
        >
          {/* Icon handled by CSS background-image */}
        </a>
        <a
          href="#"
          aria-label="Telegram"
          className={`${styles.contact__network} ${styles.telegram}`}
        >
          {/* Icon handled by CSS background-image */}
        </a>
      </div>
      <div className={styles.header__logout}>
        {/* Icon handled by CSS ::before pseudo-element */}
        <Link href="/auth/logout/">Çıxış</Link>
      </div>
    </div>
  );
};

export default TopBar;
