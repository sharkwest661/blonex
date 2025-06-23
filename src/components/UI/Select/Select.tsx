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

  // Custom styles for react-select
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "44px",
      height: variant === "sort" ? "44px" : "auto",
      border: "none",
      borderRadius: "10px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(1, 63, 68, 0.2)" : "none",
      "&:hover": {
        border: "none",
      },
      backgroundColor: "#ffffff",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#013f44",
      padding: variant === "sort" ? "0 8px" : provided.padding,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(255, 230, 0, 0.3)"
        : state.isFocused
        ? "rgba(255, 230, 0, 0.15)"
        : "white",
      color: "#013f44",
      padding: "8px 12px",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "rgba(255, 230, 0, 0.3)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      marginTop: "4px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: variant === "sort" ? "0 8px" : provided.padding,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#013f44",
      fontWeight: 500,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#808080",
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
        {...props}
      />
    </div>
  );
};

export default Select;
