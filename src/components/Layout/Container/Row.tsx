// src/components/Layout/Container/Row.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  searchRow?: boolean; // New prop for search-specific styling
}

/**
 * Row component that matches the original row class
 * - Negative left/right margins to counteract column padding
 * - Flexbox layout with wrap
 * - Search-specific variant for search container rows
 */
export const Row: React.FC<RowProps> = ({
  children,
  className,
  searchRow = false,
}) => {
  const rowClass = cn(styles.row, searchRow ? styles.searchRow : "", className);

  return <div className={rowClass}>{children}</div>;
};

export default Row;
