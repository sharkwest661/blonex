// src/components/UI/Loader/Loader.tsx - CONSOLIDATED
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Loader.module.scss";

export interface LoaderProps {
  /** Type of loader animation */
  variant?: "spinner" | "dots" | "pulse";
  /** Size of the loader */
  size?: "small" | "medium" | "large";
  /** Color theme */
  color?: "primary" | "secondary" | "white";
  /** Optional text to display */
  text?: string;
  /** Custom CSS classes */
  className?: string;
  /** Whether to center the loader */
  centered?: boolean;
  /** Screen reader text */
  loadingText?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  variant = "spinner",
  size = "medium",
  color = "primary",
  text,
  className,
  centered = false,
  loadingText = "Yüklənir...",
}) => {
  const loaderClass = cn(
    styles.loader,
    styles[`loader--${variant}`],
    styles[`loader--${size}`],
    styles[`loader--${color}`],
    centered && styles.loaderCentered,
    className
  );

  const renderSpinner = () => (
    <div className={styles.loaderSpinner}>
      <div className={styles.loaderCircle}></div>
      <div className={styles.loaderCircle}></div>
      <div className={styles.loaderCircle}></div>
      <div className={styles.loaderCircle}></div>
    </div>
  );

  const renderDots = () => (
    <div className={styles.loaderDots}>
      <div className={styles.loaderDot}></div>
      <div className={styles.loaderDot}></div>
      <div className={styles.loaderDot}></div>
    </div>
  );

  const renderPulse = () => (
    <div className={styles.loaderPulse}>
      <div className={styles.loaderPulseRing}></div>
      <div className={styles.loaderPulseCore}></div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "spinner":
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={loaderClass} role="status" aria-live="polite">
      {renderVariant()}
      {text && <span className={styles.loaderText}>{text}</span>}
      <span className={styles.srOnly}>{loadingText}</span>
    </div>
  );
};

export default Loader;