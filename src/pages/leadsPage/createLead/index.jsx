import React, { useState } from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { createLead } from "../../../store/leadsSlice";
import { AdminType, UserType } from "../../../config";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const CreateLeads = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const dateMask = "0000-00-00";
  const Mask = [{ mask: dateMask }];
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/leads");
      navigate(0);
    } else {
      navigate("/branchAdminPage/leads");
      navigate(0);
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/kindergartenAdminLayout/leads");
      navigate(0);
    }
  };

  const handleBranchNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/branchAdminPage/leads");
      navigate(0);
    }
  };

  const handleFinish = (values) => {
    const formValues = {
      ...values,
      phone_number: `${values.phone_number}`,
      branch_id: selectedBranchId,
    };
    dispatch(createLead(formValues)).then(() => {
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/leads");
        navigate(0);
      } else {
        navigate("/branchAdminPage/leads");
        navigate(0);
      }
    });
  };

  const coming_channels = [
    "instgram_target",
    "youtube",
    "telegram",
    "facebook",
    "with_friends",
  ];

  return (
    <Form
      form={form}
      className="createLead"
      layout="vertical"
      onFinish={handleFinish}
      onChange={handleInputChange}
    >
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
              <h3 className="title">{t("lead")}</h3>
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
          <Form.Item
            label={t("fio")}
            name="student_name"
            rules={[{ required: true, message: t("input_fio_student") }]}
          >
            <Input placeholder={`${t("e.g")}, Мухаммад`} size="large" />
          </Form.Item>

          <Form.Item
            name="birth_date"
            label={t("birth_date")}
            rules={[{ required: true, message: t("input_birth_date") }]}
          >
            <IMaskInput
              className="ant-input inputData"
              mask={Mask}
              maxLength={10}
              placeholder={`${t("e.g")}, 2020.04.12`}
              onChange={() => setIsFormDirty(true)}
            />
          </Form.Item>

          <Form.Item
            label={t("fio_parent")}
            name="parent_name"
            rules={[{ required: true, message: t("fio") }]}
          >
            <Input placeholder={`${t("e.g")}, Мухаммад`} size="large" />
          </Form.Item>

          <Form.Item
            label={t("parent_phone_number")}
            name="phone_number"
            rules={[{ required: true, message: t("input_phone_number") }]}
          >
            <IMaskInput
              mask={"+998 00 000-00-00"}
              className="ant-input inputData"
              placeholder={t("another_parent_phone_number")}
              size="large"
              maxLength={17}
            />
          </Form.Item>

          <Form.Item label={t("status")} name="status" initialValue="начало">
            <Radio.Group>
              <Radio.Button value="начало">{t("initial_status")}</Radio.Button>
              <Radio.Button value="в процессе">{t("in_proccess")}</Radio.Button>
              <Radio.Button value="финиш успешный">
                {t("status_success")}
              </Radio.Button>
              <Radio.Button value="финиш нет">{t("fail_status")}</Radio.Button>
              <Radio.Button value="уточнить">
                {t("clarify_status")}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={t("comment")} name="comment">
            <Input.TextArea
              placeholder={t("comment_lead")}
              rows={4}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t("arrival_channel")}
            name="arrival_channel"
            rules={[{ required: true, message: t("choose_arrival_channel") }]}
          >
            <Select placeholder={t("choose_group")} size="large">
              {coming_channels.map((channel) => (
                <Select.Option key={channel} value={channel}>
                  {t(channel)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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

export default CreateLeads;
