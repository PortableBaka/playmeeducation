import { Alert, Button, Input, Popover, Space } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const UpdateBranchForm = ({ index, isFirstForm, branchFormData }) => {
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
    <form className="branchBox">
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
            <label className="label">{t("naming")}</label>
            <Input
              size="large"
              ref={firstInputRef}
              className="input"
              name="branch_name"
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
                maxLength={9}
              />
            </Space.Compact>
          </div>
          <div className="branchInputBox">
            <label className="label">
              {t("location")}
              <span className="optional">({t("optional")})</span>
            </label>
            <Input size="large" className="input" name="location" />
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
              />
            </div>
          ) : null}
          <div className="branchInputBox">
            <Button htmlType="submit" type="primary">
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateBranchForm;
