// src/components/common/ErrorBoundary/index.ts

// Main ErrorBoundary exports
export {
  ErrorBoundary as default,
  ErrorBoundary,
  type ErrorBoundaryProps,
} from "./ErrorBoundary";

// ErrorFallback exports
export { ErrorFallback, type ErrorFallbackProps } from "./ErrorFallback";

// AsyncErrorBoundary exports
export { AsyncErrorBoundary } from "./AsyncErrorBoundary";

// withErrorBoundary exports
export { withErrorBoundary, ErrorBoundaryDecorator } from "./withErrorBoundary";

// Re-export default as named export for consistency
// export { default } from "./ErrorBoundary";
