import React from 'react';
import {Button, Modal} from "antd";
import {FaRegTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const CalendarModal = ({handleHideModal, isEdit, handleEditEvent, handleCreateEvent, selectedEvent, showModal, handleDeleteEvent}) => {
    const {t} = useTranslation();
    return <Modal open={showModal} onOk={() => {
        isEdit ? handleEditEvent() : handleCreateEvent()}} onCancel={handleHideModal}>
            <h3>{t("event")}</h3>
        {isEdit && <Button type="primary" icon={<FaRegTrashAlt />} danger onClick={(e) => handleDeleteEvent(selectedEvent)} />}
        </Modal>
};

export default CalendarModal;