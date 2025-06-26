import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Menu,
  Heart,
  User,
  Plus,
  Home,
  Search,
  Phone,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";
import styles from "./MobileMenu.module.scss";
import { CATEGORIES } from "@/constants";
import { themeColors } from "@/constants/themeColors";

interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
  count?: number;
}

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  categories?: Category[];
  isAuthenticated?: boolean;
  userPhone?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  onClose,
  categories = CATEGORIES,
  isAuthenticated = false,
  userPhone = "012 555 65 00",
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  const handleCategoryClick = () => {
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Only show when menu is closed */}
      {!isOpen && (
        <button
          className={`${styles.menuToggle} ${isOpen ? styles.active : ""}`}
          onClick={onToggle}
          aria-label="Menyunu aç/bağla"
          aria-expanded={isOpen}
        >
          <Menu size={24} color={themeColors.secondaryColor} />
        </button>
      )}

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
            <div className={styles.searchBar}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Bolbol-da axtar..."
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* User Section */}
          <div className={styles.userSection}>
            {isAuthenticated ? (
              <div className={styles.userInfo}>
                <User size={20} />
                <span>Şəxsi kabinet</span>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={styles.loginButton}
                onClick={handleLinkClick}
              >
                <User size={20} />
                <span>Daxil ol</span>
              </Link>
            )}
            <Link
              href="/favorites"
              className={styles.favoritesButton}
              onClick={handleLinkClick}
            >
              <Heart size={20} />
              <span>Seçdiklərim</span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <Link
              href="/add-listing"
              className={styles.addListing}
              onClick={handleLinkClick}
            >
              <Plus size={20} />
              <span>Yeni elan</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className={styles.mainNav}>
            <Link href="/" className={styles.navItem} onClick={handleLinkClick}>
              <Home size={20} />
              <span>Ana səhifə</span>
            </Link>
          </nav>

          {/* Categories Section */}
          <div className={styles.categoriesSection}>
            <h3 className={styles.sectionTitle}>Kateqoriyalar</h3>
            <div className={styles.categoriesList}>
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className={styles.categoryItem}
                  onClick={handleCategoryClick}
                >
                  <div className={styles.categoryIcon}>
                    <img src={category.icon} alt="" />
                  </div>
                  <span className={styles.categoryName}>{category.name}</span>
                  {category.count && (
                    <span className={styles.categoryCount}>
                      ({category.count})
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {categories.length > 6 && (
              <button
                className={styles.showMoreButton}
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "Daha az göstər" : "Bütün kateqoriyalar"}
              </button>
            )}
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Əlaqə</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>Dəstək: {userPhone} | 055 262 65 00</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className={styles.footerLinks}>
            <Link href="/about" onClick={handleLinkClick}>
              Haqqımızda
            </Link>
            <Link href="/help" onClick={handleLinkClick}>
              Kömək
            </Link>
            <Link href="/privacy" onClick={handleLinkClick}>
              Məxfilik
            </Link>
            <Link href="/terms" onClick={handleLinkClick}>
              Şərtlər
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
