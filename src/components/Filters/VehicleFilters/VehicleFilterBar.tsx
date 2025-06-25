// src/components/Filters/VehicleFilters/VehicleFilterBar.tsx
"use client";
import React, { useState } from "react";
import {
  useVehicleFilterStore,
  VehicleCondition,
} from "@/stores/useVehicleFilterStore";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Select } from "@/components/UI/Select";
import styles from "./VehicleFilterBar.module.scss";

export interface VehicleFilterBarProps {
  className?: string;
}

export const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({
  className,
}) => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  // Get state and actions from the store one by one
  const make = useVehicleFilterStore((state) => state.make);
  const model = useVehicleFilterStore((state) => state.model);
  const minPrice = useVehicleFilterStore((state) => state.minPrice);
  const maxPrice = useVehicleFilterStore((state) => state.maxPrice);
  const minYear = useVehicleFilterStore((state) => state.minYear);
  const maxYear = useVehicleFilterStore((state) => state.maxYear);
  const minEngineSize = useVehicleFilterStore((state) => state.minEngineSize);
  const maxEngineSize = useVehicleFilterStore((state) => state.maxEngineSize);
  const color = useVehicleFilterStore((state) => state.color);
  const fuelType = useVehicleFilterStore((state) => state.fuelType);
  const bodyType = useVehicleFilterStore((state) => state.bodyType);
  const transmission = useVehicleFilterStore((state) => state.transmission);
  const city = useVehicleFilterStore((state) => state.city);
  const condition = useVehicleFilterStore((state) => state.condition);
  const minMileage = useVehicleFilterStore((state) => state.minMileage);
  const maxMileage = useVehicleFilterStore((state) => state.maxMileage);
  const hasCredit = useVehicleFilterStore((state) => state.hasCredit);
  const hasBarter = useVehicleFilterStore((state) => state.hasBarter);

  const setMake = useVehicleFilterStore((state) => state.setMake);
  const setModel = useVehicleFilterStore((state) => state.setModel);
  const setPriceRange = useVehicleFilterStore((state) => state.setPriceRange);
  const setFilter = useVehicleFilterStore((state) => state.setFilter);
  const setCondition = useVehicleFilterStore((state) => state.setCondition);
  const resetFilters = useVehicleFilterStore((state) => state.resetFilters);
  const toggleCredit = useVehicleFilterStore((state) => state.toggleCredit);
  const toggleBarter = useVehicleFilterStore((state) => state.toggleBarter);

  // Sample data for dropdowns (would come from API in real implementation)
  const makeOptions = [
    { value: "mercedes", label: "Mercedes" },
    { value: "bmw", label: "BMW" },
    { value: "audi", label: "Audi" },
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
  ];

  const modelOptions =
    make === "mercedes"
      ? [
          { value: "c200", label: "C 200" },
          { value: "e350", label: "E 350" },
          { value: "s500", label: "S 500" },
          { value: "g63", label: "G 63 AMG" },
        ]
      : [];

  const colorOptions = [
    { value: "black", label: "Qara" },
    { value: "white", label: "Ağ" },
    { value: "silver", label: "Gümüşü" },
    { value: "red", label: "Qırmızı" },
  ];

  const fuelOptions = [
    { value: "gasoline", label: "Benzin" },
    { value: "diesel", label: "Dizel" },
    { value: "hybrid", label: "Hibrid" },
    { value: "electric", label: "Elektrik" },
  ];

  const bodyOptions = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "coupe", label: "Kupe" },
    { value: "hatchback", label: "Hetçbek" },
  ];

  const engineSizeOptions = [
    { value: "1000", label: "1.0" },
    { value: "1500", label: "1.5" },
    { value: "2000", label: "2.0" },
    { value: "3000", label: "3.0" },
    { value: "4000", label: "4.0" },
  ];

  const yearOptions = Array.from({ length: 30 }, (_, i) => ({
    value: String(2025 - i),
    label: String(2025 - i),
  }));

  const transmissionOptions = [
    { value: "auto", label: "Avtomat" },
    { value: "manual", label: "Mexaniki" },
    { value: "semi-auto", label: "Robotlaşdırılmış" },
  ];

  const cityOptions = [
    { value: "baku", label: "Bakı" },
    { value: "ganja", label: "Gəncə" },
    { value: "sumgait", label: "Sumqayıt" },
  ];

  // Handle price inputs
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    if (type === "min") {
      setPriceRange(value, maxPrice);
    } else {
      setPriceRange(minPrice, value);
    }
  };

  // Handle mileage inputs
  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    if (type === "min") {
      setFilter("minMileage", value);
    } else {
      setFilter("maxMileage", value);
    }
  };

  // Handle condition radio buttons
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value as VehicleCondition);
  };

  // Handle search button click
  const handleSearch = () => {
    // In a real app, this would navigate to the filtered search results
    // For now, we'll just log the filters
    console.log("Search with filters:", useVehicleFilterStore.getState());
    router.push("/neqliyyat/search");
  };

  return (
    <div className={`${styles.desctopFilters} ${className || ""}`}>
      {/* Row 1 - Always visible filters */}
      <div className={styles.filterRow}>
        {/* Make Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={makeOptions}
              value={
                make
                  ? {
                      value: make,
                      label:
                        makeOptions.find((o) => o.value === make)?.label ||
                        make,
                    }
                  : null
              }
              onChange={(value) => setMake(value)}
              placeholder="Marka"
              variant="filter"
            />
          </div>
        </div>

        {/* Model Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={modelOptions}
              value={
                model
                  ? {
                      value: model,
                      label:
                        modelOptions.find((o) => o.value === model)?.label ||
                        model,
                    }
                  : null
              }
              onChange={(value) => setModel(value)}
              placeholder="Model"
              variant="filter"
              isDisabled={!make}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div className={styles.unersalInputs}>
            <label htmlFor="price_input_min">
              <input
                type="text"
                id="price_input_min"
                value={minPrice || ""}
                onChange={(e) => handlePriceChange(e, "min")}
              />
              <p>Qiymət, min</p>
            </label>
            <label htmlFor="price_input_max">
              <input
                type="text"
                id="price_input_max"
                value={maxPrice || ""}
                onChange={(e) => handlePriceChange(e, "max")}
              />
              <p>maks</p>
            </label>
          </div>
        </div>

        {/* Color Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidthSmall}`}>
          <div className={styles.dropdown}>
            <Select
              options={colorOptions}
              value={
                color
                  ? {
                      value: color,
                      label:
                        colorOptions.find((o) => o.value === color)?.label ||
                        color,
                    }
                  : null
              }
              onChange={(value) => setFilter("color", value)}
              placeholder="Rəng"
              variant="filter"
            />
          </div>
        </div>

        {/* Fuel Type Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={fuelOptions}
              value={
                fuelType
                  ? {
                      value: fuelType,
                      label:
                        fuelOptions.find((o) => o.value === fuelType)?.label ||
                        fuelType,
                    }
                  : null
              }
              onChange={(value) => setFilter("fuelType", value)}
              placeholder="Yanacaq növü"
              variant="filter"
            />
          </div>
        </div>
      </div>

      {/* Row 2 - Always visible filters */}
      <div className={styles.filterRow}>
        {/* Body Type Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={bodyOptions}
              value={
                bodyType
                  ? {
                      value: bodyType,
                      label:
                        bodyOptions.find((o) => o.value === bodyType)?.label ||
                        bodyType,
                    }
                  : null
              }
              onChange={(value) => setFilter("bodyType", value)}
              placeholder="Ban Növü"
              variant="filter"
            />
          </div>
        </div>

        {/* Engine Size Range */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div className={styles.dropdownGroup}>
            <div className={styles.dropdown}>
              <Select
                options={engineSizeOptions}
                value={
                  minEngineSize
                    ? {
                        value: String(minEngineSize),
                        label: String(minEngineSize / 1000),
                      }
                    : null
                }
                onChange={(value) =>
                  setFilter("minEngineSize", value ? parseInt(value) : null)
                }
                placeholder="Həcm (sm³), min"
                variant="filter"
              />
            </div>
            <div className={styles.dropdown}>
              <Select
                options={engineSizeOptions}
                value={
                  maxEngineSize
                    ? {
                        value: String(maxEngineSize),
                        label: String(maxEngineSize / 1000),
                      }
                    : null
                }
                onChange={(value) =>
                  setFilter("maxEngineSize", value ? parseInt(value) : null)
                }
                placeholder="maks"
                variant="filter"
              />
            </div>
          </div>
        </div>

        {/* Year Range */}
        <div className={`${styles.formGroup} ${styles.forWidthSmall}`}>
          <div className={styles.dropdownGroup}>
            <div className={styles.dropdown}>
              <Select
                options={yearOptions}
                value={
                  minYear
                    ? { value: String(minYear), label: String(minYear) }
                    : null
                }
                onChange={(value) =>
                  setFilter("minYear", value ? parseInt(value) : null)
                }
                placeholder="İl, min"
                variant="filter"
              />
            </div>
            <div className={styles.dropdown}>
              <Select
                options={yearOptions}
                value={
                  maxYear
                    ? { value: String(maxYear), label: String(maxYear) }
                    : null
                }
                onChange={(value) =>
                  setFilter("maxYear", value ? parseInt(value) : null)
                }
                placeholder="maks"
                variant="filter"
              />
            </div>
          </div>
        </div>

        {/* Transmission Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={transmissionOptions}
              value={
                transmission
                  ? {
                      value: transmission,
                      label:
                        transmissionOptions.find(
                          (o) => o.value === transmission
                        )?.label || transmission,
                    }
                  : null
              }
              onChange={(value) => setFilter("transmission", value)}
              placeholder="Sürətlər qutusu"
              variant="filter"
            />
          </div>
        </div>

        {/* City Dropdown */}
        <div className={`${styles.formGroup} ${styles.forWidth20}`}>
          <div className={styles.dropdown}>
            <Select
              options={cityOptions}
              value={
                city
                  ? {
                      value: city,
                      label:
                        cityOptions.find((o) => o.value === city)?.label ||
                        city,
                    }
                  : null
              }
              onChange={(value) => setFilter("city", value)}
              placeholder="Şəhər"
              variant="filter"
            />
          </div>
        </div>
      </div>

      {/* Row 3 - Always visible filters */}
      <div className={styles.filterRow}>
        {/* Vehicle Condition */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div className={styles.forCar}>
            <div className={styles.allCar}>
              <input
                type="radio"
                name="condition"
                id="condition_all"
                value="all"
                checked={condition === "all"}
                onChange={handleConditionChange}
              />
              <label htmlFor="condition_all">Hamısı</label>
            </div>
            <div className={styles.newCar}>
              <input
                type="radio"
                name="condition"
                id="condition_new"
                value="new"
                checked={condition === "new"}
                onChange={handleConditionChange}
              />
              <label htmlFor="condition_new">Yeni</label>
            </div>
            <div className={styles.oldCar}>
              <input
                type="radio"
                name="condition"
                id="condition_used"
                value="used"
                checked={condition === "used"}
                onChange={handleConditionChange}
              />
              <label htmlFor="condition_used">Sürülmüş</label>
            </div>
          </div>
        </div>

        {/* Mileage Range */}
        <div className={`${styles.formGroup} ${styles.forWidthSmall}`}>
          <div className={styles.unersalInputs}>
            <label htmlFor="mileage_input_min">
              <input
                type="text"
                id="mileage_input_min"
                value={minMileage || ""}
                onChange={(e) => handleMileageChange(e, "min")}
              />
              <p>Yürüş, min</p>
            </label>
            <label htmlFor="mileage_input_max">
              <input
                type="text"
                id="mileage_input_max"
                value={maxMileage || ""}
                onChange={(e) => handleMileageChange(e, "max")}
              />
              <p>maks</p>
            </label>
          </div>
        </div>

        {/* Credit/Barter Checkboxes */}
        <div
          className={`${styles.formGroup} ${styles.forWidthSmall} ${styles.dFlex}`}
        >
          <div className={styles.forCredit}>
            <div className={styles.barter}>
              <input
                type="checkbox"
                name="kredit"
                id="kredit_checkbox"
                checked={hasCredit}
                onChange={toggleCredit}
              />
              <label htmlFor="kredit_checkbox">Kredit</label>
            </div>
            <div className={styles.credit}>
              <input
                type="checkbox"
                name="barter"
                id="barter_checkbox"
                checked={hasBarter}
                onChange={toggleBarter}
              />
              <label htmlFor="barter_checkbox">Barter</label>
            </div>
          </div>
        </div>
      </div>

      {/* More filters toggle - would show additional filter fields */}
      {showMore && (
        <div className={styles.additionalFilters}>
          {/* Additional filter fields would go here */}
          <div className={styles.additionalChekingsHero}>
            <p className={styles.additionalChekingsTitle}>
              Avtomobilin təchizatı
            </p>
            <div className={styles.additionalChekings}>
              {/* Equipment checkboxes would go here */}
            </div>
          </div>
        </div>
      )}

      {/* Filter buttons */}
      <div className={styles.descFiltersBtns}>
        <button className={styles.filterResetBtn} onClick={resetFilters}>
          Sıfırla
        </button>

        <button
          className={styles.filterElseBtn}
          onClick={() => setShowMore(!showMore)}
        >
          <p>{showMore ? "Daha az filtr" : "Daha çox filtr"}</p>
          <ChevronDown
            size={16}
            style={{ transform: showMore ? "rotate(180deg)" : "none" }}
          />
        </button>

        <button className={styles.filterShowBtn} onClick={handleSearch}>
          Elanları göstər
        </button>
      </div>
    </div>
  );
};

export default VehicleFilterBar;
