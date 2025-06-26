// Wishlist Modal Component - src/components/Modals/WishlistModal/WishlistModal.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Trash2, Share2, Eye } from "lucide-react";
import styles from "./WishlistModal.module.scss";

interface WishlistItem {
  id: string;
  title: string;
  price: string;
  currency: string;
  location: string;
  date: string;
  image: string;
  href: string;
  isVip?: boolean;
  isPremium?: boolean;
}

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRemoveItem = async (id: string) => {
    setIsLoading(true);
    try {
      onRemoveItem(id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    setIsLoading(true);
    try {
      onClearAll();
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Seçdiklərim - Bolbol",
        text: `${items.length} seçilmiş elan`,
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
              <p className={styles.itemCount}>{items.length} elan seçildi</p>
            </div>
          </div>

          <div className={styles.headerActions}>
            {items.length > 0 && (
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
          {items.length === 0 ? (
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
              {items.map((item) => (
                <div key={item.id} className={styles.wishlistItem}>
                  <div className={styles.itemImage}>
                    <Link href={item.href} onClick={onClose}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={90}
                        className={styles.image}
                      />
                    </Link>

                    {/* Badges */}
                    {item.isVip && (
                      <div className={styles.vipBadge}>
                        <Image
                          src="/assets/images/vip-small.svg"
                          alt="VIP"
                          width={16}
                          height={16}
                        />
                        VIP
                      </div>
                    )}
                    {item.isPremium && (
                      <div className={styles.premiumBadge}>
                        <Image
                          src="/assets/images/premium-small.svg"
                          alt="Premium"
                          width={16}
                          height={16}
                        />
                        Premium
                      </div>
                    )}
                  </div>

                  <div className={styles.itemContent}>
                    <Link href={item.href} onClick={onClose}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                    </Link>

                    <div className={styles.itemPrice}>
                      {item.price} {item.currency}
                    </div>

                    <div className={styles.itemMeta}>
                      <span className={styles.location}>{item.location}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <Link
                      href={item.href}
                      className={styles.viewBtn}
                      onClick={onClose}
                      title="Elana bax"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item.id)}
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
        {items.length > 0 && (
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
