import { t } from "i18next";

export const GetBasicTableColumns = [
  {
    title: "naming",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "students",
    dataIndex: "total_students",
    key: "total_students",
  },
  {
    title: "educator",
    dataIndex: ["employee", "name"],
    key: "employee_name",
  },
];
