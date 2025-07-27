import { Layout, Menu, Select, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import globalIcon from "../assets/svg/global.svg";
import { roleAvailablePages } from "../config";
import { getAuthenticatedUser, logout } from "../store/authUser";
import { setSelectedBranchId } from "../store/branchSlice";
import { retrieveKindergartensById } from "../store/kindergartensSlice";
import { AdditionalMenu } from "./additionalMenu";
import "./styles.sass";

const { Sider } = Layout;
const { Option } = Select;

const KindergartenAdminLayout = () => {
  const [lang, setLang] = useState(localStorage.getItem("language") || "ru");

  useEffect(() => {
    handleLanguageChange(lang);
  }, [lang]);

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setLang(value);
    localStorage.setItem("language", value);
  };

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = getAuthenticatedUser()?.user;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const availablePages = roleAvailablePages[user?.roleCode];

  const selectedBranchId = useSelector(
    (state) => state?.branches?.selectedBranchId
  );
  const { branchInfo } = useSelector((state) => state?.kindergartens);

  const [selectedBranchName, setSelectedBranchName] = useState(
    localStorage.getItem("selectedBranchName") || ""
  );
  useEffect(() => {
    dispatch(retrieveKindergartensById());
    const savedBranchId = localStorage.getItem("selectedBranchId");
    if (savedBranchId) {
      dispatch(setSelectedBranchId(savedBranchId));
    }
  }, [dispatch]);

  const handleBranchChange = (branchId, branchName) => {
    setSelectedBranchName(branchName);
    dispatch(setSelectedBranchId(branchId));

    localStorage.setItem("selectedBranchId", branchId);
    localStorage.setItem("selectedBranchName", branchName);
  };

  const getDefaultSelectedKey = () => {
    const currentPath = location?.pathname;
    const matchingItem = availablePages?.find(
      (item) => item.path === currentPath
    );
    return matchingItem ? matchingItem.key.toString() : "1";
  };

  const handleLogout = () => {
    localStorage.removeItem("selectedBranchId");
    localStorage.removeItem("selectedBranchName");

    logout();
    navigate("/login");
  };

  return (
    <Layout className="kinderGartenAdminLayout">
      <Content style={{ width: "100%" }}>
        <Layout
          style={{
            background: colorBgContainer,
            width: "100%",
            height: "100%",
          }}
        >
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: "1px solid #0000000F",
            }}
            className="kindergartenPageAside"
          >
            <div
              style={{
                height: "64px",
                background: "#fff",
                textAlign: "center",
                lineHeight: "64px",
                borderBottom: "1px solid #e8e8e8",
              }}
            >
              Logo
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[getDefaultSelectedKey()]}
              className="kindergartenMenu"
            >
              <div className="menuItems additionalLinks">
                {selectedBranchId && <AdditionalMenu />}
              </div>
              <div className="menuItems">
                <Select
                  value={lang}
                  onChange={handleLanguageChange}
                  style={{ width: "100%", border: "none" }}
                  dropdownStyle={{ textAlign: "center" }}
                >
                  <Option value="uz" className="langText">
                    <img
                      src={globalIcon}
                      alt="Globe"
                      style={{ marginRight: 8 }}
                    />
                    Uzbekcha
                  </Option>
                  <Option value="ru">
                    <img
                      src={globalIcon}
                      alt="Globe"
                      style={{ marginRight: 8 }}
                    />
                    Русский
                  </Option>
                </Select>
                <Select
                  value={
                    (selectedBranchId && selectedBranchName) ||
                    t("choose_branch")
                  }
                  onChange={(value, option) =>
                    handleBranchChange(value, option.children)
                  }
                  style={{ width: "100%", border: "none" }}
                  placeholder={t("choose_branch")}
                  dropdownStyle={{ textAlign: "center" }}
                >
                  <Option value={null} disabled>
                    <AiOutlineHome
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    {t("choose_branch")}
                  </Option>
                  {branchInfo?.branches?.map((branch) => (
                    <Option key={branch.id} value={branch.id}>
                      {branch.name}
                    </Option>
                  ))}
                </Select>
                <div className="availablePagesContainer">
                  {availablePages?.map((item) => (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      onClick={
                        item.label
                          ? item.label === "exit"
                            ? handleLogout
                            : () =>
                                navigate(
                                  item.path.replace(
                                    ":branchId",
                                    selectedBranchId
                                  )
                                )
                          : () => navigate(item.path)
                      }
                      disabled={item.label === "Админ Playme"}
                      className="menuItemsLinks"
                    >
                      <div className="itemLabel">{t(item.label)}</div>
                    </Menu.Item>
                  ))}
                </div>
              </div>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: "24px",
              minHeight: 280,
              display: "flex",
              justifyContent: "center",
            }}
            className="content"
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default KindergartenAdminLayout;
