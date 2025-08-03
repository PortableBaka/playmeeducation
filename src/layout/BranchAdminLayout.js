import React, { useEffect, useState } from "react";
import { Layout, Menu, Select, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { roleAvailablePages } from "../config";
import { getAuthenticatedUser, logout } from "../store/authUser";
import { Content } from "antd/es/layout/layout";
import { retrieveBranchDataById } from "../store/branchSlice";
import { AdditionalMenu } from "./additionalMenu";
import globalIcon from "../assets/svg/global.svg";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
const { Option } = Select;

const KindergartenBranchAdminLayout = () => {
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
  const { branchDataById } = useSelector((state) => state.branches);
  const [selectedLanguage, setSelectedLanguage] = useState("uz");
  const branchId = localStorage.getItem("selectedBranchId");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (localStorage.getItem("language")) {
      i18n.changeLanguage(lang);
      setSelectedLanguage(lang);
    }
  }, [i18n, selectedLanguage]);
  useEffect(() => {
    dispatch(retrieveBranchDataById(branchId));
  }, [branchId, dispatch]);

  const handleLanguageChange = (value) => {
    localStorage.setItem("language", value);
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
                  value={selectedLanguage}
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
                  value={branchDataById?.name}
                  style={{ width: "100%", border: "none" }}
                  disabled
                  dropdownStyle={{ textAlign: "center" }}
                ></Select>
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

export default KindergartenBranchAdminLayout;
