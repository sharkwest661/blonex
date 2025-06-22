// src/components/common/ErrorBoundary/index.ts
export { ErrorBoundary as default } from "./ErrorBoundary";
export { ErrorBoundary } from "./ErrorBoundary";
export { ErrorFallback } from "./ErrorFallback";
export { AsyncErrorBoundary } from "./AsyncErrorBoundary";
export { withErrorBoundary, ErrorBoundaryDecorator } from "./withErrorBoundary";

// Export types
export type { ErrorFallbackProps } from "./ErrorFallback";

// Re-export hook
export { useErrorHandler } from "../../../hooks/useErrorHandler";
