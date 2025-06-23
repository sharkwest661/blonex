// src/components/Layout/Container/Container.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  noPadding?: boolean;
}

/**
 * Container component that follows the original Bolbol design
 *
 * @param children - Content to be wrapped by the container
 * @param className - Additional CSS classes
 * @param fluid - Whether to use container-fluid styling (full width with padding)
 * @param noPadding - Whether to remove horizontal padding
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  fluid = false,
  noPadding = false,
}) => {
  return (
    <div
      className={cn(
        styles.container,
        fluid ? styles.containerFluid : "",
        noPadding ? styles.noPadding : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
