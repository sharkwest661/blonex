// src/components/CategoryGrid/CategoryButton/CategoryButton.tsx
import React from "react";
import styles from "./CategoryButton.module.scss";

interface CategoryButtonProps {
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  onClick,
  isExpanded,
  className,
}) => {
  return (
    <button
      type="button"
      className={`${styles.category__btn} ${className || ""}`}
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Daha az göstər" : "Bütün kateqoriyalar"}
    >
      {isExpanded ? "Daha az göstər" : "Bütün kateqoriyalar"}
    </button>
  );
};

export default CategoryButton;
