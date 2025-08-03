import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { FormatPhoneNumber } from "../formatData";
import "./styles.sass";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const EditForm = ({
  handleUpdateSubmit,
  formData,
  errors,
  handleEditFromData,
  editFormData,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleUpdateSubmit} className="kinderGartenForm">
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
          onChange={handleEditFromData}
          value={editFormData?.name}
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
          mask="+998 (00) 000-00-00"
          maxLength={17}
          size="large"
          className="ant-input inputPhone"
          id="phone_number"
          name="phone_number"
          value={editFormData?.phone_number}
          onChange={handleEditFromData}
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
          value={editFormData?.payment_amount}
          onChange={handleEditFromData}
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
          value={editFormData?.kindergarden_admin_username}
          onChange={handleEditFromData}
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
            value={editFormData?.kindergarden_admin_password}
            onChange={handleEditFromData}
          />
          {errors?.kindergarden_admin_password && (
            <div className="inputErrorMessage">
              {errors?.kindergarden_admin_password}
            </div>
          )}
        </div>
      ) : null}
      <div className="inputBox">
        <Button htmlType="submit" type="primary">
          {t("save")}
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
