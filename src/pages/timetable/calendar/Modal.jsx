import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {retrieveAllTeachersData} from "../../../store/employeesSlice";
import {EventType} from "../../../common/types";
import {FaRegTrashAlt} from "react-icons/fa";
import {MyDatePicker} from "../../../components/common/DatePicker";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {allTeachers} = useSelector(state => state?.employee)

    useEffect(() => {
        dispatch(retrieveAllTeachersData(localStorage.getItem("selectedBranchId")));
    }, [dispatch, retrieveAllTeachersData])

    useEffect(() => {
        if (isEdit && selectedEvent) {
            form.setFieldsValue({
                name: selectedEvent.name,
                description: selectedEvent.description,
                date: moment(selectedEvent.date, "YYYY-MM-DD"),
                start_time: moment(selectedEvent.start_time),
                end_time: moment(selectedEvent.end_time),
                event_type: selectedEvent.event_type,
                teacher_id: selectedEvent.teacher_id,
            });
        } else {
            if(selectedEvent) form.setFieldsValue({
                date: moment(selectedEvent.date, "YYYY-MM-DD"),
                start_time: moment(selectedEvent.start_time),
                end_time: moment(selectedEvent.end_time),
            });
            else form.resetFields()
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
                    id: selectedEvent.id
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

    return (
        <Modal
            open={showModal}
            title={isEdit ? t("edit_event") : t("create_event")}
            onCancel={handleHideModal}
            footer={[
                <Button key="cancel" onClick={handleHideModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {isEdit ? t("save_changes") : t("create_event")}
                </Button>,
            ]}
        >
            <Form layout="vertical" form={form}>
                {isEdit && (
                    <Button
                        icon={<FaRegTrashAlt />}
                        key={"delete"}
                        type="primary"
                        danger
                        onClick={() => handleDeleteEvent(selectedEvent)}
                    />
                )}
                <Form.Item
                    label={t("event_type")}
                    name="event_type"
                    rules={[{ required: true, message: t("select_event_type") }]}
                >
                    <Select defaultValue={EventType.EVENT} placeholder={t("select_event_type")}>
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
                    rules={[{ required: true, message: t("insert_name")}]}
                >
                    <Input placeholder={t("insert_name")} />
                </Form.Item>

                <Form.Item
                    label={t("description")}
                    name="description"
                    rules={[{ required: true, message: t("insert_description") }]}
                >
                    <Input.TextArea placeholder={t("insert_description")} />
                </Form.Item>

                <Form.Item
                    label={t("date")}
                    name="date"
                    rules={[{ required: true, message: t("select_date") }]}
                >
                    <MyDatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label={t("start_time")}
                    name="start_time"
                    rules={[{ required: true, message: t("select_start_time") }]}
                >
                    <TimePicker format="HH:mm" onChange={(v) => {
                        selectedEvent.start_time = moment(v).format();
                    }} minuteStep={5} hourStep={1} />
                </Form.Item>

                <Form.Item
                    label={t("end_time")}
                    name="end_time"
                    rules={[{ required: true, message: t("select_end_time") }]}
                >
                    <TimePicker format="HH:mm" onChange={(v) => {
                        selectedEvent.end_time = moment(v).format();
                    }} minuteStep={5} hourStep={1} />
                </Form.Item>

                <Form.Item
                    label={t("teacher_id")}
                    name="teacher_id"
                    rules={[{ required: true, message: t("select_teacher") }]}
                >
                    <Select placeholder={t("select_teacher")}>
                        {allTeachers && allTeachers?.map((teacher) => (
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