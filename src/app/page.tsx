// src/app/page.tsx (Semantically Corrected)
import React from "react";
import { HomeFilter } from "@/components/Home";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomePageContent from "@/components/HomePage/HomePageContent";

const HomePage: React.FC = () => {
  return (
    <main style={{ padding: "25px 0 50px" }}>
      {/* Search and Filters Section */}
      <HomeFilter />

      {/* Categories Navigation Section */}
      <section aria-label="Kateqoriyalar">
        <CategoryGrid />
      </section>

      {/* Main Content Sections */}
      <HomePageContent />
    </main>
  );
};

export default HomePage;
