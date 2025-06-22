// Update src/components/common/index.ts
export { default as Loader } from "./Loader";
export { default as LoaderDots } from "./Loader/LoaderDots";
export { default as SkeletonLoader } from "./Loader/SkeletonLoader";
export {
  default as ErrorBoundary,
  ErrorFallback,
  AsyncErrorBoundary,
  withErrorBoundary,
  ErrorBoundaryDecorator,
} from "./ErrorBoundary";

// Export types
export type { LoaderProps } from "./Loader/Loader";
export type { LoaderDotsProps } from "./Loader/LoaderDots";
export type { SkeletonLoaderProps } from "./Loader/SkeletonLoader";
export type { ErrorFallbackProps } from "./ErrorBoundary";
