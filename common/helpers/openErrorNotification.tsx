import { ExclamationOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const openErrorNotification = (message: string) => {
  const args = {
    message,
    duration: 5,
    icon: <ExclamationOutlined className="exclamation-icon" />,
  };
  notification.open(args);
};
