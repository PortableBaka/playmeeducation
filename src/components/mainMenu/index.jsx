import React from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

import calendarIcon from "../../assets/svg/calendar.svg";
import readIcon from "../../assets/svg/read.svg";
import idCardIcon from "../../assets/svg/idCard.svg";
import walletIcon from "../../assets/svg/wallet.svg";
import userIcon from "../../assets/svg/user.svg";
import userAddIcon from "../../assets/svg/userAdd.svg";
import teamIcon from "../../assets/svg/team.svg";
import globalIcon from "../../assets/svg/global.svg";
import homeIcon from "../../assets/svg/home.svg";
import editIcon from "../../assets/svg/edit.svg";
import exitIcon from "../../assets/svg/exit.svg";
import { useTranslation } from "react-i18next";

const MainMenu = () => {
  const { t } = useTranslation();

  return (
    <div className="mainMenuContainer">
      <div className="topMenu">
        <div className="logoContainer">
          <div className="logo"></div>
        </div>

        <ul className="menuList">
          <li className="menuItem">
            <Link to="/home" className="menuLink">
              <img src={calendarIcon} alt="calendar icon" />
              <span>{t("schedule")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/about" className="menuLink">
              <img src={readIcon} alt="calendar icon" />
              <span>{t("library")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/contact" className="menuLink">
              <img src={idCardIcon} alt="calendar icon" />
              <span>{t("employees")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/login" className="menuLink">
              <img src={walletIcon} alt="calendar icon" />
              <span>{t("transactions")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/login" className="menuLink">
              <img src={userAddIcon} alt="calendar icon" />
              <span>{t("leads")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/login" className="menuLink">
              <img src={userIcon} alt="calendar icon" />
              <span>{t("students")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/login" className="menuLink">
              <img src={teamIcon} alt="calendar icon" />
              <span>{t("groups")}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottomMenu">
        <ul className="menuList">
          <li className="menuItem">
            <Link to="/home" className="menuLink">
              <img src={globalIcon} alt="calendar icon" />
              <span>Uzbekcha</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/about" className="menuLink">
              <img src={homeIcon} alt="calendar icon" />
              <span>{t("branch")} 1</span>
              <div className="rightArrow"></div>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/contact" className="menuLink">
              <img src={editIcon} alt="calendar icon" />
              <span>{t("edition")}</span>
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/login" className="menuLink exit">
              <img src={exitIcon} alt="calendar icon" />
              <span>{t("exit")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;
