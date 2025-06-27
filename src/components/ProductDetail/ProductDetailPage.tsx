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

interface ProductDetailPageProps {
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

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - replace with actual API call
  const productData: ProductData = {
    id: "1234567890",
    title: "Apple iPhone 11 Pro Max Space Gray 256GB/4GB",
    price: 1655,
    currency: "₼",
    condition: "Yeni",
    location: "Bakı",
    viewCount: 1974,
    lastUpdated: "28.04.2021",
    images: [
      "/assets/img/example/carousel1.png",
      "/assets/img/example/post2.png",
      "/assets/img/example/post3.png",
      "/assets/img/example/post1.png",
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
      address: "Nizami ray., Aşıq Mollacümə küç. 19/21",
      hours: "Hər gün, 10:00–22:00",
      phones: ["051 123 45 67", "012 345 67 89"],
      totalListings: 38,
    },
    isFavorite: false,
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Search:", searchQuery);
  };

  const handleComplaintClick = () => {
    setIsComplaintModalOpen(true);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Handle favorite API call
  };

  return (
    <main className={styles.productDetailPage}>
      {/* Mobile Search Section */}
      <section className={styles.mobileSearchSection}>
        <div className={styles.container}>
          <div className={styles.search}>
            <form onSubmit={handleSearch}>
              <div className={styles.searchGroup}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Android TV"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className={styles.searchAppend}>
                  <button
                    type="submit"
                    className={styles.searchBtn}
                    aria-label="Axtar"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productGrid}>
              {/* Left Column */}
              <div className={styles.leftColumn}>
                <ProductCarousel
                  images={productData.images}
                  title={productData.title}
                />

                <button
                  className={styles.complaintBtn}
                  onClick={handleComplaintClick}
                >
                  Şikayət et
                </button>

                <StoreProfile storeInfo={productData.storeInfo} />

                <PromotionActions />
              </div>

              {/* Right Column */}
              <div className={styles.rightColumn}>
                <ProductInfo
                  product={productData}
                  isFavorite={isFavorite}
                  onFavoriteToggle={handleFavoriteToggle}
                />

                <ReviewSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Listings Section */}
      <SimilarListings />

      {/* Complaint Modal */}
      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
      />
    </main>
  );
};

export default ProductDetailPage;
export type { ProductDetailPageProps };
