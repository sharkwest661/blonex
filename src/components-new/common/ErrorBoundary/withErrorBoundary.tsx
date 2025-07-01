// src/components/common/ErrorBoundary/withErrorBoundary.tsx
import React, { ComponentType } from "react";
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
): ComponentType<P> {
  const {
    fallback: FallbackComponent = ErrorFallback,
    fallbackProps = {},
    onError,
    showErrorDetails = false,
    enableRetry = true,
  } = options;

  const WrappedComponent: ComponentType<P> = (props: P) => {
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
        <Component {...props} />
      </ErrorBoundary>
    );
  };

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
