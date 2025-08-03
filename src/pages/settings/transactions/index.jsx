import { IconButton } from "@mui/material";
import { Button, Space, Table } from "antd";
import { useTranslation } from "react-i18next";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Control from "./control";

export default function Transactions() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const GetBasicTableColumns = [
    {
      title: t("naming"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      width: 160,
      render: (text, record) => (
        <Space>
          <IconButton type="primary" color="primary">
            <FaRegEdit size={16} />
          </IconButton>
          <IconButton size="small" type="primary" color="error">
            <FaRegTrashAlt size={16} />
          </IconButton>
        </Space>
      ),
    },
  ];

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "16px",
        }}
      >
        <h2>{t("transactions")}</h2>
        <Button type="primary" onClick={() => setShowModal(true)}>
          {t("add")}
        </Button>
      </div>
      <Table
        className="basicLibraryTable"
        columns={GetBasicTableColumns}
        dataSource={[]}
        rowKey="id"
        onRow={(record) => ({
          //   onClick: () => handleRowClick(record),
        })}
      />
      <Control
        showModal={showModal}
        handleHideModal={() => setShowModal(false)}
        isEdit={false}
        handleCreateEvent={() => {}}
        handleEditEvent={() => {}}
      />
    </main>
  );
}
