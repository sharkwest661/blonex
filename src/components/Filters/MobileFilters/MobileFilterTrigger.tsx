"use client";
import React from "react";
import { Filter } from "lucide-react";
import styles from "./MobileFilterTrigger.module.scss";

interface MobileFilterTriggerProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const MobileFilterTrigger: React.FC<MobileFilterTriggerProps> = ({
  onClick,
  className,
  label = "Filtrlər",
}) => {
  return (
    <button
      className={`${styles.trigger} ${className || ""}`}
      onClick={onClick}
      aria-label="Filtrləri aç"
    >
      <Filter size={20} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default MobileFilterTrigger;
