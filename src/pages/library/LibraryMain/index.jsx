import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../components/layoutHeader";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { retrieveLibraryData } from "../../../store/librarySlice";
import EmptyBlock from "../../basicPage/emptyBlock";
import LibraryTable from "../LibraryTable";
import { GetBasicTableColumns } from "../LibraryTable/getBasicTableColumns";
import "./styles.sass";

const LibraryMainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { libraryData, status } = useSelector((state) => state?.library);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const [iconColor, setIconColor] = useState("");
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  useEffect(() => {
    dispatch(retrieveLibraryData(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const lastIndexPlusOne = libraryData?.length > 0 ? libraryData?.length : 0;

  const filterData = (libraryData, searchTerm) => {
    if (!searchTerm) return libraryData;
    return (
      libraryData.filter((item) => {
        return item?.file_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      }) || []
    );
  };

  const searchFilteredData = useMemo(() => {
    return filterData(libraryData, searchTerm);
  }, [libraryData, searchTerm]);

  useEffect(() => {
    if (searchTerm && searchFilteredData?.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  }, [searchTerm, searchFilteredData?.length]);

  return (
    <div className="libraryMainPageContentContainer">
      <LayoutHeader
        title={t("library")}
        lastIndexPlusOne={lastIndexPlusOne}
        isLoading={status === "loading"}
        linkTo="/library/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {libraryData?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_kindergarten")} />
        ) : (
          <>
            <Input
              size="large"
              placeholder={t("search_by_naming")}
              prefix={<SearchOutlined className={`searchIcon ${iconColor}`} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
            />
            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <LibraryTable data={searchFilteredData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryMainPage;
