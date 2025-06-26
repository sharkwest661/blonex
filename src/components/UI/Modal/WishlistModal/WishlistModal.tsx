// Updated Wishlist Modal Component - src/components/Modals/WishlistModal/WishlistModal.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Trash2, Share2, Eye } from "lucide-react";
import { useFavoritesStoreHydrated } from "@/stores/useFavoritesStore";
import styles from "./WishlistModal.module.scss";

// ✅ SIMPLIFIED: Use your existing favorites structure
interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Remove items prop since we get them from store
  // onRemoveItem and onClearAll are handled by store
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FIXED: Use your existing favorites store
  const { favorites, removeFavorite, clearFavorites } =
    useFavoritesStoreHydrated();

  if (!isOpen) return null;

  const handleRemoveItem = async (id: string) => {
    setIsLoading(true);
    try {
      removeFavorite(id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    setIsLoading(true);
    try {
      clearFavorites();
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Seçdiklərim - Bolbol",
        text: `${favorites.length} seçilmiş elan`,
        url: window.location.origin + "/sechdiklerim",
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + "/sechdiklerim");
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <Heart className={styles.heartIcon} size={24} />
            <div>
              <h2 className={styles.modalTitle}>Seçdiklərim</h2>
              <p className={styles.itemCount}>
                {favorites.length} elan seçildi
              </p>
            </div>
          </div>

          <div className={styles.headerActions}>
            {favorites.length > 0 && (
              <>
                <button
                  className={styles.shareBtn}
                  onClick={handleShare}
                  title="Paylaş"
                >
                  <Share2 size={20} />
                </button>
                <button
                  className={styles.clearAllBtn}
                  onClick={handleClearAll}
                  disabled={isLoading}
                  title="Hamısını sil"
                >
                  <Trash2 size={20} />
                  Hamısını sil
                </button>
              </>
            )}
            <button className={styles.closeBtn} onClick={onClose} title="Bağla">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <Heart className={styles.emptyIcon} size={64} />
              <h3>Heç bir elan seçilməyib</h3>
              <p>Bəyəndiyiniz elanları seçdiklər siyahısına əlavə edin</p>
              <Link href="/" className={styles.browseBtn} onClick={onClose}>
                Elanları gözdən keçir
              </Link>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {/* ✅ SIMPLIFIED: Show favorite IDs for now */}
              {/* You can enhance this to fetch full post data based on IDs */}
              {favorites.map((postId) => (
                <div key={postId} className={styles.wishlistItem}>
                  <div className={styles.itemImage}>
                    <div className={styles.image}>
                      {/* Placeholder - you can fetch actual post data */}
                      <span>📋</span>
                    </div>
                  </div>

                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>Elan ID: {postId}</h4>
                    <div className={styles.itemMeta}>
                      <span className={styles.location}>Seçilmiş elan</span>
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(postId)}
                      disabled={isLoading}
                      title="Seçdiklərdən çıxar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {favorites.length > 0 && (
          <div className={styles.modalFooter}>
            <p className={styles.footerText}>
              Seçdiyiniz elanlar cihazınızda saxlanılır
            </p>
            <Link
              href="/sechdiklerim"
              className={styles.viewAllBtn}
              onClick={onClose}
            >
              Hamısını göstər
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;
