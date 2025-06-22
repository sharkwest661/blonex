// src/hooks/useErrorHandler.ts (moved to hooks directory)
import { useCallback } from "react";

interface UseErrorHandlerOptions {
  onError?: (error: Error) => void;
  logErrors?: boolean;
  context?: string;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const { onError, logErrors = true, context } = options;

  const handleError = useCallback(
    (error: Error | unknown, errorContext?: string) => {
      const err = error instanceof Error ? error : new Error(String(error));
      const fullContext = errorContext || context;

      if (logErrors) {
        console.error(`Error${fullContext ? ` in ${fullContext}` : ""}:`, err);
      }

      if (onError) {
        onError(err);
      }

      // Send to external error reporting service
      // Example: Sentry.captureException(err, { tags: { context: fullContext } });

      return err;
    },
    [onError, logErrors, context]
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      errorContext?: string
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, errorContext);
        return null;
      }
    },
    [handleError]
  );

  const tryAsync = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      fallbackValue: T,
      errorContext?: string
    ): Promise<T> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, errorContext);
        return fallbackValue;
      }
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
    tryAsync,
  };
};

export default useErrorHandler;
