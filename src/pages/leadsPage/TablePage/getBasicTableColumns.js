import { Tag } from "antd";
import { t } from "i18next";
const columnWidth = 150;
export const GetBasicTableColumns = [
  {
    title: "fio",
    dataIndex: "student_name",
    key: "student_name",
    render: (text) => <p className="tableTextInner">{text}</p>,
    with: columnWidth,
  },
  {
    title: "phone_number",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (text) => <p className="tableTextInner">{text}</p>,
    with: columnWidth,
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
    with: columnWidth,
    render: (status) => {
      let color;
      let text;

      switch (status) {
        case "начало":
          color = "magenta";
          text = t("initial_status");
          break;
        case "в процессе":
          color = "blue";
          text = t("in_proccess");
          break;
        case "финиш успешный":
          color = "green";
          text = t("status_success");
          break;
        case "финиш нет":
          color = "red";
          text = t("fail_status");
          break;
        default:
          color = "default";
          text = status;
      }

      return <Tag color={color}>{text}</Tag>;
    },
  },
];
