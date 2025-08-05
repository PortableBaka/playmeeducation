import { Table } from "antd";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import "./styles.sass";

const LibraryTable = (props) => {
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/library/edit/${record.id}`);
  };
  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({ ...e, title: t(e.title) }))}
        dataSource={props?.data?.map((e) => ({
          ...e,
          can_view: t(e.can_view),
        }))}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default LibraryTable;
