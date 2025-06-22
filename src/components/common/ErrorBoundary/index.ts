// src/components/common/ErrorBoundary/index.ts
export { default as ErrorBoundary } from "./ErrorBoundary";
export { default as ErrorFallback } from "./ErrorFallback";
export { default as AsyncErrorBoundary } from "./AsyncErrorBoundary";
export {
  default as withErrorBoundary,
  ErrorBoundaryDecorator,
} from "./withErrorBoundary";

// Export types
export type { ErrorFallbackProps } from "./ErrorFallback";

// Re-export hook
export { useErrorHandler } from "../../../hooks/useErrorHandler";
