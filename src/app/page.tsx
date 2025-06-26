// Enhanced src/app/page.tsx - Better styling, same content
import React from "react";
import { Container } from "@/components/Layout/Container";
import { HomeFilter } from "@/components/Home";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomePageContent from "@/components/HomePage/HomePageContent";
import styles from "./page.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homepage}>
      {/* Enhanced Hero Section with Search */}
      <section className={styles.homeFiltersSection}>
        <Container>
          <div className={styles.searchContainer}>
            <section className="d-md-block" id="neql_search">
              <Container>
                <Container fluid className="forpadding0">
                  <div className="row" id="dekstop_search_bar_row">
                    <div
                      className={styles.dekstopSearchBar}
                      id="dekstop_search_bar"
                    >
                      <HomeFilter />
                    </div>
                  </div>
                </Container>
              </Container>
            </section>
          </div>
        </Container>
      </section>

      {/* Enhanced Categories Section */}
      <section className={styles.categorySection}>
        <Container fluid noPadding>
          <CategoryGrid />
        </Container>
      </section>

      {/* Enhanced Main Content */}
      <div className={styles.mainContent}>
        <HomePageContent />
      </div>
    </div>
  );
};

export default HomePage;
