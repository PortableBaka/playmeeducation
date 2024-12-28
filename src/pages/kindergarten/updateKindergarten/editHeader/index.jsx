import React from "react";
import { Alert, Button, Popover } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatDate } from "../formatData";
import { useTranslation } from "react-i18next";

const UpdateHeader = ({
  updateKindergartenStatus,
  handleDeactivate,
  viewKindergartensData,
  open,
  hide,
  handleOpenChange,
  handleDelete,
}) => {
  const { t } = useTranslation();

  const formattedDate = FormatDate(viewKindergartensData?.created_at);
  return (
    <div className="header">
      <div className="editKindergartenContainer">
        <div className="headerBox">
          <div className="headerTitle">
            <Link to="/kindergartenTable" className="closePage">
              <IoMdClose />
            </Link>
            <h3 className="title">
              {t("kindergarten")}{" "}
              <span className="titleGray">
                {t("created")}
                {formattedDate}
              </span>
            </h3>
          </div>
          <div className="headerBtn">
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
                    <Button type="primary" onClick={handleDelete}>
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button icon={<FaRegTrashAlt />} danger></Button>
            </Popover>
            <Button onClick={handleDeactivate}>
              {updateKindergartenStatus.active
                ? t("deactivate")
                : t("activate")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHeader;
