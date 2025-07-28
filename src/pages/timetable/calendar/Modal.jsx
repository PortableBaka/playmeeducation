import { Button, Form, Input, Modal, Select, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EventType } from "../../../common/types";
import { MyDatePicker } from "../../../components/common/DatePicker";
import { retrieveAllTeachersData } from "../../../store/employeesSlice";
import { getAllEvents } from "../../../store/eventSlice";

const { Option } = Select;

const CalendarModal = ({
  showModal,
  isEdit,
  selectedEvent,
  handleEditEvent,
  handleCreateEvent,
  handleDeleteEvent,
  handleHideModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state?.employee);

  useEffect(() => {
    dispatch(retrieveAllTeachersData(localStorage.getItem("selectedBranchId")));
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && selectedEvent) {
      form.setFieldsValue({
        name: selectedEvent.name,
        description: selectedEvent.description,
        date: moment(selectedEvent.date, "YYYY-MM-DD"),
        start_time: moment(selectedEvent.start_time),
        end_time: moment(selectedEvent.end_time),
        event_type: selectedEvent.event_type || EventType.EVENT,
        teacher_id: selectedEvent.teacher_id,
      });
    } else {
      if (selectedEvent)
        form.setFieldsValue({
          date: moment(selectedEvent.date, "YYYY-MM-DD"),
          start_time: moment(selectedEvent.start_time),
          end_time: moment(selectedEvent.end_time),
          event_type: selectedEvent.event_type || EventType.EVENT,
        });
      else form.resetFields();
    }
  }, [isEdit, selectedEvent, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const data = {
        date: moment(values.date).format("YYYY-MM-DD"),
        name: values.name,
        description: values.description,
        start_time: moment(values.start_time).format(),
        end_time: moment(values.end_time).format(),
        event_type: values.event_type,
        branch_id: localStorage.getItem("selectedBranchId"),
        teacher_id: values.teacher_id,
      };

      if (isEdit) {
        handleEditEvent({
          ...data,
          start_time: moment(values.start_time).format(),
          end_time: moment(values.end_time).format(),
          id: selectedEvent.id,
        });
      } else {
        handleCreateEvent(data);
      }

      form.resetFields();
      handleHideModal();
    } catch (err) {
      toast.error(`Validation failed`);
    } finally {
      setLoading(false);
    }
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 8 || i > 18) {
        hours.push(i);
      }
    }
    return hours;
  };

  return (
    <Modal
      open={showModal}
      title={
        <div className="modal-header">
          <span>{isEdit ? t("edit_event") : t("create_event")}</span>
          {isEdit && (
            <Button
              className="delete-button"
              type="primary"
              danger={true}
              onClick={() => handleDeleteEvent(selectedEvent)}
            >
              <FaRegTrashAlt />
            </Button>
          )}
        </div>
      }
      onCancel={handleHideModal}
      footer={[
        <Button key="cancel" onClick={handleHideModal}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEdit ? t("save_changes") : t("create_event")}
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={t("event_type")}
          name="event_type"
          rules={[{ message: t("select_event_type") }]}
        >
          <Select placeholder={t("select_event_type")}>
            {Object.entries(EventType).map(([key, value]) => (
              <Option key={key} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={t("name")}
          name="name"
          rules={[{ required: true, message: t("insert_name") }]}
        >
          <Input placeholder={t("insert_name")} />
        </Form.Item>

        <Form.Item
          label={t("description")}
          name="description"
          rules={[{ message: t("insert_description") }]}
        >
          <Input.TextArea placeholder={t("insert_description")} />
        </Form.Item>

        <div className="inline-fields">
          <Form.Item
            label={t("date")}
            name="date"
            rules={[{ required: true, message: t("select_date") }]}
          >
            <MyDatePicker disabled={true} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label={t("start_time")}
            name="start_time"
            rules={[
              { required: true, message: t("select_start_time") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    moment(value).isBefore(getFieldValue("end_time"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Start time should be before end time")
                  );
                },
              }),
            ]}
          >
            <TimePicker
              format="HH:mm"
              disabledHours={disabledHours}
              minuteStep={5}
              hourStep={1}
            />
          </Form.Item>

          <Form.Item
            label={t("end_time")}
            name="end_time"
            rules={[
              { required: true, message: t("select_end_time") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    moment(value).isAfter(getFieldValue("start_time"))
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("End time should be after start time")
                  );
                },
              }),
            ]}
          >
            <TimePicker
              format="HH:mm"
              disabledHours={disabledHours}
              minuteStep={5}
              hourStep={1}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={t("teacher_id")}
          name="teacher_id"
          rules={[{ required: true, message: t("select_teacher") }]}
        >
          <Select placeholder={t("select_teacher")}>
            {allTeachers &&
              allTeachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CalendarModal;
