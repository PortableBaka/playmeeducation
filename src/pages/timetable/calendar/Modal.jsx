import React from 'react';
import {Button, Modal} from "antd";
import {FaRegTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const CalendarModal = ({handleHideModal, selectedEvent, showModal, handleDeleteEvent}) => {
    const {t} = useTranslation();
    return <Modal open={showModal} onCancel={handleHideModal}>
            <Button type="primary" icon={<FaRegTrashAlt />} danger onClick={(e) => handleDeleteEvent(selectedEvent)}>
                {t("delete")}
            </Button>
        </Modal>
};

export default CalendarModal;