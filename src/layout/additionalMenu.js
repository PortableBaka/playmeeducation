import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  ReadOutlined,
  IdcardOutlined,
  WalletOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./styles.sass";
import { UserType } from "../config";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const items = [
  {
    key: "/kindergartenAdminLayout/groups",
    icon: <TeamOutlined />,
    label: "groups",
  },
  {
    key: "/kindergartenAdminLayout/students",
    icon: <UserOutlined />,
    label: "students",
  },
  {
    key: "/kindergartenAdminLayout/timetable",
    icon: <CalendarOutlined />,
    label: "schedule",
  },
  {
    key: "/kindergartenAdminLayout/libraryMainPage",
    icon: <ReadOutlined />,
    label: "library",
  },
  {
    key: "/kindergartenAdminLayout/employees",
    icon: <IdcardOutlined />,
    label: "employees",
  },
  {
    key: "/kindergartenAdminLayout/transactions",
    icon: <WalletOutlined />,
    label: "transactions",
  },
  {
    key: "/kindergartenAdminLayout/leads",
    icon: <UserAddOutlined />,
    label: "leads",
  },
];

const branchItems = [
  {
    key: "/branchAdminPage/groups",
    icon: <TeamOutlined />,
    label: "groups",
  },
  {
    key: "/branchAdminPage/students",
    icon: <UserOutlined />,
    label: "students",
  },
  {
    key: "/branchAdminPage/timetable",
    icon: <CalendarOutlined />,
    label: "schedule",
  },
  {
    key: "/branchAdminPage/libraryMainPage",
    icon: <ReadOutlined />,
    label: "library",
  },
  {
    key: "/branchAdminPage/employees",
    icon: <IdcardOutlined />,
    label: "employees",
  },
  {
    key: "/branchAdminPage/transactions",
    icon: <WalletOutlined />,
    label: "transactions",
  },
  {
    key: "/branchAdminPage/leads",
    icon: <UserAddOutlined />,
    label: "leads",
  },
];

export const AdditionalMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("adminType");

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className="additionalMenu">
      <Menu
        onClick={onClick}
        theme="light"
        items={
          userType === UserType.KindergartenAdmin
            ? items.map((e) => ({ ...e, label: t(`${e.label}`) }))
            : branchItems.map((e) => ({ ...e, label: t(`${e.label}`) }))
        }
        mode="inline"
      />
    </div>
  );
};
