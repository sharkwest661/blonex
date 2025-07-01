"use client";
// src/components/Home/HomeSearch/HomeSearch.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./HomeSearch.module.scss";

interface Suggestion {
  id: string;
  text: string;
  category?: string;
  type?: string;
}

interface HomeSearchProps {
  className?: string;
  placeholder?: string;
  variant?: "default" | "small" | "header";
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

const PLACEHOLDER_TEXTS = [
  "bolbol axtar",
  "iPhone 12",
  "Pərdə",
  "Maşın təkəri",
  "Xiaomi Mi9T",
  "Rəqs dərsləri",
  "və sairə...",
];

export const HomeSearch: React.FC<HomeSearchProps> = ({
  className,
  placeholder,
  variant = "default",
  onSearch,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState(
    PLACEHOLDER_TEXTS[0]
  );

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animated placeholder effect for default variant
  useEffect(() => {
    if (variant !== "default") return;

    const interval = setInterval(() => {
      setAnimatedPlaceholder((current) => {
        const currentIndex = PLACEHOLDER_TEXTS.indexOf(current);
        const nextIndex = (currentIndex + 1) % PLACEHOLDER_TEXTS.length;
        return PLACEHOLDER_TEXTS[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [variant]);

  // Auto focus effect
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Mock suggestions - replace with actual API call
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    // Mock data - replace with actual API call
    const mockSuggestions: Suggestion[] = [
      { id: "1", text: `${searchQuery} avtomobil`, category: "Nəqliyyat" },
      { id: "2", text: `${searchQuery} mənzil`, category: "Daşınmaz əmlak" },
      { id: "3", text: `${searchQuery} telefon`, category: "Elektronika" },
    ];

    setSuggestions(mockSuggestions);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (variant === "default") {
      fetchSuggestions(value);
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
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
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
      return animatedPlaceholder;
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
              className={`${styles.search__btn} ${
                variant === "small" ? styles["search__btn--small"] : ""
              }`.trim()}
              aria-label="Axtar"
              disabled={!query.trim()}
            ></button>
          </div>
        </div>
      </form>

      {variant === "default" && showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestions} role="listbox">
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
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
              >
                <div className={styles.suggestions__text}>
                  {suggestion.text}
                </div>
                {suggestion.category && (
                  <div className={styles.suggestions__category}>
                    {suggestion.category}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
