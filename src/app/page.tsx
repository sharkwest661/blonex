// src/app/page.tsx
import React from "react";
import { Container } from "@/components/Layout/Container";
import { HomeFilter } from "@/components/Home";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomePageContent from "@/components/HomePage/HomePageContent";

const HomePage: React.FC = () => {
  return (
    <>
      <Container>
        <section id="home_filters_sec">
          <Container fluid noPadding>
            <section className="d-md-block" id="neql_search">
              <Container>
                <Container fluid className="forpadding0">
                  <div className="row" id="dekstop_search_bar_row">
                    <div className="" id="dekstop_search_bar">
                      <HomeFilter />
                    </div>
                  </div>
                </Container>
              </Container>
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
