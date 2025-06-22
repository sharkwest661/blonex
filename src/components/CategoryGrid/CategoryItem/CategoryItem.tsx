// src/components/CategoryGrid/CategoryItem/CategoryItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category.types";
import styles from "./CategoryItem.module.scss";

interface CategoryItemProps {
  category: Category;
  className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, className }) => {
  return (
    <Link
      href={category.href}
      className={`${styles.category__item} ${className || ""}`}
      aria-label={`${category.name} kateqoriyasına bax`}
    >
      <div className={styles.category__icon}>
        <Image
          src={category.icon}
          alt={`${category.name} icon`}
          width={32}
          height={32}
          priority={true} // Icons are above the fold
          sizes="32px"
        />
      </div>
      <span className={styles.category__name}>{category.name}</span>
      {category.count && category.count > 0 && (
        <span className={styles.category__count}>{category.count}</span>
      )}
    </Link>
  );
};

export default CategoryItem;
