// src/components/ListingSection/ListingSection.tsx - FIXED
import React from "react";
import { Container } from "@/components/Layout/Container";
import SectionTitle, {
  type SectionTitleProps,
} from "@/components/SectionTitle/SectionTitle";
import PostGrid, { type PostGridProps } from "@/components/PostGrid/PostGrid";
import Advertisement, {
  type AdvertisementProps,
} from "@/components/Advertisement/Advertisement";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { cn } from "@/utils/cn"; // ✅ FIXED: Use proper utility
import styles from "./ListingSection.module.scss";

// ✅ FIXED: Better TypeScript interfaces
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
  return (
    <section className={cn(styles.listingSection, className)}>
      {/* Section Title */}
      <SectionTitle {...title} onSortChange={onSortChange} />

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
