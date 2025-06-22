// src/components/SectionTitle/SectionTitle.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Layout/Container/Container";
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
  className?: string;
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
  className,
}) => {
  const titleClass = `${styles.title} ${styles[`title--${align}`]} ${
    className || ""
  }`;

  return (
    <div className={styles.title_bg}>
      <Container>
        <div className={titleClass}>
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

          {/* Sort Dropdown for "Yeni elanlar" section */}
          {showSortDropdown && (
            <form className={styles.sort__form}>
              <div className={styles.sort__select}>
                <select
                  id="sort_input"
                  className={styles.selectpicker}
                  defaultValue="-created_at"
                >
                  <option value="-created_at">Əvvəlcə yeni</option>
                  <option value="created_at">Əvvəlcə köhnə</option>
                  <option value="-price">Əvvəlcə baha</option>
                  <option value="price">Əvvəlcə ucuz</option>
                </select>
              </div>
            </form>
          )}

          {/* See All Link */}
          {seeAllText && seeAllHref && (
            <Link href={seeAllHref} className={styles.btn}>
              <Image
                src="/assets/img/chevron_lmain.svg"
                alt=""
                width={16}
                height={16}
              />
              {seeAllText}
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SectionTitle;
