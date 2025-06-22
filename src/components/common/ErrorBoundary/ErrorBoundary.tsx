// src/components/common/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
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
      error: null,
      errorInfo: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
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
    // Example:
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });

    console.group("🚨 Error Boundary Report");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
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
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, errorId } = this.state;
      const {
        showErrorDetails = false,
        enableRetry = true,
        className,
      } = this.props;

      return (
        <div
          className={`${styles.errorBoundary} ${className || ""}`}
          role="alert"
        >
          <div className={styles.errorContent}>
            {/* Error Icon */}
            <div className={styles.errorIcon}>
              <AlertTriangle size={48} />
            </div>

            {/* Error Message */}
            <div className={styles.errorMessage}>
              <h1 className={styles.errorTitle}>Xəta baş verdi</h1>
              <p className={styles.errorDescription}>
                Təəssüf ki, səhifəni yükləyərkən xəta baş verdi. Zəhmət olmasa,
                yenidən cəhd edin.
              </p>

              {error && (
                <p className={styles.errorCode}>
                  Xəta kodu: <code>{errorId}</code>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className={styles.errorActions}>
              {enableRetry && (
                <button
                  onClick={this.handleRetry}
                  className={`${styles.errorButton} ${styles.errorButton__primary}`}
                  type="button"
                >
                  <RefreshCw size={20} />
                  Yenidən cəhd et
                </button>
              )}

              <button
                onClick={this.handleReload}
                className={`${styles.errorButton} ${styles.errorButton__secondary}`}
                type="button"
              >
                <RefreshCw size={20} />
                Səhifəni yenilə
              </button>

              <button
                onClick={this.handleGoHome}
                className={`${styles.errorButton} ${styles.errorButton__secondary}`}
                type="button"
              >
                <Home size={20} />
                Ana səhifə
              </button>
            </div>

            {/* Error Details Toggle */}
            {showErrorDetails && error && (
              <details className={styles.errorDetails}>
                <summary className={styles.errorDetailsToggle}>
                  <Bug size={16} />
                  Texniki məlumatlar
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
                    className={`${styles.errorButton} ${styles.errorButton__small}`}
                    type="button"
                  >
                    Məlumatları kopyala
                  </button>
                </div>
              </details>
            )}

            {/* Help Text */}
            <div className={styles.errorHelp}>
              <p>
                Problem davam edərsə, bizə məlumat verin:{" "}
                <a href="mailto:support@bolbol.az" className={styles.errorLink}>
                  support@bolbol.az
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
