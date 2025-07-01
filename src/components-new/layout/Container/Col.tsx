// src/components/Layout/Container/Col.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface ColProps {
  children: React.ReactNode;
  className?: string;
  size?: number; // Column size (1-12)
  md?: number; // Medium breakpoint size
  lg?: number; // Large breakpoint size
}

/**
 * Column component that matches the original column classes
 * - Standard 20px padding
 * - Supports responsive sizing
 */
export const Col: React.FC<ColProps> = ({
  children,
  className,
  size,
  md,
  lg,
}) => {
  // Create dynamic class names for column sizes
  const colClasses = cn(
    styles.col,
    size ? `col-${size}` : "",
    md ? `col-md-${md}` : "",
    lg ? `col-lg-${lg}` : "",
    className
  );

  return <div className={colClasses}>{children}</div>;
};

export default Col;
