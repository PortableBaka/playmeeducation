import React, { useEffect, useState } from "react";
import { Alert, Button, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import instance from "../../../api/instance";
import { Dialog } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./styles.sass";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const UpdateKindergarten = () => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [kindergarten, setKindergarten] = useState({});
  const [isActiveKindergarden, setIsActiveKindergarden] = useState(true);
  const [openDeleteKinderGarden, setOpenDeleteKinderGarden] = useState(false);
  const [branchForms, setBranchForms] = useState([
    {
      name: "",
      location: "",
      phone_number: "",
      branch_admin_username: "",
      branch_admin_password: "",
    },
  ]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirm) => {
    setOpen(false);
    if (confirm) {
      navigate("/superAdminPage/kindergartenTable");
    }
  };

  const changeActiveStatus = async (status) => {
    try {
      await instance.put(`/kindergardens/${kindergarten.id}`, {
        ...kindergarten,
        active: status,
      });
      handleGetKindergarten();
      toast.success(
        status
          ? "Детский сад успешно активирован"
          : "Детский сад успешно деактивирован"
      );
    } catch (error) {
      toast.error("Ошибка при изменении статуса!");
      console.error(error);
    }
  };

  const handleOpenChange = (newOpen, index) => {
    setOpenDelete(newOpen ? index : false);
  };

  const hide = () => {
    setOpenDelete(false);
  };

  const closeUpdateKindergarden = () => {
    setOpenDeleteKinderGarden(false);
  };

  const deleteKindergarten = async (id) => {
    try {
      await instance.delete(`/kindergardens/${id}`);
      toast.success("Детский сад успешно удален");
      navigate("/superAdminPage/kindergartenTable");
    } catch (error) {
      toast.error(error?.response?.data?.detail);
      console.error(error);
    }
  };

  const onDeleteClick = async (id, index) => {
    try {
      if (id) {
        await instance.delete(`/branches/${id}`);
        handleGetKindergarten();
      } else {
        const updatedBranchForms = [...branchForms];
        updatedBranchForms.splice(index, 1);
        setBranchForms(updatedBranchForms);
      }
      toast.success("Филиал успешно удален");
      setOpenDelete(false);
    } catch (error) {
      toast.error(error?.response?.data?.detail);
      console.error(error);
    }
  };

  const handleChangeKinderGardenBranches = async () => {
    try {
      await Promise.all(
        branchForms.map(async (branch) => {
          if (branch.kindergarden_id && branch.id) {
            const { id, ...rest } = branch;
            await instance.put(`/branches/${branch.id}`, rest);
          } else {
            await instance.post(`/branches`, {
              ...branch,
              kindergarden_id: kindergarten.id,
            });
          }
        })
      );
      return { success: true };
    } catch (error) {
      toast.error(error?.response?.data?.detail);
      console.error(error);
      return { success: false };
    }
  };

  const handleChangeKinderGarden = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.kindergarten_name.value,
      phone_number: e.target.kindergarten_phone.value,
      active: isActiveKindergarden,
      kindergarden_admin_username: e.target.kindergarten_login.value,
      kindergarden_admin_password: e.target.kindergarten_password.value,
    };

    const res = await handleChangeKinderGardenBranches();

    if (res.success) {
      try {
        await instance.put(`/kindergardens/${kindergarten.id}`, formData);
        navigate("/superAdminPage/kindergartenTable");
        toast.success("Детский сад успешно обновлен");
      } catch (error) {
        toast.error(error?.response?.data?.detail);
        console.error(error);
      }
    }
  };

  const handleGetKindergarten = async () => {
    const id = +window.location.pathname.split("/")[3];
    if (!id) {
      navigate("/superAdminPage/kindergartenTable");
      toast.error("Ошибка при загрузке данных детского сада!");
    }
    try {
      const response = await instance.get(`/kindergardens/${id}`);
      setKindergarten(response.data);
      setBranchForms(response.data.branches);
      setIsActiveKindergarden(response.data.active);
    } catch {
      toast.error("Ошибка при загрузке данных!");
    }
  };

  const handleAddBranchForm = () => {
    setBranchForms([
      ...branchForms,
      {
        name: "",
        location: "",
        phone_number: "",
        branch_admin_username: "",
        branch_admin_password: "",
      },
    ]);

    setTimeout(() => {
      window.scrollBy({
        top: 100000,
        behavior: "smooth",
      });
    }, 200);
  };

  const handleBranchChange = (index, field, value) => {
    const updatedBranchForms = [...branchForms];
    updatedBranchForms[index][field] = value;
    setBranchForms(updatedBranchForms);
  };

  useEffect(() => {
    handleGetKindergarten();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <div className="exitModal">
          <div className="exitModalWarningIcon">
            <FaCircleInfo />
          </div>
          <div className="exitModalWarningText">
            <h3>{t("sure_to_exit_message")}</h3>
            <p>{t("exit_message")}</p>
            <div className="modalActions">
              <button onClick={() => handleClose(false)}>{t("cancel")}</button>
              <button className="exitBtn" onClick={() => handleClose(true)}>
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="createKindergarten">
        <div className="createKindergarten_header">
          <div className="createKindergarten_header_wrapper">
            <div className="createKindergarten_header_title">
              <div className="exit" onClick={() => handleClickOpen()}>
                <IoMdClose />
              </div>
              <h3>{t("edit")}</h3>
            </div>
            <div className="createKindergarten_header_save">
              <Popover
                placement="bottom"
                trigger="click"
                open={openDeleteKinderGarden}
                onOpenChange={setOpenDeleteKinderGarden}
                content={
                  <div className="deletePopover">
                    <Alert
                      message={t("delete_alert_message")}
                      banner
                      className="deleteAlert"
                      style={{ marginBottom: "10px" }}
                    />
                    <div
                      className="btnGroup"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={closeUpdateKindergarden}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          deleteKindergarten(kindergarten.id);
                        }}
                      >
                        {t("delete")}
                      </Button>
                    </div>
                  </div>
                }
              >
                <div className="deleteFillial">
                  <FaRegTrashAlt />
                </div>
              </Popover>
              {kindergarten?.active ? (
                <button
                  type="button"
                  className="deactivate"
                  form="kindergartenForm"
                  onClick={() => {
                    changeActiveStatus(false);
                  }}
                >
                  {t("deactivate")}
                </button>
              ) : (
                <button
                  type="button"
                  form="kindergartenForm"
                  className="deactivate"
                  onClick={() => {
                    changeActiveStatus(true);
                  }}
                >
                  {t("activate")}
                </button>
              )}
              <button className="save" form="kindergartenForm">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
        <div className="createKindergarten_content">
          <form id="kindergartenForm" onSubmit={handleChangeKinderGarden}>
            <label htmlFor="kindergarten_name">{t("name")}</label>
            <input
              required
              type="text"
              id="kindergarten_name"
              value={kindergarten?.name}
              onChange={(e) =>
                setKindergarten({ ...kindergarten, name: e.target.value })
              }
              placeholder={t("name") + " детского сада"}
            />

            <label htmlFor="kindergarten_phone">Телефон</label>
            <div className="kindergartenForm_phone">
              <IMaskInput
                required
                mask="+998 00 000-00-00"
                maxLength={17}
                id="kindergarten_phone"
                value={kindergarten?.phone_number}
                onChange={(e) =>
                  setKindergarten({
                    ...kindergarten,
                    phone_number: e.target.value,
                  })
                }
                placeholder="Телефон администратора"
              />
            </div>

            <label htmlFor="kindergarten_login">Логин</label>
            <input
              required
              type="text"
              id="kindergarten_login"
              value={kindergarten?.kindergarden_admin_username}
              onChange={(e) =>
                setKindergarten({
                  ...kindergarten,
                  kindergarden_admin_username: e.target.value,
                })
              }
              placeholder="Логин"
            />

            <label htmlFor="kindergarten_password">Пароль</label>
            <input
              required
              type="password"
              id="kindergarten_password"
              value={kindergarten?.kindergarden_admin_password}
              onChange={(e) =>
                setKindergarten({
                  ...kindergarten,
                  kindergarden_admin_password: e.target.value,
                })
              }
              placeholder="Пароль"
            />

            <div className="kindergartenBranch">
              <div className="kindergartenBranchTitle">
                <h3>Филиалы</h3>
                <div
                  className="kindergartenBranchTitle_add"
                  onClick={handleAddBranchForm}
                >
                  <PlusOutlined />
                  <p>Добавить филиал</p>
                </div>
              </div>

              {branchForms.map((branch, index) => (
                <div key={index} className="kindergartenBranchContent">
                  <div className="kindergartenBranchContentTitle">
                    <h3>Филиал {index + 1}</h3>
                    {index === 0 ? (
                      <p>Это обязательный филиал, его нельзя удалить</p>
                    ) : (
                      <Popover
                        placement="bottom"
                        trigger="click"
                        open={openDelete === index}
                        onOpenChange={(newOpen) =>
                          handleOpenChange(newOpen, index)
                        }
                        content={
                          <div className="deletePopover">
                            <Alert
                              message={t("delete_alert_message")}
                              banner
                              className="deleteAlert"
                              style={{ marginBottom: "10px" }}
                            />
                            <div
                              className="btnGroup"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                style={{ marginRight: "10px" }}
                                onClick={hide}
                              >
                                {t("cancel")}
                              </Button>
                              <Button
                                type="primary"
                                onClick={() => onDeleteClick(branch.id, index)}
                              >
                                {t("delete")}
                              </Button>
                            </div>
                          </div>
                        }
                      >
                        <div className="deleteBranch">
                          <FaRegTrashAlt />
                          <p>Удалить филиал</p>
                        </div>
                      </Popover>
                    )}
                  </div>
                  <label htmlFor={`branch_name_${index}`}>{t("name")}</label>
                  <input
                    required
                    type="text"
                    id={`branch_name_${index}`}
                    value={branch?.name}
                    onChange={(e) =>
                      handleBranchChange(index, "name", e.target.value)
                    }
                    placeholder={t("filial_name")}
                  />

                  <label htmlFor={`branch_phone_${index}`}>{t("phone")}</label>
                  <div className="kindergartenForm_phone">
                    <IMaskInput
                      required
                      id={`branch_phone_${index}`}
                      mask="+998 00 000-00-00"
                      maxLength={17}
                      value={branch?.phone_number}
                      onChange={(e) =>
                        handleBranchChange(
                          index,
                          "phone_number",
                          e.target.value
                        )
                      }
                      placeholder="Телефон филиала"
                    />
                  </div>

                  <label htmlFor={`branch_location_${index}`}>
                    {t("insert_location")}
                  </label>
                  <input
                    type="text"
                    required
                    id={`branch_location_${index}`}
                    value={branch?.location}
                    onChange={(e) =>
                      handleBranchChange(index, "location", e.target.value)
                    }
                    placeholder={t("insert_location")}
                  />

                  {branchForms.length < 2 && (
                    <div className="info">
                      <FaCircleInfo />
                      <p>
                        Логин и пароль необходимы только в случае, если у
                        детского сада 2 и более филиалов. В остальных случаях
                        поля остаются пустыми. Доступ к филиалу есть в аккаунте
                        администратора детского сада
                      </p>
                    </div>
                  )}

                  <label required htmlFor={`branch_login_${index}`}>
                    Логин
                  </label>
                  <input
                    required={branchForms.length > 1}
                    type="text"
                    id={`branch_login_${index}`}
                    value={branch?.branch_admin_username}
                    onChange={(e) =>
                      handleBranchChange(
                        index,
                        "branch_admin_username",
                        e.target.value
                      )
                    }
                    placeholder="Логин администратора филиала"
                  />

                  <label htmlFor={`branch_password_${index}`}>Пароль</label>
                  <input
                    required={branchForms.length > 1}
                    type="text"
                    id={`branch_password_${index}`}
                    value={branch?.branch_admin_password}
                    onChange={(e) =>
                      handleBranchChange(
                        index,
                        "branch_admin_password",
                        e.target.value
                      )
                    }
                    placeholder="Пароль администратора филиала"
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateKindergarten;
