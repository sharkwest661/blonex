// src/components/Layout/Container/Container.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  noPadding?: boolean;
  searchContainer?: boolean; // New prop for search-specific styling
}

/**
 * Container component that follows the original Bolbol design
 *
 * @param children - Content to be wrapped by the container
 * @param className - Additional CSS classes
 * @param fluid - Whether to use container-fluid styling (full width with padding)
 * @param noPadding - Whether to remove horizontal padding
 * @param searchContainer - Whether to use search-specific container styling
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  fluid = false,
  noPadding = false,
  searchContainer = false,
}) => {
  const containerClass = cn(
    // Base container class
    fluid ? styles.containerFluid : styles.container,
    // Search-specific overrides
    searchContainer && fluid ? styles.searchContainerFluid : "",
    searchContainer && !fluid ? styles.searchContainer : "",
    // Modifiers
    noPadding ? styles.noPadding : "",
    // Custom classes
    className
  );

  return <div className={containerClass}>{children}</div>;
};

export default Container;
