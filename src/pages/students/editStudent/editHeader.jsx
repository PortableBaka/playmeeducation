import React, { useEffect, useState } from "react";
import { Alert, Button, Popover } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FormatDate } from "../../kindergarten/updateKindergarten/formatData";
import { Skeleton } from "../../../components/skeleton";
import { useTranslation } from "react-i18next";

const EditHeader = ({ student, setShowExitModal, handleDelete }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const [loadingDate, setLoadingDate] = useState(true);
  const [formattedDate, setFormattedDate] = useState(0);

  useEffect(() => {
    if (student?.start_date) {
      const formatted = FormatDate(student?.start_date);
      setFormattedDate(formatted);
      setLoadingDate(false);
    }
  }, [student]);

  const onDeleteClick = (event, student) => {
    handleDelete(event, student);
  };
  return (
    <div className="header">
      <div className="editKindergartenContainer">
        <div className="headerBox">
          <div className="headerTitle">
            <div className="closePage" onClick={() => setShowExitModal(true)}>
              <IoMdClose />
            </div>
            <h3 className="title">
              {t("student")}
              <span className="titleGray">
                &nbsp;{t("was_created")}&nbsp;
                {loadingDate ? <Skeleton width={100} /> : `${formattedDate}`}
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
                    <Button
                      type="primary"
                      onClick={(e) => onDeleteClick(e, student?.id)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              }
            >
              <Button icon={<FaRegTrashAlt />} danger></Button>
            </Popover>
            <Button htmlType="submit" type="primary">
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
