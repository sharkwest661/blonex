// src/components/SectionTitle/SectionTitle.tsx (FIXED TypeScript Issues)
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Select, type SelectOption } from "@/components/UI/Select";
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
  // ✅ NEW: Add these props for flexibility
  selectOptions?: SelectOption[];
  selectedValue?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
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
  noPadding = true,
  selectOptions,
  selectedValue,
}) => {
  const titleClasses = `${styles.title} ${styles[`title--${align}`]} ${
    noPadding ? styles.noPadding : ""
  } ${className || ""}`;

  // ✅ FIXED: Default sort options with proper SelectOption type
  const defaultSortOptions: SelectOption[] = [
    { value: "-created_at", label: "Əvvəlcə yeni" },
    { value: "created_at", label: "Əvvəlcə köhnə" },
    { value: "-price", label: "Əvvəlcə baha" },
    { value: "price", label: "Əvvəlcə ucuz" },
  ];

  const sortOptions = selectOptions || defaultSortOptions;

  // ✅ FIXED: Find selected value as SelectOption object
  const selectedOption = selectedValue
    ? sortOptions.find((option) => option.value === selectedValue) || null
    : null;

  const renderSelectForm = (isMobile = false) => {
    if (!showSortDropdown || !onSortChange) return null;

    const formClasses = isMobile
      ? `${styles.sort__form} ${styles["sort__form--mobile"]}`
      : styles.sort__form;

    return (
      <div className={formClasses}>
        <Select
          options={sortOptions}
          value={selectedOption}
          onChange={onSortChange}
          className={styles.sort__select}
          variant="sort"
          isSearchable={false}
          placeholder="Çeşidlə"
        />
      </div>
    );
  };

  return (
    <>
      {/* Main title container */}
      <div className={`${styles.title_bg} ${className || ""}`}>
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

            {/* Desktop: Show select inside title */}
            <div className="d-none d-md-flex">{renderSelectForm(false)}</div>

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

      {/* Mobile: Show select outside title */}
      <div className="d-block d-md-none">{renderSelectForm(true)}</div>
    </>
  );
};

export default SectionTitle;
