"use client";
import { ErrorFallback } from "@/components/common/ErrorBoundary";
// src/app/error.tsx (Next.js App Router error boundary)
import React from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <ErrorFallback
        error={error}
        resetError={reset}
        title="Səhifə xətası"
        message="Bu səhifəni yükləyərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
        showRetry={true}
        showHome={true}
      />
    </div>
  );
}
