"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import TopBar from "./TopBar/TopBar";
import MobileMenu from "./MobileMenu/MobileMenu";
import styles from "./Header.module.scss";
import Container from "@/components/Layout/Container/Container";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
    return () => {
      document.body.classList.remove("noscroll");
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <Container>
        <TopBar />
      </Container>

      <div className={styles.navbar_bg}>
        <Container>
          <nav className={styles.navbar}>
            {/* Mobile Menu Toggle - Only visible on mobile */}
            <MobileMenu
              isOpen={isMenuOpen}
              onToggle={toggleMenu}
              onClose={closeMenu}
            />

            {/* Logo - Left side */}
            <Link href="/" className={styles.navbarBrand}>
              <Image
                src="/assets/images/logo.svg"
                alt="Bolbol Logo"
                width={132}
                height={44}
                priority
              />
            </Link>

            {/* Right side navigation - Desktop only */}
            <div className={styles.navbarRight}>
              <div className={styles.header__links}>
                <Link
                  href="/favorites"
                  className={clsx(
                    styles.header__link,
                    styles["header__link--favorites"]
                  )}
                >
                  Seçdiklərim
                </Link>
                <Link
                  href="/profile"
                  className={clsx(
                    styles.header__link,
                    styles["header__link--login"]
                  )}
                >
                  Şəxsi kabinet
                </Link>
              </div>

              <Link href="/new-ad" className={styles.header__btn}>
                <span>Yeni elan</span>
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
