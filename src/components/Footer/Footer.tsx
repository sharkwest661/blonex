import React from "react";
import styles from "./Footer.module.scss";
import Container from "@/components/Layout/Container/Container";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerBottombar}>
          <span className={styles.footerCopyright}>
            © IT Enterprise MMC, 2021. Bütün hüquqlar qorunur.
          </span>
          <div>
            <a href="#" className={styles.footerLink}>
              Məxfilik siyasəti
            </a>
            <a href="#" className={styles.footerLink}>
              İstifadə şərtləri
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
