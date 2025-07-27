import { DatePicker } from "antd";
import momentGenerateConfig from "rc-picker/lib/generate/moment";

export const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);
