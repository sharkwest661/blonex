// Usage Examples Component
// src/components/examples/ErrorBoundaryExamples.tsx
import React, { useState } from "react";
import {
  ErrorBoundary,
  ErrorFallback,
  AsyncErrorBoundary,
  withErrorBoundary,
} from "@/components/common";
import { useErrorHandler } from "@/hooks";

// Example 1: Basic ErrorBoundary usage
const BasicExample: React.FC = () => (
  <ErrorBoundary>
    <ComponentThatMightError />
  </ErrorBoundary>
);

// Example 2: Custom fallback
const CustomFallbackExample: React.FC = () => (
  <ErrorBoundary
    fallback={
      <ErrorFallback
        title="Məlumatları yükləyərkən xəta"
        message="Şəbəkə bağlantısını yoxlayın"
        compact={true}
        showHome={true}
      />
    }
  >
    <ComponentThatMightError />
  </ErrorBoundary>
);

// Example 3: HOC usage
const SafeComponent = withErrorBoundary(ComponentThatMightError, {
  fallbackProps: {
    title: "Komponent xətası",
    compact: true,
  },
  showErrorDetails: process.env.NODE_ENV === "development",
  onError: (error) => {
    console.log("Component error logged:", error);
    // Send to analytics service
  },
});

// Example 4: Hook usage
const ComponentWithErrorHandling: React.FC = () => {
  const { handleAsyncError, tryAsync } = useErrorHandler({
    context: "ComponentWithErrorHandling",
    onError: (error) => {
      // Custom error handling
      console.log("Handled error:", error);
    },
  });

  const [data, setData] = useState(null);

  const loadData = async () => {
    const result = await tryAsync(
      () => fetch("/api/data").then((res) => res.json()),
      null, // fallback value
      "loadData"
    );

    if (result) {
      setData(result);
    }
  };

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

// Example component that throws errors for testing
const ComponentThatMightError: React.FC = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("This is a test error!");
  }

  return (
    <div>
      <p>Component is working fine!</p>
      <button onClick={() => setShouldError(true)}>Trigger Error</button>
    </div>
  );
};

export default BasicExample;
