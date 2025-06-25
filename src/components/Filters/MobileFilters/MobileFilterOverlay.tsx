"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import { useVehicleFilterStore } from "@/stores/useVehicleFilterStore";
import { Select } from "@/components/UI/Select";
import styles from "./MobileFilterOverlay.module.scss";

// Mock data for dropdowns (would come from API in real implementation)
const makeOptions = [
  { value: "mercedes", label: "Mercedes" },
  { value: "bmw", label: "BMW" },
  { value: "audi", label: "Audi" },
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
];

// This would be dynamic based on selected make
const modelOptions = {
  mercedes: [
    { value: "c200", label: "C 200" },
    { value: "e350", label: "E 350" },
    { value: "s500", label: "S 500" },
    { value: "g63", label: "G 63 AMG" },
  ],
  bmw: [
    { value: "320i", label: "320i" },
    { value: "520d", label: "520d" },
    { value: "x5", label: "X5" },
    { value: "m3", label: "M3" },
  ],
  audi: [
    { value: "a4", label: "A4" },
    { value: "a6", label: "A6" },
    { value: "q7", label: "Q7" },
    { value: "rs6", label: "RS6" },
  ],
  toyota: [
    { value: "camry", label: "Camry" },
    { value: "corolla", label: "Corolla" },
    { value: "rav4", label: "RAV4" },
    { value: "landcruiser", label: "Land Cruiser" },
  ],
  honda: [
    { value: "civic", label: "Civic" },
    { value: "accord", label: "Accord" },
    { value: "crv", label: "CR-V" },
    { value: "hrv", label: "HR-V" },
  ],
};

const colorOptions = [
  { value: "black", label: "Qara" },
  { value: "white", label: "Ağ" },
  { value: "silver", label: "Gümüşü" },
  { value: "red", label: "Qırmızı" },
  { value: "blue", label: "Mavi" },
];

const fuelOptions = [
  { value: "gasoline", label: "Benzin" },
  { value: "diesel", label: "Dizel" },
  { value: "hybrid", label: "Hibrid" },
  { value: "electric", label: "Elektrik" },
  { value: "lpg", label: "LPG" },
];

const bodyOptions = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "coupe", label: "Kupe" },
  { value: "hatchback", label: "Hetçbek" },
  { value: "wagon", label: "Universal" },
  { value: "pickup", label: "Pikap" },
];

const yearOptions = Array.from({ length: 30 }, (_, i) => ({
  value: String(2025 - i),
  label: String(2025 - i),
}));

const transmissionOptions = [
  { value: "auto", label: "Avtomat" },
  { value: "manual", label: "Mexaniki" },
  { value: "semi-auto", label: "Robotlaşdırılmış" },
  { value: "cvt", label: "CVT" },
];

const cityOptions = [
  { value: "baku", label: "Bakı" },
  { value: "ganja", label: "Gəncə" },
  { value: "sumgait", label: "Sumqayıt" },
  { value: "mingachevir", label: "Mingəçevir" },
  { value: "sheki", label: "Şəki" },
];

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Get filter state and actions from the store
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

  // Get current model options based on selected make
  const currentModelOptions =
    make && modelOptions[make as keyof typeof modelOptions]
      ? modelOptions[make as keyof typeof modelOptions]
      : [];

  // Handle price input changes
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

  // Handle section toggle
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Handle condition change
  const handleConditionChange = (value: string) => {
    setCondition(value as "all" | "new" | "used");
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Apply filters
  const handleApply = () => {
    onApply();
    onClose();
  };

  // Reset filters
  const handleReset = () => {
    resetFilters();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.drawer} ref={overlayRef}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Filtrlər</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Bağla"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filter Sections */}
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
                  <label className={styles.filterLabel}>Marka</label>
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
                    onChange={(value) => {
                      setMake(value);
                      setModel(null); // Reset model when make changes
                    }}
                    placeholder="Marka seçin"
                    className={styles.select}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Model</label>
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
                    isDisabled={!make}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Price Range Section */}
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
                      value={minPrice || ""}
                      onChange={(e) => handlePriceChange(e, "min")}
                      placeholder="Min"
                      className={styles.rangeInput}
                    />
                    <label className={styles.rangeLabel}>Min</label>
                  </div>
                  <span className={styles.rangeSeparator}>-</span>
                  <div className={styles.inputGroup}>
                    <input
                      type="number"
                      value={maxPrice || ""}
                      onChange={(e) => handlePriceChange(e, "max")}
                      placeholder="Max"
                      className={styles.rangeInput}
                    />
                    <label className={styles.rangeLabel}>Max</label>
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
              <span>İl</span>
              <ChevronDown
                size={20}
                className={`${styles.arrow} ${
                  activeSection === "year" ? styles.expanded : ""
                }`}
              />
            </button>

            {activeSection === "year" && (
              <div className={styles.sectionContent}>
                <div className={styles.selectGroup}>
                  <div className={styles.halfSelect}>
                    <label className={styles.filterLabel}>Min</label>
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
                      placeholder="Min"
                      className={styles.select}
                    />
                  </div>
                  <div className={styles.halfSelect}>
                    <label className={styles.filterLabel}>Max</label>
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
                      placeholder="Max"
                      className={styles.select}
                    />
                  </div>
                </div>
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
                />
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
                />
              </div>
            )}
          </div>

          {/* Location Section */}
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
              <span>Vəziyyəti</span>
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
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === "all"}
                      onChange={() => handleConditionChange("all")}
                      className={styles.radioInput}
                    />
                    <span>Hamısı</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === "new"}
                      onChange={() => handleConditionChange("new")}
                      className={styles.radioInput}
                    />
                    <span>Yeni</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === "used"}
                      onChange={() => handleConditionChange("used")}
                      className={styles.radioInput}
                    />
                    <span>Sürülmüş</span>
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

export default MobileFilterOverlay;
