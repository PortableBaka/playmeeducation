import React, { useEffect, useState } from "react";
import { Button, Input, Select, Form, Alert, Popover } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import {
  deleteTransaction,
  resetStatus,
  retrieveTransactionDataById,
} from "../../../store/transactionSlice";
import { AdminType, UserType } from "../../../config";
import "./styles.sass";
import YearSelect from "../createTransaction/yearSelect";
import { months } from "../createTransaction/getMonth";
import { FaRegTrashAlt } from "react-icons/fa";
import { retrieveGroupData } from "../../../store/groupSlice";
import { useTranslation } from "react-i18next";

const TransactionCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const birthdayMask = "0000-00-00";
  const Mask = [{ mask: birthdayMask }];

  const transactionById = useSelector(
    (state) => state?.transaction?.transactionById
  );
  const { groups } = useSelector((state) => state.group);

  const [isFormDirty] = useState(false);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(retrieveTransactionDataById(id));
  }, []);
  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);
  useEffect(() => {
    if (transactionById) {
      form.setFieldsValue({
        ...transactionById,
      });
    }
  }, [transactionById, form]);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
    } else {
      navigate("/kindergartenAdminLayout/transactions");
      navigate(0);
    }
  };
  const handleBranchNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
    } else {
      navigate("/branchAdminPage/transactions");
      navigate(0);
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(id));
    dispatch(resetStatus());
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/transactions");
    } else {
      navigate("/branchAdminPage/transactions");
    }
  };

  return (
    <Form form={form} className="createTransaction" layout="vertical">
      <div className="header">
        <div className="kindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link
                className="closePage"
                onClick={
                  AdminType === UserType.KindergartenAdmin
                    ? handleNavigation
                    : handleBranchNavigation
                }
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("transaction")}</h3>
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
                        {t("cancel")}
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
      <div className="container">
        <div className="formBox">
          <div className="rowBox">
            <div className="colBox">
              <Form.Item
                className="colMin marginBottom"
                label={t("group")}
                rules={[{ required: true, message: t("choose_group") }]}
              >
                <Select
                  size="large"
                  placeholder={
                    groups.find(
                      (group) => group.id === form.getFieldValue("group_id")
                    )?.name
                  }
                  disabled
                />
              </Form.Item>
              <Form.Item
                className="colMax marginBottom"
                label={t("student")}
                rules={[{ required: true, message: t("choose_student") }]}
              >
                <Select
                  size="large"
                  placeholder={form.getFieldValue("student_name")}
                  disabled
                />
              </Form.Item>
            </div>
            <p className="messageText">{t("transaction_made_by_student")}</p>
          </div>
          <Form.Item
            name="amount"
            style={{ margin: 0 }}
            label={t("payment_sum")}
          >
            <Input disabled placeholder="60000" size="large" />
          </Form.Item>
          <Form.Item
            label={t("transaction_date")}
            style={{ margin: 0 }}
            rules={[{ required: true, message: t("input_payment_date") }]}
          >
            <IMaskInput
              className="ant-input inputData"
              mask={Mask}
              maxLength={10}
              placeholder={form.getFieldValue("date")}
              disabled
            />
            <p className="messageText">{t("payment_date")}</p>
          </Form.Item>
          <div className="rowBox">
            <div className="colBox">
              <Form.Item
                className="colMin marginBottom"
                label={t("year")}
                rules={[{ required: true, message: t("choose_year") }]}
              >
                <YearSelect
                  placeholder={form.getFieldValue("payment_period_year")}
                  disabled
                  yearsAhead={10}
                />
              </Form.Item>
              <Form.Item
                className="colMax marginBottom"
                label={t("month")}
                rules={[{ required: true, message: t("choose_month") }]}
              >
                <Select
                  placeholder={t(
                    "months." +
                      months.find(
                        (month) =>
                          +month.value ===
                          form.getFieldValue("payment_period_month")
                      )?.label
                  )}
                  size="large"
                  disabled
                />
              </Form.Item>
            </div>
            <p className="messageText">{t("payment_period_done")}</p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default TransactionCreate;
