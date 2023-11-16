import { ColumnsType } from 'antd/lib/table';
import { News } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';
import { handleDeleteNewsPost, handleRedirectNewsPost } from './helpers';
import styles from './brands.module.scss';
import { Image } from 'antd';
import { imageFallback } from 'common/constants';

export const columns: ColumnsType<News> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Изображение',
    render: (_, record) => {
      if (record.image) {
        return (
          <Image
            src={`/api/images/${record?.image}`}
            className={styles.image}
            fallback={imageFallback}
          />
        );
      }
      return <img src="/img_not_found.png" className={styles.image} />;
    },
    width: '15%',
  },
  {
    title: 'Заголовок',
    render: (_, record) => {
      if (record.title) {
        return (
          <a href={`/news/${record.url}`}>
            <h4>
              {record.title.length > 50
                ? `${record.title.slice(0, 50)}...`
                : record.title.slice(0, 50)}
            </h4>
          </a>
        );
      }
    },
    width: '15%',
  },
  {
    title: 'Краткое описание',
    render: (_, record) => {
      if (record.description) {
        return (
          <p>
            {record.description.length > 80
              ? `${record.description.slice(0, 80)}...`
              : record.description.slice(0, 80)}
          </p>
        );
      }
    },
    width: '25%',
  },
  // {
  //   title: 'URL',
  //   dataIndex: 'url',
  //   width: '20%',
  // },
  {
    title: 'На главной странице',
    dataIndex: 'showOnMain',
    render: (_, record) => {
      return <span>{record.showOnMain ? 'Да' : 'Нет'}</span>;
    },
    width: '10%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return (
        <ActionButtons
          id={record.id as string}
          handleDelete={handleDeleteNewsPost}
          handleRedirect={handleRedirectNewsPost}
          option={'newsPosts'}
          title="Новости"
        />
      );
    },
    width: '15%',
  },
];
