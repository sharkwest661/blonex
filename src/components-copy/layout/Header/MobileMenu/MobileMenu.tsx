// src/components/Layout/Header/MobileMenu/MobileMenu.tsx - FIXED WITH LOGIN MODAL
"use client";
import React from "react";
import Link from "next/link";
import { Menu, X, Search, User, Heart, Plus } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFavoritesStoreHydrated } from "@/stores/useFavoritesStore";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLoginClick: () => void; // NEW: Function to open login modal
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  onClose,
  onLoginClick, // NEW: Login modal trigger
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const { getFavoritesCount } = useFavoritesStoreHydrated();

  const handleLinkClick = () => {
    onClose();
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLoginClick(); // Trigger login modal
    onClose(); // Close mobile menu
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("search") as string;
    if (query.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      onClose();
    }
  };

  return (
    <>
      {/* Menu Toggle Button - Only visible on mobile */}
      <button
        className={`${styles.menuToggle} ${isOpen ? styles.active : ""}`}
        onClick={onToggle}
        aria-label="Menyunu aç/bağla"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
        />
      )}

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuContent}>
          {/* Header */}
          <div className={styles.menuHeader}>
            <Link href="/" className={styles.logo} onClick={handleLinkClick}>
              <img src="/assets/images/logo.svg" alt="Bolbol" />
            </Link>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Menyunu bağla"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                name="search"
                placeholder="Bolbol-da axtar..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchSubmit}>
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* User Section */}
          <div className={styles.userSection}>
            {isAuthenticated ? (
              // Authenticated user info
              <div className={styles.userInfo}>
                <User size={18} />
                <span>{user?.displayName || "İstifadəçi"}</span>
              </div>
            ) : (
              // Login button for non-authenticated users
              <button
                className={styles.loginButton}
                onClick={handleLoginClick}
                aria-label="Daxil ol"
              >
                <User size={18} />
                <span>Daxil ol</span>
              </button>
            )}

            {/* Favorites Button */}
            <Link
              href="/favorites"
              className={styles.favoritesButton}
              onClick={handleLinkClick}
            >
              <Heart size={18} />
              <span>
                Seçdiklərim
                {getFavoritesCount() > 0 && (
                  <span className={styles.favoritesCount}>
                    ({getFavoritesCount()})
                  </span>
                )}
              </span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <Link
              href="/new-ad"
              className={styles.addListing}
              onClick={handleLinkClick}
            >
              <Plus size={20} />
              <span>Yeni elan</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className={styles.navigation}>
            <div className={styles.navGroup}>
              <h3 className={styles.navGroupTitle}>Kateqoriyalar</h3>
              <Link
                href="/categories/electronics"
                className={styles.navLink}
                onClick={handleLinkClick}
              >
                Elektronika
              </Link>
              <Link
                href="/categories/vehicles"
                className={styles.navLink}
                onClick={handleLinkClick}
              >
                Nəqliyyat
              </Link>
              <Link
                href="/categories/real-estate"
                className={styles.navLink}
                onClick={handleLinkClick}
              >
                Daşınmaz əmlak
              </Link>
              <Link
                href="/categories/jobs"
                className={styles.navLink}
                onClick={handleLinkClick}
              >
                İş elanları
              </Link>
            </div>

            {isAuthenticated && (
              <div className={styles.navGroup}>
                <h3 className={styles.navGroupTitle}>Hesabım</h3>
                <Link
                  href="/profile"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  Şəxsi məlumatlar
                </Link>
                <Link
                  href="/my-ads"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  Mənim elanlarım
                </Link>
                <Link
                  href="/settings"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  Tənzimləmələr
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
