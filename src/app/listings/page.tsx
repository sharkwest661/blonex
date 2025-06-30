import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/Layout/Container";
import { Search, Filter } from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Bütün Elanlar | Bolbol.az",
  description:
    "Azərbaycanda ən böyük elan saytı. Hər növ elan - elektronika, nəqliyyat, daşınmaz əmlak və daha çox.",
  keywords:
    "elanlar, satış, alış, Azərbaycan, Bakı, elektronika, nəqliyyat, əmlak",
};

// Mock data for sample listings
const sampleListings = [
  {
    id: "1234567890",
    title: "Apple iPhone 11 Pro Max Space Gray 256GB/4GB",
    price: 1655,
    currency: "₼",
    location: "Bakı",
    date: "28.04.2021",
    image: "/assets/img/example/carousel1.png",
    isVip: true,
  },
  {
    id: "1234567891",
    title: "Samsung Galaxy S12 Ultra 256GB",
    price: 2180,
    currency: "₼",
    location: "Bakı",
    date: "27.04.2021",
    image: "/assets/img/example/post1.png",
    isVip: false,
  },
  {
    id: "1234567892",
    title: "MacBook Pro 13 M1 2021 512GB",
    price: 3200,
    currency: "₼",
    location: "Gəncə",
    date: "26.04.2021",
    image: "/assets/img/example/post2.png",
    isVip: true,
  },
  {
    id: "1234567893",
    title: "iPad Air 4 WiFi 64GB Space Gray",
    price: 850,
    currency: "₼",
    location: "Bakı",
    date: "25.04.2021",
    image: "/assets/img/example/post3.png",
    isVip: false,
  },
  {
    id: "sample-iphone-11",
    title: "iPhone 11 128GB White Zəmanətli",
    price: 1200,
    currency: "₼",
    location: "Sumqayıt",
    date: "24.04.2021",
    image: "/assets/img/example/carousel1.png",
    isVip: false,
  },
  {
    id: "test-product-1",
    title: "Xiaomi Redmi Note 10 Pro 128GB",
    price: 450,
    currency: "₼",
    location: "Bakı",
    date: "23.04.2021",
    image: "/assets/img/example/post1.png",
    isVip: false,
  },
];

export default function ListingsPage() {
  return (
    <main className={styles.listingsPage}>
      <Container>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Bütün Elanlar</h1>
          <p className={styles.pageDescription}>
            {sampleListings.length} elan tapıldı
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className={styles.searchFilterBar}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Elan axtarın..."
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterButton}>
            <Filter size={20} />
            <span>Filtrlər</span>
          </button>
        </div>

        {/* Listings Grid */}
        <div className={styles.listingsGrid}>
          {sampleListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className={styles.listingCard}
            >
              {/* VIP Badge */}
              {listing.isVip && <div className={styles.vipBadge}>VIP</div>}

              {/* Product Image */}
              <div className={styles.imageContainer}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className={styles.productImage}
                />
              </div>

              {/* Product Info */}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{listing.title}</h3>

                <div className={styles.productMeta}>
                  <span className={styles.price}>
                    {listing.price.toLocaleString()} {listing.currency}
                  </span>
                  <span className={styles.location}>{listing.location}</span>
                </div>

                <div className={styles.productDate}>{listing.date}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className={styles.loadMoreSection}>
          <button className={styles.loadMoreButton}>Daha çox elan yüklə</button>
        </div>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>Demo Məlumat</h3>
          <p className={styles.infoText}>
            Bu elanlar demo məqsədləri üçün göstərilir. Hər hansı elanı seçərək
            ətraflı məlumat səhifəsini görə bilərsiniz. Bütün elanlar eyni
            məhsulu göstərir, ancaq URL fərqlidir.
          </p>
        </div>
      </Container>
    </main>
  );
}
