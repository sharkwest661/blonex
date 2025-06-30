// src/components/Layout/Container/MainContainer.tsx
import React from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.scss";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MainContainer component that matches the original main_container class
 * - Width: 1600px
 * - Max-width: 95%
 * - Centered with auto margins
 */
export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
}) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export default MainContainer;
