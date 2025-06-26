// Updated Header Component with Existing Store Integration
// src/components/Layout/Header/Header.tsx

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, User, Plus } from "lucide-react";
import { Container } from "@/components/Layout/Container";
import { HomeSearch } from "@/components/Home/HomeSearch";
import { MobileMenu } from "./MobileMenu";
import { WishlistModal, LoginModal } from "@/components/Modals";
import { useFavoritesStoreHydrated } from "@/stores/useFavoritesStore";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  // ✅ FIXED: Use existing favorites store instead of custom hooks
  const { favorites } = useFavoritesStoreHydrated();

  // ✅ SIMPLIFIED: Use local state for modals instead of custom hook
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ✅ SIMPLIFIED: Mock user state (you can connect to your auth store)
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = !!user;

  const handleLoginSuccess = async (phone: string) => {
    try {
      // Mock login - replace with your auth logic
      setUser({ phone, name: `User ${phone.slice(-4)}` });
      setIsLoginOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleUserMenuClick = () => {
    if (isAuthenticated) {
      // Show user menu dropdown or navigate to profile
      setUser(null); // Mock logout
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleSearch = (query: string) => {
    // Handle search - you can implement this based on your routing
    console.log("Search:", query);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar_bg}>
          <Container>
            <nav
              className={styles.navbar}
              role="navigation"
              aria-label="Əsas naviqasiya"
            >
              {/* Mobile Menu Button - Left side on mobile */}
              <MobileMenu />

              {/* Logo - Center on mobile, left on desktop */}
              <Link
                href="/"
                className={styles.navbarBrand}
                aria-label="Bolbol ana səhifə"
              >
                <Image
                  src="/assets/images/logo-white.svg"
                  alt="Bolbol"
                  width={120}
                  height={32}
                  priority
                />
              </Link>

              {/* Mobile New Ad Button - Right side on mobile */}
              <Link
                href="/new-ad"
                className={styles.mobileNewAdBtn}
                aria-label="Yeni elan"
              >
                <Plus size={20} />
              </Link>

              {/* Desktop Navigation - Right side */}
              <div className={styles.navbarRight}>
                {/* Header Search */}
                <div className={styles.headerSearch}>
                  <HomeSearch
                    onSearch={handleSearch}
                    placeholder="Axtar..."
                    className={styles.searchComponent}
                  />
                </div>

                {/* Navigation Links */}
                <div className={styles.header__links}>
                  {/* Wishlist/Favorites */}
                  <button
                    className={`${styles.header__link} ${styles["header__link--favorites"]}`}
                    onClick={() => setIsWishlistOpen(true)}
                    aria-label={`Seçdiklərim (${favorites.length})`}
                    type="button"
                  >
                    <Heart size={20} />
                    Seçdiklərim
                    {favorites.length > 0 && (
                      <span className={styles.badge}>{favorites.length}</span>
                    )}
                  </button>

                  {/* Login/User Account */}
                  <button
                    className={`${styles.header__link} ${styles["header__link--login"]}`}
                    onClick={handleUserMenuClick}
                    aria-label={isAuthenticated ? "Hesab" : "Daxil ol"}
                    type="button"
                  >
                    <User size={20} />
                    {isAuthenticated ? (
                      <>
                        {user?.name || "Hesab"}
                        <span className={styles.userIndicator} />
                      </>
                    ) : (
                      "Daxil ol"
                    )}
                  </button>
                </div>

                {/* New Ad Button */}
                <Link href="/new-ad" className={styles.header__btn}>
                  <Plus size={20} />
                  <span>Yeni elan</span>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      </header>

      {/* Modals */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
