import React from "react";
import { Container } from "@/components/layout/Container";
import styles from "./loading.module.scss";

const ListingLoadingPage: React.FC = () => {
  return (
    <main className={styles.loadingPage}>
      {/* Mobile Search Skeleton */}
      <section className={styles.mobileSearchSection}>
        <Container>
          <div className={styles.searchSkeleton}></div>
        </Container>
      </section>

      {/* Main Content Skeleton */}
      <section className={styles.productSection}>
        <Container>
          <div className={styles.productGrid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Carousel Skeleton */}
              <div className={styles.carouselSkeleton}>
                <div className={styles.mainImageSkeleton}></div>
                <div className={styles.thumbnailsSkeleton}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={styles.thumbnailSkeleton}></div>
                  ))}
                </div>
              </div>

              {/* Store Profile Skeleton */}
              <div className={styles.storeSkeleton}>
                <div className={styles.storeLogoSkeleton}></div>
                <div className={styles.storeInfoSkeleton}>
                  <div className={styles.storeNameSkeleton}></div>
                  <div className={styles.storeContactSkeleton}></div>
                  <div className={styles.storeContactSkeleton}></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* Product Info Skeleton */}
              <div className={styles.productInfoSkeleton}>
                <div className={styles.breadcrumbSkeleton}></div>
                <div className={styles.titleSkeleton}></div>
                <div className={styles.priceSkeleton}></div>
                <div className={styles.featuresSkeleton}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.featureSkeleton}></div>
                  ))}
                </div>

                {/* Specifications Table Skeleton */}
                <div className={styles.specsSkeleton}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={styles.specRowSkeleton}>
                      <div className={styles.specKeySkeleton}></div>
                      <div className={styles.specValueSkeleton}></div>
                    </div>
                  ))}
                </div>

                {/* Description Skeleton */}
                <div className={styles.descriptionSkeleton}>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.descriptionLineSkeleton}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className={styles.actionsSkeleton}>
                <div className={styles.actionButtonSkeleton}></div>
                <div className={styles.actionButtonSkeleton}></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Similar Listings Skeleton */}
      <section className={styles.similarSection}>
        <Container>
          <div className={styles.sectionTitleSkeleton}></div>
          <div className={styles.similarGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.similarItemSkeleton}>
                <div className={styles.similarImageSkeleton}></div>
                <div className={styles.similarInfoSkeleton}>
                  <div className={styles.similarTitleSkeleton}></div>
                  <div className={styles.similarPriceSkeleton}></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default ListingLoadingPage;
