import React, { useRef, useState } from "react";

import "./styles.sass";
import { Link } from "react-router-dom";
import { Button } from "antd";
import CreationForm from "../../kindergarten/createKindergarten/creationForm";
import { addForm } from "../../kindergarten/createKindergarten/addForm";
import BranchForm from "../../kindergarten/branchForm";
import ExitModal from "../../kindergarten/createKindergarten/modalBox";
import { IoMdClose } from "react-icons/io";
import { PlusOutlined } from "@ant-design/icons";

const KindergartenAdminUpdatePage = () => {
  const [forms, setForms] = useState([0]);
  const formRefs = useRef([]);
  const [branchFormDataArray, setBranchFormDataArray] = useState([
    {
      branch_name: "",
      location: "",
      phone_number: "",
      branch_admin_username: "",
      branch_admin_password: "",
      kindergarden_id: "",
    },
  ]);
  const handleBranchChange = (e, index) => {
    const updatedBranchData = branchFormDataArray.map((branch, i) =>
      i === index ? { ...branch, [e.target.name]: e.target.value } : branch
    );
    setBranchFormDataArray(updatedBranchData);
  };
  return (
    <form className="createKindergarten">
      <div className="header">
        <div className="kindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link to="/kindergartenTable" className="closePage">
                <IoMdClose />
              </Link>
              <h3 className="title">{t("settings")}</h3>
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
        <div className="kindergartenContainer">
          <CreationForm />
          <div className="branchContainer">
            <div className="branchHeader">
              <div className="headerTitle">
                <h4 className="title">{t("branches")}</h4>
              </div>
              <div className="headerBtn">
                <Button
                  className="btn"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    addForm(setForms, formRefs, setBranchFormDataArray)
                  }
                >
                  {t("add")}
                </Button>
              </div>
            </div>
            <div className="form-container">
              {forms.map((formIndex) => (
                <div
                  className="form-wrapper"
                  key={formIndex}
                  ref={(el) => (formRefs.current[formIndex] = el)}
                >
                  <BranchForm
                    handleChange={(e) => handleBranchChange(e, formIndex)}
                    index={formIndex + 1}
                    isFirstForm={formIndex === 0}
                    branchFormData={branchFormDataArray[formIndex]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default KindergartenAdminUpdatePage;
