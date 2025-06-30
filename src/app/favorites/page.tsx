// src/app/favorites/page.tsx
"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

// Layout components
import { Container } from "@/components/Layout/Container";

// Business components
import { HomeSearch } from "@/components/Home/HomeSearch";
import { PostGrid } from "@/components/PostGrid";

// Common components
import { Loader } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Hooks
import { useFavoritesData } from "@/hooks/useFavoritesData";

// Styles
import styles from "./page.module.scss";

// Types
interface FavoritesPageProps {
  children?: React.ReactNode;
  className?: string;
}

// Component
const FavoritesPageContent: React.FC<FavoritesPageProps> = ({ className }) => {
  const { favoritePosts, isLoading, error, hasFavorites } = useFavoritesData();
  const router = useRouter();

  // Memoized search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      // Navigate to search results page with query
      const searchParams = new URLSearchParams({ q: query.trim() });
      router.push(`/search?${searchParams.toString()}`);
    },
    [router]
  );

  // Memoized empty message
  const emptyMessage = useMemo(() => {
    return "Hələ heç bir elan seçməmisiniz";
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <main className={styles.loadingContainer} aria-label="Yüklənir">
        <Container fluid>
          <div className={styles.loaderWrapper}>
            <Loader />
            <p className={styles.loadingText}>Seçdikləriniz yüklənir...</p>
          </div>
        </Container>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className={styles.errorContainer} aria-label="Xəta baş verdi">
        <Container fluid>
          <div className={styles.errorWrapper}>
            <h1 className={styles.errorTitle}>Xəta baş verdi</h1>
            <p className={styles.errorMessage}>
              Seçdiklərinizi yükləyərkən xəta baş verdi. Zəhmət olmasa yenidən
              cəhd edin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
              aria-label="Səhifəni yenilə"
            >
              Yenidən cəhd et
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className={className} role="main">
      {/* Mobile Search Section - only visible on mobile */}
      <section
        className={styles.mobileSearchSection}
        aria-label="Mobil axtarış bölməsi"
      >
        <Container fluid>
          <div className={styles.mobileSearchWrapper}>
            <HomeSearch
              onSearch={handleSearch}
              placeholder="Axtardığınızı yazın..."
              variant="small"
            />
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection} aria-label="Seçdiklər bölməsi">
        <Container fluid>
          {/* Page Header */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              Seçdiklərim
              {hasFavorites && (
                <span
                  className={styles.favoritesCount}
                  aria-label={`${favoritePosts.length} elan`}
                >
                  ({favoritePosts.length})
                </span>
              )}
            </h1>
          </header>

          {/* Favorites Grid */}
          <div className={styles.gridWrapper}>
            <PostGrid
              posts={favoritePosts}
              isLoading={isLoading}
              error={error}
              emptyMessage={emptyMessage}
              className={styles.favoritesGrid}
              aria-label="Seçilmiş elanlar"
            />
          </div>
        </Container>
      </section>
    </main>
  );
};

// Main component with error boundary
export default function FavoritesPage() {
  return (
    <ErrorBoundary
      fallback={
        <main className={styles.errorContainer}>
          <Container fluid>
            <div className={styles.errorWrapper}>
              <h1 className={styles.errorTitle}>Texniki xəta</h1>
              <p className={styles.errorMessage}>
                Səhifəni yükləyərkən xəta baş verdi. Zəhmət olmasa səhifəni
                yeniləyin.
              </p>
              <button
                onClick={() => window.location.reload()}
                className={styles.retryButton}
              >
                Səhifəni yenilə
              </button>
            </div>
          </Container>
        </main>
      }
    >
      <FavoritesPageContent />
    </ErrorBoundary>
  );
}

// Note: For SEO metadata, create a layout.tsx file in this directory
// or move metadata to a parent layout since this is a client component
