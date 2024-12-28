import { t } from "i18next";

export const FormErrors = (formData, newErrors) => {
  if (!formData.name) {
    newErrors.name = t("required_field_message");
  }
  if (!formData.phone_number) {
    newErrors.phone_number = t("required_field_message");
  }
  if (!formData.payment_amount) {
    newErrors.payment_amount = t("required_field_message");
  }
  if (!formData.kindergarden_admin_username) {
    newErrors.kindergarden_admin_username = t("required_field_message");
  }
  if (!formData.kindergarden_admin_password) {
    newErrors.kindergarden_admin_password = t("required_field_message");
  }
  if (!formData.group_id) {
    newErrors.group_id = t("children_will_see_posts");
  }
};

export const FormErrorLibrary = (formData, newErrors) => {
  if (!formData.file_name) {
    newErrors.file_name = t("required_field_message");
  }
  if (!formData.description) {
    newErrors.description = t("required_field_message");
  }
};

export const FormErrorStudents = (formData, newErrors) => {
  if (!formData.student_name) {
    newErrors.student_name = t("required_field_message");
  }
  if (!formData.birth_date) {
    newErrors.birth_date = t("required_field_message");
  }
  if (!formData.group_id) {
    newErrors.group_id = t("required_field_message");
  }
  if (!formData.parent_name) {
    newErrors.parent_name = t("required_field_message");
  }
  if (!formData.phone_number) {
    newErrors.phone_number = t("required_field_message");
  }
  if (!formData.username) {
    newErrors.username = t("required_field_message");
  }
  if (!formData.password) {
    newErrors.password = t("required_field_message");
  }
};
