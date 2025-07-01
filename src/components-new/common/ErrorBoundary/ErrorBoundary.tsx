// src/components/common/ErrorBoundary/ErrorBoundary.tsx
"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  enableRetry?: boolean;
  className?: string;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    this.setState({ error, errorInfo });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Log to external service (implement as needed)
    this.logErrorToService(error, errorInfo);
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      window.clearTimeout(this.retryTimeoutId);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // TODO: Implement logging to external service (Sentry, LogRocket, etc.)
    console.group("🚨 Error Boundary Report");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: "",
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private copyErrorDetails = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorDetails = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    navigator.clipboard
      .writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => {
        alert("Xəta məlumatları panoya kopyalandı");
      })
      .catch(() => {
        console.log("Error details:", errorDetails);
        alert("Xəta məlumatları konsola yazıldı");
      });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId } = this.state;
      const {
        showErrorDetails = false,
        enableRetry = true,
        className,
      } = this.props;

      // Default fallback UI
      return (
        <div
          className={`${styles.errorBoundary} ${className || ""}`}
          role="alert"
        >
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Səhifə yüklənmədi</h2>
            <p className={styles.errorMessage}>
              Təəssüf ki, səhifəni yükləyərkən xəta baş verdi. Zəhmət olmasa
              yenidən cəhd edin.
            </p>

            {error && (
              <p className={styles.errorCode}>
                Xəta kodu: <code>{errorId}</code>
              </p>
            )}

            {showErrorDetails && error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorSummary}>
                  Texniki məlumat
                </summary>
                <div className={styles.errorDetailsContent}>
                  <div className={styles.errorDetailsSection}>
                    <h4>Xəta mesajı:</h4>
                    <pre className={styles.errorDetailsText}>
                      {error.message}
                    </pre>
                  </div>

                  {error.stack && (
                    <div className={styles.errorDetailsSection}>
                      <h4>Stack trace:</h4>
                      <pre className={styles.errorDetailsText}>
                        {error.stack}
                      </pre>
                    </div>
                  )}

                  {errorInfo?.componentStack && (
                    <div className={styles.errorDetailsSection}>
                      <h4>Component stack:</h4>
                      <pre className={styles.errorDetailsText}>
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  <button
                    onClick={this.copyErrorDetails}
                    className={styles.copyButton}
                    type="button"
                  >
                    Məlumatları kopyala
                  </button>
                </div>
              </details>
            )}

            <div className={styles.errorActions}>
              {enableRetry && (
                <button
                  onClick={this.handleRetry}
                  className={styles.retryButton}
                  aria-label="Yenidən cəhd et"
                >
                  Yenidən cəhd et
                </button>
              )}
              <button
                onClick={this.handleReload}
                className={styles.reloadButton}
                aria-label="Səhifəni yenilə"
              >
                Səhifəni yenilə
              </button>
              <button
                onClick={this.handleGoHome}
                className={styles.homeButton}
                aria-label="Ana səhifəyə qayıt"
              >
                Ana səhifə
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
