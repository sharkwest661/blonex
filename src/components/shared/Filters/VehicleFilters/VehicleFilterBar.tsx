// ===== 8. src/components/Filters/VehicleFilters/VehicleFilterBar.tsx =====
"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Select } from "@/components/UI";

interface VehicleFilterBarProps {
  className?: string;
}

// Engine volume options (in cc)
const engineVolumeOptions = [
  { value: "1000", label: "1.0L" },
  { value: "1200", label: "1.2L" },
  { value: "1400", label: "1.4L" },
  { value: "1600", label: "1.6L" },
  { value: "1800", label: "1.8L" },
  { value: "2000", label: "2.0L" },
  { value: "2500", label: "2.5L" },
  { value: "3000", label: "3.0L" },
  { value: "3500", label: "3.5L" },
  { value: "4000", label: "4.0L" },
];

const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({ className }) => {
  const router = useRouter();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

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

  // Additional filter states (you can add these to your store later)
  const [minEngineVolume, setMinEngineVolume] = useState<string>("");
  const [maxEngineVolume, setMaxEngineVolume] = useState<string>("");
  const [minPower, setMinPower] = useState<string>("");
  const [maxPower, setMaxPower] = useState<string>("");
  const [driveType, setDriveType] = useState<string>("");
  const [seatsCount, setSeatsCount] = useState<string>("");

  // Get current model options based on selected make
  const currentModelOptions =
    make && modelOptions[make as keyof typeof modelOptions]
      ? modelOptions[make as keyof typeof modelOptions]
      : [];

  // Handle price input changes with proper clamping
  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;

      // Clamp price to be greater than 0
      if (value !== null && value <= 0) {
        value = 1; // Set minimum price to 1
      }

      if (type === "min") {
        setPriceRange(value, maxPrice);
      } else {
        setPriceRange(minPrice, value);
      }
    },
    [setPriceRange, minPrice, maxPrice]
  );

  // Handle mileage inputs with validation
  const handleMileageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;

      // Ensure mileage is not negative
      if (value !== null && value < 0) {
        value = 0;
      }

      if (type === "min") {
        setFilter("minMileage", value);
      } else {
        setFilter("maxMileage", value);
      }
    },
    [setFilter]
  );

  // Handle year inputs with validation
  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      let value = e.target.value ? parseInt(e.target.value) : null;
      const currentYear = new Date().getFullYear();

      // Validate year range
      if (value !== null) {
        if (value < 1900) {
          value = 1900;
        } else if (value > currentYear) {
          value = currentYear;
        }
      }

      if (type === "min") {
        setFilter("minYear", value);
      } else {
        setFilter("maxYear", value);
      }
    },
    [setFilter]
  );

  // Handle condition radio buttons
  const handleConditionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCondition(e.target.value as VehicleCondition);
    },
    [setCondition]
  );

  // Handle reset button
  const handleReset = useCallback(() => {
    resetFilters();
    setMinEngineVolume("");
    setMaxEngineVolume("");
    setMinPower("");
    setMaxPower("");
    setDriveType("");
    setSeatsCount("");
  }, [resetFilters]);

  // Handle search button click
  const handleSearch = useCallback(() => {
    console.log("Search with filters:", useVehicleFilterStore.getState());
    router.push("/neqliyyat/search");
  }, [router]);

  return (
    <div className={`${styles.desktopFilters} ${className || ""}`}>
      {/* Row 1 - Make, Model, Price, Color */}
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
            />
          </div>
        </div>

        {/* Price Range - Now wider */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div className={styles.unersalInputs}>
            <label htmlFor="price_input_min">
              <input
                type="number"
                id="price_input_min"
                value={minPrice || ""}
                onChange={(e) => handlePriceChange(e, "min")}
                min="1"
                placeholder="Min"
              />
              <p>Qiymət, min</p>
            </label>
            <label htmlFor="price_input_max">
              <input
                type="number"
                id="price_input_max"
                value={maxPrice || ""}
                onChange={(e) => handlePriceChange(e, "max")}
                min="1"
                placeholder="Max"
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
      </div>

      {/* Row 2 - Fuel, Body, Engine Volume, Year */}
      <div className={styles.filterRow}>
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
              placeholder="Ban növü"
              variant="filter"
            />
          </div>
        </div>

        {/* Engine Volume Range */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div className={styles.unersalInputs}>
            <label htmlFor="engine_min">
              <input
                type="number"
                id="engine_min"
                value={minEngineVolume}
                onChange={(e) => setMinEngineVolume(e.target.value)}
                min="0"
                placeholder="Min"
              />
              <p>Həcm (sm³), min</p>
            </label>
            <label htmlFor="engine_max">
              <input
                type="number"
                id="engine_max"
                value={maxEngineVolume}
                onChange={(e) => setMaxEngineVolume(e.target.value)}
                min="0"
                placeholder="Max"
              />
              <p>maks</p>
            </label>
          </div>
        </div>

        {/* Year Range */}
        <div className={`${styles.formGroup} ${styles.forWidthSmall}`}>
          <div className={styles.unersalInputs}>
            <label htmlFor="year_input_min">
              <input
                type="number"
                id="year_input_min"
                value={minYear || ""}
                onChange={(e) => handleYearChange(e, "min")}
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Min"
              />
              <p>İl, min</p>
            </label>
            <label htmlFor="year_input_max">
              <input
                type="number"
                id="year_input_max"
                value={maxYear || ""}
                onChange={(e) => handleYearChange(e, "max")}
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Max"
              />
              <p>maks</p>
            </label>
          </div>
        </div>
      </div>

      {/* Row 3 - Transmission, City, Condition, Mileage */}
      <div className={styles.filterRow}>
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

        {/* Vehicle Condition */}
        <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
          <div
            className={styles.forCar}
            role="radiogroup"
            aria-labelledby="condition-label"
          >
            <span id="condition-label" className={styles.srOnly}>
              Avtomobilin vəziyyətini seçin
            </span>

            <div className={styles.allCar}>
              <input
                type="radio"
                name="condition"
                id="condition_all"
                value="all"
                checked={condition === "all"}
                onChange={handleConditionChange}
                aria-describedby="condition-label"
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
                aria-describedby="condition-label"
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
                aria-describedby="condition-label"
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
                type="number"
                id="mileage_input_min"
                value={minMileage || ""}
                onChange={(e) => handleMileageChange(e, "min")}
                min="0"
                placeholder="Min"
              />
              <p>Yürüş, min</p>
            </label>
            <label htmlFor="mileage_input_max">
              <input
                type="number"
                id="mileage_input_max"
                value={maxMileage || ""}
                onChange={(e) => handleMileageChange(e, "max")}
                min="0"
                placeholder="Max"
              />
              <p>maks</p>
            </label>
          </div>
        </div>
      </div>

      {/* Conditional Additional Filters */}
      {showMoreFilters && (
        <div className={styles.filterRow}>
          {/* Drive Type */}
          <div className={`${styles.formGroup} ${styles.forWidth20}`}>
            <div className={styles.dropdown}>
              <Select
                options={[
                  { value: "front", label: "Ön məhsur" },
                  { value: "rear", label: "Arxa məhsur" },
                  { value: "all", label: "Tam məhsur" },
                ]}
                value={
                  driveType ? { value: driveType, label: driveType } : null
                }
                onChange={(value) => setDriveType(value || "")}
                placeholder="Ötürücü"
                variant="filter"
              />
            </div>
          </div>

          {/* Seats Count */}
          <div className={`${styles.formGroup} ${styles.forWidth20}`}>
            <div className={styles.dropdown}>
              <Select
                options={[
                  { value: "2", label: "2" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "7", label: "7" },
                  { value: "8+", label: "8+" },
                ]}
                value={
                  seatsCount ? { value: seatsCount, label: seatsCount } : null
                }
                onChange={(value) => setSeatsCount(value || "")}
                placeholder="Yerlərin sayı"
                variant="filter"
              />
            </div>
          </div>

          {/* Power Range */}
          <div className={`${styles.formGroup} ${styles.forWidthBig}`}>
            <div className={styles.unersalInputs}>
              <label htmlFor="power_min">
                <input
                  type="number"
                  id="power_min"
                  value={minPower}
                  onChange={(e) => setMinPower(e.target.value)}
                  min="0"
                  placeholder="Min"
                />
                <p>Güc, min</p>
              </label>
              <label htmlFor="power_max">
                <input
                  type="number"
                  id="power_max"
                  value={maxPower}
                  onChange={(e) => setMaxPower(e.target.value)}
                  min="0"
                  placeholder="Max"
                />
                <p>maks</p>
              </label>
            </div>
          </div>

          {/* Credit/Barter Checkboxes */}
          <div
            className={`${styles.formGroup} ${styles.forWidthSmall} ${styles.dFlex}`}
          >
            <div
              className={styles.forCredit}
              role="group"
              aria-labelledby="payment-options-label"
            >
              <span id="payment-options-label" className={styles.srOnly}>
                Ödəniş seçimlərini işarələyin
              </span>

              <div className={styles.barter}>
                <input
                  type="checkbox"
                  name="kredit"
                  id="kredit"
                  checked={hasCredit}
                  onChange={toggleCredit}
                  aria-describedby="payment-options-label"
                />
                <label htmlFor="kredit">Kredit</label>
              </div>

              <div className={styles.kredit}>
                <input
                  type="checkbox"
                  name="barter"
                  id="barter"
                  checked={hasBarter}
                  onChange={toggleBarter}
                  aria-describedby="payment-options-label"
                />
                <label htmlFor="barter">Barter</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Action Buttons */}
      <div className={styles.filterActions}>
        <button
          className={styles.resetButton}
          onClick={handleReset}
          type="button"
        >
          Sıfırla
        </button>

        <button
          className={styles.moreFiltersButton}
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          type="button"
        >
          <span>Daha çox filtr</span>
          <i
            className={`fa-solid fa-chevron-${showMoreFilters ? "up" : "down"}`}
          ></i>
        </button>

        <button
          className={styles.searchButton}
          onClick={handleSearch}
          type="button"
        >
          Elanları göstər
        </button>
      </div>
    </div>
  );
};

export default VehicleFilterBar;
