import React, { useState } from "react";
import { Button, Input, Radio, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createLibraryUploadFile } from "../../../store/librarySlice";
import { IMaskInput } from "react-imask";
import { createEmployeeData } from "../../../store/employeesSlice";
import { resetStatus } from "../../../store/employeesSlice";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";
import { AdminType, UserType } from "../../../config";
import { useTranslation } from "react-i18next";

const getMediaType = (file) => {
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    return "images";
  } else if (fileType.startsWith("video/")) {
    return "videos";
  } else if (fileType.startsWith("audio/")) {
    return "audios";
  } else {
    return "documents";
  }
};

const EmployeeCreate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateMask = "0000-00-00";
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const [visibility, setVisibility] = useState("teacher");
  const [form] = Form.useForm();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const sendUploadRequest = async ({ file, onSuccess, onError }) => {
    try {
      const media_type = getMediaType(file);
      const result = await dispatch(
        createLibraryUploadFile({ file, media_type })
      );
      const filePath = result.payload.file_path;

      onSuccess(filePath, file);
      message.success(`${file.name} file uploaded successfully`);
      form.setFieldsValue({ file_upload: filePath });
    } catch (error) {
      onError(error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const uploadStatus = {
    onChange({ file }) {
      if (file.status === "done") {
      } else if (file.status === "error") {
        console.error(`File upload failed: ${file.error.message}`);
      }
    },
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/employees");
    } else {
      navigate("/branchAdminPage/employees");
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setVisibility(value);
    setIsFormDirty(true);
  };

  const handleSubmit = (values) => {
    const formValues = {
      ...values,
      phone_number: values.phone_number,
      start_date: new Date().toISOString(),
      branch_id: selectedBranchId,
    };
    dispatch(createEmployeeData({ formData: formValues })).then(() => {
      dispatch(resetStatus());
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/employees");
      } else {
        navigate("/branchAdminPage/employees");
      }
    });
  };

  return (
    <Form
      form={form}
      className="createEmployee"
      onFinish={handleSubmit}
      onValuesChange={handleInputChange}
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
                    ? "/kindergartenAdminLayout/employees"
                    : "/branchAdminPage/employees"
                }
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("employee")}</h3>
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
            name="name"
            label={t("fio")}
            rules={[{ required: true, message: t("input_full_name") }]}
          >
            <Input
              size="large"
              placeholder={t("input_full_name")}
              onChange={() => setIsFormDirty(true)}
            />
          </Form.Item>

          <Form.Item
            name="employee_type"
            label={t("type")}
            initialValue={visibility}
          >
            <Radio.Group onChange={handleRadioChange}>
              <Radio.Button value="teacher">{t("teacher")}</Radio.Button>
              <Radio.Button value="educator">{t("educator")}</Radio.Button>
              <Radio.Button value="staff">{t("other")}</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {visibility === "staff" && (
            <Form.Item
              name="employee_type_name"
              label={t("naming")}
              rules={[{ required: true, message: t("input_another_name") }]}
            >
              <Input
                name="employee_type_name"
                size="large"
                placeholder={t("input_another_name")}
              />
            </Form.Item>
          )}

          <Form.Item
            name="phone_number"
            label={t("parent_phone_number")}
            rules={[{ required: true, message: t("input_phone_number") }]}
          >
            <IMaskInput
              mask={"+998 00 000-00-00"}
              className="ant-input inputPhone"
              placeholder={t("another_parent_phone_number")}
              size="large"
              maxLength={17}
            />
          </Form.Item>

          <Form.Item
            name="hire_date"
            label={t("birth_date")}
            className="inputBox"
            size="large"
            rules={[{ required: true, message: t("input_birth_date") }]}
          >
            <IMaskInput
              className="input inputPhone"
              size="large"
              placeholder={`${t("e.g")}, 2020.04.15`}
              mask={dateMask}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="birth_date"
            className="inputBox"
            size="large"
            label={t("hiring_date")}
            rules={[{ required: true, message: "Введите дату найма" }]}
          >
            <IMaskInput
              className="input inputPhone"
              size="large"
              placeholder={`${t("e.g")}, 2020.04.15`}
              mask={dateMask}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="file_upload"
            style={{ width: "100%" }}
            label={
              <p>
                {t("photo")} <span className="optional">({t("optional")})</span>
              </p>
            }
          >
            <Upload
              name="photo"
              className="studentUpload"
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              customRequest={sendUploadRequest}
              {...uploadStatus}
              style={{ width: "100%" }}
            >
              <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                {t("upload")}
              </Button>
            </Upload>
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

export default EmployeeCreate;
