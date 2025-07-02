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
  auto?: boolean; // Auto-sizing column
}

/**
 * Column component with responsive grid system
 * Uses SCSS module classes for proper styling encapsulation
 */
export const Col: React.FC<ColProps> = ({
  children,
  className,
  size,
  md,
  lg,
  auto = false,
}) => {
  // Helper function to get column class name
  const getColClass = (breakpoint: string, value: number | boolean) => {
    if (value === true) return `col${breakpoint}Auto`;
    if (typeof value === "number") return `col${breakpoint}${value}`;
    return "";
  };

  // Build class names using SCSS module classes
  const colClasses = cn(
    styles.col, // Base column styles
    // Base size
    auto
      ? styles.colAuto
      : size
      ? styles[`col${size}` as keyof typeof styles]
      : "",
    // Medium breakpoint
    md ? styles[getColClass("Md", md) as keyof typeof styles] : "",
    // Large breakpoint
    lg ? styles[getColClass("Lg", lg) as keyof typeof styles] : "",
    className
  );

  return <div className={colClasses}>{children}</div>;
};

export default Col;
