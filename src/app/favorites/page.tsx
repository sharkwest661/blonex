// src/app/favorites/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Layout/Container";
import { HomeSearch } from "@/components/Home/HomeSearch";
import { PostGrid } from "@/components/PostGrid";
import { useFavoritesData } from "@/hooks/useFavoritesData";
import { Loader } from "@/components/common";
import styles from "./page.module.scss";

export default function FavoritesPage() {
  const { favoritePosts, isLoading, error } = useFavoritesData();
  const router = useRouter();

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

          {/* Favorites Grid - handles all states internally */}
          <PostGrid
            posts={favoritePosts}
            isLoading={isLoading}
            error={error}
            emptyMessage="Hələ heç bir elan seçməmisiniz"
            className={styles.favoritesGrid}
          />
        </Container>
      </section>
    </main>
  );
}
