// src/components/Layout/Container/Row.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface RowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Row component that matches the original row class
 * - Negative left/right margins to counteract column padding
 * - Flexbox layout with wrap
 */
export const Row: React.FC<RowProps> = ({ children, className }) => {
  return <div className={cn(styles.row, className)}>{children}</div>;
};

export default Row;
