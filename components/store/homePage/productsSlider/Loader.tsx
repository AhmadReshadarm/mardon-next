import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Content>
      <div className="product-cart-wrapper">
        <div className="cart-title-n-action-buttons-wrapper">
          <div className="cart-title-n-action-buttons-content">
            <div className="title-n-index-indecator-top-wrapper">
              <h1>
                {<LoaderMask style={{ width: '200px', height: '30px' }} />}
              </h1>
            </div>
            <div className="cart-price-n-action-button-wrapper">
              <div className="artical-Wrapper">
                <span>
                  {<LoaderMask style={{ width: '150px', height: '20px' }} />}
                </span>
              </div>
              <div className="price-wrapper">
                <span className="old-price">
                  {<LoaderMask style={{ width: '50px', height: '10px' }} />}
                </span>

                <span>
                  {<LoaderMask style={{ width: '50px', height: '10px' }} />}
                </span>
              </div>
              <div className="action-buttons-wrapper">
                {
                  <LoaderMask
                    style={{
                      width: '150px',
                      height: '50px',
                      borderRadius: '30px',
                    }}
                  />
                }
                {
                  <LoaderMask
                    style={{
                      width: '150px',
                      height: '50px',
                      borderRadius: '30px',
                    }}
                  />
                }
              </div>
            </div>
          </div>
        </div>

        <div className="cart-image-wrapper">
          {
            <LoaderMask
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
        </div>
      </div>
      <div className="product-description-wrapper">
        <h1>{<LoaderMask style={{ width: '200px', height: '30px' }} />}</h1>
        <div className="artical-Wrapper">
          <span>
            {<LoaderMask style={{ width: '150px', height: '20px' }} />}
          </span>
        </div>
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '10px',
          }}
        >
          {<LoaderMask style={{ width: '150px', height: '15px' }} />}
          {<LoaderMask style={{ width: '150px', height: '15px' }} />}
          {<LoaderMask style={{ width: '150px', height: '15px' }} />}
        </span>
      </div>
    </Content>
  );
};

const LoaderMask = styled.div`
  border-radius: 5px;
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
              font-weight: 800;
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

export default Loader;
