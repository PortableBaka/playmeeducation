import { Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import { useNavigate } from "react-router-dom";
import "./styles.sass";
import { t } from "i18next";

const TransactionTable = (props) => {
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/transaction/edit/${record.id}`);
  };

  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({
          ...e,
          title: t(e.title),
          amount: e.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        }))}
        dataSource={props.data}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default TransactionTable;
