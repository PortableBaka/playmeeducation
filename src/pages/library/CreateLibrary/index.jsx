import { InboxOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AdminType, UserType } from "../../../config";
import { retrieveGroupData, setSelectedGroup } from "../../../store/groupSlice";
import {
  createLibraryData,
  createLibraryUploadFile,
} from "../../../store/librarySlice";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";

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

const getFileType = (file) => {
  const fileType = file.type;

  if (fileType.includes("pdf")) {
    return "pdf";
  } else if (fileType.includes("image")) {
    return "image";
  } else if (fileType.includes("audio")) {
    return "audio";
  } else if (fileType.includes("video")) {
    return "video";
  } else {
    return "unknown";
  }
};

const CreateLibrary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.group);
  const [visibility, setVisibility] = useState("Все");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [form] = Form.useForm();
  const [mediaType, setMediaType] = useState("image");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);

  const handleRadioChange = (e) => {
    setVisibility(e.target.value);
    setIsFormDirty(true);
  };

  const handleSelectChange = (value) => {
    form.setFieldsValue({ group_id: value });
    setIsFormDirty(true);
    dispatch(setSelectedGroup(groups.find((group) => group.id === value)));
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const draggerProperties = {
    name: "file",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      try {
        const media_type = getMediaType(file);
        setMediaType(getFileType(file));
        const response = await dispatch(
          createLibraryUploadFile({ file, media_type })
        );
        if (response?.meta?.requestStatus === "fulfilled") {
          onSuccess({ ...file, status: "done" });
          setUploadedFileName(file.name);
          message.success(`${file.name} file uploaded successfully.`);
        } else {
          onError(new Error("Upload failed"));
          message.error(`${file.name} file upload failed.`);
        }
      } catch (error) {
        onError(new Error("Upload failed"));
        message.error(`${file.name} file upload failed.`);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);

    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/libraryMainPage");
      navigate(0);
    } else {
      navigate("/branchAdminPage/libraryMainPage");
      navigate(0);
    }
  };

  const handleNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/kindergartenAdminLayout/libraryMainPage");
      navigate(0);
    }
  };

  const handleBranchNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/branchAdminPage/libraryMainPage");
      navigate(0);
    }
  };

  const handleSubmit = async (values) => {
    if (mediaType === "unknown") {
      message.error(`Unsupported media type: ${mediaType}.`);
      return;
    }
    const finalFormData = {
      ...values,
      title: values.naming,
      can_view: visibility === "Все" ? "all" : "group",
      branch_id: selectedBranchId,
      file_type: mediaType,
      file_name: uploadedFileName,
    };

    dispatch(createLibraryData(finalFormData)).then(() => {
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/libraryMainPage");
        navigate(0);
      } else {
        navigate("/branchAdminPage/libraryMainPage");
        navigate(0);
      }
    });
  };

  return (
    <Form
      form={form}
      className="createLibrary"
      layout="vertical"
      onFinish={handleSubmit}
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
              <h3 className="title">{t("material")}</h3>
            </div>
            <div className="headerBtn">
              <Button type="primary" htmlType="submit">
                {t("publish")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="formBox">
          <Form.Item>
            <Alert message={t("parent_info_message")} type="info" showIcon />
          </Form.Item>

          <Form.Item
            label={t("naming")}
            name="naming"
            rules={[{ required: true, message: t("input_name") }]}
          >
            <Input placeholder={t("input_name")} size="large" />
          </Form.Item>

          <Form.Item
            label={t("description")}
            name="description"
            rules={[{ required: true, message: t("input_description") }]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t("input_description")}
              size="large"
            />
          </Form.Item>

          <Form.Item label={t("who_will_see_post")}>
            <Radio.Group value={visibility} onChange={handleRadioChange}>
              <Radio.Button value="Все">{t("all")}</Radio.Button>
              <Radio.Button value={t("group")} disabled={!groups.length}>
                {t("group")}
              </Radio.Button>
            </Radio.Group>
            {visibility === t("group") && (
              <Form.Item
                label={t("choose_group")}
                name="group_id"
                rules={[{ required: true, message: t("choose_group") }]}
              >
                <Select
                  placeholder={t("choose_group")}
                  onChange={handleSelectChange}
                  size="large"
                >
                  {groups.map((group) => (
                    <Select.Option key={group.id} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form.Item>
        </div>

        <div className="formBox formFileBox">
          <h1 className="title">{t("files")}</h1>
          <Upload.Dragger {...draggerProperties}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t("upload_files")}</p>
            <p className="ant-upload-hint">{t("upload_files_message")}</p>
          </Upload.Dragger>
        </div>
      </div>
      {showExitModal && (
        <Modal
          visible={showExitModal}
          onCancel={handleCancelExit}
          footer={[
            <Button key="cancel" onClick={handleCancelExit}>
              {t("cancellation")}
            </Button>,
            <Button key="confirm" type="primary" onClick={handleConfirmExit}>
              {t("exit")}
            </Button>,
          ]}
        >
          <ExitModal />
        </Modal>
      )}
    </Form>
  );
};

export default CreateLibrary;
