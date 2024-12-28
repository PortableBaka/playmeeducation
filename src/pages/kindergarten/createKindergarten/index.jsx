import React, { useState } from "react";
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

const CreateKindergarten = () => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchForms, setBranchForms] = useState([
    {
      branch_name: "",
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

  const handleOpenChange = (newOpen, index) => {
    setOpenDelete(newOpen ? index : false);
  };

  const hide = () => {
    setOpenDelete(false);
  };

  const onDeleteClick = (index) => {
    const updatedBranchForms = [...branchForms];
    updatedBranchForms.splice(index, 1);
    setBranchForms(updatedBranchForms);
    setOpenDelete(false);
  };

  const handleCreateKinderGarden = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.kindergarten_name.value,
      phone_number: e.target.kindergarten_phone.value,
      payment_amount: e.target.kindergarten_price.value,
      kindergarden_admin_username: e.target.kindergarten_login.value,
      kindergarden_admin_password: e.target.kindergarten_password.value,
      branches: branchForms,
    };

    if (branchForms.length < 1) {
      toast.error("Добавьте хотя бы один филиал");
      return;
    }

    try {
      const response = await instance.post(
        `/kindergardens/multiple-branches`,
        formData
      );
      toast.success("Детский сад успешно создан");
      navigate("/superAdminPage/kindergartenTable");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const detailMessage = error.response.data.detail;
        const username = detailMessage.split(" ")[3];
        toast.error(`Детский сад с таким логином "${username}" уже существует`);
      } else {
        toast.error("Ошибка при создании!");
      }
    }
  };

  const handleAddBranchForm = () => {
    setBranchForms([
      ...branchForms,
      {
        branch_name: "",
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

  return (
    <>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <div className="exitModal">
          <div className="exitModalWarningIcon">
            <FaCircleInfo />
          </div>
          <div className="exitModalWarningText">
            <h3>Вы уверены, что хотите выйти?</h3>
            <p>Несохраненные данные удалятся при выходе.</p>
            <div className="modalActions">
              <button onClick={() => handleClose(false)}>Отменить</button>
              <button className="exitBtn" onClick={() => handleClose(true)}>
                Подтвердить
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
              <h3>Создание детского сада</h3>
            </div>
            <div className="createKindergarten_header_save">
              <button className="save" form="kindergartenForm">
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <div className="createKindergarten_content">
          <form id="kindergartenForm" onSubmit={handleCreateKinderGarden}>
            <label htmlFor="kindergarten_name">Название</label>
            <input
              required
              type="text"
              id="kindergarten_name"
              placeholder="Название детского сада"
            />

            <label htmlFor="kindergarten_phone">Телефон</label>
            <div className="kindergartenForm_phone">
              <div className="prePhone">+998</div>
              <input
                required
                type="number"
                id="kindergarten_phone"
                placeholder="Телефон администратора"
              />
            </div>

            <label htmlFor="kindergarten_price">Сумма оплаты</label>
            <input
              required
              type="number"
              id="kindergarten_price"
              placeholder="0"
            />

            <label htmlFor="kindergarten_login">Логин</label>
            <input
              required
              type="text"
              id="kindergarten_login"
              placeholder="Логин"
            />

            <label htmlFor="kindergarten_password">Пароль</label>
            <input
              required
              type="password"
              id="kindergarten_password"
              placeholder="Пароль"
            />

            <div className="kindergartenBranch">
              <div className="kindergartenBranchTitle">
                <h3>Филиалы</h3>
                <div
                  className="kindergartenBranchTitle_add"
                  onClick={() => handleAddBranchForm()}
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
                                onClick={() => onDeleteClick(index)}
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
                  <label htmlFor={`branch_name_${index}`}>Название</label>
                  <input
                    required
                    type="text"
                    id={`branch_name_${index}`}
                    value={branch.branch_name}
                    onChange={(e) =>
                      handleBranchChange(index, "branch_name", e.target.value)
                    }
                    placeholder="Название филиала"
                  />

                  <label htmlFor={`branch_phone_${index}`}>Телефон</label>
                  <div className="kindergartenForm_phone">
                    <div className="prePhone">+998</div>
                    <input
                      required
                      type="number"
                      id={`branch_phone_${index}`}
                      value={branch.phone_number}
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

                  <label htmlFor={`branch_location_${index}`}>Локация</label>
                  <input
                    type="text"
                    required
                    id={`branch_location_${index}`}
                    value={branch.location}
                    onChange={(e) =>
                      handleBranchChange(index, "location", e.target.value)
                    }
                    placeholder="Локация филиала"
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
                    value={branch.branch_admin_username}
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
                    type="password"
                    id={`branch_password_${index}`}
                    value={branch.branch_admin_password}
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

export default CreateKindergarten;
