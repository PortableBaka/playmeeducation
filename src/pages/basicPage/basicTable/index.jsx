import React from "react";
import { Table, Empty } from "antd"; // Import Empty component from antd
import { GetBasicTableColumns } from "./getBasicTableColumns";
import { useNavigate } from "react-router-dom";
import "./styles.sass";
import { useSelector } from "react-redux";
import { t } from "i18next";

const BasicTable = (props) => {
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.kindergartens.items);

  const filteredData = props.data.filter((item) =>
    item.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  return (
    <div className="basicTableContainer">
      {filteredData.length > 0 ? (
        <Table
          className="basicTableAddingKindergarten"
          columns={GetBasicTableColumns}
          dataSource={filteredData}
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(`/kindergarten/update/${record.id}`);
              },
            };
          }}
        />
      ) : (
        <Empty description={t("empty_kindergarten_search")} />
      )}
    </div>
  );
};

export default BasicTable;
