// src/components/Advertisement/Advertisement.tsx
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
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  href = "#",
  desktopImage,
  mobileImage,
  altText,
  priority = false,
  className,
}) => {
  return (
    <div className={`${styles.stickyAd} ${className || ""}`}>
      {/* Desktop Image Link - Only visible on medium screens and up */}
      <Link href={href} className={styles.desktopLink} aria-label={altText}>
        <Image
          src={desktopImage}
          alt={altText}
          width={0}
          height={0}
          sizes="100vw"
          className={styles.bannerImage}
          priority={priority}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>

      {/* Mobile Image Link - Only visible on small screens */}
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
