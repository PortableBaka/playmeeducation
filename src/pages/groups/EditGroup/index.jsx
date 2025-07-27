import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  editGroup,
  retrieveGroupDataById,
} from "../../../store/groupSlice";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveAllTeachersData } from "../../../store/employeesSlice";
import { AdminType, UserType } from "../../../config";
import { Skeleton } from "../../../components/skeleton";

import EditHeader from "./editHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import StudentsTable from "./studentTable";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const EditGroup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { groupDataById, status } = useSelector((state) => state?.group);
  const { allTeachers } = useSelector((state) => state.employee);
  const [editFormData, setEditFormData] = useState(groupDataById);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const name = groupDataById?.name;
  const studentsList = groupDataById?.students?.map((student) => ({
    ...student,
    name: name,
  }));
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    if (!groupDataById.length) {
      dispatch(retrieveAllTeachersData(selectedBranchId));
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(retrieveGroupDataById());
  }, [dispatch]);

  useEffect(() => {
    if (groupDataById) {
      setEditFormData(groupDataById);
    }
  }, [groupDataById]);

  useEffect(() => {
    if (id) {
      dispatch(retrieveGroupDataById(id));
    }
  }, []);

  const handleSelectChange = (value) => {
    setEditFormData({
      ...editFormData,
      employee_id: value,
    });
    setIsFormDirty(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleDelete = (groupId) => {
    dispatch(deleteGroup(groupId)).then(() => {
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/groups");
      } else {
        navigate("/branchAdminPage/groups");
      }
    });
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/groups");
    } else {
      navigate("/branchAdminPage/groups");
    }
  };

  const handleNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/kindergartenAdminLayout/groups");
      navigate(0);
    }
  };

  const handleBranchNavigation = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      setShowExitModal(true);
    } else {
      navigate("/branchAdminPage/groups");
      navigate(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editGroup(editFormData)).then(() => {
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/groups");
      } else {
        navigate("/branchAdminPage/groups");
      }
    });
  };

  return (
    <form className="editGroup" onSubmit={handleSubmit}>
      <EditHeader
        groups={groupDataById}
        handleDelete={handleDelete}
        handleNavigation={
          AdminType === UserType.KindergartenAdmin
            ? handleNavigation
            : handleBranchNavigation
        }
      />
      <div className="container">
        <div className="formBox">
          <div className="inputBox">
            <label htmlFor="name" className="label">
              {t("naming")}
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
                value={editFormData?.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />
            )}
          </div>
          <div className="inputBox">
            <label htmlFor="status" className="label">
              {t("educator")}
            </label>
            {allTeachers && allTeachers?.length > 0 ? (
              <Select
                placeholder={t("choose_educator")}
                size="large"
                className="input"
                style={{ width: "100%" }}
                value={editFormData?.employee?.name}
                onChange={handleSelectChange}
              >
                {allTeachers.map((teacher) => (
                  <Select.Option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <>
                <Select
                  placeholder={t("no_educator")}
                  size="large"
                  className="input"
                  disabled
                />
                <p className="messageText">{t("educator_select_message")}</p>
              </>
            )}
          </div>
        </div>
        <div className="formBox">
          <div className="studentsTitle">
            <h1 className="title">{t("students")}</h1>
          </div>
          {studentsList && studentsList?.length > 0 ? (
            <StudentsTable students={studentsList} />
          ) : (
            <EmptyBlock text={t("empty_students_by_group")} />
          )}
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

export default EditGroup;
