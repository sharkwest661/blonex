// src/components/Layout/Header/Header.tsx - Updated with Login Modal Integration
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Container } from "@/components/Layout/Container";
import TopBar from "./TopBar/TopBar";
import MobileMenu from "./MobileMenu/MobileMenu";
import LoginModal from "@/components/Auth/LoginModal";
import { useAuthStore } from "@/stores/useAuthStore";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    // Optionally show a success message or redirect
    console.log("Login successful!");
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openLoginModal();
    }
    // If authenticated, let the link work normally
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
    <>
      <header className={styles.header}>
        <Container noPadding>
          <TopBar />
        </Container>

        <div className={styles.navbar_bg}>
          <Container noPadding>
            <nav className={styles.navbar}>
              {/* Mobile Menu Toggle - Only visible on mobile */}
              <MobileMenu
                isOpen={isMenuOpen}
                onToggle={toggleMenu}
                onClose={closeMenu}
              />

              {/* Logo - Center on mobile, left on desktop */}
              <Link href="/" className={styles.navbarBrand}>
                <Image
                  src="/assets/images/logo.svg"
                  alt="Bolbol Logo"
                  width={132}
                  height={44}
                  priority
                />
              </Link>

              {/* Mobile New Ad Button - Only visible on mobile */}
              <Link href="/new-ad" className={styles.mobileNewAdBtn}>
                <Plus size={20} />
              </Link>

              {/* Desktop Navigation - Only visible on desktop */}
              <div className={styles.navbarRight}>
                <div className={styles.header__links}>
                  <Link
                    href="/favorites"
                    className={`${styles.header__link} ${styles["header__link--favorites"]}`}
                  >
                    Seçdiklərim
                  </Link>

                  {/* Profile/Login Link */}
                  <Link
                    href={isAuthenticated ? "/profile" : "#"}
                    className={`${styles.header__link} ${styles["header__link--login"]}`}
                    onClick={handleProfileClick}
                  >
                    {isAuthenticated
                      ? user?.displayName || "Şəxsi kabinet"
                      : "Şəxsi kabinet"}
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

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
