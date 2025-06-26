import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
// TODO: Uncomment when store is implemented
// import { useFilterStore } from '@/stores/filterStore';
// import { useDebounce } from '@/hooks/useDebounce';

// Types
import type { Mark, Model, Color, FuelType, BodyType, City } from "@/types";

// Styles
import styles from "./VehicleFilterBar.module.scss";

interface VehicleFilterBarProps {
  className?: string;
}

export const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({
  className,
}) => {
  const router = useRouter();
  // TODO: Replace with actual store when implemented
  // const filterStore = useFilterStore();

  // Refs for dropdown elements
  const markDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const banDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Mobile dropdown refs
  const mark767DropdownRef = useRef<HTMLDivElement>(null);
  const model767DropdownRef = useRef<HTMLDivElement>(null);

  // State for all filter values
  const [selectedMark, setSelectedMark] = useState<Mark | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<FuelType | null>(
    null
  );
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType | null>(
    null
  );
  const [engineSizeRange, setEngineSizeRange] = useState({ min: "", max: "" });
  const [yearRange, setYearRange] = useState({ min: "", max: "" });
  const [selectedTransmission, setSelectedTransmission] = useState<
    string | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [carCondition, setCarCondition] = useState("all"); // 'all', 'new', 'used'
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string | null>(null);
  const [powerRange, setPowerRange] = useState({ min: "", max: "" });
  const [isCredit, setIsCredit] = useState(false);
  const [isBarter, setIsBarter] = useState(false);

  // UI state
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isMarkDropdownOpen, setIsMarkDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isBanDropdownOpen, setIsBanDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  // Mobile UI state
  const [isMark767Open, setIsMark767Open] = useState(false);
  const [isModel767Open, setIsModel767Open] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [markSearchTerm, setMarkSearchTerm] = useState("");
  const [modelSearchTerm, setModelSearchTerm] = useState("");

  // Mock data (replace with API calls)
  const [marks, setMarks] = useState<Mark[]>([
    { id: 1, name: "Mercedes", count: 5555 },
    { id: 2, name: "BMW", count: 2255 },
    { id: 3, name: "Audi", count: 11 },
    { id: 4, name: "Toyota", count: 5555 },
    { id: 5, name: "Honda", count: 2255 },
    { id: 6, name: "Lexus", count: 11 },
    { id: 7, name: "Volkswagen", count: 5555 },
    { id: 8, name: "Hyundai", count: 5555 },
  ]);

  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<Color[]>([
    { id: 1, name: "Ağ" },
    { id: 2, name: "Qara" },
    { id: 3, name: "Gümüşü" },
    { id: 4, name: "Boz" },
    { id: 5, name: "Qırmızı" },
    { id: 6, name: "Mavi" },
  ]);

  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([
    { id: 1, name: "Benzin" },
    { id: 2, name: "Dizel" },
    { id: 3, name: "Qaz" },
    { id: 4, name: "Elektrik" },
    { id: 5, name: "Hibrid" },
  ]);

  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([
    { id: 1, name: "Sedan" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Kupé" },
    { id: 4, name: "Pikap" },
    { id: 5, name: "Universal" },
  ]);

  const [cities, setCities] = useState<City[]>([
    { id: 1, name: "Bakı" },
    { id: 2, name: "Gəncə" },
    { id: 3, name: "Sumqayıt" },
    { id: 4, name: "Lənkəran" },
    { id: 5, name: "Şəki" },
  ]);

  const [transmissions, setTransmissions] = useState([
    { id: 1, name: "Avtomatik" },
    { id: 2, name: "Mexaniki" },
    { id: 3, name: "Robotlaşdırılmış" },
    { id: 4, name: "Variator" },
  ]);

  const [driveTypes, setDriveTypes] = useState([
    { id: 1, name: "Arxa" },
    { id: 2, name: "Ön" },
    { id: 3, name: "Tam" },
  ]);

  const [seatsCount, setSeatsCount] = useState([
    { id: 1, name: "2" },
    { id: 2, name: "4" },
    { id: 3, name: "5" },
    { id: 4, name: "7" },
    { id: 5, name: "8+" },
  ]);

  const [years, setYears] = useState<number[]>(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= 1960; i--) {
      yearsList.push(i);
    }
    return yearsList;
  });

  const [additionalFeatures, setAdditionalFeatures] = useState([
    { id: 1, name: "ABS" },
    { id: 2, name: "Lyuk" },
    { id: 3, name: "Yağış sensoru" },
    { id: 4, name: "Mərkəzi qapanma" },
    { id: 5, name: "Park radarı" },
    { id: 6, name: "Kondisioner" },
    { id: 7, name: "Oturacaqların isidilməsi" },
    { id: 8, name: "Dəri salon" },
  ]);

  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

  // Effects for handling dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle desktop dropdowns
      if (
        markDropdownRef.current &&
        !markDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMarkDropdownOpen(false);
      }

      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setIsModelDropdownOpen(false);
      }

      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsColorDropdownOpen(false);
      }

      if (
        banDropdownRef.current &&
        !banDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBanDropdownOpen(false);
      }

      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to load models when mark changes
  useEffect(() => {
    if (selectedMark) {
      // Replace with API call to get models based on mark
      const mockModels = [
        { id: 1, name: "C-Class" },
        { id: 2, name: "E-Class" },
        { id: 3, name: "S-Class" },
        { id: 4, name: "GLC" },
        { id: 5, name: "GLE" },
      ];
      setModels(mockModels);
    } else {
      setModels([]);
      setSelectedModel(null);
    }
  }, [selectedMark]);

  // Filter marks based on search
  const filteredMarks = marks.filter((mark) =>
    mark.name.toLowerCase().includes(markSearchTerm.toLowerCase())
  );

  // Filter models based on search
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(modelSearchTerm.toLowerCase())
  );

  // Handlers
  const handleResetFilters = () => {
    setSelectedMark(null);
    setSelectedModel(null);
    setPriceRange({ min: "", max: "" });
    setSelectedColor(null);
    setSelectedFuelType(null);
    setSelectedBodyType(null);
    setEngineSizeRange({ min: "", max: "" });
    setYearRange({ min: "", max: "" });
    setSelectedTransmission(null);
    setSelectedCity(null);
    setCarCondition("all");
    setMileageRange({ min: "", max: "" });
    setSelectedDrive(null);
    setSelectedSeats(null);
    setPowerRange({ min: "", max: "" });
    setIsCredit(false);
    setIsBarter(false);
    setSelectedFeatures([]);
  };

  const handleToggleExtraFilters = () => {
    setShowExtraFilters(!showExtraFilters);
  };

  const handleToggleFeature = (featureId: number) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(featureId)) {
        return prev.filter((id) => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const handleShowResults = () => {
    // Collect all active filters and navigate to results page
    const queryParams = new URLSearchParams();

    if (selectedMark) queryParams.append("mark", selectedMark.id.toString());
    if (selectedModel) queryParams.append("model", selectedModel.id.toString());
    if (priceRange.min) queryParams.append("priceMin", priceRange.min);
    if (priceRange.max) queryParams.append("priceMax", priceRange.max);
    if (selectedColor) queryParams.append("color", selectedColor.id.toString());
    if (selectedFuelType)
      queryParams.append("fuelType", selectedFuelType.id.toString());
    if (selectedBodyType)
      queryParams.append("bodyType", selectedBodyType.id.toString());
    if (engineSizeRange.min)
      queryParams.append("engineSizeMin", engineSizeRange.min);
    if (engineSizeRange.max)
      queryParams.append("engineSizeMax", engineSizeRange.max);
    if (yearRange.min) queryParams.append("yearMin", yearRange.min);
    if (yearRange.max) queryParams.append("yearMax", yearRange.max);
    if (selectedTransmission)
      queryParams.append("transmission", selectedTransmission);
    if (selectedCity) queryParams.append("city", selectedCity.id.toString());
    if (carCondition !== "all") queryParams.append("condition", carCondition);
    if (mileageRange.min) queryParams.append("mileageMin", mileageRange.min);
    if (mileageRange.max) queryParams.append("mileageMax", mileageRange.max);
    if (selectedDrive) queryParams.append("drive", selectedDrive);
    if (selectedSeats) queryParams.append("seats", selectedSeats);
    if (powerRange.min) queryParams.append("powerMin", powerRange.min);
    if (powerRange.max) queryParams.append("powerMax", powerRange.max);
    if (isCredit) queryParams.append("credit", "true");
    if (isBarter) queryParams.append("barter", "true");
    if (selectedFeatures.length > 0)
      queryParams.append("features", selectedFeatures.join(","));

    router.push(`/neqliyyat/results?${queryParams.toString()}`);
  };

  const toggleDateFilter = () => {
    setIsDateFilterOpen(!isDateFilterOpen);
  };

  return (
    <>
      <div className={clsx(styles.mainContainer, className)}>
        {/* Date filter overlay */}
        <div
          className={clsx(styles.dateFilterBg, {
            [styles.active]: isDateFilterOpen,
          })}
        ></div>
        <div
          className={clsx(styles.dateFilterOverlay, {
            [styles.active]: isDateFilterOpen,
          })}
        >
          <div className={styles.dateFilterHeader}>
            <div className={styles.dateFilterHeaderInner}>
              <div className={styles.dateFilterHeaderText}>Çeşidləmə</div>
              <div
                className={styles.dateFilterHeaderIcon}
                onClick={toggleDateFilter}
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
          </div>
          <div className={styles.dateFilterBody}>
            <a href="#">
              <div
                className={clsx(styles.dateFilterSelect, styles.selected)}
                data-id="date"
              >
                <div className={styles.dateFilterSelectName}>Tarixə görə</div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
            <a href="#">
              <div className={styles.dateFilterSelect} data-id="date">
                <div className={styles.dateFilterSelectName}>Əvvəlcə ucuz</div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
            <a href="#">
              <div className={styles.dateFilterSelect} data-id="date">
                <div className={styles.dateFilterSelectName}>
                  Əvvəlcə bahalı
                </div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
            <a href="#">
              <div className={styles.dateFilterSelect} data-id="date">
                <div className={styles.dateFilterSelectName}>Yürüş</div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
            <a href="#">
              <div className={styles.dateFilterSelect} data-id="date">
                <div className={styles.dateFilterSelectName}>Buraxılış ili</div>
                <span className={styles.dateFilterSelectRadio}></span>
              </div>
            </a>
          </div>
        </div>

        {/* Search section */}
        <section className="d-md-block" id="neql_search">
          <div className={styles.mainContainer}>
            <div className="container-fluid forpadding0">
              <div className="row" id="dekstop_search_bar_row">
                <div className={styles.mobxSearch} id="dekstop_search_bar">
                  <div className={styles.search}>
                    <form action="">
                      <div className={styles.searchGroup}>
                        <input
                          type="text"
                          className={styles.searchInput}
                          placeholder="bolbol axtar"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className={styles.searchAppend}>
                          <button
                            className={styles.searchBtn}
                            type="button"
                          ></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category title */}
        <h1 className={styles.titleCategory}>Nəqliyyat</h1>

        {/* Desktop filters */}
        <div className={styles.desctopFilters}>
          {/* Mark dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order1
            )}
          >
            <div
              className={styles.dropdown}
              ref={markDropdownRef}
              onClick={() => setIsMarkDropdownOpen(!isMarkDropdownOpen)}
            >
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedMark,
                })}
                data-value="marks"
              >
                {selectedMark ? selectedMark.name : "Marka"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <div
                className={clsx(styles.dropdownListHero, {
                  [styles.active]: isMarkDropdownOpen,
                })}
              >
                <div className={styles.search}>
                  <div className={styles.searchGroup}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Axtar"
                      value={markSearchTerm}
                      onChange={(e) => setMarkSearchTerm(e.target.value)}
                    />
                    <div className={styles.searchAppend}>
                      <button
                        className={styles.searchBtn}
                        type="button"
                      ></button>
                    </div>
                  </div>
                </div>
                <ul className={styles.dropdownList}>
                  {filteredMarks.map((mark) => (
                    <li
                      key={mark.id}
                      className={clsx(styles.dropdownItem, {
                        [styles.active]: selectedMark?.id === mark.id,
                      })}
                      onClick={() => setSelectedMark(mark)}
                    >
                      {mark.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Model dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order2
            )}
          >
            <div
              className={styles.dropdown}
              ref={modelDropdownRef}
              onClick={() =>
                selectedMark && setIsModelDropdownOpen(!isModelDropdownOpen)
              }
            >
              <button
                className={clsx(
                  styles.dropdownButton,
                  { [styles.active]: selectedModel },
                  { [styles.empty]: !selectedMark }
                )}
                data-value="models"
                id="models-btn"
              >
                {selectedModel ? selectedModel.name : "Model"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <ul
                className={clsx(styles.dropdownList, {
                  [styles.active]: isModelDropdownOpen,
                })}
                id="models"
              >
                {filteredModels.map((model) => (
                  <li
                    key={model.id}
                    className={clsx(styles.dropdownItem, {
                      [styles.active]: selectedModel?.id === model.id,
                    })}
                    onClick={() => setSelectedModel(model)}
                  >
                    {model.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price range */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthBig,
              styles.grow1,
              styles.order3
            )}
          >
            <div className={styles.unersalInputs}>
              <label htmlFor="price_input_min" data-value="price_value">
                <input
                  type="text"
                  id="price_input_min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
                <p>Qiymət, min</p>
              </label>
              <label htmlFor="price_input_max">
                <input
                  type="text"
                  id="price_input_max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
                <p>maks</p>
              </label>
            </div>
          </div>

          {/* Color dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthSmall,
              styles.grow1,
              styles.order4
            )}
            id="color_group"
          >
            <div
              className={styles.dropdown}
              ref={colorDropdownRef}
              onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
            >
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedColor,
                })}
                data-value="color"
                id="color_dekstop_btn"
              >
                {selectedColor ? selectedColor.name : "Rəng"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <div
                className={clsx(styles.dropdownListHero, {
                  [styles.active]: isColorDropdownOpen,
                })}
              >
                <ul className={styles.dropdownList}>
                  {colors.map((color) => (
                    <li
                      key={color.id}
                      className={clsx(styles.dropdownItem, {
                        [styles.active]: selectedColor?.id === color.id,
                      })}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Fuel type dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order5
            )}
          >
            <div className={styles.dropdown}>
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedFuelType,
                })}
                data-value="oil"
              >
                {selectedFuelType ? selectedFuelType.name : "Yanacaq növü"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <ul
                className={clsx(styles.dropdownList, { [styles.show]: false })}
              >
                {fuelTypes.map((fuelType) => (
                  <li
                    key={fuelType.id}
                    className={styles.dropdownItem}
                    onClick={() => setSelectedFuelType(fuelType)}
                  >
                    {fuelType.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Body type dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order6
            )}
            id="ban_group"
          >
            <div
              className={styles.dropdown}
              ref={banDropdownRef}
              onClick={() => setIsBanDropdownOpen(!isBanDropdownOpen)}
            >
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedBodyType,
                })}
                data-value="ban"
              >
                {selectedBodyType ? selectedBodyType.name : "Ban Növü"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <div
                className={clsx(styles.dropdownListHero, {
                  [styles.active]: isBanDropdownOpen,
                })}
              >
                <ul className={styles.dropdownList}>
                  {bodyTypes.map((bodyType) => (
                    <li
                      key={bodyType.id}
                      className={clsx(styles.dropdownItem, {
                        [styles.active]: selectedBodyType?.id === bodyType.id,
                      })}
                      onClick={() => setSelectedBodyType(bodyType)}
                    >
                      {bodyType.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Engine size range */}
          <div
            className={clsx(
              styles.litrGroup,
              styles.forWidthBig,
              styles.grow1,
              styles.order7
            )}
          >
            <div className={styles.formGroup}>
              <div className={styles.dropdown}>
                <button
                  className={clsx(styles.dropdownButton, {
                    [styles.active]: engineSizeRange.min,
                  })}
                  data-value="minLitr"
                >
                  {engineSizeRange.min || "Həcm (sm"}
                  <sup>3</sup>
                  {"), min"}
                </button>
                <i
                  className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
                ></i>
                <ul
                  className={clsx(styles.dropdownList, {
                    [styles.show]: false,
                  })}
                  id="minLitr"
                >
                  {[
                    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
                  ].map((size) => (
                    <li
                      key={size}
                      className={styles.dropdownItem}
                      onClick={() =>
                        setEngineSizeRange({
                          ...engineSizeRange,
                          min: size.toString(),
                        })
                      }
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.dropdown}>
                <button
                  className={clsx(styles.dropdownButton, {
                    [styles.active]: engineSizeRange.max,
                  })}
                  data-value="maxLitr"
                >
                  {engineSizeRange.max || "maks"}
                </button>
                <i
                  className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
                ></i>
                <ul
                  className={clsx(styles.dropdownList, {
                    [styles.show]: false,
                  })}
                >
                  {[
                    1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500,
                    6000,
                  ].map((size) => (
                    <li
                      key={size}
                      className={styles.dropdownItem}
                      onClick={() =>
                        setEngineSizeRange({
                          ...engineSizeRange,
                          max: size.toString(),
                        })
                      }
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Year range */}
          <div
            className={clsx(
              styles.yearGroup,
              styles.forWidthSmall,
              styles.grow1,
              styles.order8
            )}
          >
            <div className={styles.formGroup}>
              <div className={styles.dropdown}>
                <button
                  className={clsx(styles.dropdownButton, {
                    [styles.active]: yearRange.min,
                  })}
                  data-value="minYear"
                >
                  {yearRange.min || "İl, min"}
                </button>
                <i
                  className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
                ></i>
                <ul
                  className={clsx(styles.dropdownList, {
                    [styles.show]: false,
                  })}
                >
                  {years.map((year) => (
                    <li
                      key={year}
                      className={styles.dropdownItem}
                      onClick={() =>
                        setYearRange({ ...yearRange, min: year.toString() })
                      }
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.dropdown}>
                <button
                  className={clsx(styles.dropdownButton, {
                    [styles.active]: yearRange.max,
                  })}
                  data-value="maxYear"
                >
                  {yearRange.max || "maks"}
                </button>
                <i
                  className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
                ></i>
                <ul
                  className={clsx(styles.dropdownList, {
                    [styles.show]: false,
                  })}
                >
                  {years.map((year) => (
                    <li
                      key={year}
                      className={styles.dropdownItem}
                      onClick={() =>
                        setYearRange({ ...yearRange, max: year.toString() })
                      }
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Transmission dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order9
            )}
          >
            <div className={styles.dropdown}>
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedTransmission,
                })}
                data-value="speed"
              >
                {selectedTransmission || "Sürətlər qutusu"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <ul
                className={clsx(styles.dropdownList, { [styles.show]: false })}
              >
                {transmissions.map((item) => (
                  <li
                    key={item.id}
                    className={styles.dropdownItem}
                    onClick={() => setSelectedTransmission(item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* City dropdown */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order10
            )}
          >
            <div
              className={styles.dropdown}
              ref={cityDropdownRef}
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            >
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedCity,
                })}
                data-value="city"
              >
                {selectedCity ? selectedCity.name : "Şəhər"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <div
                className={clsx(styles.dropdownListHero, {
                  [styles.active]: isCityDropdownOpen,
                })}
              >
                <ul className={styles.dropdownList}>
                  {cities.map((city) => (
                    <li
                      key={city.id}
                      className={clsx(styles.dropdownItem, {
                        [styles.active]: selectedCity?.id === city.id,
                      })}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Car condition radio buttons */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthBig,
              styles.grow1,
              styles.order11
            )}
          >
            <div className={styles.forCar}>
              <div className={styles.allCar}>
                <input
                  type="radio"
                  name="ggg"
                  checked={carCondition === "all"}
                  onChange={() => setCarCondition("all")}
                />
                <label>Hamısı</label>
              </div>
              <div className={styles.newCar}>
                <input
                  type="radio"
                  name="ggg"
                  checked={carCondition === "new"}
                  onChange={() => setCarCondition("new")}
                />
                <label>Yeni</label>
              </div>
              <div className={styles.oldCar}>
                <input
                  type="radio"
                  name="ggg"
                  checked={carCondition === "used"}
                  onChange={() => setCarCondition("used")}
                />
                <label>Sürülmüş</label>
              </div>
            </div>
          </div>

          {/* Mileage range */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthSmall,
              styles.grow1,
              styles.order12
            )}
            id="speed_form"
          >
            <div className={styles.unersalInputs}>
              <label htmlFor="mileage_input_min">
                <input
                  type="text"
                  id="mileage_input_min"
                  value={mileageRange.min}
                  onChange={(e) =>
                    setMileageRange({ ...mileageRange, min: e.target.value })
                  }
                />
                <p>Yürüş, min</p>
              </label>
              <label htmlFor="mileage_input_max">
                <input
                  type="text"
                  id="mileage_input_max"
                  value={mileageRange.max}
                  onChange={(e) =>
                    setMileageRange({ ...mileageRange, max: e.target.value })
                  }
                />
                <p>maks</p>
              </label>
            </div>
          </div>

          {/* Drive type dropdown - conditionally displayed */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order13,
              { [styles.dnone]: !showExtraFilters }
            )}
            id="box_group"
          >
            <div className={styles.dropdown}>
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedDrive,
                })}
                data-value="box"
              >
                {selectedDrive || "Ötürücü"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <ul
                className={clsx(styles.dropdownList, { [styles.show]: false })}
              >
                {driveTypes.map((item) => (
                  <li
                    key={item.id}
                    className={styles.dropdownItem}
                    onClick={() => setSelectedDrive(item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Seats count dropdown - conditionally displayed */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidth20,
              styles.grow1,
              styles.order14,
              { [styles.dnone]: !showExtraFilters }
            )}
            id="place_group"
          >
            <div className={styles.dropdown}>
              <button
                className={clsx(styles.dropdownButton, {
                  [styles.active]: selectedSeats,
                })}
                data-value="place"
              >
                {selectedSeats || "Yerlərin sayı"}
              </button>
              <i
                className={clsx("fa-solid fa-angle-down", styles.dropArrow)}
              ></i>
              <ul
                className={clsx(styles.dropdownList, { [styles.show]: false })}
              >
                {seatsCount.map((item) => (
                  <li
                    key={item.id}
                    className={styles.dropdownItem}
                    onClick={() => setSelectedSeats(item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Power range - conditionally displayed */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthBig,
              styles.grow1,
              styles.order15,
              { [styles.dnone]: !showExtraFilters }
            )}
            id="power_group"
          >
            <div className={styles.unersalInputs}>
              <label htmlFor="power_input_min">
                <input
                  type="text"
                  id="power_input_min"
                  value={powerRange.min}
                  onChange={(e) =>
                    setPowerRange({ ...powerRange, min: e.target.value })
                  }
                />
                <p>Güc, min</p>
              </label>
              <label htmlFor="power_input_max">
                <input
                  type="text"
                  id="power_input_max"
                  value={powerRange.max}
                  onChange={(e) =>
                    setPowerRange({ ...powerRange, max: e.target.value })
                  }
                />
                <p>maks</p>
              </label>
            </div>
          </div>

          {/* Credit and barter checkboxes - conditionally displayed */}
          <div
            className={clsx(
              styles.formGroup,
              styles.forWidthSmall,
              styles.grow1,
              styles.dFlex,
              styles.order16,
              { [styles.dnone]: !showExtraFilters }
            )}
            id="kredit"
          >
            <div className={styles.forCredit}>
              <div className={styles.barter}>
                <input
                  type="checkbox"
                  name="kred"
                  id="kredit_checkbox"
                  checked={isCredit}
                  onChange={() => setIsCredit(!isCredit)}
                />
                <label>Kredit</label>
              </div>
              <div className={styles.credit}>
                <input
                  type="checkbox"
                  name="kred"
                  id="barter_checkbox"
                  checked={isBarter}
                  onChange={() => setIsBarter(!isBarter)}
                />
                <label>Barter</label>
              </div>
            </div>
          </div>

          {/* Additional features section */}
          <div
            className={clsx(styles.additionalChekingsHero, styles.order17, {
              [styles.show]: showExtraFilters,
            })}
          >
            <p className={styles.additionalChekingsTitle}>
              Avtomobilin təchizatı
            </p>
            <div className={styles.additionalChekings}>
              {additionalFeatures.map((feature) => (
                <div key={feature.id} className={styles.additionalCheckingItem}>
                  <input
                    type="checkbox"
                    id={`feature-${feature.id}`}
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => handleToggleFeature(feature.id)}
                  />
                  <label htmlFor={`feature-${feature.id}`}>
                    {feature.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter action buttons */}
        <div className={styles.descFiltersBtns}>
          <button
            className={styles.filterResetBtn}
            onClick={handleResetFilters}
          >
            Sıfırla
          </button>
          <button
            className={styles.filterElseBtn}
            onClick={handleToggleExtraFilters}
          >
            <p>Daha çox filtr</p>
            <i
              className={clsx(
                "fa-solid",
                showExtraFilters ? "fa-chevron-up" : "fa-chevron-down"
              )}
            ></i>
          </button>
          <div className={styles.filterShowBtn} onClick={handleShowResults}>
            Elanları göstər
          </div>
        </div>
      </div>

      {/* Mobile view components */}
      <div className={styles.mainContainer}>
        {/* Mark selector for mobile */}
        <div className={styles.after767}>
          <div
            id="mark767_show_btn"
            className={styles.mark767ShowBtn}
            onClick={() => setIsMark767Open(true)}
          >
            <div className={styles.mark767ShowBtnTitle}>
              <i className="fa-solid fa-car"></i>
              <p>Bütün markalar</p>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>

        {/* Mobile mark/model display */}
        <div className={styles.neqliyyat767}>
          <div
            className={clsx(styles.afterMark767, {
              [styles.active]: selectedMark,
            })}
            onClick={() => setIsMark767Open(true)}
            id="afterMark767"
          >
            <label className={styles.markLabel767} id="markLabel767">
              Marka
            </label>
            <p className={styles.checkedMark767} id="checkedMark767">
              {selectedMark?.name || ""}
            </p>
            <i
              className={clsx("fa-solid fa-chevron-down", styles.markArrowDown)}
              id="mark_arrow_down"
            ></i>
            {selectedMark && (
              <i
                className={clsx(
                  "fa-solid fa-circle-xmark",
                  styles.markResetXmark
                )}
                id="mark_reset_xmark"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMark(null);
                  setSelectedModel(null);
                }}
              ></i>
            )}
          </div>
          <div
            className={clsx(
              styles.afterModel767,
              { [styles.active]: selectedModel },
              { [styles.disabled]: !selectedMark }
            )}
            id="afterModel767"
            onClick={() => selectedMark && setIsModel767Open(true)}
          >
            <label className={styles.modelLabel767} id="modelLabel767">
              Model
            </label>
            <p className={styles.checkedModel767} id="checkedModel767">
              {selectedModel?.name || ""}
            </p>
            <i
              className={clsx(
                "fa-solid fa-chevron-down",
                styles.modelArrowDown
              )}
              id="model_arrow_down"
            ></i>
            {selectedModel && (
              <i
                className={clsx(
                  "fa-solid fa-circle-xmark",
                  styles.modelResetXmark
                )}
                id="model_reset_xmark"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModel(null);
                }}
              ></i>
            )}
          </div>
        </div>

        {/* Mobile filter buttons */}
        <div className={styles.filters767}>
          <div className={styles.filters767Inner}>
            <Link href="/filters.html">
              <i className="fa-solid fa-arrow-down-short-wide"></i>
              <p>Filtrlər</p>
            </Link>
          </div>
          <div
            className={styles.filters767Inner}
            id="filter_date"
            onClick={toggleDateFilter}
          >
            <a href="#">
              <i className="fa-solid fa-arrow-down-z-a"></i>
              <p>Tarixə görə</p>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile mark dropdown */}
      <div
        className={clsx(styles.mark767Dropdown, {
          [styles.active]: isMark767Open,
        })}
        id="mark767_dropdown"
      >
        <div className={styles.mark767Header}>
          <i
            className="fa-solid fa-arrow-left"
            id="markCloseBtn767"
            onClick={() => setIsMark767Open(false)}
          ></i>
          <h3>Marka</h3>
        </div>
        <div className={styles.search}>
          <div className={styles.searchGroup}>
            <input
              type="text"
              className={styles.searchInput}
              id="markInput767"
              placeholder="Axtar"
              value={markSearchTerm}
              onChange={(e) => setMarkSearchTerm(e.target.value)}
            />
            <div className={styles.searchAppend}>
              <button className={styles.searchBtn} type="button"></button>
            </div>
          </div>
        </div>
        <ul className={styles.selectBoxList} id="carMarks767">
          {filteredMarks.map((mark) => (
            <li
              key={mark.id}
              className={clsx(styles.selectBoxItem, {
                [styles.active]: selectedMark?.id === mark.id,
              })}
              onClick={() => {
                setSelectedMark(mark);
                setIsMark767Open(false);
              }}
            >
              {mark.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile model dropdown */}
      <div
        className={clsx(styles.model767Dropdown, {
          [styles.active]: isModel767Open,
        })}
        id="model767_dropdown"
      >
        <div className={styles.model767Header}>
          <i
            className="fa-solid fa-arrow-left"
            id="modelCloseBtn767"
            onClick={() => setIsModel767Open(false)}
          ></i>
          <h3>Model</h3>
        </div>
        <div className={styles.search}>
          <div className={styles.searchGroup}>
            <input
              type="text"
              className={styles.searchInput}
              id="modelInput767"
              placeholder="Axtar"
              value={modelSearchTerm}
              onChange={(e) => setModelSearchTerm(e.target.value)}
            />
            <div className={styles.searchAppend}>
              <button className={styles.searchBtn} type="button"></button>
            </div>
          </div>
        </div>
        <ul className={styles.selectBoxList} id="carModel767">
          {filteredModels.map((model) => (
            <li
              key={model.id}
              className={clsx(styles.selectBoxItem, {
                [styles.active]: selectedModel?.id === model.id,
              })}
              onClick={() => {
                setSelectedModel(model);
                setIsModel767Open(false);
              }}
            >
              {model.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands section */}
      <section className={styles.markSection}>
        <div className={styles.mainContainer}>
          <div className="container-fluid">
            <div className={styles.brands}>
              <div className={styles.brandsHeading}>
                <h2 className="mb-0">Markalar</h2>
                <Link href="">Bütün markalar</Link>
              </div>
              <div className={styles.brandsGrid}>
                {marks.slice(0, 8).map((mark) => (
                  <Link href="" key={mark.id} className={styles.brandsItem}>
                    {mark.name}
                    <span>{mark.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehicleFilterBar;
