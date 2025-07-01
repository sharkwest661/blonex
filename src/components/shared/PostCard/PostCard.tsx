import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import styles from "./PostCard.module.scss";

// TypeScript interfaces
export interface PostFeature {
  icon: string;
  tooltip: string;
  type: "barter" | "credit" | "delivery" | "warranty";
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  location: string;
  date: string;
  time: string;
  image: string;
  imageAlt?: string;
  href: string;
  type?: "regular" | "vip" | "premium";
  isChance?: boolean;
  features?: PostFeature[];
  store?: {
    name: string;
    icon?: string;
    href: string;
  };
}

interface PostCardProps {
  post: Post;
  className?: string;
  onFavoriteToggle?: (postId: string, isFavorite: boolean) => void;
  isChecked?: boolean;
  onCheckedChange?: (postId: string, isChecked: boolean) => void;
  variant?: "default" | "compact" | "featured";
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  className = "",
  onFavoriteToggle,
  isChecked = false,
  onCheckedChange,
  variant = "default",
}) => {
  // State for loading states
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Get favorites from store
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(post.id);

  // Event handlers
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

  // Helper functions
  const formatPrice = (price: number, currency: string): string => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const formatDateTime = (date: string, time: string): string => {
    return `${date}, ${time}`;
  };

  // Component CSS classes
  const getCardClasses = (): string => {
    let classes = styles.post__item;

    if (isChecked) classes += ` ${styles["post__item--checked"]}`;
    if (post.isChance) classes += ` ${styles["post__item--pulsed"]}`;
    if (variant !== "default")
      classes += ` ${styles[`post__item--${variant}`]}`;
    if (className) classes += ` ${className}`;

    return classes;
  };

  const getTitleClasses = (): string => {
    let classes = styles.post__title;
    if (post.type === "vip" || post.type === "premium") {
      classes += ` ${styles.post__title__special}`;
    }
    return classes;
  };

  const getPriceClasses = (): string => {
    let classes = styles.post__price;
    if (post.type === "premium") {
      classes += ` ${styles["post__price--secondary"]}`;
    }
    return classes;
  };

  return (
    <div className={getCardClasses()}>
      {/* Image Section */}
      <div className={styles.post__img}>
        <Link href={post.href} className={styles.post__imgLink}>
          {!imageError && post.image && post.image.trim() !== "" ? (
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className={styles.post__image}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className={styles.post__imagePlaceholder}>
              <span>Şəkil yoxdur</span>
            </div>
          )}

          {imageLoading && !imageError && post.image && (
            <div className={styles.post__imageLoader}>
              <div className={styles.post__imageSpinner}></div>
            </div>
          )}
        </Link>

        {/* Attributes Overlay */}
        <div className={styles.post__attributes}>
          {/* VIP Badge - CSS background image like original */}
          {post.type === "vip" && (
            <span
              className={styles.post__vip}
              title="VIP elan"
              aria-label="VIP elan"
            />
          )}

          {/* Premium Badge - CSS background image like original */}
          {post.type === "premium" && (
            <span
              className={styles.post__premium}
              title="Premium elan"
              aria-label="Premium elan"
            />
          )}

          {/* Favorites Button */}
          <button
            className={`${styles.post__favorites} ${
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

        {/* Special Chance Badge */}
        {post.isChance && <div className={styles.post__chance}>FÜRSƏT</div>}
      </div>

      {/* Store Section (if available) */}
      {post.store && (
        <div className={styles.post__storeSection}>
          <Link href={post.store.href} className={styles.post__store}>
            {post.store.icon && (
              <Image
                src={post.store.icon}
                alt={post.store.name}
                width={16}
                height={16}
                className={styles.post__storeIcon}
              />
            )}
            <span className={styles.post__storeName}>{post.store.name}</span>
          </Link>
        </div>
      )}

      {/* Info Section */}
      <div className={styles.post__info}>
        <div className={styles.post__content}>
          {/* Title */}
          <Link href={post.href} className={getTitleClasses()}>
            {post.title}
          </Link>

          {/* Subtitle (for special posts) */}
          {post.subtitle && (
            <div className={styles.post__subtitle}>{post.subtitle}</div>
          )}

          {/* Meta Information */}
          <div className={styles.post__meta}>
            {formatDateTime(post.date, post.time)}
          </div>
        </div>

        {/* Footer with Price and Features */}
        <div className={styles.post__footer}>
          <div className={getPriceClasses()}>
            {formatPrice(post.price, post.currency)}
          </div>

          {/* Features Icons */}
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
