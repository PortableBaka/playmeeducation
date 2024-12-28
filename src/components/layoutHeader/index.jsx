import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./styles.sass";
import { Skeleton } from "../skeleton";

const LayoutHeader = ({
  title,
  isLoading,
  lastIndexPlusOne,
  btnText,
  linkTo,
}) => {
  return (
    <div className="contentHeading">
      <div className="headingTitle">
        <h1 className="title">
          {title}{" "}
          {isLoading ? (
            <Skeleton duration={0.75} width="30px" />
          ) : (
            <span className="titleCount">{lastIndexPlusOne}</span>
          )}
        </h1>
      </div>
      <Link to={linkTo} className="headingBtn">
        <Button type="primary">{btnText}</Button>
      </Link>
    </div>
  );
};

export default LayoutHeader;
