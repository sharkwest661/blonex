// src/app/page.tsx
import HomeFilter from "@/components/features/Home/HomeFilter";
import HomePageContent from "@/components/features/Home/HomePage";
import { Container } from "@/components/layout";
import CategoryGrid from "@/components/shared/CategoryGrid";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <Container>
        <section id="home_filters_sec">
          <Container fluid noPadding>
            <section className="d-md-block" id="neql_search">
              <HomeFilter />
            </section>

            {/* Categories Navigation Section */}
            <CategoryGrid />
          </Container>
        </section>
      </Container>

      {/* Main Content Sections */}
      <HomePageContent />
    </>
  );
};

export default HomePage;
