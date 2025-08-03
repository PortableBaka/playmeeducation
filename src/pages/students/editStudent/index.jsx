import React, { useEffect, useState } from "react";
import { Button, Input, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import { retrieveGroupData, setSelectedGroup } from "../../../store/groupSlice";
import {
  deleteStudent,
  editStudentData,
  resetStatus,
  retrieveStudentsDataById,
} from "../../../store/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/skeleton";
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

const StudentsEdit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const birthdayMask = "0000-00-00";
  const Mask = [{ mask: birthdayMask }];

  const { studentById, status } = useSelector((state) => state.students);
  const { groups } = useSelector((state) => state.group);
  const [editFormData, setEditFormData] = useState(studentById);
  const [showExitModal, setShowExitModal] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    dispatch(
      retrieveStudentsDataById({
        studentId: id,
        branchId: localStorage.getItem("selectedBranchId"),
      })
    );
  }, [id, dispatch]);

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);

  useEffect(() => {
    if (studentById) {
      setEditFormData({
        ...studentById,
        phone_number: studentById.phone_number,
      });
      if (studentById?.photo) {
        setFileList([
          {
            uid: "-1",
            name: studentById.photo,
            status: "done",
            url: `path_to_your_file/${studentById.photo}`,
          },
        ]);
      }
    }
  }, [studentById]);

  const sendUploadRequest = async ({ file, onSuccess, onError }) => {
    try {
      const media_type = getMediaType(file);
      const result = await dispatch(
        createLibraryUploadFile({ file, media_type })
      ).then(() => {
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
          photo: filePath,
        }));
      });
    } catch (error) {
      onError(error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const handleSelectChange = (value) => {
    setEditFormData({
      ...editFormData,
      group_id: Number(value),
    });
    dispatch(
      setSelectedGroup(groups.find((group) => group.id === Number(value)))
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteStudent(studentById.id)).then(() => {
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

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudentData(editFormData)).then(() => {
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

  const handleConfirmExit = () => {
    setShowExitModal(false);
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

  return (
    <form className="editStudent" onSubmit={handleUpdateSubmit}>
      <EditHeader
        student={studentById}
        setShowExitModal={setShowExitModal}
        handleDelete={handleDelete}
      />
      <div className="container">
        <div className="formBox">
          <div className="inputBox">
            <label htmlFor="student_name" className="label">
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
                id="student_name"
                name="student_name"
                value={editFormData?.student_name || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    student_name: e.target.value,
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
          <div className="inputBox">
            <label htmlFor="group_select" className="label">
              {t("choose_group")}
            </label>
            {status === "loading" ? (
              <Skeleton
                className="skeleton"
                duration={0.75}
                width="100%"
                height={40}
              />
            ) : (
              <Select
                id="group_select"
                size="large"
                className="input"
                disabled={!groups || groups?.length < 0 ? true : false}
                value={editFormData?.group_id || undefined}
                onChange={handleSelectChange}
              >
                {groups.map((group) => (
                  <Select.Option key={group.id} value={group.id}>
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="parent_name" className="label">
              {t("fio_parent")}
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
                id="parent_name"
                name="parent_name"
                value={editFormData?.parent_name || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    parent_name: e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="inputBox formBox">
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
                className="inputPhone ant-input-lg ant-input"
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
            <label htmlFor="username" className="label">
              {t("login")}
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
                id="payment_amount"
                name="payment_amount"
                value={editFormData?.payment_amount || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    payment_amount: e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="username" className="label">
              {t("login")}
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
                id="username"
                name="username"
                value={editFormData?.username || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, username: e.target.value })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="password" className="label">
              {t("password")}
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
                id="password"
                name="password"
                value={editFormData?.password || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    password: e.target.value,
                  })
                }
              />
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

export default StudentsEdit;
