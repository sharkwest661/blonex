import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Send, MessageSquare } from "lucide-react";
import styles from "./Footer.module.scss";
import Container from "../Container/Container";

const Footer: React.FC = () => {
  const cities = {
    main: [
      "Bakı",
      "Sumqayıt",
      "Xırdalan",
      "Gəncə",
      "Qəbələ",
      "Quba",
      "Xaçmaz",
      "Lənkəran",
      "Mingəçevir",
      "Şəki",
      "Qusar",
      "Şirvan",
    ],
    other: [
      "Ağcabədi",
      "Ağdam",
      "Ağdaş",
      "Ağdərə",
      "Ağstafa",
      "Ağsu",
      "Astara",
      "Balakən",
      "Beyləqan",
      "Bərdə",
      "Biləsuvar",
      "Cəbrayıl",
      "Cəlilabad",
      "Culfa",
      "Daşkəsən",
      "Füzuli",
      "Gədəbəy",
      "Goranboy",
      "Göyçay",
      "Göygöl",
      "Göytəpə",
      "Hacıqabul",
      "Horadiz",
      "İmişli",
      "İsmayıllı",
      "Kəlbəcər",
      "Kürdəmir",
      "Laçın",
      "Lerik",
      "Masallı",
      "Nabran",
      "Naftalan",
      "Naxçıvan",
      "Neftçala",
      "Oğuz",
      "Ordubad",
      "Qax",
      "Qazax",
      "Qobustan",
      "Qubadlı",
      "Saatlı",
      "Sabirabad",
      "Şabran",
      "Şahbuz",
      "Salyan",
      "Şamaxı",
      "Samux",
      "Şəmkir",
      "Şərur",
      "Siyəzən",
      "Şuşa",
      "Tərtər",
      "Tovuz",
      "Ucar",
      "Xankəndi",
      "Xızı",
      "Xocalı",
      "Xocavənd",
      "Xudat",
      "Yardımlı",
      "Yevlax",
      "Zaqatala",
      "Zəngilan",
      "Zərdab",
    ],
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerTopbar}>
          <div className={`${styles.contact} ${styles.contactSecondary}`}>
            <a href="#" aria-label="Facebook" className={styles.contactNetwork}>
              <Facebook size={24} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className={styles.contactNetwork}
            >
              <Instagram size={24} />
            </a>
            <span className={styles.contactTel}>
              Dəstək:
              <a href="tel:0511234567">051 123 45 67</a>
            </span>
            <a href="#" aria-label="WhatsApp" className={styles.contactNetwork}>
              <MessageSquare size={24} />
            </a>
            <a href="#" aria-label="Telegram" className={styles.contactNetwork}>
              <Send size={24} />
            </a>
          </div>
          <div className={styles.footerNavbar}>
            <Link href="/" className={styles.footerNavlink}>
              Əsas səhifə
            </Link>
            <Link href="/reklam" className={styles.footerNavlink}>
              Reklam yerləşdirmək
            </Link>
            <Link href="/about" className={styles.footerNavlink}>
              Haqqımızda
            </Link>
            <Link
              href="/register-store"
              className={`${styles.footerNavlink} ${styles.footerNavlinkSecondary}`}
            >
              Mağaza qeydiyyatı
            </Link>
          </div>
        </div>

        <div className={styles.desktopCityList}>
          <ul className={styles.footerCities}>
            {cities.main.map((city) => (
              <li key={city}>
                <Link href={`/city/${city.toLowerCase()}`}>{city}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.footerCities}>
            {cities.other.map((city) => (
              <li key={city}>
                <Link href={`/city/${city.toLowerCase()}`}>{city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerBottombar}>
          <span className={styles.footerCopyright}>
            © IT Enterprise MMC, 2021. Bütün hüquqlar qorunur.
          </span>
          <div>
            <Link href="/privacy" className={styles.footerLink}>
              Məxfilik siyasəti
            </Link>
            <Link href="/terms" className={styles.footerLink}>
              İstifadə şərtləri
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
