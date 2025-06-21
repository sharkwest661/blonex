import React from "react";
import styles from "./Header.module.scss";
import Container from "@/components/Layout/Container/Container";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navbar_bg}>
        <Container>
          <nav className={styles.navbar} id="standardNavbar">
            <a className={styles.navbarBrand} href="#">
              <img src="/assets/images/logo.svg" alt="logo" />
            </a>
            <div className={styles.headerLinks}>
              <a href="#" className={styles.headerLink}>
                Seçdiklərim
              </a>
              <a href="#" className={styles.headerLink}>
                Şəxsi kabinet
              </a>
            </div>
            <a href="#" className={styles.headerBtn}>
              <span>Yeni elan</span>
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
