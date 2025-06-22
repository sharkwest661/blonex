"use client";
// src/app/global-error.tsx (Next.js App Router global error boundary)
import React from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="az">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f5f6fc",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              textAlign: "center",
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                color: "#dc3545",
                marginBottom: "16px",
              }}
            >
              ⚠️
            </div>
            <h1
              style={{
                fontSize: "24px",
                color: "#013f44",
                marginBottom: "16px",
                fontWeight: "600",
              }}
            >
              Qlobal xəta baş verdi
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#333",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Təəssüf ki, kritik xəta baş verdi. Səhifəni yeniləyin və ya daha
              sonra yenidən cəhd edin.
            </p>

            {process.env.NODE_ENV === "development" && (
              <details
                style={{
                  marginBottom: "24px",
                  textAlign: "left",
                  backgroundColor: "#f8f9fa",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "500" }}>
                  Developer Info
                </summary>
                <pre
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}

            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#ffe600",
                  color: "#013f44",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Yenidən cəhd et
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "transparent",
                  color: "#013f44",
                  border: "2px solid #013f44",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Ana səhifə
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
