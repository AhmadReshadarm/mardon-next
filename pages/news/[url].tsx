import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Container } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TNewsState } from 'redux/types';
import { fetchNewsByUrl, fetchNewsposts } from 'redux/slicers/newsSlicer';
import { devices } from 'components/store/lib/Devices';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import Pagination from 'ui-kit/Pagination';
import moment from 'moment';
// _________________________
import Copy from '../../assets/copy.svg';
import Telegram from '../../assets/telegram.svg';
import Vk from '../../assets/vk.svg';
import Whatsapp from '../../assets/whatsapp.svg';
import Twitter from '../../assets/twitter.svg';
import { useCopyToClipboard } from 'components/store/product/productInfo/details/helpers';
import {
  VKShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'next-share';
import Loading from 'ui-kit/Loading';
import SEOnews from 'components/store/SEO/SEOnews';
import Subscribers from 'ui-kit/Subscribers';
import dynamic from 'next/dynamic';
const TextEditorConverter = dynamic(
  () => import('ui-kit/TextEditorConverter'),
  {
    ssr: false,
  },
);
// _________________________

const News = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { newsPosts, news, newsLenght, loading } = useAppSelector<TNewsState>(
    (state) => state.newsPosts,
  );

  useEffect(() => {
    if (router.query.url) {
      dispatch(fetchNewsByUrl({ url: router.query.url as string }));
    }

    dispatch(fetchNewsposts({ limit: '4', offset: '0' }));

    return () => {};
  }, [dispatch, router.query]);
  // _____________________ paginition start ________________________
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(newsLenght / recordsPerPage);

  const handlePaginition = (indexOfFirstRecord: number) => {
    dispatch(
      fetchNewsposts({
        offset: `${indexOfFirstRecord}`,
        limit: '4',
      }),
    );
  };
  useEffect(() => {
    handlePaginition(indexOfFirstRecord);
  }, [currentPage]);
  // _____________________ paginition end ________________________

  const [isCopied, setCopied, copy] = useCopyToClipboard();
  const [baseUrl, setBaseUrl] = useState('');
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);
  return (
    <>
      {!loading && news ? <SEOnews newsPost={news!} /> : ''}
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="50px 0 0 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <NewsContent>
            <TextEditorConverter editorModal={news?.post!} />
          </NewsContent>
          <ShareToSocialWrapper>
            <span>Поделиться с друзьями!</span>
            <ul>
              <li
                onTouchStart={() => {
                  copy(`${baseUrl}${router.asPath}`);
                  setTimeout(() => {
                    setCopied(false);
                  }, 800);
                }}
                onClick={() => {
                  copy(`${baseUrl}${router.asPath}`);
                  setTimeout(() => {
                    setCopied(false);
                  }, 800);
                }}
              >
                <span style={{ width: '20px' }}>
                  <Copy />
                </span>
                <button className="copy-url-btn">
                  <motion.span
                    animate={!isCopied ? 'animate' : 'exit'}
                    variants={variants.fadeOutSlideOut}
                  >
                    Скопировать ссылку
                  </motion.span>
                  <motion.span
                    animate={isCopied ? 'animate' : 'exit'}
                    variants={variants.fadeInSlideIn}
                    style={{ color: color.ok }}
                  >
                    Ссылка скопирована
                  </motion.span>
                </button>
              </li>
              <li title="ВКонтакте">
                <VKShareButton
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                  url={`${baseUrl}${router.asPath}`}
                  image={news?.image}
                >
                  <span>
                    <Vk />
                  </span>
                </VKShareButton>
              </li>
              <li title="Whatsapp">
                <Link href="/">
                  <WhatsappShareButton
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                    url={`${baseUrl}${router.asPath}`}
                    title={news?.title}
                    separator=":: "
                  >
                    <span>
                      <Whatsapp />
                    </span>
                  </WhatsappShareButton>
                </Link>
              </li>
              <li title="Telegram">
                <Link href="/">
                  <TelegramShareButton
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                    url={`${baseUrl}${router.asPath}`}
                    title={news?.title}
                  >
                    <span>
                      <Telegram />
                    </span>
                  </TelegramShareButton>
                </Link>
              </li>
              <li title="Twitter">
                <Link href="/">
                  <TwitterShareButton
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                    url={`${baseUrl}${router.asPath}`}
                    title={news?.title}
                  >
                    <span>
                      <Twitter />
                    </span>
                  </TwitterShareButton>
                </Link>
              </li>
            </ul>
          </ShareToSocialWrapper>
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

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewsContent = styled.div`
  width: 100%;
  padding: 50px 0;
  overflow: hidden;
  @media ${devices.laptopS} {
    max-width: 95vw;
    min-width: 95vw;
  }
  @media ${devices.tabletL} {
    max-width: 95vw;
    min-width: 95vw;
  }
  @media ${devices.tabletS} {
    max-width: 95vw;
    min-width: 95vw;
  }
  @media ${devices.mobileL} {
    max-width: 95vw;
    min-width: 95vw;
  }
  @media ${devices.mobileM} {
    max-width: 95vw;
    min-width: 95vw;
  }

  @media ${devices.mobileS} {
    max-width: 95vw;
    min-width: 95vw;
  }
`;

const ShareToSocialWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      .social-name {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        color: ${color.textTertiary};
        &:hover {
          color: ${color.hover};
        }
      }
      .copy-url-btn {
        width: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        color: ${color.textTertiary};
        span {
          position: absolute;
          cursor: pointer;
          &:hover {
            color: ${color.hover};
          }
        }
      }
    }
  }
  @media ${devices.laptopS} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NewsGridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 50px 10px;
  .news-grid {
    min-width: 1500px;
    max-width: 1500px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
    row-gap: 30px;
    padding: 20px;
  }
  @media ${devices.laptopS} {
    .news-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
    }
  }
  @media ${devices.tabletL} {
    .news-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
    }
  }
  @media ${devices.tabletS} {
    .news-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
    }
  }
  @media ${devices.mobileL} {
    .news-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
    }
  }
  @media ${devices.mobileM} {
    .news-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
    }
  }

  @media ${devices.mobileS} {
    .new-grid {
      min-width: 95vw;
      max-width: 95vw;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 20px;
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
    transform: scale(1.005);
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
  @media ${devices.tabletL} {
    min-width: 310px;
    max-width: 310px;
    width: 100%;
  }
  @media ${devices.tabletS} {
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
