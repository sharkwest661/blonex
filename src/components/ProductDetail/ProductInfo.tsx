import React from "react";
import Link from "next/link";
import { Heart, MapPin, Truck, RefreshCw, Percent, Eye } from "lucide-react";
import styles from "./ProductInfo.module.scss";

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    price: number;
    currency: string;
    condition: string;
    location: string;
    viewCount: number;
    lastUpdated: string;
    breadcrumb: { name: string; href?: string }[];
    features: {
      delivery: boolean;
      barter: boolean;
      credit: boolean;
    };
    specifications: Record<string, string>;
    description: string;
  };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  isFavorite,
  onFavoriteToggle,
}) => {
  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => {
      if (line.trim() === "") return <br key={index} />;

      // Handle bullet points
      if (line.trim().startsWith("•")) {
        return (
          <li key={index} className={styles.descriptionListItem}>
            {line.trim().substring(1).trim()}
          </li>
        );
      }

      return (
        <p key={index} className={styles.descriptionParagraph}>
          {line.trim()}
        </p>
      );
    });
  };

  return (
    <div className={styles.productInfo}>
      {/* Product Attributes */}
      <div className={styles.productAttributes}>
        <div className={styles.productId}>№{product.id}</div>
        <div className={styles.productStats}>
          <span className={styles.productView}>
            <Eye size={16} />
            {product.viewCount} baxış
          </span>
          <button
            className={`${styles.productFavorite} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={onFavoriteToggle}
            aria-label={
              isFavorite ? "Seçdiklərdən çıxar" : "Seçdiklərə əlavə et"
            }
          >
            <Heart size={16} />
            {isFavorite ? "Seçilmişdir" : "Seçilmiş et"}
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className={styles.breadcrumb}>
        <ol className={styles.breadcrumbList}>
          {product.breadcrumb.map((item, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {item.href ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.name}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Title */}
      <h1 className={styles.productTitle}>{product.title}</h1>

      {/* Last Updated */}
      <p className={styles.productDate}>Son yenilənmə: {product.lastUpdated}</p>

      {/* Price and Condition */}
      <div className={styles.priceSection}>
        <span className={styles.productPrice}>
          {product.price.toLocaleString()} {product.currency}
        </span>
        <span className={styles.productState}>{product.condition}</span>
      </div>

      {/* Features */}
      <div className={styles.productFeatures}>
        <span className={styles.productFeature}>
          <MapPin size={16} />
          {product.location}
        </span>
        {product.features.delivery && (
          <span className={styles.productFeature}>
            <Truck size={16} />
            Çatdırılma
          </span>
        )}
        {product.features.barter && (
          <span className={styles.productFeature}>
            <RefreshCw size={16} />
            Barter
          </span>
        )}
        {product.features.credit && (
          <span className={styles.productFeature}>
            <Percent size={16} />
            Kredit mümkündür
          </span>
        )}
      </div>

      {/* Specifications Table */}
      <div className={styles.specificationsSection}>
        <table className={styles.specificationsTable}>
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <th scope="row" className={styles.specKey}>
                  {key}
                </th>
                <td className={styles.specValue}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Description */}
      <div className={styles.descriptionSection}>
        <div className={styles.descriptionContent}>
          {formatDescription(product.description)}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
