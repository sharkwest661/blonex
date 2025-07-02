// src/components/shared/PostList/PostList.tsx
import React from "react";
import { PostCard } from "../PostCard";
import styles from "./PostList.module.scss";
import { Post } from "@/types/post.types";

// Simple Loader component (you can replace with your own)
const Loader: React.FC<{ size?: "small" | "medium" | "large" }> = ({
  size = "medium",
}) => {
  return (
    <div className={`${styles.loader} ${styles[`loader--${size}`]}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  variant?: "grid" | "list";
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading = false,
  error = null,
  onLoadMore,
  hasMore = false,
  variant = "grid",
  columns = 4,
  className = "",
}) => {
  // Handle empty states
  if (loading && posts.length === 0) {
    return (
      <div className={styles.postList__loading}>
        <Loader size="large" />
        <p>Elanlar yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.postList__error}>
        <h3>Xəta baş verdi</h3>
        <p>{error}</p>
        <button
          className={styles.postList__retryButton}
          onClick={() => window.location.reload()}
        >
          Yenidən cəhd et
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.postList__empty}>
        <h3>Heç bir elan tapılmadı</h3>
        <p>Axtarış kriteriyalarınızı dəyişməyi cəhd edin.</p>
      </div>
    );
  }

  // Generate CSS classes
  const getContainerClasses = (): string => {
    let classes = styles.post;

    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  const getListClasses = (): string => {
    let classes = "";

    if (variant === "grid") {
      classes = styles.post__grid;
      if (columns) {
        classes += ` ${styles[`post__grid--cols-${columns}`]}`;
      }
    } else {
      classes = styles.post__list;
    }

    return classes;
  };

  return (
    <div className={getContainerClasses()}>
      <div className={getListClasses()}>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.post__item_wrapper}>
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && posts.length > 0 && (
        <div className={styles.postList__loadingMore}>
          <Loader size="medium" />
          <p>Daha çox elan yüklənir...</p>
        </div>
      )}

      {/* Load more button */}
      {hasMore && !loading && onLoadMore && (
        <div className={styles.postList__loadMore}>
          <button
            className={styles.postList__loadMoreButton}
            onClick={onLoadMore}
          >
            Daha çox elan göstər
          </button>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && posts.length > 0 && (
        <div className={styles.postList__endMessage}>
          <p>Bütün elanlar göstərildi</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
