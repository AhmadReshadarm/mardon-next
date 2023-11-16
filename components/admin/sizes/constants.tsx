import { ColumnsType } from 'antd/lib/table';
import { Size } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
// import { handleDeleteTag, handleRedirectTags } from './helpers';
import { handleDeleteSize, handleRedirectSizes } from './helpers';

const columns: ColumnsType<Size> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    width: '30%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteSize}
          handleRedirect={handleRedirectSizes}
          option={'sizes'}
          title="Размер"
        />
      );
    },
    width: '15%',
  },
];

export { columns };
