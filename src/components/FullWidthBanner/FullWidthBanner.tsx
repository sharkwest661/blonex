// src/components/FullWidthBanner/FullWidthBanner.tsx (Enhanced)

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FullWidthBanner.module.scss";

export interface FullWidthBannerProps {
  href?: string;
  imageSrc: string;
  altText: string;
  priority?: boolean;
  className?: string;
  variant?:
    | "default"
    | "promotional"
    | "featured"
    | "minimal"
    | "compact"
    | "seasonal"; // New prop
}

export const FullWidthBanner: React.FC<FullWidthBannerProps> = ({
  href = "#",
  imageSrc,
  altText,
  priority = false,
  className,
  variant = "default",
}) => {
  const bannerClasses = [
    styles.fullWidthBanner,
    variant !== "default" ? styles[variant] : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <Image
      src={imageSrc}
      alt={altText}
      width={1200}
      height={200}
      className={styles.bannerImage}
      priority={priority}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );

  return (
    <section className={bannerClasses}>
      {href && href !== "#" ? (
        <Link href={href} className={styles.bannerLink} aria-label={altText}>
          {content}
        </Link>
      ) : (
        <div className={styles.bannerLink}>{content}</div>
      )}
    </section>
  );
};

export default FullWidthBanner;
