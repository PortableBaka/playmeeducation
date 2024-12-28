import React, { useEffect, useMemo, useState } from "react";
import { Input, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { retrieveAllData } from "../../../store/employeesSlice";
import LayoutHeader from "../../../components/layoutHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import EmployeeTable from "../employeeTable";
import "./styles.sass";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { GetBasicTableColumns } from "../employeeTable/getBasicTableColumns";
import { useTranslation } from "react-i18next";

const EmployeeMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const { employeeData, status } = useSelector((state) => state.employee);
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("");
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(retrieveAllData({ selectedBranchId }));
    }
  }, [dispatch, selectedBranchId, status]);
  const lastIndexPlusOne = employeeData?.length > 0 ? employeeData?.length : 0;

  const filterData = (employeeData, searchTerm) => {
    if (!searchTerm) return employeeData;
    return employeeData.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const searchFilteredData = useMemo(
    () => filterData(employeeData, searchTerm),
    [employeeData, searchTerm]
  );
  useEffect(() => {
    if (searchTerm && searchFilteredData.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  });

  return (
    <div className="groupsMainPageContentContainer">
      <LayoutHeader
        title={t("employees")}
        isLoading={status === "loading"}
        lastIndexPlusOne={lastIndexPlusOne}
        linkTo="/employee/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {employeeData?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_employees")} />
        ) : (
          <>
            <Input
              size="large"
              placeholder={t("search_by_name")}
              prefix={<SearchOutlined className={`searchIcon ${iconColor}`} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
            />
            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <EmployeeTable data={searchFilteredData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeMain;
