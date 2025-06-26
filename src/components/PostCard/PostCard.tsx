// src/components/PostCard/PostCard.tsx - TURBO.AZ STYLE VERSION
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
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

  const { favorites, toggleFavorite } = useFavoritesStoreHydrated();
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
    return dateString;
  };

  return (
    <Link href={post.href} className={`${styles.postCard} ${className || ""}`}>
      {/* Image Section */}
      <div className={styles.postCard__imageContainer}>
        {!imageError ? (
          <Image
            src={post.imageUrl || "/assets/images/no-image.png"}
            alt={post.title}
            fill
            className={styles.postCard__image}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.postCard__imagePlaceholder}>
            <span>Şəkil yoxdur</span>
          </div>
        )}

        {/* Overlays */}
        <div className={styles.postCard__overlays}>
          {/* VIP Badge */}
          {post.type === "vip" && (
            <div className={styles.postCard__vipBadge}>VIP</div>
          )}

          {/* Premium Badge */}
          {post.type === "premium" && (
            <div className={styles.postCard__premiumBadge}>Premium</div>
          )}

          {/* Favorite Button */}
          <button
            className={`${styles.postCard__favoriteBtn} ${
              isFavorite ? styles.postCard__favoriteBtn__active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"
            }
          >
            <Heart
              size={16}
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Store Badge */}
        {post.isStore && post.storeInfo && (
          <div className={styles.postCard__storeBadge}>
            <Image
              src={post.storeInfo.logo}
              alt={post.storeInfo.name}
              width={14}
              height={14}
            />
            <span>{post.storeInfo.name}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.postCard__content}>
        {/* Title */}
        <h3 className={styles.postCard__title}>{post.title}</h3>

        {/* Subtitle for VIP */}
        {post.type === "vip" && post.subtitle && (
          <p className={styles.postCard__subtitle}>{post.subtitle}</p>
        )}

        {/* Meta */}
        <div className={styles.postCard__meta}>
          <span className={styles.postCard__location}>{post.location}</span>
          <span className={styles.postCard__date}>{formatDate(post.date)}</span>
        </div>

        {/* Price and Features */}
        <div className={styles.postCard__footer}>
          <div className={styles.postCard__price}>
            {formatPrice(post.price, post.currency)}
          </div>

          {/* Features */}
          {post.features.length > 0 && (
            <div className={styles.postCard__features}>
              {post.features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  className={styles.postCard__feature}
                  title={feature.tooltip}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.tooltip}
                    width={16}
                    height={16}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
