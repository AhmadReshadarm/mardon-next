import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TNewsState } from 'redux/types';
import { fetchNewsByUrl, fetchNewsposts } from 'redux/slicers/newsSlicer';
import { devices } from 'components/store/lib/Devices';
import Pagination from 'ui-kit/Pagination';
import moment from 'moment';
import Loading from 'ui-kit/Loading';
import Subscribers from 'ui-kit/Subscribers';

// _________________________

const News = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { newsPosts, newsLenght, loading } = useAppSelector<TNewsState>(
    (state) => state.newsPosts,
  );

  useEffect(() => {
    if (router.query.url) {
      dispatch(fetchNewsByUrl({ url: router.query.url as string }));
    }

    dispatch(fetchNewsposts({ limit: '12', offset: '0' }));

    return () => {};
  }, [dispatch, router.query]);
  // _____________________ paginition start ________________________
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(newsLenght / recordsPerPage);

  const handlePaginition = (indexOfFirstRecord: number) => {
    dispatch(
      fetchNewsposts({
        offset: `${indexOfFirstRecord}`,
        limit: '12',
      }),
    );
  };
  useEffect(() => {
    handlePaginition(indexOfFirstRecord);
  }, [currentPage]);
  // _____________________ paginition end ________________________

  return (
    <>
      <Head>
        <title>Новости | Fingarden</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="50px 0"
        bg_color={color.textPrimary}
      >
        <BackToMain>
          <Link className="back-to-main" href="/">
            <img src="/icons/back_arrow.png" alt="back button" />
            <span>Обратно на главную</span>
          </Link>
        </BackToMain>
        <HeaderWrapper>
          <div className="header-title-wrapper">
            <span>Новости</span>
          </div>
          <div className="header-divder-wrapper"></div>
        </HeaderWrapper>
        <Wrapper
          flex_direction="column"
          gap="40px"
          style={{ flexDirection: 'column', padding: '50px 0' }}
        >
          <NewsGridContainer>
            <ul className="news-grid">
              {!loading ? (
                newsPosts.map((news, key) => {
                  return (
                    <NewsItem key={key}>
                      <Link href={`/news/${news.url}`}>
                        <img
                          src={`/api/images/${news.image}`}
                          alt={news.title}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = '/img_not_found.png';
                          }}
                        />
                        <div className="details-wrapper">
                          <span className="date-wrapper">
                            {moment(news.createdAt).format('DD.MM.YYYY')}
                          </span>
                          <h3 className="title-wrapper">
                            {news.title?.slice(0, 40)}
                            {news.title?.length! > 40 ? '...' : ''}
                          </h3>
                        </div>
                      </Link>
                    </NewsItem>
                  );
                })
              ) : (
                <Loading />
              )}
            </ul>
          </NewsGridContainer>
          {!loading && !!newsLenght && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              nPages={nPages}
            />
          )}
        </Wrapper>
        <Subscribers />
      </Container>
    </>
  );
};

const BackToMain = styled.div`
  width: 100%;
  max-width: 1230px;
  padding: 0 0 50px 0;
  .back-to-main {
    display: flex;
    felx-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    img {
      width: 40px;
    }
  }
  @media ${devices.laptopS} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileL} {
    width: 95%;
    max-width: unset;
  }
  @media ${devices.mobileM} {
    width: 95%;
    max-width: unset;
  }

  @media ${devices.mobileS} {
    width: 95%;
    max-width: unset;
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

const NewsGridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  .news-grid {
    min-width: 1230px;
    max-width: 1230px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
    row-gap: 30px;
    padding: 20px;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
  @media ${devices.laptopS} {
    .news-grid {
      min-width: unset;
      max-width: unset;
      width: 100%;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media ${devices.mobileL} {
    .news-grid {
      min-width: unset;
      max-width: unset;
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }
  }
  @media ${devices.mobileM} {
    .news-grid {
      min-width: unset;
      max-width: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }
  }

  @media ${devices.mobileS} {
    .new-grid {
      min-width: unset;
      max-width: unset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }
  }
`;

const NewsItem = styled.li`
  width: 100%;
  height: 100%;
  min-width: 260px;
  max-width: 275px;
  max-height: 420px;
  min-height: 420px;

  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  background-color: ${color.bgProduct};
  border-radius: 10px;
  transition: 200ms;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    img {
      width: 100%;
      min-height: 250px;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
    }
    .details-wrapper {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 30px;
      .date-wrapper {
        width: 100%;
        text-align: left;
        color: ${color.textSecondary};
      }
      .title-wrapper {
        with: 100%;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 400;
        padding-bottom: 30px;
      }
    }
  }
  @media ${devices.laptopS} {
    min-width: 310px;
    max-width: 310px;
    width: 100%;
  }
  @media ${devices.mobileL} {
    min-width: 310px;
    max-width: 310px;
    width: 100%;
  }
  @media ${devices.mobileM} {
    min-width: 260px;
    max-width: 260px;
    width: 100%;
  }

  @media ${devices.mobileS} {
    min-width: 200px;
    max-width: 200px;
    width: 100%;
  }
`;

News.PageLayout = StoreLayout;

export default News;
