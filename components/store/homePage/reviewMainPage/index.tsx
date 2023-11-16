import ArrowSVG from '../../../../assets/arrow_black.svg';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { THomePageState } from 'redux/types';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import Loading from 'ui-kit/Loading';
import Link from 'next/link';
import { useEffect } from 'react';
import { devices } from 'components/store/lib/Devices';
import { fetchReviews } from 'redux/slicers/store/homePageSlicer';

const ReviewMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { reviews, loading } = useAppSelector<THomePageState>(
    (state) => state.homePage,
  );

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <>
      {reviews?.length > 0 ? (
        <Container
          flex_direction="column"
          justify_content="center"
          padding="130px 0"
          bg_color={color.bgPrimary}
        >
          <HeaderWrapper>
            <div className="header-title-wrapper">
              <span>Отзывы</span>
            </div>
            <div className="header-divder-wrapper"></div>
          </HeaderWrapper>

          <Wrapper
            gap="100px"
            style={{
              padding: '50px 0',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {reviews?.length > 0 && !loading ? (
              <>
                <ReviewWrapper>
                  <img
                    src={
                      reviews[0].user?.image !== ''
                        ? `/api/images/${reviews[0].user?.image}`
                        : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${reviews[0].user?.firstName}`
                    }
                    alt={reviews[0].user?.firstName}
                    className="image-wrapper"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${reviews[0].user?.firstName}`;
                    }}
                  />
                  <div className="review-text-btn-wrapper">
                    <h2 className="user-name-wrapper">
                      {reviews[0].user?.firstName}
                    </h2>
                    <span className="review-content">{reviews[0].text}</span>
                    <div className="btn-readmore-wrapper">
                      <span className="read-more-pointer">
                        <ArrowSVG />
                      </span>
                      <Link
                        href={`/product/${reviews[0].product?.url}`}
                        className="read-more-btn"
                      >
                        <span>ЧИТАТЬ ВСЕ ОТЗЫВЫ</span>
                      </Link>
                    </div>
                  </div>
                </ReviewWrapper>
              </>
            ) : (
              <Loading />
            )}
          </Wrapper>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid ${color.textSecondary};
  position: relative;
  .header-title-wrapper {
    max-width: 1230px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px 20px 0;
    border-bottom: 1px solid ${color.textSecondary};
    z-index: 2;
    margin-bottom: -1px;
    span {
      font-family: Baskerville;
      font-size: 1.5rem;
    }
  }
  .header-divder-wrapper {
    width: 50%;
    align-self: flex-end;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    right: 0;
  }
  @media ${devices.laptopS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }

  @media ${devices.mobileL} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
  @media ${devices.mobileM} {
    .header-title-wrapper {
      max-width: unset;
    }
  }

  @media ${devices.mobileS} {
    .header-title-wrapper {
      max-width: unset;
    }
  }
`;

const ReviewWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 80px;
  .image-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
  .review-text-btn-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    .user-name-wrapper {
      font-size: 1.9rem;
      font-weight: 500;
    }
    .review-content {
      width: 55%;
    }
    .btn-readmore-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      .read-more-pointer {
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: ${color.btnSecondery};
        border-radius: 3px;
      }
      .read-more-btn {
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
    }
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .review-text-btn-wrapper {
      .review-content {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .review-text-btn-wrapper {
      .review-content {
        width: 100%;
      }
    }
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .review-text-btn-wrapper {
      .review-content {
        width: 100%;
      }
    }
  }
`;

export default ReviewMainPage;
