import styled from 'styled-components';
import { MutableRefObject, useState, useEffect } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Images from './images';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Product } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';
import ShareToSocial from './details/ShareToSocial';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import ArrowGray from '../../../../assets/arrowGray.svg';
import Link from 'next/link';
import DropDowns from './details/DropDowns';
type Props = {
  product?: Product;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
};

type StyleProps = {
  width: string;
};

const ProductInfo: React.FC<Props> = ({ product, reviewRef, questionRef }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const images = getProductVariantsImages(product?.productVariants);

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

  return (
    <Container
      key="container-product-section-one"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="30px 0"
      bg_color={color.textPrimary}
      initial="start"
      animate="middle"
      exit="end"
      variants={variants.fadInOut}
      transition={{ when: 'afterChildren' }}
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="80px"
        >
          <NavWrapper width={`calc(${windowWidth}px - 100px)`}>
            <div className="nav-rightWrapper">
              <Link href="/">
                <img src="/icons/back_arrow.png" alt="back button" />
                <span>Обратно на главную</span>
              </Link>
              <span>/</span>
              {!!product?.category?.parent && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent.url}`}
                >
                  <span title={product?.category?.parent?.name}>
                    {product?.category?.parent?.name?.length! > 16
                      ? `${product?.category?.parent?.name?.slice(0, 16)}..`
                      : product?.category?.parent?.name}
                  </span>
                </Link>
              )}
              <span>
                <ArrowGray />
              </span>
              {!!product?.category && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent?.url}&subCategories=${product?.category?.url}`}
                >
                  <span title={product?.category?.name}>
                    {product?.category?.name?.length! > 20
                      ? `${product?.category?.name?.slice(0, 20)}..`
                      : product?.category?.name}
                  </span>
                </Link>
              )}
              <span>
                <ArrowGray />
              </span>
              {!!product?.brand && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent?.url}&subCategories=${product?.category?.url}&&brands=${product?.brand?.url}`}
                >
                  <span title={product?.brand?.name}>
                    {product?.brand?.name?.length! > 20
                      ? `${product?.brand?.name?.slice(0, 20)}..`
                      : product?.brand?.name}
                  </span>
                </Link>
              )}
            </div>
            <ShareToSocial
              title={product?.name}
              image={images[0]}
              productId={product?.id}
              description={product?.desc}
            />
          </NavWrapper>
          <ContentCotainer>
            <div className="product-title-wrappre">
              <h1>{product?.name}</h1>
            </div>
            <div className="product-background">
              <div className="left-side"></div>
              <div className="right-side"></div>
            </div>
            <Grid>
              <Images
                product={product}
                images={images}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                paginateImage={paginateImage}
                direction={direction}
                page={page}
                setPage={setPage}
              />
              <Details
                product={product}
                selectedIndex={selectedIndex}
                paginateImage={paginateImage}
                reviewRef={reviewRef}
                questionRef={questionRef}
                setSelectedIndex={setSelectedIndex}
              />
            </Grid>
          </ContentCotainer>
          <DropDowns
            parameterProducts={product?.parameterProducts}
            description={product?.desc}
          />
        </Content>
      </Wrapper>
    </Container>
  );
};

const ContentCotainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  border-radius: 10px;
  position: relative;
  .product-title-wrappre {
    padding: 75px;
    z-index: 2;
    width: 78%;
    h1 {
      font-family: Anticva;
      font-weight: 100;
      font-size: 2.25rem;
    }
  }
  .product-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .left-side {
      width: 100%;
      height: 100%;
      background-color: ${color.bgProductSecondry};
    }
    .right-side {
      width: 100%;
      height: 100%;
      background-color: ${color.bgProduct};
    }
  }
  @media ${devices.laptopS} {
    .product-title-wrappre {
      padding: 40px 20px;
      width: 100%;
      h1 {
        font-size: 2rem;
      }
    }
  }
  @media ${devices.mobileL} {
    .product-title-wrappre {
      padding: 40px 10px;
      width: 100%;
      h1 {
        font-size: 2rem;
      }
    }
  }
  @media ${devices.mobileM} {
    .product-title-wrappre {
      padding: 40px 10px;
      width: 100%;
      h1 {
        font-size: 2rem;
      }
    }
  }
  @media ${devices.mobileS} {
    .product-title-wrappre {
      padding: 40px 10px;
      width: 100%;
      h1 {
        font-size: 2rem;
      }
    }
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  user-select: none;
  z-index: 2;
  @media ${devices.laptopS} {
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

const NavWrapper = styled.div`
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
    img {
      width: 40px;
    }
    span {
      font-family: 'Jost';
      white-space: nowrap;
    }
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
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
