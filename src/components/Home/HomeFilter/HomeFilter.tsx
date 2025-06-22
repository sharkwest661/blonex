// src/components/Home/HomeFilter/HomeFilter.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Layout/Container/Container";
import HomeSearch from "../HomeSearch/HomeSearch";
import styles from "./HomeFilter.module.scss";

interface HomeFilterProps {
  className?: string;
}

export const HomeFilter: React.FC<HomeFilterProps> = ({ className }) => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    // Navigate to search results page with query
    const searchParams = new URLSearchParams({ q: query });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <section className={`${styles.homeFilters} ${className || ""}`}>
      <Container>
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchRow}>
              <div className={styles.searchBar}>
                <HomeSearch
                  onSearch={handleSearch}
                  placeholder="Bolbol-da axtar..."
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default HomeFilter;
