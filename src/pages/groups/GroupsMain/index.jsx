import React, { useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { retrieveGroupData } from "../../../store/groupSlice";
import LayoutHeader from "../../../components/layoutHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import "./styles.sass";
import GroupsTable from "../GroupsTable";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { GetBasicTableColumns } from "../GroupsTable/getBasicTableColumns";
import { useTranslation } from "react-i18next";

const GroupMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { groups, status } = useSelector((state) => state.group);
  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("");

  const filterData = (groups, searchTerm) => {
    if (!searchTerm) return groups;
    return groups.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const searchFilteredData = useMemo(
    () => filterData(groups, searchTerm),
    [groups, searchTerm]
  );

  useEffect(() => {
    dispatch(retrieveGroupData());
  }, []);

  const lastIndexPlusOne = groups?.length > 0 ? groups?.length : 0;

  useEffect(() => {
    if (searchTerm && searchFilteredData.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  }, []);

  return (
    <div className="groupsMainPageContentContainer">
      <LayoutHeader
        title={t("groups")}
        isLoading={status === "loading"}
        lastIndexPlusOne={lastIndexPlusOne}
        linkTo="/group/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {groups?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_groups")} />
        ) : (
          <>
            <Input
              size="large"
              placeholder={t("search_by_group")}
              prefix={<SearchOutlined className={`searchIcon ${iconColor}`} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
            />

            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <GroupsTable data={searchFilteredData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupMain;
