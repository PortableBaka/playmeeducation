import { Alert, Button, Modal } from "antd";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const ExitModal = ({ isOpen, onConfirm, onCancel, message, description }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onCancel={onCancel} className="modalConfirm">
      <div className="deletePopover">
        <Alert
          description={description}
          message={message}
          banner
          className="deleteAlert"
        />
        <div className="btnGroup">
          <Button onClick={onCancel}>{t("cancel")}</Button>
          <Button type="primary" onClick={onConfirm}>
            {t("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitModal;
