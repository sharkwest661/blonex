import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Container from "../Container/Container";
import { getAllCities } from "@/constants/cities";

const Footer: React.FC = () => {
  const allCities = getAllCities();

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
            <a href="" className={styles.footer__navlink}>
              Əsas səhifə
            </a>
            <a href="" className={styles.footer__navlink}>
              Reklam yerləşdirmək
            </a>
            <a href="" className={styles.footer__navlink}>
              Haqqımızda
            </a>
            <a
              href=""
              className={`${styles.footer__navlink} ${styles["footer__navlink--secondary"]}`}
            >
              Mağaza qeydiyyatı
            </a>
          </div>
        </div>

        <div className={styles.desktopCityList}>
          <ul className={styles.footer__cities}>
            {allCities.map((city) => (
              <li key={city}>
                <Link href={`/city/${city.toLowerCase()}`}>{city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__bottombar}>
          <div className={styles.footer__copyright}>
            © IT Enterprise MMC, 2021. Bütün hüquqlar qorunur.
          </div>
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
