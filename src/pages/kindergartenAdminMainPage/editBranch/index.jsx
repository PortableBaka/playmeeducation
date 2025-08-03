import React, { useEffect, useState } from "react";
import { Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveKindergartensById,
  updateKindergarden,
} from "../../../store/kindergartensSlice";
import { toast } from "react-toastify";
import { editBranch } from "../../../store/branchSlice";
import "./styles.sass";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const EditKindergartenAndBranchData = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { branchInfo } = useSelector((state) => state.kindergartens);
  const [editFormData, setEditFormData] = useState(branchInfo);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  useEffect(() => {
    dispatch(retrieveKindergartensById());
  }, [dispatch]);

  useEffect(() => {
    if (branchInfo) {
      const data = {
        ...branchInfo,
        phone_number: branchInfo.phone_number.slice(4),
        branches: branchInfo.branches.map((branch) => ({
          ...branch,
          phone_number: branch.phone_number.slice(4),
        })),
      };
      setEditFormData(data);
    }
  }, [branchInfo]);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateKindergarden({
        ...editFormData,
        phone_number: "+998" + editFormData.phone_number,
      })
    ).then(() => {
      toast.success(t("kindergarten_success_update"));
    });
  };

  const handleBranchSubmit = (e, id) => {
    e.preventDefault();
    const selectedBranch = editFormData.branches.find(
      (formData) => formData.id === id
    );

    dispatch(
      editBranch({
        ...selectedBranch,
        phone_number: "+998" + selectedBranch.phone_number,
      })
    ).then(() => {
      toast.success(t("branch_success_update"));
    });
  };

  return (
    <div className="editKindergartenAndBranchData">
      <div className="header">
        <div className="editKindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link
                to="/kindergartenAdminLayout/kindergartensAdminMainPage"
                className="closePage"
              >
                <IoMdClose />
              </Link>
              <h3 className="title">{t("settings")}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <form className="formBox" onSubmit={handleUpdateSubmit}>
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
              value={editFormData?.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
          </div>
          <div className="inputBox formBox">
            <label htmlFor="phone_number" className="label">
              {t("phone_number")}
            </label>
            <IMaskInput
              mask="+998 00 000-00-00"
              className="ant-input inputPhone"
              value={editFormData?.phone_number}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  phone_number: e.target.value,
                })
              }
              maxLength={17}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="file_name" className="label">
              {t("login")}
            </label>
            <Input
              size="large"
              className="input"
              type="text"
              id="file_name"
              name="file_name"
              placeholder={editFormData?.kindergarden_admin_username}
              disabled
            />
          </div>
          <div className="inputBox">
            <label htmlFor="kindergarden_admin_password" className="label">
              {t("password")}
            </label>
            <Input
              size="large"
              className="input"
              type="text"
              id="kindergarden_admin_password"
              name="kindergarden_admin_password"
              value={editFormData?.kindergarden_admin_password}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  kindergarden_admin_password: e.target.value,
                })
              }
            />
          </div>
          <Button htmlType="submit" type="primary">
            {t("save")}
          </Button>
        </form>
        <div className="formBox">
          <div className="branchTitle">
            <h1 className="title">{t("branches")}</h1>
          </div>
          {editFormData?.branches?.length > 0
            ? editFormData.branches.map((item, index) => {
                if (parseInt(selectedBranchId) === item.id) {
                  return (
                    <form
                      className="branchForm"
                      onSubmit={(e) => handleBranchSubmit(e, item.id)}
                      key={item.id}
                    >
                      <div className="formTitle">
                        <h2 className="title">
                          {t("branch")} {index + 1}
                        </h2>
                      </div>
                      <div className="inputBox">
                        <label
                          htmlFor={`branch-name-${item.id}`}
                          className="label"
                        >
                          {t("naming")}
                        </label>
                        <Input
                          size="large"
                          className="input"
                          type="text"
                          id={`branch-name-${item.id}`}
                          name="name"
                          value={item?.name}
                          onChange={(e) => {
                            const newBranches = editFormData.branches.map(
                              (branch, branchIndex) =>
                                branchIndex === index
                                  ? { ...branch, name: e.target.value }
                                  : branch
                            );
                            setEditFormData({
                              ...editFormData,
                              branches: newBranches,
                            });
                          }}
                        />
                      </div>
                      <div className="inputBox">
                        <label
                          htmlFor={`branch-phone_number-${item.id}`}
                          className="label"
                        >
                          {t("phone_number")}
                        </label>
                        <Space.Compact>
                          <IMaskInput
                            size="large"
                            mask="+998 00 000-00-00"
                            id={`branch-phone_number-${item.id}`}
                            name="phone_number"
                            className="ant-input inputPhone"
                            style={{
                              width: "100%",
                            }}
                            value={item?.phone_number}
                            onChange={(e) => {
                              const newBranches = editFormData.branches.map(
                                (branch, branchIndex) =>
                                  branchIndex === index
                                    ? {
                                        ...branch,
                                        phone_number: e.target.value,
                                      }
                                    : branch
                              );
                              setEditFormData({
                                ...editFormData,
                                branches: newBranches,
                              });
                            }}
                            maxLength={17}
                          />
                        </Space.Compact>
                      </div>
                      <div className="inputBox">
                        <label
                          htmlFor={`branch-location-${item.id}`}
                          className="label"
                        >
                          {t("location")}
                        </label>
                        <Input
                          size="large"
                          className="input"
                          type="text"
                          id={`branch-location-${item.id}`}
                          name="location"
                          value={item?.location}
                          onChange={(e) => {
                            const newBranches = editFormData.branches.map(
                              (branch, branchIndex) =>
                                branchIndex === index
                                  ? { ...branch, location: e.target.value }
                                  : branch
                            );
                            setEditFormData({
                              ...editFormData,
                              branches: newBranches,
                            });
                          }}
                        />
                      </div>
                      <Button htmlType="submit" type="primary">
                        {t("save")}
                      </Button>
                    </form>
                  );
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default EditKindergartenAndBranchData;
