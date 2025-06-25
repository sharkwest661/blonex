// Updated VehicleFilterBar.tsx with improved organization
"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/UI/Select";
import { useVehicleFilterStore } from "@/stores/useVehicleFilterStore";
import {
  makeOptions,
  modelOptions,
  colorOptions,
  fuelOptions,
  bodyOptions,
  transmissionOptions,
  cityOptions,
} from "@/constants/vehicleOptions";
import type { VehicleCondition } from "@/types/vehicle.types";
import styles from "./VehicleFilterBar.module.scss";

interface VehicleFilterBarProps {
  className?: string;
}

const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({ className }) => {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get filter values from store
  const make = useVehicleFilterStore((state) => state.make);
  const model = useVehicleFilterStore((state) => state.model);
  const minPrice = useVehicleFilterStore((state) => state.minPrice);
  const maxPrice = useVehicleFilterStore((state) => state.maxPrice);
  const minYear = useVehicleFilterStore((state) => state.minYear);
  const maxYear = useVehicleFilterStore((state) => state.maxYear);
  const minMileage = useVehicleFilterStore((state) => state.minMileage);
  const maxMileage = useVehicleFilterStore((state) => state.maxMileage);
  const color = useVehicleFilterStore((state) => state.color);
  const fuelType = useVehicleFilterStore((state) => state.fuelType);
  const bodyType = useVehicleFilterStore((state) => state.bodyType);
  const transmission = useVehicleFilterStore((state) => state.transmission);
  const city = useVehicleFilterStore((state) => state.city);
  const condition = useVehicleFilterStore((state) => state.condition);
  const hasCredit = useVehicleFilterStore((state) => state.hasCredit);
  const hasBarter = useVehicleFilterStore((state) => state.hasBarter);

  // Get filter setters from store
  const setMake = useVehicleFilterStore((state) => state.setMake);
  const setModel = useVehicleFilterStore((state) => state.setModel);
  const setPriceRange = useVehicleFilterStore((state) => state.setPriceRange);
  const setFilter = useVehicleFilterStore((state) => state.setFilter);
  const setCondition = useVehicleFilterStore((state) => state.setCondition);
  const toggleCredit = useVehicleFilterStore((state) => state.toggleCredit);
  const toggleBarter = useVehicleFilterStore((state) => state.toggleBarter);
  const resetFilters = useVehicleFilterStore((state) => state.resetFilters);

  // Get current model options based on selected make
  const currentModelOptions =
    make && modelOptions[make as keyof typeof modelOptions]
      ? modelOptions[make as keyof typeof modelOptions]
      : [];

  // Handle price input changes
  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      const value = e.target.value ? Math.max(0, parseInt(e.target.value)) : 0;

      if (type === "min") {
        setPriceRange(value, maxPrice || 0);
      } else {
        setPriceRange(minPrice || 0, value);
      }
    },
    [minPrice, maxPrice, setPriceRange]
  );

  // Handle year input changes
  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      const value = e.target.value ? parseInt(e.target.value) : 0;

      if (type === "min") {
        setFilter("minYear", value);
      } else {
        setFilter("maxYear", value);
      }
    },
    [setFilter]
  );

  // Handle mileage input changes
  const handleMileageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      const value = e.target.value ? Math.max(0, parseInt(e.target.value)) : 0;

      if (type === "min") {
        setFilter("minMileage", value);
      } else {
        setFilter("maxMileage", value);
      }
    },
    [setFilter]
  );

  const handleConditionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCondition(e.target.value as VehicleCondition);
    },
    [setCondition]
  );

  const handleSearch = useCallback(() => {
    // Trigger search/navigation with current filters
    router.push("/neqliyyat/search");
  }, [router]);

  return (
    <div className={`${styles.desktopFilters} ${className || ""}`}>
      {/* PRIMARY ROW - Most Important Filters */}
      <div className={styles.primaryRow}>
        {/* Brand/Make */}
        <div className={styles.filterGroup}>
          <Select
            options={makeOptions}
            value={
              make
                ? {
                    value: make,
                    label:
                      makeOptions.find((o) => o.value === make)?.label || make,
                  }
                : null
            }
            onChange={(value) => {
              setMake(value);
              setModel(""); // Reset model when make changes
            }}
            placeholder="Marka"
            variant="filter"
          />
        </div>

        {/* Model */}
        <div className={styles.filterGroup}>
          <Select
            options={currentModelOptions}
            value={
              model && currentModelOptions.length > 0
                ? {
                    value: model,
                    label:
                      currentModelOptions.find((o) => o.value === model)
                        ?.label || model,
                  }
                : null
            }
            onChange={(value) => setModel(value)}
            placeholder="Model"
            variant="filter"
            isDisabled={!make || currentModelOptions.length === 0}
          />
        </div>

        {/* City */}
        <div className={styles.filterGroup}>
          <Select
            options={cityOptions}
            value={
              city
                ? {
                    value: city,
                    label:
                      cityOptions.find((o) => o.value === city)?.label || city,
                  }
                : null
            }
            onChange={(value) => setFilter("city", value)}
            placeholder="Şəhər"
            variant="filter"
          />
        </div>

        {/* Price Range */}
        <div className={styles.priceGroup}>
          <input
            type="number"
            placeholder="Min qiymət"
            value={minPrice || ""}
            onChange={(e) => handlePriceChange(e, "min")}
            className={styles.priceInput}
            min="0"
          />
          <span className={styles.separator}>-</span>
          <input
            type="number"
            placeholder="Max qiymət"
            value={maxPrice || ""}
            onChange={(e) => handlePriceChange(e, "max")}
            className={styles.priceInput}
            min="0"
          />
          <span className={styles.currency}>AZN</span>
        </div>

        {/* Payment Options */}
        <div className={styles.paymentOptions}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={hasCredit}
              onChange={toggleCredit}
            />
            <span>Kredit</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={hasBarter}
              onChange={toggleBarter}
            />
            <span>Barter</span>
          </label>
        </div>
      </div>

      {/* SECONDARY ROW - Vehicle Specifications */}
      <div className={styles.secondaryRow}>
        {/* Fuel Type */}
        <div className={styles.filterGroup}>
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

        {/* Body Type */}
        <div className={styles.filterGroup}>
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
            placeholder="Ban növü"
            variant="filter"
          />
        </div>

        {/* Transmission */}
        <div className={styles.filterGroup}>
          <Select
            options={transmissionOptions}
            value={
              transmission
                ? {
                    value: transmission,
                    label:
                      transmissionOptions.find((o) => o.value === transmission)
                        ?.label || transmission,
                  }
                : null
            }
            onChange={(value) => setFilter("transmission", value)}
            placeholder="Sürətlər qutusu"
            variant="filter"
          />
        </div>

        {/* Year Range */}
        <div className={styles.yearGroup}>
          <input
            type="number"
            placeholder="Min il"
            value={minYear || ""}
            onChange={(e) => handleYearChange(e, "min")}
            className={styles.yearInput}
            min="1900"
            max="2030"
          />
          <span className={styles.separator}>-</span>
          <input
            type="number"
            placeholder="Max il"
            value={maxYear || ""}
            onChange={(e) => handleYearChange(e, "max")}
            className={styles.yearInput}
            min="1900"
            max="2030"
          />
        </div>

        {/* Condition */}
        <div className={styles.conditionGroup}>
          <label className={styles.radio}>
            <input
              type="radio"
              name="condition"
              value="new"
              checked={condition === "new"}
              onChange={handleConditionChange}
            />
            <span>Yeni</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="condition"
              value="used"
              checked={condition === "used"}
              onChange={handleConditionChange}
            />
            <span>İşlənmiş</span>
          </label>
        </div>
      </div>

      {/* ADVANCED FILTERS TOGGLE */}
      <div className={styles.advancedToggle}>
        <button
          className={styles.toggleButton}
          onClick={() => setShowAdvanced(!showAdvanced)}
          type="button"
        >
          {showAdvanced ? "Ətraflı axtarışı gizlət" : "Ətraflı axtarış"}
          <span
            className={`${styles.arrow} ${
              showAdvanced ? styles.up : styles.down
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      {/* ADVANCED ROW - Less Common Filters */}
      {showAdvanced && (
        <div className={styles.advancedRow}>
          {/* Color */}
          <div className={styles.filterGroup}>
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

          {/* Mileage Range */}
          <div className={styles.mileageGroup}>
            <input
              type="number"
              placeholder="Min yürüş"
              value={minMileage || ""}
              onChange={(e) => handleMileageChange(e, "min")}
              className={styles.mileageInput}
              min="0"
            />
            <span className={styles.separator}>-</span>
            <input
              type="number"
              placeholder="Max yürüş"
              value={maxMileage || ""}
              onChange={(e) => handleMileageChange(e, "max")}
              className={styles.mileageInput}
              min="0"
            />
            <span className={styles.unit}>km</span>
          </div>

          {/* Engine Volume - You can add these to your store */}
          <div className={styles.engineGroup}>
            <input
              type="number"
              placeholder="Min həcm"
              className={styles.engineInput}
              step="0.1"
              min="0"
            />
            <span className={styles.separator}>-</span>
            <input
              type="number"
              placeholder="Max həcm"
              className={styles.engineInput}
              step="0.1"
              min="0"
            />
            <span className={styles.unit}>L</span>
          </div>

          {/* Engine Power - You can add these to your store */}
          <div className={styles.powerGroup}>
            <input
              type="number"
              placeholder="Min güc"
              className={styles.powerInput}
              min="0"
            />
            <span className={styles.separator}>-</span>
            <input
              type="number"
              placeholder="Max güc"
              className={styles.powerInput}
              min="0"
            />
            <span className={styles.unit}>a.g.</span>
          </div>
        </div>
      )}

      {/* SEARCH ACTIONS */}
      <div className={styles.actionsRow}>
        <button
          className={styles.clearButton}
          onClick={resetFilters}
          type="button"
        >
          Təmizlə
        </button>
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          type="button"
        >
          Axtar
        </button>
      </div>
    </div>
  );
};

export default VehicleFilterBar;
