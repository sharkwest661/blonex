// src/components/common/Loader/Loader.tsx
import React from "react";
import styles from "./Loader.module.scss";

export interface LoaderProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "white";
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  variant = "primary",
  text,
  className,
}) => {
  const loaderClass = `${styles.loader} ${styles[`loader--${size}`]} ${
    styles[`loader--${variant}`]
  } ${className || ""}`;

  return (
    <div className={loaderClass} role="status" aria-live="polite">
      <div className={styles.loader__spinner}>
        <div className={styles.loader__circle}></div>
        <div className={styles.loader__circle}></div>
        <div className={styles.loader__circle}></div>
        <div className={styles.loader__circle}></div>
      </div>
      {text && <span className={styles.loader__text}>{text}</span>}
      <span className="sr-only">Yüklənir...</span>
    </div>
  );
};

export default Loader;
