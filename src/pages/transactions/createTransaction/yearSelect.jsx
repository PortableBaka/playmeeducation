import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const YearSelect = ({ yearsAhead, onChange, disabled, placeholder }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year <= currentYear + yearsAhead; year++) {
    years.push(year);
  }

  return (
    <Select
      style={{ width: 200 }}
      placeholder={placeholder || t("choose_year")}
      onChange={onChange}
      disabled={disabled}
      size="large"
    >
      {years.map((year) => (
        <Option key={year} value={year}>
          {year}
        </Option>
      ))}
    </Select>
  );
};

export default YearSelect;
