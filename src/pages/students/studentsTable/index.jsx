import { Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import { useNavigate } from "react-router-dom";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const StudentTable = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/students/edit/${record.id}`);
  };

  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({ ...e, title: t(e.title) }))}
        dataSource={props.data}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default StudentTable;
