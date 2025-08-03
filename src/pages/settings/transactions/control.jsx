import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Control = ({
  showModal,
  isEdit,
  values,
  handleEditEvent,
  handleCreateEvent,
  handleHideModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && values) {
      form.setFieldsValue(values);
    }
  }, [isEdit, values, form]);

  useEffect(() => {
    if (!showModal) {
      form.resetFields();
    }
  }, [showModal, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const data = {
        name: values.name,
        branch_id: localStorage.getItem("selectedBranchId"),
      };

      if (isEdit) {
        handleEditEvent({
          ...data,
          id: values.id,
        });
      } else {
        handleCreateEvent(data);
      }
    } catch (err) {
      toast.error(`Validation failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showModal}
      title={
        <div className="modal-header">
          <span>{isEdit ? t("edit") : t("add")}</span>
        </div>
      }
      onCancel={handleHideModal}
      footer={[
        <Button key="cancel" onClick={handleHideModal}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEdit ? t("edit") : t("add")}
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={t("name")}
          name="name"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder={t("name")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Control;
