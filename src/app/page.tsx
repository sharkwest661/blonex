// src/app/page.tsx
import React from "react";
import Container from "@/components/Layout/Container/Container";
import { HomeFilter } from "@/components/Home";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Home Search/Filter Section */}
      <HomeFilter />

      {/* Categories Section */}
      <Container>
        <CategoryGrid />
      </Container>

      {/* Main Content */}
      <Container>
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Son Elanlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Listing components will be added here */}
            <div className="text-center text-gray-500 col-span-full">
              Son elanlar tezliklə göstəriləcək
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomePage;
