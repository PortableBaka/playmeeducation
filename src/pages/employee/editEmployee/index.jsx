import React, { useEffect, useState } from "react";
import { Button, Input, Radio, message, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/skeleton";
import {
  deleteEmployee,
  retrieveEmployeeDataById,
  editEmployee,
  resetStatus,
} from "../../../store/employeesSlice"; // Added editEmployeeData
import { AdminType, UserType } from "../../../config";
import { createLibraryUploadFile } from "../../../store/librarySlice";
import EditHeader from "./editHeader";
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

const EditEmployee = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const birthdayMask = "0000-00-00";
  const Mask = [{ mask: birthdayMask }];

  const { employeeDataId, status } = useSelector((state) => state.employee);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const [editFormData, setEditFormData] = useState(employeeDataId);
  const [showExitModal, setShowExitModal] = useState(false);
  const [visibility, setVisibility] = useState(editFormData?.employee_type);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(retrieveEmployeeDataById({ employeeId: id, selectedBranchId }));
  }, [id]);

  useEffect(() => {
    if (employeeDataId) {
      setEditFormData({
        ...employeeDataId,
        phone_number: employeeDataId.phone_number.slice(4),
      });
      if (employeeDataId?.file_upload) {
        setFileList([
          {
            uid: "-1",
            name: employeeDataId.file_upload,
            status: "done",
            url: `path_to_your_file/${employeeDataId.file_upload}`,
          },
        ]);
      }
    }
  }, [employeeDataId]);

  const sendUploadRequest = async ({ file, onSuccess, onError }) => {
    try {
      const media_type = getMediaType(file);
      const result = await dispatch(
        createLibraryUploadFile({ file, media_type })
      );
      const filePath = result.payload.file_path;

      onSuccess(filePath, file);
      message.success(`${file.name} file uploaded successfully`);

      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);

      setEditFormData((prevFormData) => ({
        ...prevFormData,
        file_upload: filePath,
      }));
    } catch (error) {
      onError(error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const handleEmployeeTypeChange = (e) => {
    const newEmployeeType = e.target.value;
    setVisibility(newEmployeeType);
    setEditFormData({
      ...editFormData,
      employee_type: newEmployeeType,
    });
  };

  const handleDelete = (e, employeeId) => {
    e.preventDefault();
    dispatch(deleteEmployee({ employeeId, selectedBranchId }));
    dispatch(resetStatus());
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/employees");
    } else {
      navigate("/branchAdminPage/employees");
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editEmployee({
        editFormData: {
          ...editFormData,
          phone_number: editFormData.phone_number,
        },
        selectedBranchId,
      })
    ).then(() => {
      dispatch(resetStatus());
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/employees");
      } else {
        navigate("/branchAdminPage/employees");
      }
    });
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    dispatch(resetStatus());
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/employees");
    } else {
      navigate("/branchAdminPage/employees");
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <form className="editEmployee" onSubmit={handleUpdateSubmit}>
      <EditHeader
        student={employeeDataId}
        setShowExitModal={setShowExitModal}
        handleDelete={handleDelete}
      />
      <div className="container">
        <div className="formBox">
          <div className="inputBox">
            <label htmlFor="name" className="label">
              {t("fio")}
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <Input
                size="large"
                className="input"
                type="text"
                id="name"
                name="name"
                value={editFormData?.name || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="employee_type" className="label">
              {t("type")}
            </label>
            <Radio.Group
              name="employee_type"
              value={editFormData?.employee_type || ""}
              onChange={handleEmployeeTypeChange}
            >
              <Radio.Button value="teacher">{t("teacher")}</Radio.Button>
              <Radio.Button value="educator">{t("educator")}</Radio.Button>
              <Radio.Button value="staff">{t("other")}</Radio.Button>
            </Radio.Group>
            {visibility === "staff" && (
              <div className="inputBox">
                <label htmlFor="employee_type_name" className="label">
                  {t("naming")}
                </label>
                <Input
                  size="large"
                  value={editFormData?.employee_type_name || ""}
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      employee_type_name: e.target.value,
                    });
                  }}
                />
              </div>
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="phone_number" className="label">
              {t("parent_phone_number")}
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <IMaskInput
                mask={"+998 00 000-00-00"}
                className="ant-input inputPhone"
                placeholder={t("another_parent_phone_number")}
                size="large"
                maxLength={17}
                value={editFormData?.phone_number || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    phone_number: e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="birth_date" className="label">
              {t("birth_date")}
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <IMaskInput
                name="birth_date"
                className="input inputPhone"
                placeholder={`${t("e.g")}, 2020.04.12`}
                mask={Mask}
                maxLength={10}
                value={editFormData?.birth_date || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    birth_date: e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="hire_date" className="label">
              {t("hiring_date")}
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <IMaskInput
                name="hire_date"
                className="input inputPhone"
                placeholder={`${t("e.g")}, 2020.04.12`}
                mask={Mask}
                maxLength={10}
                value={editFormData?.hire_date || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    hire_date: e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="photo" className="label">
              {t("photo")}
              <span className="optional"> ({t("optional")})</span>
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <Upload
                name="photo"
                className="studentUpload"
                fileList={fileList}
                customRequest={sendUploadRequest}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              >
                <Button icon={<UploadOutlined />}>{t("upload")}</Button>
              </Upload>
            )}
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
    </form>
  );
};

export default EditEmployee;
