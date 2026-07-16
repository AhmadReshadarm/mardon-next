import { MutableRefObject, useState, useRef } from 'react';
import Images from './images';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Product } from 'swagger/services';
import Link from 'next/link';
import Image from 'next/image';
import ShareToSocial from './details/ShareToSocial';
import DropDowns from './details/DropDowns';
import styles from '../styles/productInfoMain.module.css';
import { BRAND_BLUR_DATA_URL } from 'common/constant';

type Props = {
  product: Product;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  base64Image: any;
  images: string[];
};

const ProductInfo: React.FC<Props> = ({
  product,
  reviewRef,
  questionRef,
  base64Image,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const tagURl = product?.tags!.filter((tag) => {
    if (
      tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)main_page(?:$|\W)/) ||
      tag.url == '-' ||
      tag.url == '_' ||
      tag.url == ' '
    ) {
      return;
    }
    return tag;
  });

  const descRef = useRef(null);

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <div className={styles.NavWrapper}>
            <div className={styles.nav_rightWrapper}>
              <Link href="/" prefetch={false}>
                <Image
                  width={35}
                  height={15}
                  quality={20}
                  priority={false}
                  src={'/icons/back_arrow_min_35x16.png'}
                  placeholder="blur"
                  blurDataURL={BRAND_BLUR_DATA_URL}
                  alt="Back to main arrow"
                />
                <span>Обратно на главную</span>
              </Link>
              <span>/</span>
              {!!product?.category?.parent && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent.url}&page=1`}
                  prefetch={false}
                >
                  <span
                    className={styles.truncatedText}
                    title={product?.category?.parent?.name}
                  >
                    {product?.category?.parent?.name}
                  </span>
                </Link>
              )}
              <span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                    stroke="#AAB4BD"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {!!product?.category && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent?.url}&page=1&subCategories=${product?.category?.url}`}
                  prefetch={false}
                >
                  <span
                    className={styles.truncatedText}
                    title={product?.category?.name}
                  >
                    {product?.category?.name}
                  </span>
                </Link>
              )}
              {tagURl?.length !== 0 ? (
                <>
                  <span>
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                        stroke="#AAB4BD"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <Link
                    href={`/catalog?categories=${
                      product?.category?.parent?.url
                    }&page=1&subCategories=${product?.category?.url}&tags=${
                      tagURl![0].url
                    }`}
                    prefetch={false}
                  >
                    <span
                      className={styles.truncatedText}
                      title={tagURl![0].name}
                    >
                      {tagURl![0].name}
                    </span>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
            <ShareToSocial product={product} />
          </div>
          <div className={styles.ContentCotainer}>
            <div className={styles.Grid}>
              <Images
                product={product}
                images={images}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                paginateImage={paginateImage}
                direction={direction}
                page={page}
                setPage={setPage}
                base64Image={base64Image}
              />
              <Details
                product={product}
                reviewRef={reviewRef}
                questionRef={questionRef}
                setSelectedIndex={setSelectedIndex}
                descRef={descRef}
              />
            </div>
          </div>
          <DropDowns descRef={descRef} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
