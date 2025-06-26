// Enhanced Advertisement Component with variants
// src/components/Advertisement/Advertisement.tsx (Enhanced)

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Advertisement.module.scss";

export interface AdvertisementProps {
  href?: string;
  desktopImage: string;
  mobileImage: string;
  altText: string;
  priority?: boolean;
  className?: string;
  variant?: "default" | "compact" | "featured" | "minimal"; // New prop
  promotional?: boolean; // New prop for promotional badges
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  href = "#",
  desktopImage,
  mobileImage,
  altText,
  priority = false,
  className,
  variant = "default",
  promotional = false,
}) => {
  const stickyAdClasses = [
    styles.stickyAd,
    variant !== "default" ? styles[variant] : "",
    promotional ? styles.promotional : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={stickyAdClasses}>
      {/* Desktop Image Link */}
      <Link href={href} className={styles.desktopLink} aria-label={altText}>
        <Image
          src={desktopImage}
          alt={altText}
          width={0}
          height={0}
          sizes="(max-width: 768px) 0px, (max-width: 1200px) 200px, 250px"
          className={styles.bannerImage}
          priority={priority}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>

      {/* Mobile Image Link - Hidden as per requirement */}
      <Link href={href} className={styles.mobileLink} aria-label={altText}>
        <Image
          src={mobileImage}
          alt={altText}
          width={0}
          height={0}
          sizes="100vw"
          className={styles.bannerImage}
          priority={priority}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default Advertisement;
