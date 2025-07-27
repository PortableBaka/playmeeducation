import React, { useEffect, useState } from "react";
import { Alert, Button, Popover } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatDate } from "../../kindergarten/updateKindergarten/formatData";
import { Skeleton } from "../../../components/skeleton";
import { useTranslation } from "react-i18next";
import { AdminType, UserType } from "../../../config";

const EditHeader = ({ groups, handleDelete }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const [loadingDate, setLoadingDate] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (groups?.created_at) {
      const formatted = FormatDate(groups?.created_at);
      setFormattedDate(formatted);
      setLoadingDate(false);
    }
  }, [groups]);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onDeleteClick = (groupId) => {
    handleDelete(groupId);
  };
  return (
    <div className="header">
      <div className="editKindergartenContainer">
        <div className="headerBox">
          <div className="headerTitle">
            <Link
              className="closePage"
              to={
                AdminType === UserType.KindergartenAdmin
                  ? "/kindergartenAdminLayout/groups"
                  : "/branchAdminPage/groups"
              }
            >
              <IoMdClose />
            </Link>
            <h3 className="title">
              {t("group")}
              <span className="titleGray">
                &nbsp;{t("was_created_f")}&nbsp;
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
                      onClick={() => onDeleteClick(groups?.id)}
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
