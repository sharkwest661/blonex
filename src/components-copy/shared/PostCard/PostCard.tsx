// src/components/PostCard/PostCard.tsx - RESTORED ORIGINAL DESIGN
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Store, Heart } from "lucide-react";
import type { Post } from "@/types/post.types";
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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteToggle?.(post.id, newFavoriteState);
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
    return `${price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`;
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
      className={`${styles.post__item} ${className || ""} ${
        shouldPulse ? styles["post__item--pulsed"] : ""
      }`}
    >
      {/* Store Section - ORIGINAL DESIGN */}
      {post.storeInfo && (
        <div className={styles.post__storeSection}>
          <div
            className={styles.post__store}
            onClick={handleStoreClick}
            onKeyDown={handleStoreKeyDown}
            role="button"
            tabIndex={0}
          >
            <div className={styles.post__storeIcon}>
              <Store size={14} />
            </div>
            <span className={styles.post__storeName}>
              {post.storeInfo.name}
            </span>
            <div className={styles.post__storeIndicator}>
              <span>›</span>
            </div>
          </div>
        </div>
      )}

      {/* Image Section - ORIGINAL DESIGN with position fix */}
      <div className={styles.post__img}>
        <Link href={post.href} className={styles.imageLink}>
          {!imageError ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill // ✅ Now properly supported with relative parent
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

        {/* Image Overlays - ORIGINAL DESIGN */}
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

          {/* Favorites Button - ORIGINAL DESIGN */}
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

        {/* Special Opportunity Badge - ORIGINAL DESIGN */}
        <div className={styles.post__chance}>
          <div className={styles.post__chanceContent}>
            <span className={styles.post__chanceIcon}>⚡</span>
            <span className={styles.post__chanceText}>FÜRSƏT</span>
          </div>
        </div>
      </div>

      {/* Info Section - ORIGINAL DESIGN */}
      <div className={styles.post__info}>
        <div className={styles.post__content}>
          {/* Title */}
          <Link href={post.href} className={getTitleClass()}>
            {post.title}
          </Link>

          {/* Subtitle (for VIP posts) */}
          {shouldShowSubtitle && (
            <div className={styles.post__subtitle}>{post.subtitle}</div>
          )}

          {/* Meta */}
          <div className={styles.post__meta}>{post.location}</div>
        </div>

        {/* Footer - ORIGINAL DESIGN */}
        <div className={styles.post__footer}>
          {/* Price */}
          <div
            className={`${styles.post__price} ${
              post.type === "premium" ? styles["post__price--secondary"] : ""
            }`}
          >
            {formatPrice(post.price, post.currency)}
          </div>

          {/* Features */}
          {post.features && post.features.length > 0 && (
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
