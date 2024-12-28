import React, { useEffect, useMemo, useState } from "react";
import { Input, Select, theme } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { retrieveLeadsData } from "../../../store/leadsSlice";
import LayoutHeader from "../../../components/layoutHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import LeadsTable from "../TablePage";
import "./styles.sass";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { GetBasicTableColumns } from "../TablePage/getBasicTableColumns";
import { useTranslation } from "react-i18next";

const LeadsMainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { leadsData, status } = useSelector((state) => state?.leads);
  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );

  useEffect(() => {
    dispatch(retrieveLeadsData(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const lastIndexPlusOne = leadsData?.length > 0 ? leadsData?.length : 0;

  const filterData = (leadsData, searchTerm, selectedStatus) => {
    return leadsData?.filter((item) => {
      const matchesSearchTerm =
        item?.student_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.phone_number?.toLowerCase().includes(searchTerm?.toLowerCase());

      const matchesStatus = selectedStatus
        ? item?.status === selectedStatus
        : true;

      return matchesSearchTerm && matchesStatus;
    });
  };

  const searchFilteredData = useMemo(
    () => filterData(leadsData, searchTerm, selectedStatus),
    [leadsData, searchTerm, selectedStatus]
  );

  useEffect(() => {
    if (searchTerm && searchFilteredData?.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  });

  return (
    <div className="leadsMainPageContentContainer">
      <LayoutHeader
        title={t("leads")}
        lastIndexPlusOne={lastIndexPlusOne}
        isLoading={status === "loading"}
        linkTo="/leads/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {leadsData?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_leads")} />
        ) : (
          <>
            <div className="searchHeader">
              <Input
                size="large"
                placeholder={t("search_by_name_or_number")}
                prefix={
                  <SearchOutlined className={`searchIcon ${iconColor}`} />
                }
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderColor: inputBorderColor, borderWidth: "2px" }}
              />
              <Select
                defaultValue={null}
                size="large"
                className="statusSelect"
                onChange={(value) => setSelectedStatus(value)}
                options={[
                  { value: null, label: t("all_statuses") },
                  { value: "начало", label: t("initial_status") },
                  { value: "в процессе", label: t("in_proccess") },
                  { value: "финиш успешный", label: t("status_success") },
                  { value: "финиш нет", label: t("fail_status") },
                  { value: "уточнить", label: t("clarify_status") },
                ]}
              />
            </div>

            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <LeadsTable data={searchFilteredData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadsMainPage;
