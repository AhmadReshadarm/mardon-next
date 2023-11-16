import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Size } from 'swagger/services';
import styles from './sizes.module.scss';
import { handleFormSubmit } from './helpers';
import { ManageSizeFields } from './ManageSizeFields.enum';
import FormItem from '../generalComponents/FormItem';
import { useEffect, useState } from 'react';
import { handleFalsyValuesCheck } from '../../../common/helpers/handleFalsyValuesCheck.helper';

const { Option } = Select;

type Props = {
  size?: Size;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageSizeForm = ({
  title,
  size,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (size) {
      setName(size?.name);
      setUrl(size?.url);
    }
  }, [size]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: size?.name,
    url: size?.url,
  };

  const isDisabled: boolean = handleFalsyValuesCheck(name, url);

  return (
    <>
      <div className={styles.createSizeHeader}>
        <h1 className={styles.createSizeHeader__title}>{title}</h1>
      </div>
      {(isLoading || !size) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createSizeForm}
        >
          <FormItem
            option={ManageSizeFields.Name}
            children={
              <Input
                required={true}
                placeholder="Введите имя Размер"
                onChange={(e) => setName(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageSizeFields.Url}
            children={
              <Input
                required={true}
                placeholder="Введите URL Размер"
                onChange={(e) => setUrl(e.target.value)}
              />
            }
          />
          <Form.Item className={styles.createSizeForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createSizeForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              disabled={isDisabled}
            >
              {size ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_SIZES)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageSizeForm;
