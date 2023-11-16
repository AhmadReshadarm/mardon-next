import { CheckOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const openSuccessNotification = (message: string) => {
  const args = {
    message,
    duration: 5,
    icon: <CheckOutlined className="success-icon" />,
  };
  notification.open(args);
};
