"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Layout/Container";
import { HomeSearch } from "@/components/Home/HomeSearch";
import styles from "./page.module.scss";

// ✅ FIXED: Simple loading component to avoid import issues
const SimpleLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      color: "#666",
    }}
  >
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "2px solid #f3f3f3",
        borderTop: "2px solid #013f44",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginRight: "10px",
      }}
    />
    Yüklənir...
    <style jsx>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

// ✅ FIXED: Simple empty state component
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div
    style={{
      textAlign: "center",
      padding: "3rem 1rem",
      color: "#666",
    }}
  >
    <div
      style={{
        fontSize: "3rem",
        marginBottom: "1rem",
        opacity: 0.5,
      }}
    >
      ❤️
    </div>
    <p style={{ margin: 0, fontSize: "1.1rem" }}>{message}</p>
  </div>
);

export default function FavoritesPage() {
  const router = useRouter();

  // ✅ FIXED: Simple state management without external dependencies
  const [isLoading, setIsLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  // ✅ FIXED: Client-side only hydration
  React.useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      try {
        const storedFavorites = localStorage.getItem("bolbol-favorites");
        if (storedFavorites) {
          const parsed = JSON.parse(storedFavorites);
          setFavorites(parsed.state?.favorites || []);
        }
      } catch (error) {
        console.warn("Could not load favorites:", error);
      }
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (query: string) => {
    // Navigate to search results page with query
    const searchParams = new URLSearchParams({ q: query });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <main>
      {/* Mobile Search Section - only visible on mobile */}
      <section className={styles.mobileSearchSection}>
        <Container fluid>
          <HomeSearch
            onSearch={handleSearch}
            placeholder="Axtardığınızı yazın..."
            className={styles.mobileSearchWrapper}
          />
        </Container>
      </section>

      {/* Main Content */}
      <section>
        <Container fluid>
          <h1 className={styles.pageTitle}>Seçdiklərim</h1>

          {/* ✅ FIXED: Simple content rendering without external dependencies */}
          <div className={styles.favoritesGrid}>
            {isLoading ? (
              <SimpleLoader />
            ) : favorites.length === 0 ? (
              <EmptyState message="Hələ heç bir elan seçməmisiniz" />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "20px",
                  padding: "20px 0",
                }}
              >
                {favorites.map((favoriteId) => (
                  <div
                    key={favoriteId}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ margin: 0, color: "#666" }}>
                      Elan #{favoriteId}
                    </p>
                    <p
                      style={{
                        margin: "10px 0 0 0",
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      (PostCard komponenti tamamlandıqdan sonra burada
                      görünəcək)
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
