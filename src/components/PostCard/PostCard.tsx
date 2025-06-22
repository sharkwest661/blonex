// src/components/PostCard/PostCard.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import styles from "./PostCard.module.scss";

export interface PostFeature {
  type: "barter" | "credit";
  icon: string;
  tooltip: string;
  enabled: boolean;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string; // For VIP posts (e.g., "2020, 4.0 L, 23 000 km")
  price: number;
  currency: string;
  location: string;
  date: string;
  imageUrl: string;
  type: "vip" | "premium" | "recent";
  features: PostFeature[];
  href: string;
  hasVipBadge?: boolean;
  hasPremiumBadge?: boolean;
  isStore?: boolean;
  storeInfo?: {
    name: string;
    logo: string;
    href: string;
  };
}

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

  // Get favorites from Zustand store
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(post.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post.id);
    onFavoriteToggle?.(post.id, !isFavorite);
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
    // Assuming date format like "28.01.2021, 16:34"
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

  return (
    <div className={`${styles.post__item} ${className || ""}`}>
      {/* Image Section */}
      <div className={styles.post__img}>
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

        {/* Overlays */}
        <div className={styles.post__attributes}>
          {/* VIP Badge */}
          {(post.hasVipBadge || post.type === "vip") && (
            <span
              className={styles.post__vip}
              title="VIP elan"
              aria-label="VIP elan"
            />
          )}

          {/* Premium Badge */}
          {(post.hasPremiumBadge || post.type === "vip") && (
            <span
              className={styles.post__premium}
              title="Premium elan"
              aria-label="Premium elan"
            />
          )}

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
          />
        </div>

        {/* Store Info (if applicable) */}
        {post.isStore && post.storeInfo && (
          <Link
            href={post.storeInfo.href}
            className={styles.post__store}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={post.storeInfo.logo}
              alt={post.storeInfo.name}
              width={16}
              height={16}
            />
            <span>{post.storeInfo.name}</span>
          </Link>
        )}
      </div>

      {/* Info Section */}
      <div className={styles.post__info}>
        <div className={styles.post__content}>
          {/* Title */}
          <Link href={post.href} className={getTitleClass()}>
            {post.title}
          </Link>

          {/* Subtitle (only for VIP) */}
          {shouldShowSubtitle && (
            <Link href={post.href} className={styles.post__title2}>
              {post.subtitle}
            </Link>
          )}

          {/* Meta Info */}
          <p className={styles.post__meta}>
            {post.location}, {formatDate(post.date)}
          </p>
        </div>

        {/* Footer */}
        <div className={styles.post__footer}>
          {/* Price */}
          <div className={styles.post__price}>
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
                    width={20}
                    height={20}
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
