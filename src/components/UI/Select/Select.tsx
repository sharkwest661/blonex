// src/components/UI/Select/Select.tsx
import React from "react";
import ReactSelect, {
  StylesConfig,
  Props as ReactSelectProps,
} from "react-select";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<ReactSelectProps, "onChange"> {
  options: SelectOption[];
  value?: SelectOption | null;
  defaultValue?: SelectOption | string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  variant?: "default" | "sort" | "filter";
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  className,
  placeholder = "Select an option",
  isSearchable = false,
  isClearable = false,
  isDisabled = false,
  variant = "default",
  ...props
}) => {
  // Handle default value - can be string or SelectOption
  const resolvedDefaultValue = React.useMemo(() => {
    if (!defaultValue) return undefined;

    if (typeof defaultValue === "string") {
      return options.find((option) => option.value === defaultValue) || null;
    }

    return defaultValue;
  }, [defaultValue, options]);

  // ✅ Complete CSS-in-JS styling - no more global selectors needed
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "44px",
      minWidth: variant === "filter" ? "100%" : "auto",
      height: variant === "sort" ? "44px" : "auto",
      border: state.isFocused
        ? "1px solid #013f44"
        : "1px solid rgba(1, 63, 68, 0.2)",
      borderRadius: "10px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(1, 63, 68, 0.2)" : "none",
      "&:hover": {
        borderColor: "rgba(1, 63, 68, 0.4)",
      },
      backgroundColor: "#ffffff",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#013f44" : "rgba(1, 63, 68, 0.7)",
      padding: variant === "sort" ? "0 8px" : "8px",
      transition: "color 0.2s ease",
      "&:hover": {
        color: "#013f44",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "rgba(1, 63, 68, 0.7)",
      "&:hover": {
        color: "#013f44",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#013f44"
        : state.isFocused
        ? "rgba(1, 63, 68, 0.1)"
        : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#013f44",
      padding: "8px 12px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: state.isSelected ? "500" : "400",
      "&:active": {
        backgroundColor: state.isSelected ? "#013f44" : "rgba(1, 63, 68, 0.2)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      marginTop: "4px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      borderRadius: "10px",
      border: "1px solid rgba(1, 63, 68, 0.1)",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      maxHeight: "200px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: variant === "sort" ? "0 8px" : "2px 8px",
      fontSize:
        variant === "sort" && window.innerWidth <= 768 ? "0.75rem" : "1rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#013f44",
      fontWeight: "500",
      fontSize:
        variant === "sort" && window.innerWidth <= 768 ? "0.75rem" : "1rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#808080",
      fontSize: "1rem",
      fontWeight: "400",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    input: (provided) => ({
      ...provided,
      color: "#013f44",
      fontSize: "1rem",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#808080",
      fontSize: "0.875rem",
      padding: "8px 12px",
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: "#808080",
      fontSize: "0.875rem",
      padding: "8px 12px",
    }),
  };

  // Handle selection change
  const handleChange = (option: any) => {
    if (onChange && option) {
      onChange(option.value);
    }
  };

  // Combine className with module styles
  const selectClassName = `${styles.select} ${styles[`select--${variant}`]} ${
    className || ""
  }`;

  return (
    <div className={selectClassName}>
      <ReactSelect
        options={options}
        value={value}
        defaultValue={resolvedDefaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        styles={customStyles}
        classNamePrefix="react-select"
        menuPlacement="auto"
        menuPosition="absolute"
        {...props}
      />
    </div>
  );
};

export default Select;
