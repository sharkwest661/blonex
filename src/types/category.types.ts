// src/types/category.types.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  href: string;
  count?: number;
  isVisible?: boolean;
  order?: number;
}

export interface CategoryGridProps {
  categories?: Category[];
  showAllButton?: boolean;
  maxVisibleItems?: number;
  className?: string;
}
