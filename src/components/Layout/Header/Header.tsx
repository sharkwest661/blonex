"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import TopBar from "./TopBar/TopBar";
import styles from "./Header.module.scss";
import Container from "@/components/Layout/Container/Container";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <button
              className={clsx(styles.navbarToggler, {
                [styles.active]: isMenuOpen,
              })}
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              {/* Icon handled by CSS background-image */}
            </button>

            <Link
              href="/"
              className={clsx(styles.navbarBrand, {
                [styles.hidden]: isMenuOpen,
              })}
            >
              <Image
                src="/assets/images/logo.svg"
                alt="Bolbol Logo"
                width={120}
                height={32}
                priority
              />
            </Link>

            <div
              className={clsx(styles.navbarCollapse, {
                [styles.show]: isMenuOpen,
              })}
            >
              <div className={styles.header__links}>
                <Link
                  href="/favorites"
                  className={clsx(
                    styles.header__link,
                    styles["header__link--favorites"]
                  )}
                >
                  {/* Icon handled by CSS ::before pseudo-element */}
                  Seçdiklərim
                </Link>
                <Link
                  href="/profile"
                  className={clsx(
                    styles.header__link,
                    styles["header__link--login"]
                  )}
                >
                  {/* Icon handled by CSS ::before pseudo-element */}
                  Şəxsi kabinet
                </Link>
              </div>
            </div>

            <Link
              href="/new-ad"
              className={clsx(styles.header__btn, styles.btn, {
                [styles.show]: isMenuOpen,
              })}
            >
              {/* Icon handled by CSS background-image */}
              <span>Yeni elan</span>
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
