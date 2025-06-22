// src/app/page.tsx (Updated)
import React from "react";
import Container from "@/components/Layout/Container/Container";
import { HomeFilter } from "@/components/Home";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomePageContent from "@/components/HomePage/HomePageContent";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Home Search/Filter Section */}
      <HomeFilter />

      {/* Categories Section */}
      <Container>
        <CategoryGrid />
      </Container>

      {/* Main Content Sections */}
      <HomePageContent />
    </>
  );
};

export default HomePage;
