import ArrowSVG from '../../../../assets/arrow_black.svg';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { TGlobalState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import Loading from 'ui-kit/Loading';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';

const NewsMainPage = (): JSX.Element => {
  const { newsPosts, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  return (
    <Container
      flex_direction="column"
      justify_content="center"
      padding="20px 0"
      bg_color={color.bgPrimary}
      position="relative"
    >
      <HeaderWrapper>
        <div className="header-title-wrapper">
          <span>Новости</span>
        </div>
        <div className="header-divder-wrapper"></div>
      </HeaderWrapper>
      <NewsFooterWrapper></NewsFooterWrapper>
      <Wrapper
        gap="100px"
        style={{ padding: '50px 0', flexDirection: 'column', zIndex: '1' }}
      >
        <NewsContentContainer>
          {newsPosts?.length && !loading ? (
            <>
              <NewsHeaderWrapper>
                <h1 className="news-header">{newsPosts[0].title}</h1>
              </NewsHeaderWrapper>
              <NewsContentWrapper>
                <div className="news-text-content-wrapper">
                  <span>{newsPosts[0].description}</span>
                  <div className="news-read-more-btn-wrapper">
                    <span className="read-more-pointer">
                      <ArrowSVG />
                    </span>
                    <Link
                      href={`/news/${newsPosts[0].url}`}
                      className="read-more-btn"
                    >
                      <span>ЧИТАТЬ ПОЛНОСТЬЮ</span>
                    </Link>
                  </div>
                </div>
                <div className="news-image-wrapper">
                  <img
                    src={`/api/images/${newsPosts[0].image}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/img_not_found.png';
                    }}
                    alt={newsPosts[0].title}
                  />
                </div>
              </NewsContentWrapper>
            </>
          ) : (
            <Loading />
          )}
        </NewsContentContainer>
      </Wrapper>
    </Container>
  );
};

const NewsContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  @media ${devices.laptopS} {
    flex-direction: column;
    gap: 30px;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 30px;
  }

  @media ${devices.mobileS} {
    flex-direction: column;
    gap: 30px;
  }
`;

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
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 20px 30px;
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
    align-self: flex-start;
    border-bottom: 20px solid ${color.textPrimary};
    z-index: 1;
    position: absolute;
    top: 40px;
    left: 0;
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

const NewsFooterWrapper = styled.div`
  width: 100%;
  min-height: 230px;
  background-color: ${color.bgSecondary};
  position: absolute;
  bottom: 70px;
`;

const NewsHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  .news-header {
    width: 70%;
    font-family: Anticva;
    font-size: 1.5rem;
    font-weight: 100;
    line-height: 2.5rem;
  }
  @media ${devices.laptopS} {
    .news-header {
      width: 100%;
      font-size: 1.2rem;
    }
  }

  @media ${devices.mobileL} {
    .news-header {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileM} {
    .news-header {
      width: 100%;
      font-size: 1.2rem;
    }
  }

  @media ${devices.mobileS} {
    .news-header {
      width: 100%;
      font-size: 1.2rem;
    }
  }
`;

const NewsContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 130px;
  .news-text-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-conten: flex-start;
    align-itmes: flex-start;
    gap: 50px;
    .news-short-description {
    }
    .news-read-more-btn-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-itmes: center;
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
  .news-image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    img {
      width: 600px;
      height: 500px;
      object-fit: cover;
    }
  }

  @media ${devices.laptopS} {
    flex-direction: column-reverse;
    gap: 30px;
    .news-image-wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media ${devices.mobileL} {
    flex-direction: column-reverse;
    gap: 30px;
    .news-image-wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
    gap: 30px;
    .news-image-wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media ${devices.mobileS} {
    flex-direction: column-reverse;
    gap: 30px;
    .news-image-wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default NewsMainPage;
