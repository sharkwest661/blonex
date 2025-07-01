/* ===== 10. src/components/Filters/MobileFilters/MobileFilterTrigger.tsx ===== */
"use client";
import React from "react";
import { Filter } from "lucide-react";
import styles from "./MobileFilterTrigger.module.scss";

interface MobileFilterTriggerProps {
  onClick: () => void;
  className?: string;
}

export const MobileFilterTrigger: React.FC<MobileFilterTriggerProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      className={`${styles.trigger} ${className || ""}`}
      onClick={onClick}
      type="button"
    >
      <Filter size={20} className={styles.icon} />
      <span className={styles.label}>Filter</span>
    </button>
  );
};

export default MobileFilterTrigger;
