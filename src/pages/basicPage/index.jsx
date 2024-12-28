import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveKindergartens,
  retrieveKindergartensSearch,
} from "../../store/kindergartensSlice";
import EmptyBlock from "./emptyBlock";
import BasicTable from "./basicTable";
import LayoutHeader from "../../components/layoutHeader";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const BasicPage = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const { kindergartens, loading, error, status } = useSelector(
    (state) => state?.kindergartens
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("#00000026");

  useEffect(() => {
    if (status === "idle") {
      dispatch(retrieveKindergartens());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(retrieveKindergartensSearch(searchTerm));
    } else {
      dispatch(retrieveKindergartens());
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (searchTerm && kindergartens.length === 0) {
      setInputBorderColor("#FF4D4F");
    } else {
      setInputBorderColor("#00000026");
    }
  }, [searchTerm, kindergartens]);

  const lastIndexPlusOne =
    kindergartens?.length > 0 ? kindergartens?.length : 1;
  const filteredData = kindergartens?.map(({ branches, ...rest }) => rest);

  return (
    <div className="contentContainer">
      <LayoutHeader
        title={t("kindergartens")}
        lastIndexPlusOne={lastIndexPlusOne}
        linkTo="/kindergarten/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {filteredData?.length === 0 ? (
          ""
        ) : (
          <Input
            size="large"
            placeholder={t("search_by_kindergarten")}
            prefix={<SearchOutlined className="searchIcon" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
          />
        )}
        {filteredData?.length === 0 ? (
          <EmptyBlock text={t("empty_kindergarten")} />
        ) : (
          <BasicTable data={filteredData} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

export default BasicPage;
