import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { authorizeSuperAdmin } from "../../store/superAdminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.sass";
import { logout } from "../../store/authUser";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const onFinish = async (values, dispatch, navigate) => {
  try {
    const response = await dispatch(authorizeSuperAdmin(values));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success(t("welcome"));

      const userRole = localStorage.getItem("adminType");

      if (userRole === "superadmin") {
        navigate("/superAdminPage/kindergartenTable", { replace: true });
        navigate(0);
      } else if (userRole === "kindergarden_admin") {
        navigate("/kindergartenAdminLayout/kindergartensAdminMainPage", {
          replace: true,
        });
        navigate(0);
      } else {
        navigate("/branchAdminPage/libraryMainPage", { replace: true });
        navigate(0);
      }
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    toast.error("An error occurred during login");
  }
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => onFinish(values, dispatch, navigate)}
          className="loginForm"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="input" placeholder={t("login")} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="input" placeholder={t("password")} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            className="btnGroup"
          >
            <Button type="primary" htmlType="submit" className="btn">
              {t("enter")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
