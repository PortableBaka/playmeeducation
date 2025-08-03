import React, { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTransactions } from "../../../store/transactionSlice";
import LayoutHeader from "../../../components/layoutHeader";
import EmptyBlock from "../../basicPage/emptyBlock";
import TransactionTable from "../transactionsTable";
import "./styles.sass";
import { getLocalizedMonthYear } from "../../../utils/getLocalizedMonthYear";
import SkeletonTable from "../../../components/skeleton/SkeletonTable";
import { GetBasicTableColumns } from "../transactionsTable/getBasicTableColumns";
import { useTranslation } from "react-i18next";
import { paymentTypes } from "../data";
import moment from "moment";

const TransactionMain = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [inputBorderColor, setInputBorderColor] = useState("#00000026");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMonthYear, setSearchMonthYear] = useState(null);
  const [iconColor, setIconColor] = useState("");
  const [paymentType, setPaymentType] = useState(null);

  const { transactionsData, status } = useSelector(
    (state) => state?.transaction
  );

  const filterDataByText = (transactionsData, searchTerm) => {
    if (!searchTerm) return transactionsData;
    return transactionsData.filter((item) => {
      return (
        item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.payment_type?.includes(searchTerm.toLowerCase)
      );
    });
  };

  const filterDataByDate = (transactionsData, searchMonthYear) => {
    if (!searchMonthYear) return transactionsData;
    const { month, year } = searchMonthYear;
    return transactionsData.filter((item) => {
      return (
        item.payment_period_month === month && item.payment_period_year === year
      );
    });
  };

  const filterDataByPaymentType = (transactionsData, paymentType) => {
    if (!paymentType) return transactionsData;
    return transactionsData.filter((item) => {
      return item.payment_type === paymentType;
    });
  };

  const searchFilteredData = useMemo(() => {
    let filteredData = filterDataByText(transactionsData, searchTerm);
    filteredData = filterDataByDate(filteredData, searchMonthYear);
    filteredData = filterDataByPaymentType(filteredData, paymentType);
    if (filteredData) {
      filteredData = filteredData.map((transaction) => ({
        ...transaction,
        payment_period: getLocalizedMonthYear(
          "ru",
          transaction.payment_period_year,
          transaction.payment_period_month
        ),
      }));
    }
    return filteredData;
  }, [transactionsData, searchTerm, searchMonthYear, paymentType]);

  useEffect(() => {
    dispatch(retrieveTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm && searchFilteredData.length === 0) {
      setInputBorderColor("#EE4B2B");
      setIconColor("searchError");
    } else {
      setInputBorderColor("#00000026");
      setIconColor("");
    }
  }, [searchTerm, searchFilteredData]);

  const lastIndexPlusOne =
    transactionsData?.length > 0 ? transactionsData?.length : 0;

  const onDateChange = (date) => {
    if (date) {
      const month = parseInt(date.month()) + 1;
      const year = parseInt(date.year());
      setSearchMonthYear({ month, year });
    } else {
      setSearchMonthYear(null);
    }
  };

  return (
    <div className="transactionMainPageContentContainer">
      <LayoutHeader
        title={t("transactions")}
        isLoading={status === "loading"}
        lastIndexPlusOne={lastIndexPlusOne}
        linkTo="/transaction/create"
        btnText={t("add")}
      />
      <div className="contentBody">
        {transactionsData?.length === 0 && status === "succeeded" ? (
          <EmptyBlock text={t("empty_transactions")} />
        ) : (
          <>
            <div className="searchHeader">
              <Input
                size="large"
                placeholder={t("search_by_student")}
                prefix={
                  <SearchOutlined className={`searchIcon ${iconColor}`} />
                }
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DatePicker
                size="large"
                picker="month"
                style={{ width: "60%" }}
                placeholder={t("transaction_date")}
                onChange={onDateChange}
                value={searchMonthYear ? moment(searchMonthYear) : null}
              />
              <Select
                size="large"
                variant="outlined"
                placeholder={t("payment_method")}
                style={{
                  width: "60%",
                  border: "1px solid #00000026",
                  borderRadius: "8px",
                }}
                onChange={(value) => setPaymentType(value)}
                value={paymentType}
              >
                {paymentTypes.map((paymentType) => (
                  <Select.Option
                    key={paymentType.value}
                    value={paymentType.value}
                  >
                    {paymentType.label}
                  </Select.Option>
                ))}
              </Select>
              {(paymentType || searchTerm || searchMonthYear) && (
                <div>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSearchMonthYear(null);
                      setPaymentType(null);
                    }}
                    type="primary"
                    style={{ width: "40px" }}
                    icon={<CloseOutlined />}
                  />
                </div>
              )}
            </div>
            {status === "loading" ? (
              <SkeletonTable columns={GetBasicTableColumns} rowCount={10} />
            ) : (
              <TransactionTable data={searchFilteredData} loading={status} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionMain;
