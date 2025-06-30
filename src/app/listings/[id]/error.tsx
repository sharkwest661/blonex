"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw, Home, Search } from "lucide-react";
import { Container } from "@/components/Layout/Container";
import styles from "./error.module.scss";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ListingErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <main className={styles.errorPage}>
      <Container>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>
            <RefreshCw size={64} />
          </div>

          <h1 className={styles.errorTitle}>Xəta baş verdi</h1>

          <p className={styles.errorMessage}>
            Elan yüklənərkən texniki xəta baş verdi. Zəhmət olmasa yenidən cəhd
            edin.
          </p>

          {/* Error details for development */}
          {process.env.NODE_ENV === "development" && (
            <details className={styles.errorDetails}>
              <summary>Texniki məlumatlar</summary>
              <pre className={styles.errorStack}>
                {error.message}
                {error.stack && (
                  <>
                    {"\n\n"}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}

          <div className={styles.errorActions}>
            <button onClick={reset} className={styles.retryButton}>
              <RefreshCw size={20} />
              Yenidən cəhd et
            </button>

            <Link href="/" className={styles.homeButton}>
              <Home size={20} />
              Ana səhifə
            </Link>

            <Link href="/search" className={styles.searchButton}>
              <Search size={20} />
              Axtarış
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ListingErrorPage;
