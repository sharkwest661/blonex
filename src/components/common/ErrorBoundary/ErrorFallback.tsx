// src/components/common/ErrorBoundary/ErrorFallback.tsx
import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import styles from "./ErrorFallback.module.scss";

export interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  compact?: boolean;
  className?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  title = "Xəta baş verdi",
  message = "Məlumatları yükləyərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.",
  showRetry = true,
  showHome = false,
  compact = false,
  className,
}) => {
  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const containerClass = `${styles.errorFallback} ${
    compact ? styles["errorFallback--compact"] : ""
  } ${className || ""}`;

  return (
    <div className={containerClass} role="alert">
      <div className={styles.errorIcon}>
        <AlertCircle size={compact ? 32 : 48} />
      </div>

      <div className={styles.errorContent}>
        <h3 className={styles.errorTitle}>{title}</h3>
        <p className={styles.errorMessage}>{message}</p>

        {error && (
          <details className={styles.errorDetails}>
            <summary>Ətraflı məlumat</summary>
            <pre className={styles.errorText}>{error.message}</pre>
          </details>
        )}
      </div>

      <div className={styles.errorActions}>
        {showRetry && (
          <button
            onClick={handleRetry}
            className={`${styles.errorButton} ${styles.errorButton__primary}`}
            type="button"
          >
            <RefreshCw size={16} />
            Yenidən cəhd et
          </button>
        )}

        {showHome && (
          <button
            onClick={handleGoHome}
            className={`${styles.errorButton} ${styles.errorButton__secondary}`}
            type="button"
          >
            <Home size={16} />
            Ana səhifə
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
