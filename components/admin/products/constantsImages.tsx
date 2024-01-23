import { Button, Image as ImageComp } from 'antd';
import { CopyOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { imageFallback } from 'common/constants';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleImageDelete, handleSelectedImage } from './helpers';
import styles from './products.module.scss';
import { AppDispatch } from 'redux/store';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';

export interface Image {
  /**  */
  id?: string;

  /**  */
  filename?: string;

  /**  */
  originalName?: string;

  /**  */
  mimeType?: string;

  /**  */
  size?: number;
  dispatch: AppDispatch;
  isProducts: boolean;
  setOpen: any;
  prodcutVariantIndex: number;
  offset: number;
}

export const columnsImages: ColumnsType<Image> = [
  {
    title: 'Изображения',
    dataIndex: 'images',
    render: (_, record) => {
      return (
        <ImageComp
          className={styles.productsTable__contentStyle}
          src={`/api/images/${record.filename}`}
          fallback={imageFallback}
        />
      );
    },
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'originalName',
    width: '25%',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    width: '30%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <>
          <ActionButtons
            id={record.filename as string}
            handleDelete={() =>
              handleImageDelete(
                record.filename!,
                record.dispatch,
                record.offset,
              )
            }
            option={'images'}
            title="Изображения"
          />

          <Button
            type="default"
            shape="circle"
            style={{ marginLeft: '10px' }}
            icon={<CopyOutlined />}
            onClick={() => {
              if (!navigator?.clipboard) {
                console.warn('Clipboard not supported');
                openErrorNotification('Нажмите, чтобы скопировать URL');
                return false;
              }
              navigator.clipboard.writeText(`/api/images/${record.filename}`);
              openSuccessNotification('URL скопирован');
            }}
          />
          <Button
            type="default"
            shape="circle"
            icon={<EditOutlined />}
            style={{ marginLeft: '10px' }}
            onClick={() =>
              handleSelectedImage(
                record.filename!,
                record.dispatch,
                record.isProducts,
                record.setOpen,
                record.prodcutVariantIndex,
              )
            }
          />
        </>
      );
    },
    width: '10%',
  },
];
