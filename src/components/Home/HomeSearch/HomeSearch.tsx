// src/components/Home/HomeSearch/HomeSearch.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import {
  searchService,
  type SearchSuggestion,
} from "@/services/search.service";
import styles from "./HomeSearch.module.scss";

interface HomeSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "default" | "small" | "top"; // Added variant prop
}

// Custom hook for typing animation with pause support
const useTypingAnimation = (
  phrases: string[],
  speed: number = 40,
  isPaused: boolean = false
) => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (phrases.length === 0 || isPaused) return;

    const animate = () => {
      const fullPhrase = phrases[currentIndex % phrases.length];

      if (isDeleting) {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
      } else {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
      }

      let timeout = speed;

      if (isDeleting) {
        timeout = speed / 2;
      }

      if (!isDeleting && currentPhrase === fullPhrase) {
        timeout = 2000; // Pause at complete phrase
        setIsDeleting(true);
      } else if (isDeleting && currentPhrase === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => prev + 1);
      }

      timeoutRef.current = setTimeout(animate, timeout);
    };

    timeoutRef.current = setTimeout(animate, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPhrase, currentIndex, isDeleting, phrases, speed, isPaused]);

  return currentPhrase;
};

export const HomeSearch: React.FC<HomeSearchProps> = ({
  onSearch,
  placeholder,
  className,
  variant = "default",
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 300);

  // Typing animation phrases (only for default variant)
  const typingPhrases = [
    "iPhone, Samsung, Xiaomi...",
    "Avtomobil, mətbəx dəsti...",
    "Ev, mənzil, ofis...",
    "İş elanları...",
  ];

  // Pass isFocused as isPaused parameter to pause animation when focused
  const animatedPlaceholder = useTypingAnimation(
    variant === "default" ? typingPhrases : [],
    100,
    isFocused
  );

  // React Query for search suggestions (only for default variant)
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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestions(value.length > 0 && variant === "default");
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onSearch?.(suggestion.text);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
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

  // Handle clicks outside to close suggestions
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get appropriate CSS classes based on variant
  const getSearchClasses = () => {
    const baseClass = styles.search;
    const variantClass =
      variant !== "default" ? styles[`search--${variant}`] : "";
    return `${baseClass} ${variantClass} ${className || ""}`.trim();
  };

  const getButtonClasses = () => {
    const baseClass = styles.search__btn;
    const variantClass =
      variant === "small" ? styles["search__btn--small"] : "";
    return `${baseClass} ${variantClass}`.trim();
  };

  return (
    <div ref={searchRef} className={getSearchClasses()}>
      <form onSubmit={handleSubmit}>
        <div className={styles.search__group}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (query.length > 0 && variant === "default") {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={
              variant === "default"
                ? animatedPlaceholder || placeholder || "Axtar..."
                : placeholder || "Axtar..."
            }
            className={styles.search__input}
            autoComplete="off"
            aria-label="Axtarış"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            role="combobox"
          />

          <div className={styles.search__append}>
            <button
              type="submit"
              className={getButtonClasses()}
              aria-label="Axtar"
              disabled={!query.trim()}
            >
              {/* Button styling and icon handled by CSS background-image */}
            </button>
          </div>
        </div>
      </form>

      {/* Search Suggestions - Only show for default variant */}
      {variant === "default" && showSuggestions && query.length > 0 && (
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
                  <div className={styles.suggestions__type}>
                    {suggestion.type === "product" && "Məhsul"}
                    {suggestion.type === "category" && "Kateqoriya"}
                    {suggestion.type === "location" && "Yer"}
                  </div>
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
