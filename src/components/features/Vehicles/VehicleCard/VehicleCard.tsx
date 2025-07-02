// src/components/Listings/VehicleCard/VehicleCard.tsx - FIXED VERSION
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, MapPin, Fuel, ArrowRight } from "lucide-react";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import type { VehicleCardProps, VehicleFeature } from "@/types/vehicle.types";
import styles from "./VehicleCard.module.scss";

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  className,
  onFavoriteToggle,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Get favorites from Zustand store
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(vehicle.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(vehicle.id);
    onFavoriteToggle?.(vehicle.id, !isFavorite);
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
    // For now, just return the date string as is
    return dateString;
  };

  return (
    <div className={`${styles.card} ${className || ""}`}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <Image
            src={vehicle.imageUrl}
            alt={vehicle.title}
            fill
            sizes="(max-width: 576px) 50vw, (max-width: 767px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className={styles.cardImage}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Şəkil yüklənmədi</span>
          </div>
        )}

        {/* Badges and Favorites */}
        <div className={styles.cardAttributes}>
          {/* VIP Badge */}
          {(vehicle.hasVipBadge || vehicle.type === "vip") && (
            <span
              className={styles.vipBadge}
              title="VIP elan"
              aria-label="VIP elan"
            />
          )}

          {/* Premium Badge */}
          {(vehicle.hasPremiumBadge || vehicle.type === "premium") && (
            <span
              className={styles.premiumBadge}
              title="Premium elan"
              aria-label="Premium elan"
            />
          )}

          {/* Favorites Button */}
          <button
            type="button"
            className={`${styles.favoriteButton} ${
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
      </div>

      {/* Vehicle Details */}
      <div className={styles.cardContent}>
        {/* Title and Price */}
        <div className={styles.header}>
          <Link href={vehicle.href} className={styles.title}>
            {vehicle.title}
          </Link>
          <div className={styles.price}>
            {formatPrice(vehicle.price, vehicle.currency)}
          </div>
        </div>

        {/* Subtitle (year, engine, mileage) */}
        {vehicle.subtitle && (
          <div className={styles.subtitle}>{vehicle.subtitle}</div>
        )}

        {/* Vehicle Specs */}
        <div className={styles.specs}>
          {vehicle.year && (
            <div className={styles.specItem}>
              <Clock size={14} className={styles.specIcon} />
              <span>{vehicle.year}</span>
            </div>
          )}

          {vehicle.engineSize && (
            <div className={styles.specItem}>
              <Fuel size={14} className={styles.specIcon} />
              <span>{vehicle.engineSize} L</span>
            </div>
          )}

          {vehicle.mileage && (
            <div className={styles.specItem}>
              <ArrowRight size={14} className={styles.specIcon} />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>

        {/* Location and Date */}
        <div className={styles.footer}>
          <div className={styles.location}>
            <MapPin size={14} className={styles.locationIcon} />
            <span>{vehicle.location}</span>
          </div>
          <div className={styles.date}>{formatDate(vehicle.date)}</div>
        </div>

        {/* Features (Barter, Credit) */}
        {vehicle.features.length > 0 && (
          <div className={styles.features}>
            {vehicle.features.map((feature: VehicleFeature, index: number) => (
              <div
                key={index}
                className={styles.feature}
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
  );
};

export default VehicleCard;
