import { t } from "i18next";
import { AiOutlineHome } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { TbPencilMinus } from "react-icons/tb";

export const API_BASE = process.env.REACT_APP_API_BASE;

export const SESSION_LIFETIME = 3 * 60 * 60 * 1000; // 3 hours in ms

export const UserType = {
  SuperAdmin: "superadmin",
  KindergartenAdmin: "kindergarden_admin",
  BranchAdmin: "branch_admin",
};

export const AdminType = localStorage.getItem("adminType");

export const roleAvailablePages = {
  [UserType?.SuperAdmin]: [
    {
      key: 1,
      icon: <AiOutlineHome />,
      label: "Админ Playme",
      path: "/settings",
    },
    {
      key: 2,
      icon: <CgLogOut />,
      label: "exit",
      // path: '/clients'
    },
  ],
  [UserType?.KindergartenAdmin]: [
    {
      key: 3,
      icon: <TbPencilMinus style={{ fontSize: "20px" }} />,
      label: "edition",
      path: `/kindergartenAdmin/editKindergartenAndBranchData/:branchId`,
    },
    {
      key: 4,
      icon: <CgLogOut style={{ fontSize: "20px" }} />,
      label: "exit",
      // path: '/clients'
    },
  ],
  [UserType?.BranchAdmin]: [
    {
      key: 4,
      icon: <CgLogOut style={{ fontSize: "20px" }} />,
      label: "exit",
      // path: '/clients'
    },
  ],
};
