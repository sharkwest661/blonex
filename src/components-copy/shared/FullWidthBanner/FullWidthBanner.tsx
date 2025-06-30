// src/components/FullWidthBanner/FullWidthBanner.tsx
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
}

export const FullWidthBanner: React.FC<FullWidthBannerProps> = ({
  href = "#",
  imageSrc,
  altText,
  priority = false,
  className,
}) => {
  const content = (
    <Image
      src={imageSrc}
      alt={altText}
      width={1200}
      height={200}
      className={styles.bannerImage}
      priority={priority}
      sizes="100vw"
    />
  );

  return (
    <section className={`${styles.fullWidthBanner} ${className || ""}`}>
      {href && href !== "#" ? (
        <Link href={href} className={styles.bannerLink}>
          {content}
        </Link>
      ) : (
        <div className={styles.bannerLink}>{content}</div>
      )}
    </section>
  );
};

export default FullWidthBanner;
