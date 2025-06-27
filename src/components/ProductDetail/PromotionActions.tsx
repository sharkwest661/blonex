import React, { useState } from "react";
import { Crown, Star, TrendingUp, Power } from "lucide-react";
import styles from "./PromotionActions.module.scss";

interface PromotionActionsProps {
  className?: string;
}

interface PromotionItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  icon: React.ReactNode;
  variant: "vip" | "premium" | "up";
}

const PromotionActions: React.FC<PromotionActionsProps> = ({ className }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const promotionItems: PromotionItem[] = [
    {
      id: "vip",
      title: "VIP et",
      price: 10,
      currency: "₼",
      description:
        "Elan saytın ana səhifəsində xüsusi ayrılmış blokda görünür və aktiv olduqca orada qalır",
      icon: <Crown size={16} />,
      variant: "vip",
    },
    {
      id: "premium",
      title: "Premium et",
      price: 5,
      currency: "₼",
      description:
        "Elan saytın ana səhifəsində xüsusi ayrılmış blokda görünür və aktiv olduqca orada qalır",
      icon: <Star size={16} />,
      variant: "premium",
    },
    {
      id: "up",
      title: "İrəli çək",
      price: 1,
      currency: "₼",
      description:
        "Elan saytın ana səhifəsində xüsusi ayrılmış blokda görünür və aktiv olduqca orada qalır",
      icon: <TrendingUp size={16} />,
      variant: "up",
    },
  ];

  const handlePromotionClick = (promotionId: string) => {
    // Handle promotion purchase logic
    console.log("Promotion clicked:", promotionId);
  };

  const handleDeactivateClick = () => {
    // Handle listing deactivation
    console.log("Deactivate listing");
  };

  return (
    <div className={`${styles.promotion} ${className || ""}`}>
      {/* Promotion Actions */}
      <div className={styles.promotionActions}>
        {promotionItems.map((item) => (
          <div
            key={item.id}
            className={styles.promotionItemWrapper}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              className={`${styles.promotionItem} ${
                styles[`promotionItem--${item.variant}`]
              }`}
              onClick={() => handlePromotionClick(item.id)}
              aria-describedby={`tooltip-${item.id}`}
            >
              <span className={styles.promotionIcon}>{item.icon}</span>
              <span className={styles.promotionTitle}>{item.title}</span>
              <span className={styles.promotionPrice}>
                {item.price}
                {item.currency}
              </span>
            </button>

            {/* Tooltip */}
            {hoveredItem === item.id && (
              <div
                id={`tooltip-${item.id}`}
                className={styles.promotionTooltip}
                role="tooltip"
              >
                <div className={styles.tooltipContent}>
                  <p className={styles.tooltipTitle}>
                    <strong>
                      {item.title} ({item.price}
                      {item.currency})
                    </strong>
                  </p>
                  <p className={styles.tooltipDescription}>
                    {item.description}
                  </p>
                </div>
                <div className={styles.tooltipArrow}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className={styles.promotionSettings}>
        <button
          className={styles.deactivateBtn}
          onClick={handleDeactivateClick}
        >
          <Power size={16} className={styles.deactivateIcon} />
          Deaktiv et
        </button>
      </div>
    </div>
  );
};

export default PromotionActions;
