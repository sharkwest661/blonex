// Performance-Optimized PostCard Component - src/components/PostCard/PostCard.tsx
"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useModals } from "@/hooks/useModals";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./PostCard.module.scss";

// ✅ RESTORED: All original interfaces
export interface PostFeature {
  icon: string;
  tooltip: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  currency: string;
  location: string;
  date: string;
  images: string[];
  href: string;
  isVip?: boolean;
  isPremium?: boolean;
  isStore?: boolean;
  isPulsed?: boolean;
  features: PostFeature[];
  storeInfo?: {
    name: string;
    logo: string;
    href: string;
  };
}

export interface PostCardProps {
  post: Post;
  className?: string;
  variant?: "default" | "vip" | "premium";
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  className,
  variant = "default",
}) => {
  const [imageError, setImageError] = useState(false);

  // ✅ RESTORED: Wishlist and auth integration
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { openLogin } = useModals();
  const { isAuthenticated } = useAuth();

  // ✅ RESTORED: Favorite functionality
  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        openLogin();
        return;
      }

      const wishlistItem = {
        id: post.id,
        title: post.title,
        price: post.price,
        currency: post.currency,
        location: post.location,
        date: post.date,
        image: post.images[0] || "/assets/images/placeholder.jpg",
        href: post.href,
        isVip: post.isVip,
        isPremium: post.isPremium,
      };

      if (isInWishlist(post.id)) {
        removeItem(post.id);
      } else {
        addItem(wishlistItem);
      }
    },
    [post, isAuthenticated, isInWishlist, addItem, removeItem, openLogin]
  );

  // ✅ RESTORED: Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Bu gün";
    if (diffDays === 2) return "Dünən";
    if (diffDays <= 7) return `${diffDays} gün əvvəl`;

    return date.toLocaleDateString("az-AZ");
  };

  const formatPrice = (price: string, currency: string) => {
    return `${price} ${currency}`;
  };

  const getTitleClass = () => {
    if (post.isVip || variant === "vip") {
      return styles.post__title;
    }
    return styles.other_post_title;
  };

  const shouldShowSubtitle = post.isVip && post.subtitle;

  // ✅ RESTORED: Card classes with all variants
  const cardClasses = [
    styles.post__item,
    post.isPulsed ? styles["post__item--pulsed"] : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses}>
      {/* ✅ RESTORED: Image Section */}
      <div className={styles.post__img}>
        <Link href={post.href}>
          {!imageError && post.images.length > 0 ? (
            <Image
              src={post.images[0]}
              alt={post.title}
              width={300}
              height={225}
              className={styles.post__image}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className={styles.post__imagePlaceholder}>Şəkil yoxdur</div>
          )}
        </Link>

        {/* ✅ RESTORED: Overlay Attributes */}
        <div className={styles.post__attributes}>
          <div>
            {/* ✅ RESTORED: VIP Badge */}
            {post.isVip && (
              <div className={styles.post__vip}>
                <Image
                  src="/assets/images/vip-small.svg"
                  alt="VIP"
                  width={16}
                  height={16}
                />
                VIP
              </div>
            )}

            {/* ✅ RESTORED: Premium Badge */}
            {post.isPremium && (
              <div className={styles.post__premium}>
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

          {/* ✅ RESTORED: Favorite Button */}
          <button
            className={`${styles.post__favorite} ${
              isInWishlist(post.id) ? styles.active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isInWishlist(post.id)
                ? "Seçdiklərdən çıxar"
                : "Seçdiklərə əlavə et"
            }
            title={
              isInWishlist(post.id)
                ? "Seçdiklərdən çıxar"
                : "Seçdiklərə əlavə et"
            }
          >
            <Heart
              size={20}
              className={styles.heartIcon}
              fill={isInWishlist(post.id) ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* ✅ RESTORED: Store Info */}
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
              className={styles.storeIcon}
            />
            <span>{post.storeInfo.name}</span>
          </Link>
        )}
      </div>

      {/* ✅ RESTORED: Info Section */}
      <div className={styles.post__info}>
        <div className={styles.post__content}>
          {/* ✅ RESTORED: Title */}
          <Link href={post.href} className={getTitleClass()}>
            {post.title}
          </Link>

          {/* ✅ RESTORED: Subtitle (only for VIP) */}
          {shouldShowSubtitle && (
            <Link href={post.href} className={styles.post__title2}>
              {post.subtitle}
            </Link>
          )}

          {/* ✅ RESTORED: Meta Info */}
          <p className={styles.post__meta}>
            {post.location}, {formatDate(post.date)}
          </p>
        </div>

        {/* ✅ RESTORED: Footer */}
        <div className={styles.post__footer}>
          {/* ✅ RESTORED: Price */}
          <div className={styles.post__price}>
            {formatPrice(post.price, post.currency)}
          </div>

          {/* ✅ RESTORED: Features */}
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
                    width={16}
                    height={16}
                    className={styles.featureIcon}
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
