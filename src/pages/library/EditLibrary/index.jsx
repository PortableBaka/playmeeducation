import { Input, Radio, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdminType, UserType } from "../../../config";
import { retrieveGroupData } from "../../../store/groupSlice";
import {
  deleteLibrary,
  retrieveLibraryDataById,
} from "../../../store/librarySlice";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import EditHeader from "./editHeader";
import "./styles.sass";

const EditLibrary = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { groups } = useSelector((state) => state?.group);
  const { libraryDataById, status } = useSelector((state) => state?.library);
  const libraryId = libraryDataById?.id; 
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [groups, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        retrieveLibraryDataById({
          libraryId: id,
          branchId: localStorage.getItem("selectedBranchId"),
        })
      );
    }
  }, [status, dispatch]);

  const handleConfirmExit = () => {
    setShowExitModal(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/libraryMainPage");
    } else {
      navigate("/branchAdminPage/libraryMainPage");
    }
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteLibrary(libraryId));
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/libraryMainPage");
    } else {
      navigate("/branchAdminPage/libraryMainPage");
    }
  };

  const fileList = libraryDataById?.file_name
    ? [
        {
          uid: "-1",
          name: libraryDataById.file_name,
          status: "done",
          url: `path_to_your_file/${libraryDataById.file_name}`, // replace with the actual file URL if available
        },
      ]
    : [];

  return (
    <form className="editLibrary">
      <EditHeader
        libraryDataById={libraryDataById}
        handleDelete={handleDelete}
        setShowExitModal={setShowExitModal}
      />
      <div className="container">
        <div className="formBox">
          <div className="inputBox">
            <label htmlFor="file_name" className="label">
              {t("naming")}
            </label>
            <Input
              size="large"
              className="input"
              type="text"
              id="file_name"
              name="file_name"
              value={libraryDataById?.file_name}
              disabled
            />
          </div>
          <div className="inputBox">
            <label htmlFor="description" className="label">
              {t("description")}
            </label>
            <TextArea
              rows={4}
              className="input"
              type="text"
              id="description"
              name="description"
              value={libraryDataById?.description}
              disabled
            />
          </div>
          <div className="inputBox">
            <label htmlFor="status" className="label">
              {t("who_will_see_post")}
            </label>
            <Radio.Group name="status" disabled>
              <Radio.Button value="Все">{t("all")}</Radio.Button>
              <Radio.Button disabled value={t("group")}>
                {t("group")}
              </Radio.Button>
            </Radio.Group>
          </div>
          <div
            className={`inputBox groupSelectContainer ${
              libraryDataById?.can_view === "group" ? "visible" : ""
            }`}
          >
            {libraryDataById?.can_view === "group" && (
              <>
                <label htmlFor="group_select" className="label">
                  {t("choose_group")}
                </label>
                <Select
                  id="group_select"
                  size="large"
                  placeholder={t("choose_group")}
                  className="input"
                  value={libraryDataById?.group?.name}
                  disabled
                >
                  {groups.map((group) => (
                    <Select.Option key={group.id} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
                <p className="radioText">{t("children_will_see_posts")}</p>
              </>
            )}
          </div>
        </div>
        <div className="formBox formFileBox">
          <div className="formFileTitle">
            <h1 className="title">{t("files")}</h1>
          </div>
          <Upload fileList={fileList} listType="text" disabled />
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

export default EditLibrary;
