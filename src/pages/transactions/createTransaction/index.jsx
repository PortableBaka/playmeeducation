import React, { useEffect, useState } from "react";
import { Button, Input, Select, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import { retrieveGroupData, setSelectedGroup } from "../../../store/groupSlice";
import { months } from "./getMonth";
import {
  createStudentTransaction,
  resetStatus,
} from "../../../store/transactionSlice";
import { AdminType, UserType } from "../../../config";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import YearSelect from "./yearSelect";
import "./styles.sass";
import { useTranslation } from "react-i18next";
import { paymentTypes } from "../data";

const TransactionCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const birthdayMask = "0000-00-00";
  const Mask = [{ mask: birthdayMask }];
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const [form] = Form.useForm();
  const [showExitModal, setShowExitModal] = useState(false);
  const [_, setIsFormDirty] = useState(false);
  const [students, setStudents] = useState([]);
  const { Option } = Select;
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);

  const handleSelectChange = (value) => {
    form.setFieldsValue({ group_id: value });
    const selectedGroup = groups.find((group) => group.id === Number(value));
    dispatch(setSelectedGroup(selectedGroup));
    setStudents(selectedGroup.students || []);
    setIsFormDirty(true);
  };

  const handleSelectStudentChange = (value) => {
    form.setFieldsValue({ student_id: value });
    setIsFormDirty(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/transactions");
      navigate(0);
    } else {
      navigate("/branchAdminPage/transactions");
      navigate(0);
    }
  };

  const handleYearChange = (value) => {
    form.setFieldsValue({ payment_period_year: value });
  };

  const handleMonthChange = (value) => {
    form.setFieldsValue({ payment_period_month: value });
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleFinish = (values) => {
    const formValues = {
      ...values,
      payment_period_month: Number(values.payment_period_month),
      amount: 60000,
      branch_id: selectedBranchId,
    };

    dispatch(createStudentTransaction(formValues)).then(() => {
      dispatch(resetStatus());
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/transactions");
        navigate(0);
      } else {
        navigate("/branchAdminPage/transactions");
        navigate(0);
      }
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      className="createTransaction"
      layout="vertical"
    >
      <div className="header">
        <div className="kindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link
                className="closePage"
                to={
                  AdminType === UserType.KindergartenAdmin
                    ? "/kindergartenAdminLayout/transactions"
                    : "/branchAdminPage/transactions"
                }
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("transaction")}</h3>
            </div>
            <div className="headerBtn">
              <Button htmlType="submit" type="primary">
                {t("add")}
              </Button>
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
                name="group_id"
                label={t("group")}
                rules={[{ required: true, message: t("choose_group") }]}
              >
                <Select
                  size="large"
                  placeholder={t("choose_group")}
                  onChange={handleSelectChange}
                  disabled={!groups || groups?.length < 0 ? true : false}
                >
                  {groups.map((group) => (
                    <Select.Option key={group.id} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="colMax marginBottom"
                name="student_id"
                label={t("student")}
                rules={[{ required: true, message: t("choose_student") }]}
              >
                <Select
                  size="large"
                  placeholder={t("choose_student")}
                  onChange={handleSelectStudentChange}
                  disabled={!students || students?.length === 0 ? true : false}
                >
                  {students?.map((student) => (
                    <Select.Option key={student.id} value={student.id}>
                      {student?.student_name}
                    </Select.Option>
                  ))}
                </Select>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="date"
              label={t("transaction_date")}
              style={{ margin: 0 }}
              rules={[{ required: true, message: t("input_payment_date") }]}
            >
              <IMaskInput
                className="ant-input inputData"
                mask={Mask}
                maxLength={10}
                placeholder={`${t("e.g")}, 2020.04.12`}
                onAccept={(value) => form.setFieldsValue({ date: value })}
                onBlur={() => form.validateFields(["date"])}
              />
              <p className="messageText">{t("payment_date")}</p>
            </Form.Item>
            <Form.Item
              name="payment_type"
              label={t("payment_method")}
              rules={[{ required: true, message: t("choose_payment_method") }]}
            >
              <Select
                size="large"
                placeholder={t("payment_method")}
                onChange={(value) => form.setFieldValue("payment_type", value)}
              >
                {paymentTypes.map((paymentType) => (
                  <Select.Option
                    key={paymentType.value}
                    value={paymentType.value}
                  >
                    {paymentType.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="rowBox">
            <div className="colBox">
              <Form.Item
                className="colMin marginBottom"
                name="payment_period_year"
                label={t("year")}
                rules={[{ required: true, message: t("choose_year") }]}
              >
                <YearSelect yearsAhead={10} onChange={handleYearChange} />
              </Form.Item>
              <Form.Item
                className="colMax marginBottom"
                name="payment_period_month"
                label={t("month")}
                rules={[{ required: true, message: t("choose_month") }]}
              >
                <Select
                  placeholder={t("choose_month")}
                  size="large"
                  onChange={handleMonthChange}
                >
                  {months.map((month) => (
                    <Option key={month.value} value={month.value}>
                      {t("months." + month.label)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <p className="messageText">{t("payment_period_done")}</p>
          </div>
        </div>
      </div>

      <ExitModal
        description={t("sure_to_exit_message")}
        message={t("exit_message")}
        isOpen={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </Form>
  );
};

export default TransactionCreate;
