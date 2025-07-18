// src/components/Home/HomeFilter/HomeFilter.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HomeFilter.module.scss";
import HomeSearch from "../HomeSearch";

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
      <HomeSearch onSearch={handleSearch} placeholder="Bolbol-da axtar..." />
    </section>
  );
};

export default HomeFilter;
