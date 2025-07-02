import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import styles from "./PostCard.module.scss";

// Use existing Post interface from the project
export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
  type?: "regular" | "vip" | "premium";
  isChance?: boolean;
  features?: {
    icon: string;
    tooltip: string;
    type: "barter" | "credit" | "delivery" | "warranty";
  }[];
  store?: {
    name: string;
    icon?: string;
    href: string;
  };
}

export interface PostCardProps {
  post: Post;
  className?: string;
  onFavoriteToggle?: (postId: string, isFavorite: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  className,
  onFavoriteToggle,
}) => {
  // Get favorites from store
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(post.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post.id);
    onFavoriteToggle?.(post.id, !isFavorite);
  };

  // Helper to get feature icons
  const getFeatureIcon = (featureType: string) => {
    switch (featureType) {
      case "credit":
        return "/assets/images/percent.svg";
      case "barter":
        return "/assets/images/barter.svg";
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.postItem} ${className || ""}`}>
      <div className={styles.postImg}>
        <Link href={post.href}>
          <Image
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width: 576px) 50vw, (max-width: 767px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className={styles.image}
          />
        </Link>

        <div className={styles.postAttributes}>
          {post.type === "vip" && (
            <span
              className={styles.postVip}
              title="VIP elan"
              aria-label="VIP elan"
            />
          )}
          {post.type === "premium" && (
            <span
              className={styles.postPremium}
              title="Premium elan"
              aria-label="Premium elan"
            />
          )}
          <button
            className={`${styles.postFavorites} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            type="button"
          >
            <Heart
              size={16}
              fill={isFavorite ? "#ff6b6b" : "transparent"}
              stroke={isFavorite ? "#ff6b6b" : "#666"}
            />
          </button>
        </div>
      </div>

      <div className={styles.postInfo}>
        {/* First div: Title section with 2 lines */}
        <div className={styles.titleSection}>
          <Link href={post.href} className={styles.postTitle}>
            {post.title}
          </Link>
          <div className={styles.postSubtitle}>{post.subtitle || ""}</div>
        </div>

        <div style={{ flex: 1 }}></div>

        {/* Second div: Location and date */}
        <div className={styles.metaSection}>
          <p>
            {post.location}, {post.date}, {post.time}
          </p>
        </div>

        {/* Third div: Price and features */}
        <div className={styles.priceSection}>
          <div className={styles.postPrice}>
            {post.price.toLocaleString()} {post.currency}
          </div>
          {post.features && post.features.length > 0 && (
            <div className={styles.featuresContainer}>
              {post.features.map((feature, index) => {
                const iconSrc = getFeatureIcon(feature.type);
                return iconSrc ? (
                  <span
                    key={index}
                    className={styles.postFeature}
                    title={feature.tooltip}
                    aria-label={feature.tooltip}
                  >
                    <Image
                      src={iconSrc}
                      alt={feature.tooltip}
                      width={20}
                      height={20}
                    />
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
