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
  const content = (
    <>
      {/* Desktop Image */}
      <Image
        src={desktopImage}
        alt={altText}
        width={300}
        height={400}
        className={`${styles.bannerImage} ${styles.bannerImage__desktop}`}
        priority={priority}
        sizes="300px"
      />

      {/* Mobile Image */}
      <Image
        src={mobileImage}
        alt={altText}
        width={350}
        height={200}
        className={`${styles.bannerImage} ${styles.bannerImage__mobile}`}
        priority={priority}
        sizes="(max-width: 767px) 100vw, 0px"
      />
    </>
  );

  return (
    <div className={`${styles.advertisement} ${className || ""}`}>
      <div className={styles.sticky_top}>
        {href && href !== "#" ? (
          <Link href={href} className={styles.bannerLink}>
            {content}
          </Link>
        ) : (
          <div className={styles.bannerLink}>{content}</div>
        )}
      </div>
    </div>
  );
};

export default Advertisement;
