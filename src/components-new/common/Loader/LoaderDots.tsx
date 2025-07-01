// src/components/common/Loader/LoaderDots.tsx - FIXED
import React from "react";
import { cn } from "@/utils/cn"; // ✅ FIXED: Use proper utility
import styles from "./LoaderDots.module.scss";

export interface LoaderDotsProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "white";
  className?: string;
  loadingText?: string; // ✅ FIXED: Configurable text
}

export const LoaderDots: React.FC<LoaderDotsProps> = ({
  size = "medium",
  variant = "primary",
  className,
  loadingText = "Yüklənir...", // ✅ FIXED: Default with override option
}) => {
  // ✅ FIXED: Use cn utility instead of string concatenation
  const loaderClass = cn(
    styles.loaderDots,
    styles[`loaderDots--${size}`],
    styles[`loaderDots--${variant}`],
    className
  );

  return (
    <div className={loaderClass} role="status" aria-live="polite">
      <div className={styles.loaderDots__dot}></div>
      <div className={styles.loaderDots__dot}></div>
      <div className={styles.loaderDots__dot}></div>
      <span className={styles.srOnly}>{loadingText}</span>
    </div>
  );
};

export default LoaderDots;