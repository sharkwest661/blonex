// src/components/Home/HomeFilter/HomeFilter.tsx (Semantically Corrected)
"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
    <section
      className={`${styles.homeFilters} ${className || ""}`}
      aria-label="Axtarış və filterlər"
    >
      <div className={styles.main_container}>
        <div className={styles.containerFluid}>
          <div className={`${styles.containerFluid} ${styles.forpadding0}`}>
            <div className={styles.row}>
              <div className={styles.dekstopSearchBar}>
                <HomeSearch
                  onSearch={handleSearch}
                  placeholder="Bolbol-da axtar..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFilter;
