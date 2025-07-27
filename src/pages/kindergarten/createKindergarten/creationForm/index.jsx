import { Input, Space } from "antd";
import React from "react";
import "./styles.sass";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const CreationForm = ({
  viewKindergartensData,
  disabled,
  handleChange,
  errors,
  formData,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="kinderGartenForm">
      <div className="inputBox">
        <label htmlFor="name" className="label">
          {t("naming")}
        </label>
        <Input
          size="large"
          className="input"
          type="text"
          id="name"
          name="name"
          placeholder={
            viewKindergartensData
              ? viewKindergartensData?.name
              : `${t("e.g")}, Thompson`
          }
          value={formData?.name}
          onChange={handleChange}
          defaultValue={viewKindergartensData?.name}
          disabled={disabled}
        />
        {errors?.name && (
          <div className="inputErrorMessage">{errors?.name}</div>
        )}
      </div>
      <div className="inputBox">
        <label htmlFor="phone_number" className="label">
          {t("phone_number")}
        </label>
        <IMaskInput
          mask="+998 00 000-00-00"
          className="ant-input inputPhone"
          placeholder={t("phone_number_admin")}
          value={formData?.phone_number}
          onChange={(e) =>
            handleChange({
              ...formData,
              phone_number: e.target.value,
            })
          }
          maxLength={17}
        />
        {errors?.phone_number && (
          <div className="inputErrorMessage">{errors?.phone_number}</div>
        )}
      </div>
      <div className="inputBox">
        <label htmlFor="payment_amount" className="label">
          {t("payment_sum")}
        </label>
        <Input
          size="large"
          className="input"
          id="payment_amount"
          name="payment_amount"
          placeholder={
            viewKindergartensData ? viewKindergartensData?.payment_amount : "0"
          }
          value={formData?.payment_amount}
          onChange={handleChange}
          defaultValue={viewKindergartensData?.payment_amount}
          disabled={disabled}
        />
        {errors?.payment_amount && (
          <div className="inputErrorMessage">{errors?.payment_amount}</div>
        )}
      </div>
      <div className="inputBox">
        <label htmlFor="kindergarden_admin_usernam" className="label">
          {t("login")}
        </label>
        <Input
          size="large"
          className="input"
          id="kindergarden_admin_usernam"
          name="kindergarden_admin_username"
          placeholder={
            viewKindergartensData
              ? viewKindergartensData?.kindergarden_admin_username
              : `${t("e.g")}, Thompson_admin`
          }
          value={formData?.kindergarden_admin_username}
          onChange={handleChange}
          defaultValue={viewKindergartensData?.kindergarden_admin_username}
          disabled={disabled}
        />
        {errors?.kindergarden_admin_username && (
          <div className="inputErrorMessage">
            {errors?.kindergarden_admin_username}
          </div>
        )}
      </div>
      {formData?.kindergarden_admin_password ? (
        <div className="inputBox">
          <label htmlFor="kindergarden_admin_password" className="label">
            {t("password")}
          </label>
          <Input
            size="large"
            className="input"
            id="kindergarden_admin_password"
            name="kindergarden_admin_password"
            placeholder={
              viewKindergartensData
                ? viewKindergartensData?.kindergarden_admin_password
                : `${t("e.g")}, Thompson_2024`
            }
            value={formData?.kindergarden_admin_password}
            onChange={handleChange}
            defaultValue={viewKindergartensData?.kindergarden_admin_password}
            disabled={disabled}
          />
          {errors?.kindergarden_admin_password && (
            <div className="inputErrorMessage">
              {errors?.kindergarden_admin_password}
            </div>
          )}
        </div>
      ) : null}
    </form>
  );
};

export default CreationForm;
