import React, { useState } from "react";
import { Layout, Menu, Select, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { roleAvailablePages } from "../config";
import { getAuthenticatedUser, logout } from "../store/authUser";
import { Content } from "antd/es/layout/layout";
import globalIcon from "../assets/svg/global.svg";

import { useTranslation } from "react-i18next";
import "./styles.sass";

const { Sider } = Layout;
const { Option } = Select;

const SuperAdminPageLayout = (props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = getAuthenticatedUser()?.user;
  const availablePages = roleAvailablePages[user?.roleCode];

  const [selectedLanguage, setSelectedLanguage] = useState("uzbekcha");

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const getDefaultSelectedKey = () => {
    const currentPath = location?.pathname;
    const matchingItem = availablePages?.find(
      (item) => item.path === currentPath
    );
    return matchingItem ? matchingItem.key.toString() : "1";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className="basicPageLayout">
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
            className="basicPageAside"
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
            >
              <Select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                style={{ width: "100%", border: "none" }}
                dropdownStyle={{ textAlign: "center" }}
              >
                <Option value="uzbekcha" className="langText">
                  <img
                    src={globalIcon}
                    alt="Globe"
                    style={{ marginRight: 8 }}
                  />
                  Uzbekcha
                </Option>
                <Option value="russia">Russia</Option>
                <Option value="english">English</Option>
              </Select>
              {availablePages?.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  // onClick={
                  //   item.label
                  //     ? item.label === t("exit")
                  //       ? handleLogout
                  //       : () => navigate(item.path)
                  //     : () => navigate(item.path)
                  // }
                  onClick={
                    item.label
                      ? item.label === "exit"
                        ? handleLogout
                        : () =>
                          navigate(item.path)
                      : () => navigate(item.path)
                  }
                  disabled={item.label === "Админ Playme"}
                >
                  {item.label}
                </Menu.Item>
              ))}
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

export default SuperAdminPageLayout;
