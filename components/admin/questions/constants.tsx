import { Carousel, Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { imageFallback } from 'common/constants';
import { Product, Tag } from 'swagger/services';
import { handleRedirectBrands } from '../brands/helpers';
import { handleRedirectCategory } from '../categories/helpers';

import TableLink from '../products/TableLink';
import { handleRedirectTags } from '../tags/helpers';
import styles from './products.module.scss';
import { EditRedirectBtn } from './EditRedirectBtn';

export const columns: ColumnsType<Product> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '3.5%',
  },
  {
    title: 'Изображения',
    dataIndex: 'images',
    render: (_, record) => {
      if (record.productVariants) {
        const imagesString = record.productVariants[0]
          ? record.productVariants[0].images
          : '';
        const images = imagesString?.split(', ');
        return (
          <div
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <Carousel effect="fade">
              {(images as unknown as string[])?.map((image) => {
                if (image) {
                  return (
                    <div>
                      <Image
                        className={styles.productsTable__contentStyle}
                        src={`/api/images/${image.trim()}`}
                        fallback={imageFallback}
                      />
                    </div>
                  );
                }
                return (
                  <img src="/img_not_found.png" className={styles.image} />
                );
              })}
            </Carousel>
          </div>
        );
      }
    },
    width: '10%',
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '7.5%',
  },
  {
    title: 'Категория',
    render: (_, record) => {
      return (
        <TableLink
          id={record.category!.id as string}
          name={record.category!.name as string}
          handleRedirect={handleRedirectCategory}
        />
      );
    },
    width: '7.5%',
  },
  {
    title: 'Бренд',
    render: (_, record) => {
      return (
        <TableLink
          id={record.brand!.id as string}
          name={record.brand!.name as string}
          handleRedirect={handleRedirectBrands}
        />
      );
    },
    width: '7.5%',
  },
  // {
  //   title: 'URL',
  //   dataIndex: 'url',
  // },
  {
    title: 'Теги',
    dataIndex: 'tags',
    render: (_, record) => {
      return (
        <ul>
          {(record?.tags as Tag[]).map((tag) => (
            <li key={tag.id}>
              <TableLink
                id={tag!.id as string}
                name={tag!.name as string}
                handleRedirect={handleRedirectTags}
              />
            </li>
          ))}
        </ul>
      );
    },
    width: '7.5%',
  },
  {
    title: 'Действия',
    render: (_, record) => {
      return <EditRedirectBtn id={record.url} />;
    },
    width: '7.5%',
  },
];
