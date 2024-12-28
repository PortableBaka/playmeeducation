import { Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import "./styles.sass";
import { t } from "i18next";

const StudentsTable = (props) => {
  return (
    <div className="basicLibraryTableContainer">
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns.map((e) => ({ ...e, title: t(e.title) }))}
        dataSource={props?.students}
        rowKey="id"
      />
    </div>
  );
};

export default StudentsTable;
