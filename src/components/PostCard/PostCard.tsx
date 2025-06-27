// src/components/PostCard/PostCard.tsx - FIXED TYPE ERRORS
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Store, Heart } from "lucide-react";
import { useFavoritesStoreHydrated } from "@/stores/useFavoritesStore";
import type { Post, PostFeature } from "@/types/post.types";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: Post;
  className?: string;
  onFavoriteToggle?: (postId: string, isFavorite: boolean) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  className,
  onFavoriteToggle,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Use hydration-safe favorites store
  const { favorites, toggleFavorite } = useFavoritesStoreHydrated();
  const isFavorite = favorites.includes(post.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post.id);
    onFavoriteToggle?.(post.id, !isFavorite);
  };

  const handleStoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.storeInfo?.href) {
      window.open(post.storeInfo.href, "_blank");
    }
  };

  const handleStoreKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (post.storeInfo?.href) {
        window.open(post.storeInfo.href, "_blank");
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  // Determine title class based on post type
  const getTitleClass = () => {
    if (post.type === "vip") {
      return styles.post__title;
    }
    return styles.other_post_title;
  };

  // Determine if should show subtitle (only for VIP)
  const shouldShowSubtitle = post.type === "vip" && post.subtitle;

  // Determine if card should have pulsed animation
  const shouldPulse = post.type === "premium";

  return (
    <div
      className={`${styles.post__item} ${
        shouldPulse ? styles["post__item--pulsed"] : ""
      } ${className || ""}`}
    >
      {/* Image Section */}
      <div className={styles.post__img}>
        <Link href={post.href} className={styles.imageLink}>
          {!imageError ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 576px) 50vw, (max-width: 767px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className={styles.post__image}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.post__imagePlaceholder}>
              <span>Şəkil yüklənmədi</span>
            </div>
          )}
        </Link>

        {/* Image Overlays */}
        <div className={styles.post__attributes}>
          <div className={styles.post__badges}>
            {/* VIP Badge */}
            {(post.hasVipBadge || post.type === "vip") && (
              <span
                className={styles.post__vip}
                title="VIP elan"
                aria-label="VIP elan"
              />
            )}

            {/* Premium Badge */}
            {(post.hasPremiumBadge || post.type === "premium") && (
              <span
                className={styles.post__premium}
                title="Premium elan"
                aria-label="Premium elan"
              />
            )}
          </div>

          {/* Favorites Button */}
          <button
            type="button"
            className={`${styles.post__favorites} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"
            }
            title={isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"}
          >
            <Heart size={16} className={styles.heartIcon} />
          </button>
        </div>

        {/* Special Opportunity Badge (for pulsed items) */}
        {shouldPulse && (
          <div className={styles.post__chance}>
            <div className={styles.post__chanceContent}>
              <span className={styles.post__chanceIcon}>⚡</span>
              <span className={styles.post__chanceText}>SUPER FÜRSƏT!</span>
            </div>
          </div>
        )}
      </div>

      {/* Store Info Section - MOVED OUTSIDE IMAGE */}
      {post.isStore && post.storeInfo && (
        <div className={styles.post__storeSection}>
          <div
            className={styles.post__store}
            onClick={handleStoreClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleStoreKeyDown}
          >
            <div className={styles.post__storeIcon}>
              <Store size={14} />
            </div>
            <span className={styles.post__storeName}>
              {post.storeInfo.name}
            </span>
            <div className={styles.post__storeIndicator}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 3L7.5 6L4.5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className={styles.post__info}>
        <div className={styles.post__content}>
          {/* Title */}
          <Link href={post.href} className={getTitleClass()}>
            {post.title}
          </Link>

          {/* Subtitle (only for VIP) */}
          {shouldShowSubtitle && (
            <p className={styles.post__subtitle}>{post.subtitle}</p>
          )}

          {/* Meta Info */}
          <p className={styles.post__meta}>
            {post.location}, {formatDate(post.date)}
          </p>
        </div>

        {/* Footer */}
        <div className={styles.post__footer}>
          {/* Price */}
          <div
            className={`${styles.post__price} ${
              shouldPulse ? styles["post__price--secondary"] : ""
            }`}
          >
            {formatPrice(post.price, post.currency)}
          </div>

          {/* Features */}
          {post.features.length > 0 && (
            <div className={styles.post__features}>
              {post.features.map((feature, index) => (
                <span
                  key={index}
                  className={styles.post__feature}
                  title={feature.tooltip}
                  aria-label={feature.tooltip}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.tooltip}
                    width={18}
                    height={18}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
