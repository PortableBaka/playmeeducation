import { Alert, Button, Input, Popover, Space } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const BranchForm = ({
  index,
  isFirstForm,
  branchFormData,
  handleChange,
  branchData,
  disabled,
}) => {
  const { t } = useTranslation();
  const firstInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (firstInputRef.current && isFirstForm) {
      firstInputRef.current.focus();
    }
  }, [isFirstForm]);

  return (
    <div className="branchBox">
      <div className="branchFormHeader">
        <div className="headerTitle">
          <h2 className="title">
            {t("branch")} {index}
          </h2>
        </div>
        <div className="headerSubtitle">
          {isFirstForm && branchFormData && branchFormData.length > 0 && (
            <h3 className="subtitle">{t("required_branch_message")}</h3>
          )}
          {!isFirstForm && (
            <Popover
              placement="bottom"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              content={
                <div className="deletePopover">
                  <Alert
                    message={t("delete_alert_message")}
                    banner
                    className="deleteAlert"
                  />
                  <div className="btnGroup">
                    <Button onClick={hide}>{t("cancel")}</Button>
                    <Button type="primary" onClick={hide}>
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              }
            >
              {branchFormData && branchFormData.length > 0 && (
                <Button icon={<FaRegTrashAlt />} danger>
                  {t("delete")}
                </Button>
              )}
            </Popover>
          )}
        </div>
      </div>
      <div className="createBranchForm">
        <div className="createBranchContainer">
          <div className="branchInputBox">
            <label className="label">{t("name")}</label>
            <Input
              size="large"
              ref={firstInputRef}
              className="input"
              name="branch_name"
              placeholder={
                branchData?.name
                  ? branchData?.name
                  : `${t("e.g")},, Thompson Novza`
              }
              defaultValue={branchData?.branch_name}
              value={branchFormData?.branch_name}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
          <div className="branchInputBox">
            <label htmlFor="" className="label">
              {t("phone_number")}
            </label>
            <Space.Compact>
              <Input
                size="large"
                addonBefore="+998"
                className="input"
                name="phone_number"
                placeholder={
                  branchData?.phone_number
                    ? branchData?.phone_number
                    : t("phone_number_admin")
                }
                defaultValue={branchData?.phone_number}
                value={branchFormData?.phone_number}
                onChange={handleChange}
                disabled={disabled}
              />
            </Space.Compact>
          </div>
          <div className="branchInputBox">
            <label className="label">
              {t("location")}
              <span className="optional">({t("optional")})</span>
            </label>
            <Input
              size="large"
              className="input"
              name="location"
              placeholder={
                branchData?.location
                  ? branchData?.location
                  : `${t("e.g")}, Аккурган 14`
              }
              defaultValue={branchData?.location}
              value={branchFormData?.location}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          {isFirstForm && branchFormData && branchFormData.length > 0 && (
            <Alert
              className="formInfoAlert"
              description={t("login_passsword_alert_message")}
              type="info"
              showIcon
            />
          )}
          <div className="branchInputBox">
            <label htmlFor="" className="label">
              {t("login")}
              <span className="optional">({t("optional")})</span>
            </label>
            <Input
              size="large"
              className="input"
              name="branch_admin_username"
              placeholder={
                branchData?.branch_admin_username
                  ? branchData?.branch_admin_username
                  : `${t("e.g")}, Thompson_admin`
              }
              defaultValue={branchData?.branch_admin_username}
              value={branchFormData?.branch_admin_username}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
          {branchFormData ? (
            <div className="branchInputBox">
              <label htmlFor="" className="label">
                {t("password")}
                <span className="optional">({t("optional")})</span>
              </label>
              <Input
                size="large"
                className="input"
                name="branch_admin_password"
                placeholder={
                  branchData?.branch_admin_password
                    ? branchData?.branch_admin_password
                    : `${t("e.g")}, Thompson_2024`
                }
                defaultValue={branchData?.branch_admin_password}
                value={branchFormData?.branch_admin_password}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BranchForm;
