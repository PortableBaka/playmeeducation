import { Tag } from "antd";

export const GetBasicTableColumns = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    render: (text) => <p className="tableTextInner">{text}</p>,
  },
  {
    title: "Логин",
    dataIndex: "kindergarden_admin_username",
    key: "kindergarden_admin_username",
    render: (text) => <p className="tableTextInner">{text}</p>,
  },
  {
    title: "Филиалы",
    dataIndex: "total_branches",
    key: "total_branches",
    render: (total_branches) => (
      <p className="tableTextInner">
        {total_branches > 0 ? total_branches : 0}
      </p>
    ),
  },
  {
    title: "Статус",
    key: "active",
    dataIndex: "active",
    render: (active) => (
      <Tag color={active ? "green" : "red"}>
        {" "}
        <p className={`tagText ${active ? "active" : "notActive"}`}>
          {active ? "Активный" : "Неактивный"}
        </p>{" "}
      </Tag>
    ),
  },
];
