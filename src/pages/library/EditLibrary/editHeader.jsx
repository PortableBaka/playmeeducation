import { Alert, Button, Popover } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatDate } from "../../kindergarten/updateKindergarten/formatData";

const EditHeader = ({ libraryDataById, setShowExitModal, handleDelete }) => {
  const { t } = useTranslation();

  console.log(libraryDataById)

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const formattedDate = FormatDate(libraryDataById?.publication_date);
  return (
    <div className="header">
      <div className="editKindergartenContainer">
        <div className="headerBox">
          <div className="headerTitle">
            <Link className="closePage" onClick={() => setShowExitModal(true)}>
              <IoMdClose />
            </Link>
            <h3 className="title">
              {t("material")}
              <span className="titleGray">
                {" "}
                {t("created")} {formattedDate}
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
                    <Button type="primary" onClick={(e) => handleDelete(e, libraryDataById?.id)}>
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button icon={<FaRegTrashAlt />} danger></Button>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
