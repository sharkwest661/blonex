// src/components/common/ErrorBoundary/withErrorBoundary.tsx
import React, { ComponentType, forwardRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { ErrorFallback, ErrorFallbackProps } from "./ErrorFallback";

interface WithErrorBoundaryOptions {
  fallback?: React.ComponentType<ErrorFallbackProps>;
  fallbackProps?: Partial<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showErrorDetails?: boolean;
  enableRetry?: boolean;
}

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) {
  const {
    fallback: FallbackComponent = ErrorFallback,
    fallbackProps = {},
    onError,
    showErrorDetails = false,
    enableRetry = true,
  } = options;

  const WrappedComponent = forwardRef<any, P>((props, ref) => {
    const fallbackElement = (
      <FallbackComponent showRetry={enableRetry} {...fallbackProps} />
    );

    return (
      <ErrorBoundary
        fallback={fallbackElement}
        onError={onError}
        showErrorDetails={showErrorDetails}
        enableRetry={enableRetry}
      >
        <Component {...props} ref={ref} />
      </ErrorBoundary>
    );
  });

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}

// Decorator version for class components
export function ErrorBoundaryDecorator(options: WithErrorBoundaryOptions = {}) {
  return function <T extends ComponentType<any>>(target: T): T {
    return withErrorBoundary(target, options) as T;
  };
}

export default withErrorBoundary;
