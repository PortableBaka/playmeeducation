import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select } from "antd";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { createGroupData, retrieveGroupData } from "../../../store/groupSlice";
import { retrieveAllTeachersData } from "../../../store/employeesSlice";
import { AdminType, UserType } from "../../../config";
import EmptyBlock from "../../basicPage/emptyBlock";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const CreateGroup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const { allTeachers } = useSelector((state) => state.employee);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const [_, setIsFormDirty] = useState(false);
  const initialFormData = {
    name: "",
    employee_id: 0,
    branch_id: 0,
    created_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    dispatch(retrieveAllTeachersData(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      branch_id: selectedBranchId,
    }));
  }, [selectedBranchId]);

  useEffect(() => {
    if (!groups.length) {
      dispatch(retrieveGroupData());
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsFormDirty(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setIsFormDirty(false);
    if (AdminType === UserType.KindergartenAdmin) {
      navigate("/kindergartenAdminLayout/groups");
      navigate(0);
    } else {
      navigate("/branchAdminPage/groups");
      navigate(0);
    }
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      employee_id: value,
    });
    setIsFormDirty(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      branch_id: selectedBranchId,
    };
    dispatch(createGroupData(updatedFormData)).then(() => {
      if (AdminType === UserType.KindergartenAdmin) {
        navigate("/kindergartenAdminLayout/groups");
        navigate(0);
      } else {
        navigate("/branchAdminPage/groups");
        navigate(0);
      }
    });
  };

  return (
    <form className="createGroup" onSubmit={handleSubmit}>
      <div className="header">
        <div className="kindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link
                className="closePage"
                to={
                  AdminType === UserType.KindergartenAdmin
                    ? "/kindergartenAdminLayout/groups"
                    : "/branchAdminPage/groups"
                }
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("group")}</h3>
            </div>
            <div className="headerBtn">
              <Button htmlType="submit" type="primary">
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="formBox">
          <div className="inputBox">
            <label htmlFor="name" className="label">
              {t("naming")}
            </label>
            <Input
              size="large"
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder={`${t("e.g")}, Ясли`}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="status" className="label">
              {t("educator")}
            </label>
            {allTeachers || allTeachers?.length > 0 ? (
              <Select
                placeholder={t("choose_educator")}
                size="large"
                className="input"
                style={{ width: "100%" }}
                value={allTeachers?.name}
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
          <EmptyBlock text={t("empty_students_by_group")} />
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

export default CreateGroup;
