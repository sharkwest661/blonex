// src/components/Filters/DateSortFilter/DateSortFilter.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowDownZA, X } from "lucide-react";
import styles from "./DateSortFilter.module.scss";

export interface SortOption {
  id: string;
  label: string;
}

export interface DateSortFilterProps {
  options: SortOption[];
  defaultSelected?: string;
  onSortChange: (sortId: string) => void;
  className?: string;
}

export const DateSortFilter: React.FC<DateSortFilterProps> = ({
  options,
  defaultSelected = "date",
  onSortChange,
  className,
}) => {
  // State for controlling overlay visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for the selected sort option
  const [selectedOption, setSelectedOption] = useState(defaultSelected);

  // Reference to the overlay for detecting outside clicks
  const overlayRef = useRef<HTMLDivElement>(null);

  // Selected option label to display in the trigger
  const selectedLabel =
    options.find((option) => option.id === selectedOption)?.label ||
    "Tarixə görə";

  // Open the filter overlay
  const openFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    // Disable scrolling on body when overlay is open
    document.body.style.overflow = "hidden";
  };

  // Close the filter overlay
  const closeFilter = () => {
    setIsOpen(false);
    // Re-enable scrolling on body
    document.body.style.overflow = "";
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onSortChange(optionId);

    // Close the overlay after a short delay to see the selection
    setTimeout(() => {
      closeFilter();
    }, 300);
  };

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        closeFilter();
      }
    };

    // Close filter on escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFilter();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <>
      {/* Filter Trigger */}
      <div className={`${styles.filters767} ${className || ""}`}>
        <div className={styles.filters767Inner} onClick={openFilter}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-label="Open sort options"
          >
            <ArrowDownZA size={20} />
            <p>{selectedLabel}</p>
          </a>
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className={styles.dateFilterBg}
          onClick={closeFilter}
          aria-hidden="true"
        />
      )}

      {/* Filter Overlay */}
      <div
        className={`${styles.dateFilterOverlay} ${isOpen ? styles.open : ""}`}
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sort-dialog-title"
      >
        <div className={styles.dateFilterHeader}>
          <div className={styles.dateFilterHeaderInner}>
            <div className={styles.dateFilterHeaderText} id="sort-dialog-title">
              Çeşidləmə
            </div>
            <div
              className={styles.dateFilterHeaderIcon}
              onClick={closeFilter}
              role="button"
              aria-label="Close sort options"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && closeFilter()}
            >
              <X size={16} />
            </div>
          </div>
        </div>

        <div className={styles.dateFilterBody} role="radiogroup">
          {options.map((option) => (
            <a
              href="#"
              key={option.id}
              onClick={(e) => {
                e.preventDefault();
                handleOptionSelect(option.id);
              }}
            >
              <div
                className={`${styles.dateFilterSelect} ${
                  selectedOption === option.id ? styles.selected : ""
                }`}
                data-id={option.id}
                role="radio"
                aria-checked={selectedOption === option.id}
                tabIndex={isOpen ? 0 : -1}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleOptionSelect(option.id)
                }
              >
                <div className={styles.dateFilterSelectName}>
                  {option.label}
                </div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default DateSortFilter;
