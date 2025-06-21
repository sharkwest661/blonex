"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Heart, User, Plus, Menu, X } from "lucide-react"; // Import icons
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
      <div className={styles.navbarBg}>
        <Container>
          <nav className={styles.navbar}>
            <button
              className={styles.navbarToggler}
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
              <div className={styles.headerLinks}>
                <Link href="/favorites" className={styles.headerLink}>
                  <Heart size={24} className={styles.linkIcon} />
                  Seçdiklərim
                </Link>
                <Link href="/profile" className={styles.headerLink}>
                  <User size={24} className={styles.linkIcon} />
                  Şəxsi kabinet
                </Link>
              </div>
            </div>

            <Link
              href="/new-ad"
              className={clsx("btn", styles.headerBtn, {
                [styles.show]: isMenuOpen,
              })}
            >
              <Plus size={24} />
              <span>Yeni elan</span>
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
