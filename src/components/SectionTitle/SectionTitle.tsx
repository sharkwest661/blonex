// src/components/SectionTitle/SectionTitle.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Select } from "@/components/UI/Select";
import styles from "./SectionTitle.module.scss";

export interface SectionTitleProps {
  title: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  seeAllText?: string;
  seeAllHref?: string;
  align?: "left" | "center" | "right";
  showSortDropdown?: boolean;
  onSortChange?: (value: string) => void;
  className?: string;
  noPadding?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon,
  iconWidth = 24,
  iconHeight = 24,
  seeAllText,
  seeAllHref,
  align = "left",
  showSortDropdown = false,
  onSortChange,
  className,
  noPadding = true, // Default to no padding to match original
}) => {
  const titleClasses = `${styles.title} ${styles[`title--${align}`]} ${
    noPadding ? styles.noPadding : ""
  } ${className || ""}`;

  const sortOptions = [
    { value: "-created_at", label: "Əvvəlcə yeni" },
    { value: "created_at", label: "Əvvəlcə köhnə" },
    { value: "-price", label: "Əvvəlcə baha" },
    { value: "price", label: "Əvvəlcə ucuz" },
  ];

  return (
    <div className={styles.title_bg}>
      <div className="main_container">
        <div className={titleClasses}>
          <span className={styles.center_vertical}>
            {icon && (
              <Image
                src={icon}
                alt=""
                width={iconWidth}
                height={iconHeight}
                className={styles.title__icon}
              />
            )}
            {title}
          </span>

          {/* Sort Dropdown - Only for "Yeni elanlar" section */}
          {showSortDropdown && (
            <div className={styles.sort__form}>
              <Select
                options={sortOptions}
                defaultValue="-created_at"
                onChange={onSortChange}
                className={styles.sort__select}
                variant="sort"
                isSearchable={false}
                aria-label="Sort listings"
                instanceId="sort-select"
              />
            </div>
          )}

          {/* See All Link */}
          {seeAllText && seeAllHref && (
            <Link href={seeAllHref} className={styles.btn}>
              <Image
                src="/assets/images/chevron_lmain.svg"
                alt=""
                width={16}
                height={16}
              />
              {seeAllText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
