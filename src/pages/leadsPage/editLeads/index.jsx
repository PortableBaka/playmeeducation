import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLead,
  editLeadData,
  retrieveLeadsDataById,
} from "../../../store/leadsSlice";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import EditHeader from "./editHeader";
import "./styles.sass";
import { AdminType, UserType } from "../../../config";
import { useTranslation } from "react-i18next";

const EditLeads = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateMask = "0000-00-00";
  const Mask = [{ mask: dateMask }];
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const { leadById } = useSelector((state) => state?.leads);

  useEffect(() => {
    dispatch(retrieveLeadsDataById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (leadById) {
      const formattedPhoneNumber = leadById.phone_number.startsWith("+998")
        ? leadById.phone_number.slice(4)
        : leadById.phone_number;

      form.setFieldsValue({
        ...leadById,
        phone_number: formattedPhoneNumber,
      });
    }
  }, [leadById, form]);

  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/leads");
    } else {
      navigate("/branchAdminPage/leads");
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteLead(leadById.id));
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/leads");
    } else {
      navigate("/branchAdminPage/leads");
    }
  };
  const handleFinish = (values) => {
    const updatedValues = {
      ...values,
      phone_number: `+998${values.phone_number}`,
      branch_id: selectedBranchId,
      id: leadById.id,
    };
    dispatch(editLeadData(updatedValues));
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/leads");
    } else {
      navigate("/branchAdminPage/leads");
    }
  };

  return (
    <Form
      form={form}
      className="editLead"
      layout="vertical"
      onFinish={handleFinish}
      onChange={handleInputChange}
    >
      <EditHeader
        lead={leadById}
        setShowExitModal={setShowExitModal}
        handleDelete={handleDelete}
      />
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
              onChange={handleInputChange}
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
            <Input
              addonBefore="+998"
              placeholder={t("another_parent_phone_number")}
              size="large"
              maxLength={9}
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
              <Select.Option key="insta" value="insta">
                insta
              </Select.Option>
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

export default EditLeads;
