"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import styles from "./ProductCarousel.module.scss";

interface ProductCarouselProps {
  images: string[];
  title: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleZoomToggle = () => {
    if (mainSwiperRef.current && mainSwiperRef.current.zoom) {
      if (isZoomed) {
        mainSwiperRef.current.zoom.out();
      } else {
        mainSwiperRef.current.zoom.in();
      }
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div className={styles.productCarousel}>
      {/* Main Carousel */}
      <div className={styles.mainCarousel}>
        <Swiper
          modules={[Navigation, Thumbs, Zoom, Keyboard]}
          spaceBetween={10}
          navigation={{
            nextEl: `.${styles.navNext}`,
            prevEl: `.${styles.navPrev}`,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          keyboard={{
            enabled: true,
          }}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          className={styles.mainSwiper}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={`${styles.mainSlide} ${isZoomed ? styles.zoomed : ""}`}
            >
              {/* ✅ FIXED: Use CSS Modules class instead of global swiper-zoom-container */}
              <div className={styles.zoomContainer}>
                <Image
                  src={image}
                  alt={`${title} - görünüş ${index + 1}`}
                  width={600}
                  height={400}
                  className={styles.mainImage}
                  priority={index === 0}
                  quality={90}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className={`${styles.navButton} ${styles.navPrev}`}
          aria-label="Əvvəlki şəkil"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className={`${styles.navButton} ${styles.navNext}`}
          aria-label="Növbəti şəkil"
        >
          <ChevronRight size={20} />
        </button>

        {/* Zoom Control */}
        <button
          className={styles.zoomButton}
          onClick={handleZoomToggle}
          aria-label={isZoomed ? "Kiçilt" : "Böyüt"}
        >
          {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
        </button>

        {/* Image Counter */}
        <div className={styles.imageCounter}>
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className={styles.thumbCarousel}>
          <Swiper
            modules={[Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            className={styles.thumbSwiper}
            breakpoints={{
              480: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 6,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className={styles.thumbSlide}>
                <div
                  className={`${styles.thumbContainer} ${
                    index === activeIndex ? styles.thumbActive : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - kiçik görünüş ${index + 1}`}
                    width={80}
                    height={60}
                    className={styles.thumbImage}
                    quality={70}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
