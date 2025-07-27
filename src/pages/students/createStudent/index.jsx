import React, { useEffect, useState } from "react";
import { Button, Input, Select, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createLibraryUploadFile } from "../../../store/librarySlice";
import { resetStatus } from "../../../store/studentSlice";
import { IMaskInput } from "react-imask";
import { retrieveGroupData, setSelectedGroup } from "../../../store/groupSlice";
import { createStudentData } from "../../../store/studentSlice";
import { AdminType, UserType } from "../../../config";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";
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

const StudentsCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const birthdayMask = "0000-00-00";
  const Mask = [{ mask: birthdayMask }];
  const { groups } = useSelector((state) => state.group);
  const { isLoading } = useSelector((state) => state.library);
  const [form] = Form.useForm();
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);

  const handleSelectChange = (value) => {
    form.setFieldsValue({ group_id: value });
    dispatch(
      setSelectedGroup(groups.find((group) => group.id === Number(value)))
    );
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
      form.setFieldsValue({ photo: filePath });
    } catch (error) {
      onError(error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/students");
      navigate(0);
    } else {
      navigate("/branchAdminPage/students");
      navigate(0);
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleFinish = (values) => {
    const formValues = {
      ...values,
      phone_number: values.phone_number,
      branch_id: Number(localStorage.getItem("selectedBranchId")) || null,
      start_date: new Date().toISOString(),
    };

    dispatch(createStudentData(formValues)).then(() => {
      dispatch(resetStatus());
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/students");
        navigate(0);
      } else {
        navigate("/branchAdminPage/students");
        navigate(0);
      }
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      className="createStudent"
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
                    ? "/kindergartenAdminLayout/students"
                    : "/branchAdminPage/students"
                }
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("student")}</h3>
            </div>
            <div className="headerBtn">
              <Button htmlType="submit" type="primary" loading={isLoading}>
                {t("add")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="formBox">
          <Form.Item
            name="student_name"
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
            name="photo"
            style={{ width: "100%" }}
            label={
              <span>
                {t("photo")} <span className="optional">({t("optional")})</span>
              </span>
            }
          >
            <Upload
              name="photo"
              className="studentUpload"
              style={{ width: "100%" }}
              customRequest={sendUploadRequest}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            >
              <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                {t("upload")}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="group_id"
            label={t("choose_group")}
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
            name="parent_name"
            label={t("fio_parent")}
            rules={[{ required: true, message: t("input_parent_full_name") }]}
          >
            <Input
              size="large"
              placeholder={t("input_full_name")}
              onChange={() => setIsFormDirty(true)}
            />
          </Form.Item>

          <Form.Item
            name="phone_number"
            style={{ width: "100%" }}
            label={t("phone_number")}
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

          <Form.Item
            name="username"
            label={t("user_name")}
            rules={[{ required: true, message: t("input_user_name") }]}
          >
            <Input
              size="large"
              placeholder={t("input_user_name")}
              onChange={() => setIsFormDirty(true)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("password")}
            rules={[{ required: true, message: t("input_password") }]}
          >
            <Input
              size="large"
              type="password"
              placeholder={t("input_password")}
              onChange={() => setIsFormDirty(true)}
            />
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

export default StudentsCreate;
