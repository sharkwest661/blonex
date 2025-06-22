// src/components/common/Loader/LoaderDots.tsx
import React from "react";
import styles from "./LoaderDots.module.scss";

export interface LoaderDotsProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "white";
  className?: string;
}

export const LoaderDots: React.FC<LoaderDotsProps> = ({
  size = "medium",
  variant = "primary",
  className,
}) => {
  const loaderClass = `${styles.loaderDots} ${styles[`loaderDots--${size}`]} ${
    styles[`loaderDots--${variant}`]
  } ${className || ""}`;

  return (
    <div className={loaderClass} role="status" aria-live="polite">
      <div className={styles.loaderDots__dot}></div>
      <div className={styles.loaderDots__dot}></div>
      <div className={styles.loaderDots__dot}></div>
      <span className="sr-only">Yüklənir...</span>
    </div>
  );
};

export default LoaderDots;
