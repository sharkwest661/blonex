// ===== 7. src/components/Filters/MobileFilters/VehicleFilterOverlay.tsx =====
"use client";
import React, { useState, useCallback } from "react";
import { X, ChevronDown, Search } from "lucide-react";
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
import styles from "./VehicleFilterOverlay.module.scss";

interface VehicleFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const VehicleFilterOverlay: React.FC<VehicleFilterOverlayProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Get filter values from store
  const make = useVehicleFilterStore((state) => state.make);
  const model = useVehicleFilterStore((state) => state.model);
  const minPrice = useVehicleFilterStore((state) => state.minPrice);
  const maxPrice = useVehicleFilterStore((state) => state.maxPrice);
  const minYear = useVehicleFilterStore((state) => state.minYear);
  const maxYear = useVehicleFilterStore((state) => state.maxYear);
  const color = useVehicleFilterStore((state) => state.color);
  const fuelType = useVehicleFilterStore((state) => state.fuelType);
  const bodyType = useVehicleFilterStore((state) => state.bodyType);
  const transmission = useVehicleFilterStore((state) => state.transmission);
  const city = useVehicleFilterStore((state) => state.city);
  const condition = useVehicleFilterStore((state) => state.condition);
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

  // Additional filter states for fields not in store yet
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

  // Handle year input changes
  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
      const value = e.target.value ? parseInt(e.target.value) : null;
      if (type === "min") {
        setFilter("minYear", value);
      } else {
        setFilter("maxYear", value);
      }
    },
    [setFilter]
  );

  // Handle condition radio buttons properly for mobile
  const handleConditionChange = useCallback(
    (conditionValue: VehicleCondition) => {
      setCondition(conditionValue);
    },
    [setCondition]
  );

  // Handle section toggle
  const toggleSection = useCallback(
    (section: string) => {
      setActiveSection(activeSection === section ? null : section);
    },
    [activeSection]
  );

  // Handle reset
  const handleReset = useCallback(() => {
    resetFilters();
    setMinEngineVolume("");
    setMaxEngineVolume("");
    setMinPower("");
    setMaxPower("");
    setDriveType("");
    setSeatsCount("");
  }, [resetFilters]);

  // Handle apply
  const handleApply = useCallback(() => {
    onApply();
  }, [onApply]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Filter</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {/* Make & Model Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("makeModel")}
              aria-expanded={activeSection === "makeModel"}
            >
              <span>Marka və Model</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "makeModel" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "makeModel" && (
              <div className={styles.sectionContent}>
                <div className={styles.filterGroup}>
                  <Select
                    options={makeOptions}
                    value={
                      make
                        ? {
                            value: make,
                            label:
                              makeOptions.find((o) => o.value === make)
                                ?.label || make,
                          }
                        : null
                    }
                    onChange={(value) => setMake(value)}
                    placeholder="Marka seçin"
                    className={styles.select}
                    variant="filter"
                  />
                </div>
                <div className={styles.filterGroup}>
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
                    placeholder="Model seçin"
                    className={styles.select}
                    variant="filter"
                    isDisabled={!make}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("price")}
              aria-expanded={activeSection === "price"}
            >
              <span>Qiymət</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "price" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "price" && (
              <div className={styles.sectionContent}>
                <div className={styles.rangeInputs}>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice || ""}
                      onChange={(e) => handlePriceChange(e, "min")}
                      className={styles.rangeInput}
                      min="1"
                    />
                    <span className={styles.rangeLabel}>min</span>
                  </div>
                  <span className={styles.rangeSeparator}>-</span>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice || ""}
                      onChange={(e) => handlePriceChange(e, "max")}
                      className={styles.rangeInput}
                      min="1"
                    />
                    <span className={styles.rangeLabel}>maks</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Year Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("year")}
              aria-expanded={activeSection === "year"}
            >
              <span>Buraxılış ili</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "year" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "year" && (
              <div className={styles.sectionContent}>
                <div className={styles.rangeInputs}>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minYear || ""}
                      onChange={(e) => handleYearChange(e, "min")}
                      className={styles.rangeInput}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                    <span className={styles.rangeLabel}>min</span>
                  </div>
                  <span className={styles.rangeSeparator}>-</span>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxYear || ""}
                      onChange={(e) => handleYearChange(e, "max")}
                      className={styles.rangeInput}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                    <span className={styles.rangeLabel}>maks</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Engine Volume Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("engine")}
              aria-expanded={activeSection === "engine"}
            >
              <span>Həcm (sm³)</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "engine" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "engine" && (
              <div className={styles.sectionContent}>
                <div className={styles.rangeInputs}>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minEngineVolume}
                      onChange={(e) => setMinEngineVolume(e.target.value)}
                      className={styles.rangeInput}
                      min="0"
                    />
                    <span className={styles.rangeLabel}>min</span>
                  </div>
                  <span className={styles.rangeSeparator}>-</span>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxEngineVolume}
                      onChange={(e) => setMaxEngineVolume(e.target.value)}
                      className={styles.rangeInput}
                      min="0"
                    />
                    <span className={styles.rangeLabel}>maks</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Power Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("power")}
              aria-expanded={activeSection === "power"}
            >
              <span>Güc (AT)</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "power" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "power" && (
              <div className={styles.sectionContent}>
                <div className={styles.rangeInputs}>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPower}
                      onChange={(e) => setMinPower(e.target.value)}
                      className={styles.rangeInput}
                      min="0"
                    />
                    <span className={styles.rangeLabel}>min</span>
                  </div>
                  <span className={styles.rangeSeparator}>-</span>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPower}
                      onChange={(e) => setMaxPower(e.target.value)}
                      className={styles.rangeInput}
                      min="0"
                    />
                    <span className={styles.rangeLabel}>maks</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("color")}
              aria-expanded={activeSection === "color"}
            >
              <span>Rəng</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "color" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "color" && (
              <div className={styles.sectionContent}>
                <Select
                  options={colorOptions}
                  value={
                    color
                      ? {
                          value: color,
                          label:
                            colorOptions.find((o) => o.value === color)
                              ?.label || color,
                        }
                      : null
                  }
                  onChange={(value) => setFilter("color", value)}
                  placeholder="Rəng seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Fuel Type Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("fuelType")}
              aria-expanded={activeSection === "fuelType"}
            >
              <span>Yanacaq növü</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "fuelType" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "fuelType" && (
              <div className={styles.sectionContent}>
                <Select
                  options={fuelOptions}
                  value={
                    fuelType
                      ? {
                          value: fuelType,
                          label:
                            fuelOptions.find((o) => o.value === fuelType)
                              ?.label || fuelType,
                        }
                      : null
                  }
                  onChange={(value) => setFilter("fuelType", value)}
                  placeholder="Yanacaq növü seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Body Type Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("bodyType")}
              aria-expanded={activeSection === "bodyType"}
            >
              <span>Ban növü</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "bodyType" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "bodyType" && (
              <div className={styles.sectionContent}>
                <Select
                  options={bodyOptions}
                  value={
                    bodyType
                      ? {
                          value: bodyType,
                          label:
                            bodyOptions.find((o) => o.value === bodyType)
                              ?.label || bodyType,
                        }
                      : null
                  }
                  onChange={(value) => setFilter("bodyType", value)}
                  placeholder="Ban növü seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Transmission Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("transmission")}
              aria-expanded={activeSection === "transmission"}
            >
              <span>Sürətlər qutusu</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "transmission" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "transmission" && (
              <div className={styles.sectionContent}>
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
                  placeholder="Sürətlər qutusu seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Drive Type Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("driveType")}
              aria-expanded={activeSection === "driveType"}
            >
              <span>Ötürücü</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "driveType" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "driveType" && (
              <div className={styles.sectionContent}>
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
                  placeholder="Ötürücü seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Seats Count Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("seats")}
              aria-expanded={activeSection === "seats"}
            >
              <span>Yerlərin sayı</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "seats" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "seats" && (
              <div className={styles.sectionContent}>
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
                  placeholder="Yerlərin sayını seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* City Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("city")}
              aria-expanded={activeSection === "city"}
            >
              <span>Şəhər</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "city" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "city" && (
              <div className={styles.sectionContent}>
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
                  placeholder="Şəhər seçin"
                  className={styles.select}
                  variant="filter"
                />
              </div>
            )}
          </div>

          {/* Condition Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("condition")}
              aria-expanded={activeSection === "condition"}
            >
              <span>Vəziyyət</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "condition" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "condition" && (
              <div className={styles.sectionContent}>
                <div className={styles.radioGroup}>
                  <label
                    className={styles.radioLabel}
                    onClick={() => handleConditionChange("all")}
                  >
                    <input
                      type="radio"
                      name="condition_mobile"
                      value="all"
                      checked={condition === "all"}
                      onChange={() => handleConditionChange("all")}
                      className={styles.radioInput}
                    />
                    Hamısı
                  </label>
                  <label
                    className={styles.radioLabel}
                    onClick={() => handleConditionChange("new")}
                  >
                    <input
                      type="radio"
                      name="condition_mobile"
                      value="new"
                      checked={condition === "new"}
                      onChange={() => handleConditionChange("new")}
                      className={styles.radioInput}
                    />
                    Yeni
                  </label>
                  <label
                    className={styles.radioLabel}
                    onClick={() => handleConditionChange("used")}
                  >
                    <input
                      type="radio"
                      name="condition_mobile"
                      value="used"
                      checked={condition === "used"}
                      onChange={() => handleConditionChange("used")}
                      className={styles.radioInput}
                    />
                    Sürülmüş
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className={styles.filterSection}>
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("features")}
              aria-expanded={activeSection === "features"}
            >
              <span>Xüsusiyyətlər</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "features" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "features" && (
              <div className={styles.sectionContent}>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={hasCredit}
                      onChange={toggleCredit}
                      className={styles.checkboxInput}
                    />
                    <span>Kredit</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={hasBarter}
                      onChange={toggleBarter}
                      className={styles.checkboxInput}
                    />
                    <span>Barter</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.resetButton} onClick={handleReset}>
            Sıfırla
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            <Search size={16} />
            <span>Elanları göstər</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilterOverlay;
