"use client";
import React from "react";
import { PostCard, type Post } from "@/components/PostCard";
import { Loader } from "@/components/common";
import styles from "./PostGrid.module.scss";

export interface PostGridProps {
  posts: Post[];
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  emptyMessage?: string;
  showSkeleton?: boolean; // New prop for enhanced loading
}

export const PostGrid: React.FC<PostGridProps> = ({
  posts,
  isLoading = false,
  error = null,
  className,
  emptyMessage = "Heç bir elan tapılmadı",
  showSkeleton = true,
}) => {
  // Enhanced loading state with skeleton cards
  if (isLoading) {
    if (showSkeleton) {
      return (
        <div className={`${styles.post} ${className || ""}`}>
          <div className={`${styles.post__loading} ${styles.withSkeleton}`}>
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLine} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${styles.post} ${className || ""}`}>
        <div className={styles.post__loading}>
          <Loader />
          <span>Elanlar yüklənir...</span>
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <div className={`${styles.post} ${className || ""}`}>
        <div className={styles.post__error}>
          <p>Elanlar yüklənərkən xəta baş verdi:</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Enhanced empty state
  if (!posts || posts.length === 0) {
    return (
      <div className={`${styles.post} ${className || ""}`}>
        <div className={styles.post__empty}>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.post} ${className || ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.post__list}>
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={styles.post__item}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
