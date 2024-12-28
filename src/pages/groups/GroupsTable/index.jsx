import { Empty, Table } from "antd";
import { GetBasicTableColumns } from "./getBasicTableColumns";
import "./styles.sass";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GroupsTable = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/group/edit/${record.id}`);
  };

  return (
    <div className="basicLibraryTableContainer">
      {props?.data || props?.data?.length > 0 ? (
        <Table
          className="basicLibraryTable"
          columns={GetBasicTableColumns.map((e) => ({
            ...e,
            title: t(e.title),
          }))}
          dataSource={props?.data}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      ) : (
        <Empty description={t("student_not_found")} />
      )}
    </div>
  );
};

export default GroupsTable;
