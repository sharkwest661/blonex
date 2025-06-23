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
  variant?: "default" | "small" | "top";
}

// Custom hook for typing animation, with corrected timing logic
const useTypingAnimation = (
  phrases: string[],
  options: {
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number; // Pause after typing completes
    isPaused?: boolean;
  }
) => {
  const {
    typeSpeed = 40,
    backSpeed = 20,
    backDelay = 700,
    isPaused = false,
  } = options;

  const [currentPhrase, setCurrentPhrase] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const humanizer = (speed: number) =>
    Math.round(Math.random() * (speed / 2)) + speed;

  useEffect(() => {
    // Stop and clear if paused (e.g., on focus)
    if (isPaused) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCurrentPhrase("");
      return;
    }

    const handleTyping = () => {
      const fullPhrase = phrases[phraseIndex % phrases.length];
      let timeout: number;

      if (isDeleting) {
        // --- DELETING LOGIC ---
        setCurrentPhrase((prev) => prev.substring(0, prev.length - 1));
        timeout = humanizer(backSpeed);
      } else {
        // --- TYPING LOGIC ---
        setCurrentPhrase((prev) => fullPhrase.substring(0, prev.length + 1));
        timeout = humanizer(typeSpeed);
      }

      timeoutRef.current = setTimeout(handleTyping, timeout);
    };

    // --- PAUSING & STATE CHANGE LOGIC ---
    if (
      !isDeleting &&
      currentPhrase === phrases[phraseIndex % phrases.length]
    ) {
      // Finished typing a phrase, now pause before deleting
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, backDelay);
    } else if (isDeleting && currentPhrase === "") {
      // Finished deleting, now pause before typing the next phrase
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => prev + 1);
      }, 500); // Short pause before next word
    } else {
      // Default typing/deleting loop
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        handleTyping,
        isDeleting ? backSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeoutRef.current);
  }, [
    currentPhrase,
    isDeleting,
    phraseIndex,
    phrases,
    typeSpeed,
    backSpeed,
    backDelay,
    isPaused,
  ]);

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

  const debouncedQuery = useDebounce(query, 300);

  const typingPhrases = [
    "bolbol axtar",
    "iPhone 12",
    "Pərdə",
    "Maşın təkəri",
    "Xiaomi Mi9T",
    "Rəqs dərsləri",
    "və sairə...",
  ];

  // Animation options assigned to a variable for clarity
  const animationOptions = {
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 1000, // Changed from 2000 to 1000
    isPaused: isFocused || query.length > 0,
  };

  const animatedPlaceholder = useTypingAnimation(
    variant === "default" ? typingPhrases : [],
    animationOptions
  );

  const { data: suggestions = [] } = useQuery({
    queryKey: ["searchSuggestions", debouncedQuery],
    queryFn: () => searchService.getSearchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 1 && variant === "default",
    staleTime: 5 * 60 * 1000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestions(value.length > 0 && variant === "default");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSearch?.(suggestion.text);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
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

  return (
    <div ref={searchRef} className={getSearchClasses()}>
      <form onSubmit={handleSubmit} role="search">
        <div className={styles.search__group}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              variant === "default" && !query
                ? animatedPlaceholder
                : placeholder || "Axtar..."
            }
            className={styles.search__input}
            autoComplete="off"
          />
          <div className={styles.search__append}>
            <button
              type="submit"
              className={`${styles.search__btn} ${
                variant === "small" ? styles["search__btn--small"] : ""
              }`.trim()}
              aria-label="Axtar"
              disabled={!query.trim()}
            ></button>
          </div>
        </div>
      </form>

      {variant === "default" && showSuggestions && query.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.length > 0 && (
            <ul className={styles.suggestions__list}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`${styles.suggestions__item} ${
                    index === selectedIndex
                      ? styles["suggestions__item--selected"]
                      : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
