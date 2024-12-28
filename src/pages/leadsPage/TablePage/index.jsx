import React from "react";
import { Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import "./styles.sass";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const LeadsTable = (props) => {
  const navigate = useNavigate();
  const handleRowClick = (record) => {
    navigate(`/leads/edit/${record.id}`);
  };
  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({ ...e, title: t(e.title) }))}
        dataSource={props?.data}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default LeadsTable;
