import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import Employees from "./employees";
import Transactions from "./transactions";
import Leads from "./leads";

export default function Settings() {
  const { t } = useTranslation();
  const items = [
    {
      key: "2",
      label: t("employees"),
      children: <Employees />,
    },
    {
      key: "3",
      label: t("transactions"),
      children: <Transactions />,
    },
    {
      key: "4",
      label: t("leads"),
      children: <Leads />,
    },
  ];

  return <Tabs items={items} defaultActiveKey="2" style={{ width: "100%" }} />;
}
