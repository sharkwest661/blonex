// src/components/Search/MobileSearch/MobileSearch.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Search } from "lucide-react";
import styles from "./MobileSearch.module.scss";

interface MobileSearchProps {
  className?: string;
  defaultValue?: string;
  placeholder?: string;
}

export const MobileSearch: React.FC<MobileSearchProps> = ({
  className,
  defaultValue = "",
  placeholder = "Axtardığınızı yazın...",
}) => {
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className={`${styles.mobileSearchSection} ${className || ""}`}>
      <Container fluid>
        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <div className={styles.searchGroup}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                aria-label="Axtarış"
              />
              <div className={styles.searchAppend}>
                <button
                  type="submit"
                  className={styles.searchBtn}
                  aria-label="Axtarış et"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default MobileSearch;
