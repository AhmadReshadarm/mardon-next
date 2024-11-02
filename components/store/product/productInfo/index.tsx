import styled from 'styled-components';
import { MutableRefObject, useState, useEffect } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import color from 'components/store/lib/ui.colors';
import Images from './images';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Product } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from 'ui-kit/FallbackRenderer';
import Image from 'next/image';
import { ArrowGraySVG, CloseSVGWhite } from 'assets/icons/UI-icons';
// import dynamic from 'next/dynamic';
import ShareToSocial from './details/ShareToSocial';
import DropDowns from './details/DropDowns';
// const DropDowns = dynamic(() => import('./details/DropDowns'));

type Props = {
  product?: Product;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  base64Image: any;
};

type StyleProps = {
  width: string;
};

const ProductInfo: React.FC<Props> = ({
  product,
  reviewRef,
  questionRef,
  base64Image,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const images = getProductVariantsImages(product?.productVariants);
  const [firstLoad, setFirstLoad] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const [isOrderNotify, setOrderNotify] = useState(false);
  // const [loadingComplet, setLoadingComplet] = useState(false);

  return (
    <Container
      key="container-product-section-one"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="30px 0"
      bg_color={color.textPrimary}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <Wrapper style={{ flexDirection: 'column' }}>
        <OrderNotifier style={{ display: !isOrderNotify ? 'flex' : 'none' }}>
          <span className="notifier-text">
            Оформить заказ можно без оплаты и без привязки банковской карты
          </span>
          <span
            onClick={() => {
              setOrderNotify(true);
            }}
            className="close-btn-wrapper "
          >
            <CloseSVGWhite />
          </span>
        </OrderNotifier>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="40px"
        >
          <NavWrapper width={`calc(${windowWidth}px - 100px)`}>
            <div className="nav-rightWrapper">
              <Link href="/" prefetch={false}>
                {/* <LoaderMask
                  style={{
                    width: '35px',
                    height: '15px',
                    display: loadingComplet ? 'none' : 'flex',
                  }}
                /> */}
                <Image
                  // style={{
                  //   opacity: loadingComplet ? 1 : 0,
                  //   position: loadingComplet ? 'inherit' : 'absolute',
                  //   zIndex: loadingComplet ? 1 : -1,
                  // }}
                  width={35}
                  height={15}
                  quality={20}
                  priority={true}
                  // loading="lazy"
                  src="/icons/back_arrow_min.png"
                  alt="Back to main arrow"
                  // onLoadingComplete={() => setLoadingComplet(true)}
                />
                <span>Обратно на главную</span>
              </Link>
              <span>/</span>
              {!!product?.category?.parent && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent.url}&page=1`}
                  prefetch={false}
                >
                  <span title={product?.category?.parent?.name}>
                    {product?.category?.parent?.name?.length! > 16 &&
                    windowWidth > 1024
                      ? `${product?.category?.parent?.name?.slice(0, 16)}..`
                      : product?.category?.parent?.name}
                  </span>
                </Link>
              )}
              <span>
                <ArrowGraySVG />
              </span>
              {!!product?.category && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent?.url}&page=1&subCategories=${product?.category?.url}`}
                  prefetch={false}
                >
                  <span title={product?.category?.name}>
                    {product?.category?.name?.length! > 16 && windowWidth > 1024
                      ? `${product?.category?.name?.slice(0, 16)}..`
                      : product?.category?.name}
                  </span>
                </Link>
              )}
              {!!product?.tags![0] &&
              product?.tags![0].url !== 'main_page' &&
              product?.tags![0].url !== 'best_product' &&
              product?.tags![0].url !== '-' ? (
                <>
                  <span>
                    <ArrowGraySVG />
                  </span>
                  <Link
                    href={`/catalog?categories=${product?.category?.parent?.url}&page=1&subCategories=${product?.category?.url}&tags=${product.tags[0].url}`}
                    prefetch={false}
                  >
                    <span title={product?.tags[0].name}>
                      {product?.tags[0]?.name?.length! > 16 &&
                      windowWidth > 1024
                        ? `${product?.tags[0]?.name?.slice(0, 16)}..`
                        : product?.tags[0]?.name}
                    </span>
                  </Link>
                </>
              ) : (
                ''
              )}
            </div>
            <ShareToSocial
              title={product?.name}
              image={images[0]}
              productId={product?.id}
              artical={variant?.artical}
            />
          </NavWrapper>
          <ContentCotainer>
            <Grid>
              <ErrorBoundary fallbackRender={FallbackRender}>
                <Images
                  product={product}
                  images={images}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  paginateImage={paginateImage}
                  direction={direction}
                  page={page}
                  setPage={setPage}
                  firstLoad={firstLoad}
                  setFirstLoad={setFirstLoad}
                  base64Image={base64Image}
                />
              </ErrorBoundary>
              <ErrorBoundary fallbackRender={FallbackRender}>
                <Details
                  product={product}
                  selectedIndex={selectedIndex}
                  paginateImage={paginateImage}
                  reviewRef={reviewRef}
                  questionRef={questionRef}
                  setSelectedIndex={setSelectedIndex}
                  setFirstLoad={setFirstLoad}
                />
              </ErrorBoundary>
            </Grid>
          </ContentCotainer>
          <DropDowns parameterProducts={product?.parameterProducts} />
        </Content>
      </Wrapper>
    </Container>
  );
};

export const ContentCotainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

export const OrderNotifier = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: cneter;
  padding: 0 0 25px 0;
  position: relative;
  .notifier-text {
    width: 100%;
    color: ${color.textPrimary};
    padding: 5px;
    text-align: center;
    background-color: ${color.activeIcons};
    font-size: 1.1rem;
  }
  .close-btn-wrapper {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  @media (min-width: 200px) and (max-width: 560px) {
    .close-btn-wrapper {
      right: 12px;
      top: 20px;
    }
  }
  @media (min-width: 200px) and (max-width: 640px) {
    .notifier-text {
      padding-right: 40px;
    }
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  user-select: none;
  z-index: 2;

  @media ${devices.laptopS} {
    grid-template-columns: 1fr;
  }
  @media ${devices.tabletL} {
    grid-template-columns: 1fr;
  }
  @media ${devices.tabletS} {
    grid-template-columns: 1fr;
  }

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
  }
  @media ${devices.mobileM} {
    grid-template-columns: 1fr;
  }

  @media ${devices.mobileS} {
    grid-template-columns: 1fr;
  }
`;

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .nav-rightWrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
  span {
    color: ${color.textSecondary};
  }
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    color: ${color.textSecondary};

    span {
      font-family: ver(--font-Jost);
      white-space: nowrap;
    }
  }
  @media ${devices.laptopM} {
    width: 95%;
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    .nav-rightWrapper {
      width: ${(p: StyleProps) => p.width};
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 8px 0;
      &::-webkit-scrollbar {
        height: 2px;
      }
    }
  }
`;

export default ProductInfo;
