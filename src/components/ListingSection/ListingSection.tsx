// src/components/ListingSection/ListingSection.tsx
import React from "react";
import { Container } from "@/components/Layout/Container";
import SectionTitle, {
  type SectionTitleProps,
} from "@/components/SectionTitle/SectionTitle";
import PostGrid, { type PostGridProps } from "@/components/PostGrid/PostGrid";
import Advertisement, {
  type AdvertisementProps,
} from "@/components/Advertisement/Advertisement";
import styles from "./ListingSection.module.scss";

export interface ListingSectionProps {
  title: SectionTitleProps;
  posts: PostGridProps;
  advertisement?: AdvertisementProps;
  className?: string;
}

export const ListingSection: React.FC<ListingSectionProps> = ({
  title,
  posts,
  advertisement,
  className,
}) => {
  return (
    <section className={`${styles.listingSection} ${className || ""}`}>
      {/* Section Title */}
      <div className="title_bg">
        <SectionTitle {...title} noPadding={true} />
      </div>

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

export default ListingSection;
