import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import Statuses from "./statuses";
import ComingSource from "./coming-source";

export default function Leads() {
  const { t } = useTranslation();
  const items = [
    {
      key: "1",
      label: t("statuses"),
      children: <Statuses />,
    },
    {
      key: "2",
      label: t("coming_source"),
      children: <ComingSource />,
    },
  ];

  return <Tabs items={items} defaultActiveKey="1" style={{ width: "100%" }} />;
}
