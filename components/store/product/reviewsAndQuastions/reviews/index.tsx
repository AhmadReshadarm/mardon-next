import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Stars from './Stars';
import UserImagesSlider from './UserImagesSlider';
import Review from './Reviews';
import AuthorizeReviewBtn from '../AuthorizeBtn';
import AddReview from './AddReview';
import { useAppSelector } from 'redux/hooks';
import {
  TAuthState,
  TProductInfoState,
  TStoreCheckoutState,
} from 'redux/types';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { handleMenuState } from 'components/store/storeLayout/helpers';
import Pagination from '../../productInfo/images/Pagination';
import CloseSVG from '../../../../../assets/close_black.svg';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import { Role } from 'common/enums/roles.enum';
import { Checkout } from 'swagger/services';

const Reviews = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );

  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const [isReviewAlreadyPublished, setIsReviewAlreadyPublished] = useState(
    () => !!product?.reviews?.find((review) => review.user?.id == user?.id),
  );

  const thumbnails = product?.reviews?.reduce((accum: string[], review) => {
    const images = review.images ? review.images.split(', ') : [];
    return images && images.length ? accum.concat(images) : accum;
  }, []);

  const { checkouts, loading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  const isInUserCheckout = (productId: string, checkedOuts: Checkout[]) => {
    let isInBasket = false;
    checkedOuts.map((checkout) => {
      checkout.basket?.orderProducts!.find((productInbasket) => {
        if (productInbasket.product?.id === productId) {
          isInBasket = true;
          return;
        }
      });
    });

    return isInBasket ? true : false;
  };

  useEffect(() => {
    setIsReviewAlreadyPublished(
      () => !!product?.reviews?.find((review) => review.user?.id == user?.id),
    );
  }, [product]);

  return (
    <ContentContainer>
      <ContentWrapper>
        {/* fullscreen mode  start */}
        {thumbnails?.length! > 0 ? (
          <ThumbnailsWrapper>
            <h3 className="title-users-images">Фото покупателей</h3>
            <div className="client-images-wrapper">
              {thumbnails!.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={`/api/images/${image}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/img_not_found.png';
                    }}
                    className="image-container"
                  />
                );
              })}
            </div>

            <button
              onClick={handleMenuState(setIsOpened, setDisplay)}
              className="show-all-action-btn"
            >
              <span>Смотреть все</span>
            </button>
          </ThumbnailsWrapper>
        ) : (
          ''
        )}

        <ProductImagesFullScreenWrapper
          style={{ display }}
          animate={isOpened ? 'open' : 'close'}
          variants={variants.fadeInReveal}
        >
          <div className="pagination-and-slider-wrapper">
            <span
              onClick={handleMenuState(setIsOpened, setDisplay)}
              className="close-btn-wrapper"
            >
              <CloseSVG />
            </span>
            <UserImagesSlider
              images={thumbnails!}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isOpened={isOpened}
              direction={direction}
              page={page}
              paginateImage={paginateImage}
            />
            <Pagination
              images={thumbnails!}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              paginateImage={paginateImage}
              alt={product?.name}
              isOpened={isOpened}
            />
          </div>
        </ProductImagesFullScreenWrapper>
        {/* fullscreen mode  end */}

        <Review product={product} />
      </ContentWrapper>
      <ContentWrapper>
        <Stars />
        {user && !loading && product ? (
          (isInUserCheckout(product?.id!, checkouts) &&
            user.isVerified &&
            !isReviewAlreadyPublished) ||
          user.role === Role.Admin ? (
            <AddReview product={product} />
          ) : (
            !isReviewAlreadyPublished && (
              <AuthorizeReviewBtn
                text="Написать отзыв"
                alertSignIn="Войдите, чтобы оставить отзыв"
                setAuthorized={user}
                isInUserCheckout={isInUserCheckout}
                productId={product.id}
                checkouts={checkouts}
              />
            )
          )
        ) : (
          !isReviewAlreadyPublished && (
            <AuthorizeReviewBtn
              text="Написать отзыв"
              alertSignIn="Войдите, чтобы оставить отзыв"
              setAuthorized={user}
            />
          )
        )}
      </ContentWrapper>
    </ContentContainer>
  );
};

export const ThumbnailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  .title-users-images {
    font-size: 1.2rem;
    font-weight: 400;
  }
  .client-images-wrapper {
    max-width: 300px;
    min-width: 200px;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    .image-container {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 3px;
    }
  }
  .show-all-action-btn {
    width: 200px;
    height: 40px;
    background-color: ${color.btnSecondery};
    cursor: pointer;
    transition: 300ms;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    &:hover {
      background-color: ${color.searchBtnBg};

      transform: scale(1.02);
    }
    &:active {
      transform: scale(1);
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
    }
    span {
      font-family: 'Jost';
      font-size: 1rem;
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  @media ${devices.laptopS} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }
  @media ${devices.mobileM} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileS} {
    width: 95%;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  gap: 20px;
  position: relative;

  @media ${devices.laptopS} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ProductImagesFullScreenWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  transition: 200ms;
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pagination-and-slider-wrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
  }

  .close-btn-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transition: 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  @media ${devices.laptopS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }

  @media ${devices.mobileL} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }
  @media ${devices.mobileM} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }

  @media ${devices.mobileS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }
`;

export default Reviews;
