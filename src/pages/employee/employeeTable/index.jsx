import { Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import "./styles.sass";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const EmployeeTable = (props) => {
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/employee/edit/${record.id}`);
  };

  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({ ...e, title: t(e.title) }))}
        dataSource={props.data?.map((e) => ({
          ...e,
          employee_type: t(e.employee_type),
        }))}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default EmployeeTable;
