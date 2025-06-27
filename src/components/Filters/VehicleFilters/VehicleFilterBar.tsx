"use client";
import React, { useCallback } from "react";
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

  // Get filter values from store using individual selectors
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

  // Get current model options based on selected make
  const currentModelOptions =
    make && modelOptions[make as keyof typeof modelOptions]
      ? modelOptions[make as keyof typeof modelOptions]
      : [];

  // Handler functions
  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;
      if (value !== null && value <= 0) value = 1;
      if (type === "min") {
        setPriceRange(value, maxPrice);
      } else {
        setPriceRange(minPrice, value);
      }
    },
    [setPriceRange, minPrice, maxPrice]
  );

  const handleMileageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;
      if (value !== null && value < 0) value = 0;
      if (type === "min") {
        setFilter("minMileage", value);
      } else {
        setFilter("maxMileage", value);
      }
    },
    [setFilter]
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;
      const currentYear = new Date().getFullYear();
      if (value !== null) {
        if (value < 1900) value = 1900;
        else if (value > currentYear) value = currentYear;
      }
      if (type === "min") {
        setFilter("minYear", value);
      } else {
        setFilter("maxYear", value);
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
    console.log("Search with filters:", useVehicleFilterStore.getState());
    router.push("/neqliyyat/search");
  }, [router]);

  return (
    <div className={`${styles.filterBar} ${className || ""}`}>
      {/* Vehicle Condition Selector */}
      <div className={styles.conditionSelector}>
        <div className={styles.radioGroup}>
          <div className={styles.radioOption}>
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
          <div className={styles.radioOption}>
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
          <div className={styles.radioOption}>
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

      {/* Filter Rows */}
      <div className={styles.filterRows}>
        {/* Row 1 */}
        <div className={styles.filterRow}>
          {/* Make Dropdown */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Marka</div>
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
              onChange={(value) => {
                setMake(value);
                setModel(null);
              }}
              placeholder="Marka"
              variant="filter"
              className={styles.selectControl}
            />
          </div>

          {/* Model Dropdown */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Model</div>
            <Select
              options={currentModelOptions}
              value={
                model
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
              isDisabled={!make}
              className={styles.selectControl}
            />
          </div>

          {/* Body Type Dropdown */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Ban növü</div>
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
              className={styles.selectControl}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.filterRow}>
          {/* Price Range */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Qiymət, AZN</div>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                value={minPrice || ""}
                onChange={(e) => handlePriceChange(e, "min")}
                placeholder="min"
                className={styles.rangeInput}
              />
              <span className={styles.rangeSeparator}>-</span>
              <input
                type="number"
                value={maxPrice || ""}
                onChange={(e) => handlePriceChange(e, "max")}
                placeholder="max"
                className={styles.rangeInput}
              />
            </div>
          </div>

          {/* Year Range */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Buraxılış ili</div>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                value={minYear || ""}
                onChange={(e) => handleYearChange(e, "min")}
                placeholder="min"
                className={styles.rangeInput}
              />
              <span className={styles.rangeSeparator}>-</span>
              <input
                type="number"
                value={maxYear || ""}
                onChange={(e) => handleYearChange(e, "max")}
                placeholder="max"
                className={styles.rangeInput}
              />
            </div>
          </div>

          {/* Mileage Range */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Yürüş, km</div>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                value={minMileage || ""}
                onChange={(e) => handleMileageChange(e, "min")}
                placeholder="min"
                className={styles.rangeInput}
              />
              <span className={styles.rangeSeparator}>-</span>
              <input
                type="number"
                value={maxMileage || ""}
                onChange={(e) => handleMileageChange(e, "max")}
                placeholder="max"
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className={styles.filterRow}>
          {/* Transmission */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Sürətlər qutusu</div>
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
              className={styles.selectControl}
            />
          </div>

          {/* Fuel Type */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Yanacaq növü</div>
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
              className={styles.selectControl}
            />
          </div>

          {/* Color */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Rəng</div>
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
              className={styles.selectControl}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className={styles.filterRow}>
          {/* City */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Şəhər</div>
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
              className={styles.selectControl}
            />
          </div>

          {/* Checkboxes */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>Əlavə</div>
            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="credit_checkbox"
                  checked={hasCredit || false}
                  onChange={toggleCredit}
                  className={styles.checkbox}
                />
                <label htmlFor="credit_checkbox">Kredit</label>
              </div>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="barter_checkbox"
                  checked={hasBarter || false}
                  onChange={toggleBarter}
                  className={styles.checkbox}
                />
                <label htmlFor="barter_checkbox">Barter</label>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className={styles.filterItem}>
            <div className={styles.filterLabel}>&nbsp;</div>
            <button className={styles.searchButton} onClick={handleSearch}>
              Axtar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilterBar;
