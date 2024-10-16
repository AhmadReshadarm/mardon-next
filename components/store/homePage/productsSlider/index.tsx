import color from 'components/store/lib/ui.colors';
import { Container } from 'components/store/storeLayout/common';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { useEffect, useState } from 'react';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { TCartState } from 'redux/types';
import Link from 'next/link';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Image from 'next/image';
import { Product } from 'swagger/services';
type Props = {
  caroselProducts: Product[];
};
const ProductsSlider: React.FC<Props> = ({ caroselProducts }) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  // ------------------- UI hooks --------------------------------

  const [caroselIndex, setCaroselIndex] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isMouseHover, setISMouseHover] = useState<boolean>(false);
  const [loadingComplet, setLoadingComplet] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (caroselProducts.length - 1 > caroselIndex && !isMouseHover) {
        setCaroselIndex(caroselIndex + 1);
        setFirstLoad(false);
      }
      if (caroselProducts.length - 1 <= caroselIndex && !isMouseHover) {
        setCaroselIndex(0);
        setFirstLoad(false);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [caroselIndex, isMouseHover]);
  // ------------------------------------------------------------------

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFirstLoad(false);
  //   }, 14000);
  // }, []);

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
      onMouseEnter={() => {
        setISMouseHover(true);
      }}
      onMouseLeave={() => {
        setISMouseHover(false);
      }}
      onTouchStart={() => {
        setISMouseHover(true);
        setISMouseHover(true);
      }}
      onTouchEnd={() => {
        setISMouseHover(false);
      }}
    >
      <Wrapper>
        <>
          {caroselProducts.map((product, index) => {
            const images = getProductVariantsImages(product?.productVariants);
            return (
              <>
                {caroselIndex === index ? (
                  <Content>
                    <div className="product-cart-wrapper">
                      <div className="cart-title-n-action-buttons-wrapper">
                        <div className="cart-title-n-action-buttons-content">
                          <div className="title-n-index-indecator-top-wrapper">
                            <div className="index-indecator-top"></div>
                            <Link href={`/product/${product?.url}`}>
                              <h1 title={product?.name}>{`${
                                product?.name?.length! > 40
                                  ? product?.name?.slice(0, 40) + '...'
                                  : product?.name
                              }`}</h1>
                            </Link>
                          </div>
                          <div className="cart-price-n-action-button-wrapper">
                            <div className="artical-Wrapper">
                              <span>Артикул: </span>
                              <span>
                                {product?.productVariants![0].artical!.toLocaleUpperCase()}
                              </span>
                            </div>
                            <div className="price-wrapper">
                              {product?.productVariants![0].oldPrice ? (
                                <span className="old-price">
                                  {`${product?.productVariants![0].oldPrice}`} ₽
                                </span>
                              ) : (
                                ''
                              )}
                              <span>
                                {`${product?.productVariants![0].price}`} ₽
                              </span>
                            </div>
                            <div className="action-buttons-wrapper">
                              <AddToWishlist product={product!} />
                              <AddToCart
                                product={product!}
                                qty={findCartQTY(product, cart!)}
                                variant={product?.productVariants![0]}
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
                                  onClick={() => {
                                    setCaroselIndex(index);
                                    setISMouseHover(true);
                                    setFirstLoad(false);
                                  }}
                                ></span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <Link href={`/product/${product?.url}`}>
                        <div className="cart-image-wrapper">
                          <ul className="images-scroll-wrapper">
                            {images.map((image, index) => {
                              return (
                                <li
                                  onMouseOver={() => {
                                    setImageIndex(index);
                                    setFirstLoad(false);
                                  }}
                                  className="image-index"
                                ></li>
                              );
                            })}
                          </ul>
                          <LoaderMask
                            style={{
                              display: loadingComplet ? 'none' : 'flex',
                            }}
                          />

                          {firstLoad ? (
                            <Image
                              style={{ opacity: loadingComplet ? 1 : 0 }}
                              src={`/api/images/compress/${
                                images[imageIndex]
                              }?qlty=1&width=${
                                windowWidth < 1024 ? windowWidth : 1080
                              }&height=${
                                windowWidth < 1024 ? windowWidth : 1080
                              }&lossless=false`}
                              alt={product?.name!}
                              width={1080}
                              height={1080}
                              priority={caroselIndex === index ? true : false}
                              onLoadingComplete={() => {
                                setLoadingComplet(true);
                                setTimeout(() => {
                                  setFirstLoad(false);
                                }, 14000);
                              }}
                            />
                          ) : (
                            <Image
                              style={{ opacity: loadingComplet ? 1 : 0 }}
                              src={`/api/images/${images[imageIndex]}`}
                              alt={product?.name!}
                              width={1080}
                              height={1080}
                              priority={caroselIndex === index ? true : false}
                              onLoadingComplete={() => setLoadingComplet(true)}
                            />
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="product-description-wrapper">
                      <div className="indecator-wrapper">
                        <div className="index-indecator-top"></div>
                      </div>
                      <Link href={`/product/${product?.url}`}>
                        <h1 title={product?.name}>{`${
                          product?.name?.length! > 40
                            ? product?.name?.slice(0, 40) + '...'
                            : product?.name
                        }`}</h1>
                      </Link>
                      <div className="artical-Wrapper">
                        <span>Артикул: </span>
                        <span>
                          {product?.productVariants![0].artical!.toLocaleUpperCase()}
                        </span>
                      </div>
                      <span>
                        {product?.desc?.includes('|')
                          ? product?.desc?.split('|')[0]?.length! > 150
                            ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                            : product?.desc?.split('|')[0]
                          : product?.desc?.length! > 150
                          ? product?.desc?.slice(0, 150) + '...'
                          : product?.desc?.slice(0, 150)}
                      </span>
                    </div>
                  </Content>
                ) : (
                  ''
                )}
              </>
            );
          })}
        </>
      </Wrapper>
    </Container>
  );
};

const LoaderMask = styled.div`
  width: 100%;
  height: 100%;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

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

    .not-found {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: contain;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }

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
            cursor: pointer;
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
