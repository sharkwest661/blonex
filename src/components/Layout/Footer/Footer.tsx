// src/components/Layout/Footer/Footer.tsx
import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllCities } from "@/constants/cities";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const allCities = getAllCities();

  // Split cities into columns for display
  const mainCities = allCities.slice(0, 12); // First 12 cities (main cities)
  const otherCities = allCities.slice(12); // Remaining cities

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__topbar}>
          <div className={`${styles.contact} ${styles["contact--secondary"]}`}>
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
              <a href="tel:0511234567">051 123 45 67</a>
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
          <div className={styles.footer__navbar}>
            <Link href="/" className={styles.footer__navlink}>
              Əsas səhifə
            </Link>
            <Link href="/advertising" className={styles.footer__navlink}>
              Reklam yerləşdirmək
            </Link>
            <Link href="/about" className={styles.footer__navlink}>
              Haqqımızda
            </Link>
            <Link
              href="/store-registration"
              className={`${styles.footer__navlink} ${styles["footer__navlink--secondary"]}`}
            >
              Mağaza qeydiyyatı
            </Link>
          </div>
        </div>

        <div className={styles.desktopCityList}>
          <ul className={styles.footer__cities}>
            {/* Main cities first (in one column) */}
            {mainCities.map((city) => (
              <li key={`main-${city}`}>
                <Link href={`/city/${city.toLowerCase()}`}>{city}</Link>
              </li>
            ))}
          </ul>

          <ul className={styles.footer__cities}>
            {/* Other cities in multiple columns */}
            {otherCities.map((city) => (
              <li key={`other-${city}`}>
                <Link href={`/city/${city.toLowerCase()}`}>{city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__bottombar}>
          <span className={styles.footer__copyright}>
            © IT Enterprise MMC, 2021. Bütün hüquqlar qorunur.
          </span>
          <div>
            <Link href="/privacy" className={styles.footer__link}>
              Məxfilik siyasəti
            </Link>
            <Link href="/terms" className={styles.footer__link}>
              İstifadə şərtləri
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
