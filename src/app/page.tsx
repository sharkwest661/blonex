// src/app/page.tsx
import React from "react";
import Container from "@/components/Layout/Container/Container";
import { HomeFilter } from "@/components/Home";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Home Search/Filter Section */}
      <HomeFilter />

      {/* Main Content */}
      <Container>
        <section className="py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Xoş gəlmisiniz Bolbol-a
          </h1>
          <div className="text-center text-gray-600">
            <p>Azərbaycanın ən böyük elan platforması</p>
            <p>İstədiyiniz hər şeyi tapın və ya satın!</p>
          </div>
        </section>

        {/* Categories section will go here */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Populyar Kateqoriyalar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Category components will be added here */}
            <div className="text-center text-gray-500">
              Kateqoriyalar tezliklə əlavə ediləcək
            </div>
          </div>
        </section>

        {/* Recent listings section will go here */}
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
