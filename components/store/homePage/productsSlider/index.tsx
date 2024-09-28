import color from 'components/store/lib/ui.colors';
import { Container } from 'components/store/storeLayout/common';
import { useAppSelector } from 'redux/hooks';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { useEffect, useState } from 'react';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { TCartState } from 'redux/types';
import Link from 'next/link';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { useInViewportNoDelay } from 'components/store/storeLayout/useInViewport';
import Image from 'next/image';
import Loader from './Loader';
import { Product } from 'swagger/services';
type Props = {
  caroselProducts: Product[];
};
const ProductsSlider: React.FC<Props> = ({ caroselProducts }) => {
  const { isInViewport, ref } = useInViewportNoDelay();

  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  // ------------------- UI hooks --------------------------------

  const [caroselIndex, setCaroselIndex] = useState<number>(0);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState('');

  const [isMouseHover, setISMouseHover] = useState<boolean>(false);
  const [indecatorIndex, setIndexIndecator] = useState<number>(0);
  useEffect(() => {
    setCurrentProduct(caroselProducts[caroselIndex]);
    setImages(getProductVariantsImages(currentProduct?.productVariants));
  }, []);
  // caroselProducts
  useEffect(() => {
    let timer;
    if (!isMouseHover) {
      timer = setTimeout(() => {
        if (caroselProducts.length - 1 > caroselIndex) {
          setCaroselIndex(caroselIndex + 1);
        }
        if (caroselProducts.length - 1 <= caroselIndex) {
          setCaroselIndex(0);
        }
      }, 15000);
    }
    return () => {
      if (isMouseHover) clearTimeout(timer);
    };
  });
  useEffect(() => {
    setCurrentProduct(caroselProducts[caroselIndex]);
    handleIndexIndecator(caroselIndex);
  }, [caroselIndex]);
  useEffect(() => {
    setImages(getProductVariantsImages(currentProduct?.productVariants));
  }, [currentProduct]);
  const handleIndexIndecator = (caroselIndex) => {
    switch (caroselIndex) {
      case 0:
        setIndexIndecator(0);
        break;
      case 1:
        setIndexIndecator(50);
        break;
      case 2:
        setIndexIndecator(100);
        break;
      case 3:
        setIndexIndecator(150);
        break;
      case 4:
        setIndexIndecator(200);
        break;
      default:
        setIndexIndecator(0);
        break;
    }
  };

  const [userIntract, setUserIntract] = useState(false);
  useEffect(() => {
    setUserIntract(true);
  }, [currentProduct, imageIndex]);

  useEffect(() => {
    setImageSrc(
      `${userIntract ? '/api/images/' : '/temp/'}${images[imageIndex]}`,
    );
  }, [images, imageIndex]);

  useEffect(() => {
    setImageSrc(
      `${userIntract ? '/api/images/' : '/temp/'}${images[imageIndex]}`,
    );
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="product-slider-main-page"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="column"
      justify_content="center"
      align_items="center"
      padding="0"
      bg_color={color.backgroundPrimary}
      ref={ref}
      onMouseEnter={() => setUserIntract(true)}
    >
      <Wrapper
        onMouseOver={() => setISMouseHover(true)}
        onMouseLeave={() => setISMouseHover(false)}
      >
        {isInViewport && currentProduct !== null ? (
          <>
            <Content>
              <div className="product-cart-wrapper">
                <div className="cart-title-n-action-buttons-wrapper">
                  <div className="cart-title-n-action-buttons-content">
                    <div className="title-n-index-indecator-top-wrapper">
                      <motion.div
                        animate={{ x: indecatorIndex }}
                        className="index-indecator-top"
                      ></motion.div>
                      <Link href={`/product/${currentProduct?.url}`}>
                        <h1 title={currentProduct?.name}>{`${
                          currentProduct?.name?.length! > 40
                            ? currentProduct?.name?.slice(0, 40) + '...'
                            : currentProduct?.name
                        }`}</h1>
                      </Link>
                    </div>
                    <div className="cart-price-n-action-button-wrapper">
                      <div className="artical-Wrapper">
                        <span>Артикул: </span>
                        <span>
                          {currentProduct?.productVariants[0].artical.toLocaleUpperCase()}
                        </span>
                      </div>
                      <div className="price-wrapper">
                        {currentProduct?.productVariants![0].oldPrice ? (
                          <span className="old-price">
                            {`${currentProduct?.productVariants![0].oldPrice}`}{' '}
                            ₽
                          </span>
                        ) : (
                          ''
                        )}
                        <span>
                          {`${currentProduct?.productVariants![0].price}`} ₽
                        </span>
                      </div>
                      <div className="action-buttons-wrapper">
                        <AddToWishlist product={currentProduct!} />
                        <AddToCart
                          product={currentProduct!}
                          qty={findCartQTY(currentProduct, cart!)}
                          variant={currentProduct?.productVariants![0]}
                        />
                      </div>
                    </div>
                    <div className="dots-indecator-wrapper">
                      {caroselProducts.map((product, index) => {
                        return (
                          <span
                            className={`dots-indecator ${
                              caroselIndex == index ? 'active' : ''
                            }`}
                          ></span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <Link href={`/product/${currentProduct?.url}`}>
                  <div className="cart-image-wrapper">
                    <ul className="images-scroll-wrapper">
                      {images.map((image, index) => {
                        return (
                          <li
                            onMouseOver={() => setImageIndex(index)}
                            className="image-index"
                          ></li>
                        );
                      })}
                    </ul>

                    <Image
                      // onError={() => setImageSrc('/img_not_found.png')}
                      src={imageSrc}
                      alt={currentProduct?.name}
                      width={1080}
                      height={1080}
                      priority={true}
                    />
                  </div>
                </Link>
              </div>
              <div className="product-description-wrapper">
                <div className="indecator-wrapper">
                  <motion.div
                    animate={{ x: indecatorIndex }}
                    className="index-indecator-top"
                  ></motion.div>
                </div>
                <Link href={`/product/${currentProduct?.url}`}>
                  <h1 title={currentProduct?.name}>{`${
                    currentProduct?.name?.length! > 40
                      ? currentProduct?.name?.slice(0, 40) + '...'
                      : currentProduct?.name
                  }`}</h1>
                </Link>
                <div className="artical-Wrapper">
                  <span>Артикул: </span>
                  <span>
                    {currentProduct?.productVariants[0].artical.toLocaleUpperCase()}
                  </span>
                </div>
                <span>
                  {currentProduct?.desc?.includes('|')
                    ? currentProduct?.desc?.split('|')[0]?.length! > 150
                      ? currentProduct?.desc?.split('|')[0].slice(0, 150) +
                        '...'
                      : currentProduct?.desc?.split('|')[0]
                    : currentProduct?.desc?.length! > 150
                    ? currentProduct?.desc?.slice(0, 150) + '...'
                    : currentProduct?.desc?.slice(0, 150)}
                </span>
              </div>
            </Content>
          </>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media ${devices.laptopL} {
    max-width: 1230px;
  }
  @media ${devices.laptopM} {
    max-width: 1230px;
  }
  @media ${devices.laptopS} {
    max-width: unset;
  }
  @media ${devices.tabletL} {
    max-width: unset;
  }
  @media ${devices.tabletS} {
    max-width: unset;
  }
  @media ${devices.mobileL} {
    max-width: unset;
  }
  @media ${devices.mobileM} {
    max-width: unset;
  }
  @media ${devices.mobileS} {
    max-width: unset;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .product-cart-wrapper {
    width: 100%;
    height: 450px;
    min-height: 450px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    background-color: ${color.productCart};
    border: 1px #e5e2d9;
    .cart-title-n-action-buttons-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 30px;
      .cart-title-n-action-buttons-content {
        width: 95%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .title-n-index-indecator-top-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 15px;
          overflow: hidden;
          .index-indecator-top {
            width: 50px;
            height: 3px;
            background-color: ${color.activeIcons};
          }
          h1 {
            font-family: ricordi;
            font-size: 1.5rem;
            &:hover {
              color: ${color.textBase};
            }
          }
        }
        .cart-price-n-action-button-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 15px;
          .price-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 15px;
            span {
              color: ${color.textSecondary};
              font-size: 1.5rem;
            }
            .old-price {
              color: ${color.textBase};
              text-decoration: line-through;
              font-size: 1rem;
            }
          }
          .artical-Wrapper {
            display: none;
            width: 100%;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 5px;
            span {
              font-weight: 600;
            }
          }
          .action-buttons-wrapper {
            width: 110%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
          }
        }
        .dots-indecator-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          .dots-indecator {
            width: 6px;
            height: 6px;
            border: 1px solid;
            border-radius: 50%;
          }
          .active {
            background-color: ${color.activeIcons};
          }
        }
      }
    }
    .cart-image-wrapper {
      width: 325px;
      height: 325px;
      min-width: 325px;
      min-height: 325px;
      position: relative;
      .images-scroll-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-contet: center;
        background: transparent;
        .image-index {
          width: 100%;
          height: 100%;
          background: transparent;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .error_img {
        object-fit: contain;
        width: 90%;
        height: 100%;
      }
    }
  }
  .product-description-wrapper {
    width: 50%;
    height: 450px;
    min-height: 450px;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .indecator-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .index-indecator-top {
        width: 50px;
        height: 3px;
        background-color: ${color.activeIcons};
      }
    }
    .artical-Wrapper {
      display: flex;
      flex-directions: row;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      span {
        font-weight: 800;
      }
    }
    h1 {
      font-family: ricordi;
      font-size: 1.5rem;
      &:hover {
        color: ${color.textBase};
      }
    }
  }

  @media ${devices.laptopM} {
    flex-direction: column;
    .product-cart-wrapper {
      width: 100%;
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 90vw;
        height: 500px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 90vw;
        height: 500px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .action-buttons-wrapper {
              flex-direction: column;
              align-items: flex-end;
            }
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 90vw;
        height: 400px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .action-buttons-wrapper {
              flex-direction: column;
              align-items: flex-end;
            }
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 90vw;
        height: 400px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .action-buttons-wrapper {
              flex-direction: column;
              align-items: flex-end;
            }
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 90vw;
        height: 400px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .action-buttons-wrapper {
              flex-direction: column;
              align-items: flex-end;
            }
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 40px;
    .product-cart-wrapper {
      width: 100%;
      height: unset;
      flex-direction: column-reverse;
      padding: 0;
      .cart-image-wrapper {
        width: 85vw;
        height: 400px;
        min-width: unset;
        min-height: unset;
      }
      .cart-title-n-action-buttons-wrapper {
        padding: 20px 5px;
        .cart-title-n-action-buttons-content {
          justify-content: flex-start;
          gap: 50px;
          .cart-price-n-action-button-wrapper {
            .action-buttons-wrapper {
              flex-direction: column;
              align-items: flex-end;
            }
            .artical-Wrapper {
              display: flex;
            }
          }
        }
      }
    }
    .product-description-wrapper {
      width: 100%;
      padding: 0;
      min-height: unset;
      height: unset;
    }
  }
`;

export default ProductsSlider;
