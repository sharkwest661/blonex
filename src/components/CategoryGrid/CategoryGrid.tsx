// src/components/CategoryGrid/CategoryGrid.tsx
"use client";
import React, { useState } from "react";
import { Category } from "@/types/category.types";
import { useCategories } from "@/hooks/useCategories";
import CategoryItem from "./CategoryItem/CategoryItem";
import CategoryButton from "./CategoryButton/CategoryButton";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridProps {
  categories?: Category[];
  showAllButton?: boolean;
  maxVisibleItems?: number;
  className?: string;
  useApi?: boolean; // Whether to fetch from API or use provided categories
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories: providedCategories,
  showAllButton = true,
  maxVisibleItems = 12,
  className,
  useApi = true,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Fetch categories from API if useApi is true and no categories provided
  const {
    categories: fetchedCategories,
    isLoading,
    error,
  } = useCategories({
    enabled: useApi && !providedCategories,
  });

  // Use provided categories or fetched categories
  const categories = providedCategories || fetchedCategories;

  // Handle loading state
  if (isLoading) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__loading}>
          Kateqoriyalar yüklənir...
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__error}>
          Kateqoriyalar yüklənərkən xəta baş verdi: {error.message}
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__empty}>
          Heç bir kateqoriya tapılmadı
        </div>
      </div>
    );
  }

  // Sort categories by order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Determine which categories to show
  const visibleCategories = showAll
    ? sortedCategories
    : sortedCategories.slice(0, maxVisibleItems);

  const hasMoreCategories = sortedCategories.length > maxVisibleItems;

  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <section className={`${styles.category} ${className || ""}`}>
      <div className={styles.category__list}>
        <div className={styles.category__inner}>
          {visibleCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              className={styles.category__item}
            />
          ))}
        </div>
      </div>

      {/* Show button only on mobile and if there are more categories */}
      {showAllButton && hasMoreCategories && (
        <CategoryButton onClick={handleToggleShow} isExpanded={showAll} />
      )}
    </section>
  );
};

export default CategoryGrid;
