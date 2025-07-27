import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveKindergartens } from "../../../store/kindergartensSlice";
import CreationForm from "../createKindergarten/creationForm";
import BranchForm from "../branchForm";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const ViewKindergarten = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { kindergartens, status } = useSelector(
    (state) => state?.kindergartens
  );

  const { t } = useTranslation();

  const viewKindergartensData = kindergartens.find((item) => +item?.id === +id);

  useEffect(() => {
    dispatch(retrieveKindergartens());
  }, [dispatch, status]);

  return (
    <form className="createKindergarten">
      <div className="header">
        <div className="kindergartenContainer">
          <div className="headerBox">
            <div className="headerTitle">
              <Link to="/kindergartenTable" className="closePage">
                <IoMdClose />
              </Link>
              <h3 className="title">{t("kindergarten")}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="kindergartenContainer">
          <CreationForm
            disabled={true}
            viewKindergartensData={viewKindergartensData}
          />
          <div className="branchContainer">
            <div className="branchHeader">
              {viewKindergartensData?.branches.length > 0 && (
                <div className="headerTitle">
                  <h4 className="title">{t("branches")}</h4>
                </div>
              )}
            </div>
            <div className="form-container">
              {viewKindergartensData?.branches?.map((item, index) => (
                <div className="form-wrapper">
                  <BranchForm
                    index={index + 1}
                    isFirstForm={index === 0}
                    branchData={item}
                    disabled={true}
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

export default ViewKindergarten;
