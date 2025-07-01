// src/components/common/Loader/SkeletonLoader.tsx
import React from "react";
import styles from "./SkeletonLoader.module.scss";

export interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className,
}) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius:
      typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
  };

  return (
    <div
      className={`${styles.skeleton} ${className || ""}`}
      style={style}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Yüklənir...</span>
    </div>
  );
};

export default SkeletonLoader;
