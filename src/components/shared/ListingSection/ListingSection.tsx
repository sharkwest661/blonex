// src/components/ListingSection/ListingSection.tsx - UPDATED
import React from "react";
import { Container } from "@/components/layout/Container";

import ErrorBoundary from "@/components/common/ErrorBoundary";
import { cn } from "@/utils/cn";
import styles from "./ListingSection.module.scss";
import SectionTitle, { SectionTitleProps } from "../SectionTitle";
import PostGrid, { PostGridProps } from "../PostGrid";
import Advertisement, { AdvertisementProps } from "../Advertisement";
import DateSortFilter from "../Filters/DateSortFilter";

// ✅ UPDATED: Better TypeScript interfaces
export interface ListingSectionProps {
  title: SectionTitleProps;
  posts: PostGridProps;
  advertisement?: AdvertisementProps;
  onSortChange?: (value: string) => void;
  className?: string;
  /** Whether to show error boundary */
  withErrorBoundary?: boolean;
}

const ListingSectionContent: React.FC<ListingSectionProps> = ({
  title,
  posts,
  advertisement,
  onSortChange,
  className,
}) => {
  // Sort options for mobile filter
  const sortOptions = [
    { id: "-created_at", label: "Əvvəlcə yeni" },
    { id: "created_at", label: "Əvvəlcə köhnə" },
    { id: "-price", label: "Əvvəlcə baha" },
    { id: "price", label: "Əvvəlcə ucuz" },
  ];

  return (
    <section className={cn(styles.listingSection, className)}>
      {/* Section Title */}
      <SectionTitle {...title} onSortChange={onSortChange} />

      {/* ✅ NEW: Mobile Sort Filter - Only show when showSortDropdown is true */}
      {title.showSortDropdown && onSortChange && (
        <div className={styles.mobileSortContainer}>
          <Container>
            <DateSortFilter
              options={sortOptions}
              defaultSelected="-created_at"
              onSortChange={onSortChange}
              className={styles.mobileSortFilter}
            />
          </Container>
        </div>
      )}

      {/* Main Content */}
      <Container>
        <div className={styles.wrapper}>
          {/* Post Grid */}
          <div className={styles.content}>
            <PostGrid {...posts} />
          </div>

          {/* Advertisement Sidebar */}
          {advertisement && (
            <div className={styles.sidebar}>
              <Advertisement {...advertisement} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export const ListingSection: React.FC<ListingSectionProps> = ({
  withErrorBoundary = true,
  ...props
}) => {
  // ✅ FIXED: Wrap with error boundary by default
  if (withErrorBoundary) {
    return (
      <ErrorBoundary
        fallback={
          <div className={styles.errorState}>
            <p>Bölmə yüklənərkən xəta baş verdi</p>
          </div>
        }
      >
        <ListingSectionContent {...props} />
      </ErrorBoundary>
    );
  }

  return <ListingSectionContent {...props} />;
};

export default ListingSection;
