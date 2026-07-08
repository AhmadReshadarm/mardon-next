import { Form, Switch } from 'antd';

type Props = {
  title: string;
  onChange: (values: string) => void;
};

const ToggleFilter: React.FC<Props> = ({ title, onChange }) => {
  const handleChange = (evt) => {
    onChange(evt);
  };

  return (
    <Form.Item
      style={{ alignSelf: 'flex-start' }}
      label={title}
      valuePropName="checked"
    >
      <Switch onChange={handleChange} />
    </Form.Item>
  );
};

export default ToggleFilter;
