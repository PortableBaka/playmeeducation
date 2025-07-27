import React, { useEffect } from "react";
import { Card, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { retrieveKindergartenAggregatedInfo } from "../../store/kindergartensSlice";
import "./styles.sass";
import { Skeleton } from "../../components/skeleton";
import { useTranslation } from "react-i18next";

const KindergartensAdminMainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { totalInfo, status } = useSelector((state) => state?.kindergartens);

  useEffect(() => {
    dispatch(retrieveKindergartenAggregatedInfo());
  }, [dispatch]);

  const cardInfoBlock = [
    {
      id: 1,
      title:
        status === "loading" ? (
          <Skeleton width={30} />
        ) : (
          totalInfo?.leads?.started
        ),
      subtitle: t("start"),
    },
    {
      id: 2,
      title:
        status === "loading" ? (
          <Skeleton width={30} />
        ) : (
          totalInfo?.leads?.in_progress
        ),
      subtitle: t("in_proccess"),
    },
    {
      id: 3,
      title:
        status === "loading" ? (
          <Skeleton width={30} />
        ) : (
          totalInfo?.leads?.successful_finish
        ),
      subtitle: t("success"),
    },
    {
      id: 4,
      title:
        status === "loading" ? (
          <Skeleton width={30} />
        ) : (
          totalInfo?.leads?.no_finish
        ),
      subtitle: t("rejected"),
    },
  ];

  return (
    <div className="kindergartensAdminMainPage kindergartenContainer">
      <div className="container">
        <div className="kindergartenContainer">
          <div className="adminBranchTitle">
            <h2 className="title">{t("all_branches")}</h2>
          </div>
          <div className="adminPageInfoBlock">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Card title={t("leads")} style={{ width: "100%" }}>
                <div className="cardBoxInfo">
                  {cardInfoBlock.map((item, index) => (
                    <div className="cardBox">
                      <div className="cartSubtitle">
                        <p className="subtitle">{item.subtitle}</p>
                      </div>
                      <div className="cardTitle">
                        <p className="title">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Space>
            <div className="adminInfo">
              <Card style={{ width: "100%" }}>
                <div className="cardBoxInfo">
                  <div className="cardBox">
                    <div className="cartSubtitle">
                      <p className="subtitle">{t("students")}</p>
                    </div>
                    <div className="cardTitle">
                      <p className="title">
                        {status === "loading" ? (
                          <Skeleton width={30} />
                        ) : (
                          totalInfo?.students
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card style={{ width: "100%" }}>
                <div className="cardBoxInfo">
                  <div className="cardBox">
                    <div className="cartSubtitle">
                      <p className="subtitle">{t("groups")}</p>
                    </div>
                    <div className="cardTitle">
                      <p className="title">
                        {status === "loading" ? (
                          <Skeleton width={30} />
                        ) : (
                          totalInfo?.groups
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="adminInfo">
              <Card style={{ width: "100%" }}>
                <div className="cardBoxInfo">
                  <div className="cardBox">
                    <div className="cartSubtitle">
                      <p className="subtitle">{t("employees")}</p>
                    </div>
                    <div className="cardTitle">
                      <p className="title">
                        {status === "loading" ? (
                          <Skeleton width={30} />
                        ) : (
                          totalInfo?.employees
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card style={{ width: "100%" }}>
                <div className="cardBoxInfo">
                  <div className="cardBox">
                    <div className="cartSubtitle">
                      <p className="subtitle">{t("library")}</p>
                    </div>
                    <div className="cardTitle">
                      <p className="title">
                        {status === "loading" ? (
                          <Skeleton width={30} />
                        ) : (
                          totalInfo?.library
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KindergartensAdminMainPage;
