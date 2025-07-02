// src/components/PostGrid/PostGrid.tsx
"use client";
import React from "react";

import styles from "./PostGrid.module.scss";
import PostCard from "../PostCard";
import Loader from "@/components/common/Loader";
import { Post } from "@/types/post.types";

export interface PostGridProps {
  posts: Post[];
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  emptyMessage?: string;
}

export const PostGrid: React.FC<PostGridProps> = ({
  posts,
  isLoading = false,
  error = null,
  className,
  emptyMessage = "Heç bir elan tapılmadı",
}) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className={`${styles.post} ${className || ""}`}>
        <div className={styles.post__loading}>
          <Loader />
          <span>Elanlar yüklənir...</span>
        </div>
      </div>
    );
  }

  // Handle error state
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

  // Handle empty state
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
          {posts.map((post) => (
            <div key={post.id} className={styles.post__item}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
