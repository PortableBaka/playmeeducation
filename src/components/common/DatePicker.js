import { DatePicker } from 'antd';
import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

export const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);
