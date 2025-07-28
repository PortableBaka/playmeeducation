import React, { useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { retrieveStudents } from "../../../store/studentSlice";
import StudentTable from "../studentsTable";
import LayoutHeader from "../../../components/layoutHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import "./styles.sass";
import { GetBasicTableColumns } from "../studentsTable/getBasicTableColumns";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { useTranslation } from "react-i18next";

const StudentsMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("");
  const { students, status } = useSelector((state) => state?.students);

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter((item) => {
      return (
        item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const searchFilteredData = useMemo(
    () => filterData(students, searchTerm),
    [students, searchTerm]
  );
  useEffect(() => {
    dispatch(retrieveStudents());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm && searchFilteredData.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  }, [searchTerm, searchFilteredData]);

  const lastIndexPlusOne = students?.length > 0 ? students?.length : 0;
  const filteredData = students?.map(({ group, branch, ...rest }) => rest);

  return (
    <div className="studentsMainPageContentContainer">
      <LayoutHeader
        title={t("students")}
        isLoading={status === "loading"}
        lastIndexPlusOne={lastIndexPlusOne}
        linkTo="/students/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {filteredData?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_students")} />
        ) : (
          <>
            <Input
              size="large"
              placeholder={t("search_by_person_info")}
              prefix={<SearchOutlined className={`searchIcon ${iconColor}`} />}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
            />
            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <StudentTable data={searchFilteredData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsMain;
