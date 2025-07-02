// src/components/Home/HomeSearch/HomeSearch.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import {
  searchService,
  type SearchSuggestion,
} from "@/services/search.service";
import styles from "./HomeSearch.module.scss";

interface HomeSearchProps {
  className?: string;
  placeholder?: string;
  variant?: "default" | "small" | "header";
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

const PLACEHOLDER_TEXTS = [
  "iPhone, Samsung, Xiaomi...",
  "Avtomobil, mətbəx dəsti...",
  "Ev, mənzil, ofis...",
  "İş elanları...",
];

export const HomeSearch: React.FC<HomeSearchProps> = ({
  className,
  placeholder,
  variant = "default",
  onSearch,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 300);

  // Typing animation for placeholder
  const animatedPlaceholder = useTypingAnimation({
    phrases: PLACEHOLDER_TEXTS,
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseTime: 2000,
    isPaused: isFocused || query.length > 0 || variant !== "default",
  });

  // Auto focus effect
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // React Query for search suggestions
  const {
    data: suggestions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchSuggestions", debouncedQuery],
    queryFn: () => searchService.getSearchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 1 && variant === "default",
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (variant === "default") {
      setShowSuggestions(value.length > 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchQuery = query.trim();

    // Call onSearch handler if provided
    if (onSearch) {
      onSearch(searchQuery);
    }

    setShowSuggestions(false);

    // Blur input on mobile to hide keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);

    // Call onSearch handler if provided
    if (onSearch) {
      onSearch(suggestion.text);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (variant === "default" && query.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSearchClasses = () => {
    const baseClass = styles.search;
    const variantClass =
      variant !== "default" ? styles[`search--${variant}`] : "";
    return `${baseClass} ${variantClass} ${className || ""}`.trim();
  };

  const getCurrentPlaceholder = () => {
    if (variant === "default" && !query && !isFocused) {
      return animatedPlaceholder || "Axtar...";
    }
    return placeholder || "Axtar...";
  };

  return (
    <div ref={searchRef} className={getSearchClasses()}>
      <form onSubmit={handleSubmit} role="search">
        <div className={styles.search__group}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={getCurrentPlaceholder()}
            className={styles.search__input}
            autoComplete="off"
            aria-label="Axtarış"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            role="combobox"
          />
          <div className={styles.search__append}>
            <button
              type="submit"
              className={styles.search__btn}
              aria-label="Axtar"
              disabled={!query.trim()}
            ></button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && query.length > 0 && variant === "default" && (
        <div className={styles.suggestions}>
          {isLoading && (
            <div className={styles.suggestions__loading}>Axtarılır...</div>
          )}

          {error && (
            <div className={styles.suggestions__error}>Xəta baş verdi</div>
          )}

          {suggestions.length > 0 && !isLoading && (
            <ul
              className={styles.suggestions__list}
              role="listbox"
              aria-label="Axtarış təklifləri"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`${styles.suggestions__item} ${
                    index === selectedIndex
                      ? styles["suggestions__item--selected"]
                      : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className={styles.suggestions__content}>
                    <span className={styles.suggestions__text}>
                      {suggestion.text}
                    </span>
                    {suggestion.category && (
                      <span className={styles.suggestions__category}>
                        {suggestion.category}
                      </span>
                    )}
                  </div>
                  {suggestion.type && (
                    <div className={styles.suggestions__type}>
                      {suggestion.type === "product" && "Məhsul"}
                      {suggestion.type === "category" && "Kateqoriya"}
                      {suggestion.type === "location" && "Yer"}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {suggestions.length === 0 &&
            !isLoading &&
            !error &&
            debouncedQuery && (
              <div className={styles.suggestions__empty}>
                Heç bir nəticə tapılmadı
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
