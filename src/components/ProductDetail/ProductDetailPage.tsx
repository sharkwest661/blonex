"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductCarousel from "./ProductCarousel";
import ProductInfo from "./ProductInfo";
import StoreProfile from "./StoreProfile";
import PromotionActions from "./PromotionActions";
import ReviewSection from "./ReviewSection";
import SimilarListings from "./SimilarListings";
import ComplaintModal from "./ComplaintModal";
import styles from "./ProductDetailPage.module.scss";

export interface ProductDetailPageProps {
  productId: string;
  productData?: ProductData; // Optional prop for passing data from server
}

interface ProductData {
  id: string;
  title: string;
  price: number;
  currency: string;
  condition: string;
  location: string;
  viewCount: number;
  lastUpdated: string;
  images: string[];
  breadcrumb: { name: string; href?: string }[];
  features: {
    delivery: boolean;
    barter: boolean;
    credit: boolean;
  };
  specifications: Record<string, string>;
  description: string;
  storeInfo: {
    name: string;
    logo: string;
    address: string;
    hours: string;
    phones: string[];
    totalListings: number;
  };
  isFavorite: boolean;
}

// Mock data service - for demonstration purposes
const getMockProductData = (productId: string): ProductData => {
  return {
    id: productId,
    title: "Apple iPhone 11 Pro Max Space Gray 256GB/4GB",
    price: 1655,
    currency: "₼",
    condition: "Yeni",
    location: "Bakı",
    viewCount: 1974,
    lastUpdated: "28.04.2021",
    images: [
      "/assets/images/example/carousel1.png",
      "/assets/images/example/post2.png",
      "/assets/images/example/post3.png",
      "/assets/images/example/post1.png",
    ],
    breadcrumb: [
      { name: "ELEKTRONİKA", href: "/category/electronics" },
      { name: "MOBİL TELEFONLAR" },
    ],
    features: {
      delivery: true,
      barter: true,
      credit: true,
    },
    specifications: {
      Brend: "Apple iPhone",
      Model: "11 Pro Max",
      Rəng: "Space Gray",
      Yaddaş: "256GB/4GB",
      Yeni: "Xeyr",
    },
    description: `ENDİRİMLƏR BAŞLADI!

Hörmətli müştərilər mağazamız tərəfindən endirimlər başlamışdı. Telefonların sayı məhdud saydadır.

Bütün telefonlara Xiaomi-nin Azərbaycandakı yeganə rəsmi servisi tərəfindən 1 İLLİK ZƏMANƏT verilir. Rəsmi servis "Mixtech" şirkətidi digər servislər rəsmi deyil.

Xiaomi Redmi 9T
• Təzə, bağlı qutuda, qlobal versiya. Dükanda var!
• Qeydiyyatlı və 1 illik RƏSMİ SERVİS zəmanətli. Adi dükan zəmanəti deyil.
• Metro çıxışlarına, ünvana və bölgələrə çatdırılma var.`,
    storeInfo: {
      name: "World Telecom",
      logo: "/assets/img/example/store-logo.png",
      address: "Nizami ray., Aşıq Mollacümə küç. 124",
      hours: "10:00-21:00",
      phones: ["+994 55 123 45 67", "+994 50 987 65 43"],
      totalListings: 156,
    },
    isFavorite: false,
  };
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  productData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use provided data or fall back to mock data
  const product = productData || getMockProductData(productId);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to update favorites
    // favoritesService.toggleFavorite(productId);
  };

  const handleComplaintOpen = () => {
    setIsComplaintModalOpen(true);
  };

  const handleComplaintClose = () => {
    setIsComplaintModalOpen(false);
  };

  return (
    <div className={styles.productDetailPage}>
      {/* Mobile Search */}
      <section className={styles.mobileSearchSection}>
        <div className={styles.container}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Axtarış..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.productGrid}>
            {/* Left Column - Images & Store Info */}
            <div className={styles.leftColumn}>
              <ProductCarousel images={product.images} title={product.title} />

              <div className={styles.storeSection}>
                <StoreProfile storeInfo={product.storeInfo} />
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className={styles.rightColumn}>
              <ProductInfo
                product={product}
                isFavorite={isFavorite}
                onFavoriteToggle={handleFavoriteToggle}
              />

              <PromotionActions className={styles.promotionActions} />

              <div className={styles.reviewsSection}>
                <ReviewSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Listings Section */}
      <section className={styles.similarListingsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Oxşar Elanlar</h2>
          <SimilarListings />
        </div>
      </section>

      {/* Complaint Modal */}
      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={handleComplaintClose}
      />
    </div>
  );
};

export default ProductDetailPage;
