// src/components/PostCard/PostCard.tsx
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
  const [isFavorite, setIsFavorite] = useState(false); // You can connect this to your favorites store

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

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // ✅ FIXED: Import and use proper utility to avoid hydration issues
  const formatPriceValue = (price: number): string => {
    // Manual formatting to avoid locale differences between server/client
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const displayPrice = `${formatPriceValue(post.price)} ${post.currency}`;

  return (
    <article className={`${styles.post} ${className || ""}`}>
      {/* ✅ FIXED: Image Container with proper position relative */}
      <div className={styles.post__imageContainer}>
        <Link href={post.href} className={styles.post__link}>
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

        {/* Image Overlays - Positioned within image container */}
        <div className={styles.post__overlays}>
          {/* Badges */}
          <div className={styles.post__badges}>
            {/* VIP Badge */}
            {(post.hasVipBadge || post.type === "vip") && (
              <span
                className={styles.post__vipBadge}
                title="VIP elan"
                aria-label="VIP elan"
              />
            )}

            {/* Premium Badge */}
            {(post.hasPremiumBadge || post.type === "premium") && (
              <span
                className={styles.post__premiumBadge}
                title="Premium elan"
                aria-label="Premium elan"
              />
            )}
          </div>

          {/* Favorites Button */}
          <button
            type="button"
            className={`${styles.post__favoriteBtn} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"
            }
            title={isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"}
          >
            <Heart size={16} />
          </button>
        </div>

        {/* Loading State */}
        {imageLoading && (
          <div className={styles.post__imageLoader}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.post__content}>
        {/* Store Info (if available) */}
        {post.storeInfo && (
          <div
            className={styles.post__store}
            onClick={handleStoreClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleStoreClick(e as any);
              }
            }}
          >
            <Store size={14} />
            <span className={styles.post__storeName}>
              {post.storeInfo.name}
            </span>
          </div>
        )}

        {/* Post Title */}
        <h3 className={styles.post__title}>
          <Link href={post.href} className={styles.post__titleLink}>
            {post.title}
          </Link>
        </h3>

        {/* Subtitle (for VIP posts) */}
        {post.type === "vip" && post.subtitle && (
          <p className={styles.post__subtitle}>{post.subtitle}</p>
        )}

        {/* Price and Location */}
        <div className={styles.post__meta}>
          <div className={styles.post__price}>{displayPrice}</div>
          <div className={styles.post__location}>{post.location}</div>
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
                  width={16}
                  height={16}
                />
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <div className={styles.post__date}>{post.date}</div>
      </div>
    </article>
  );
};

export default PostCard;
