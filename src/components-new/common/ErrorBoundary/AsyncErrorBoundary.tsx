"use client";
// src/components/common/ErrorBoundary/AsyncErrorBoundary.tsx
import React, { useState, useEffect, ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { ErrorFallback } from "./ErrorFallback";

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  fallback,
  onError,
}) => {
  const [asyncError, setAsyncError] = useState<Error | null>(null);

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(event.reason);
      setAsyncError(error);
      if (onError) {
        onError(error);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [onError]);

  if (asyncError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <ErrorFallback
        error={asyncError}
        resetError={() => setAsyncError(null)}
        title="Async Xəta"
        message="Asinxron əməliyyat zamanı xəta baş verdi."
        showRetry={true}
      />
    );
  }

  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};

export default AsyncErrorBoundary;
