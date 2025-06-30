import React from "react";
import Link from "next/link";
import { Container } from "@/components/Layout/Container";
import { Search, Home, ArrowLeft } from "lucide-react";
import styles from "./not-found.module.scss";

const ListingNotFound: React.FC = () => {
  return (
    <main className={styles.notFoundPage}>
      <Container>
        <div className={styles.notFoundContent}>
          {/* 404 Icon */}
          <div className={styles.iconContainer}>
            <Search size={64} className={styles.searchIcon} />
          </div>

          {/* Error Content */}
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>Elan tapılmadı</h1>
            <p className={styles.errorMessage}>
              Axtardığınız elan mövcud deyil və ya silinmişdir. Zəhmət olmasa
              başqa elan axtarın və ya əsas səhifəyə qayıdın.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <Link href="/" className={styles.homeButton}>
                <Home size={20} />
                <span>Əsas səhifə</span>
              </Link>

              <Link href="/listings" className={styles.listingsButton}>
                <Search size={20} />
                <span>Bütün elanlar</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className={styles.backButton}
              >
                <ArrowLeft size={20} />
                <span>Geri qayıt</span>
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className={styles.suggestions}>
            <h3 className={styles.suggestionsTitle}>Təkliflər:</h3>
            <ul className={styles.suggestionsList}>
              <li>Elan nömrəsini yoxlayın</li>
              <li>Axtarış filtrlərindən istifadə edin</li>
              <li>Populyar kateqoriyalardan birini seçin</li>
              <li>Yeni elan yerləşdirin</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <h3 className={styles.quickLinksTitle}>Populyar kateqoriyalar:</h3>
            <div className={styles.categoryLinks}>
              <Link
                href="/category/electronics"
                className={styles.categoryLink}
              >
                Elektronika
              </Link>
              <Link href="/category/vehicles" className={styles.categoryLink}>
                Nəqliyyat
              </Link>
              <Link
                href="/category/real-estate"
                className={styles.categoryLink}
              >
                Daşınmaz əmlak
              </Link>
              <Link href="/category/jobs" className={styles.categoryLink}>
                İş elanları
              </Link>
              <Link href="/category/services" className={styles.categoryLink}>
                Xidmətlər
              </Link>
              <Link href="/category/fashion" className={styles.categoryLink}>
                Geyim və aksesuarlar
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ListingNotFound;
