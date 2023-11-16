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
import { devices } from 'components/store/lib/Devices';
import Pagination from 'ui-kit/Pagination';
import Loading from 'ui-kit/Loading';
import { TReviewState } from 'redux/types';
import ReviewsItems from 'components/store/reviews';
import { fetchReviews } from 'redux/slicers/reviewsSlicer';
import Subscribers from 'ui-kit/Subscribers';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { baseUrl } from 'common/constant';
// _________________________

const Reviews = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reviewsLenght, reviews, loading } = useAppSelector<TReviewState>(
    (state) => state.reviews,
  );

  useEffect(() => {
    dispatch(fetchReviews({ limit: '12', offset: '0' }));

    return () => {};
  }, [dispatch, router.query]);
  // _____________________ paginition start ________________________
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(reviewsLenght / recordsPerPage);

  const handlePaginition = (indexOfFirstRecord: number) => {
    dispatch(
      fetchReviews({
        offset: `${indexOfFirstRecord}`,
        limit: '12',
      }),
    );
  };
  useEffect(() => {
    handlePaginition(indexOfFirstRecord);
  }, [currentPage]);
  // _____________________ paginition end ________________________
  const [title, setTitle] = useState('Отзывы');
  const [shortDesc, setShortDesc] = useState('Отзывы');
  const [keywords, setKeyword] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    const getHeaders = async () => {
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(1000);
      if (reviews.length != 0 && !loading) {
        const randomRview = Math.floor(Math.random() * reviews?.length);

        setTitle(reviews[randomRview].product?.name as string);
        setShortDesc(reviews[randomRview].product?.shortDesc as string);
        setKeyword(reviews[randomRview].product?.keywords as string);
        setCreatedAt(reviews[randomRview].createdAt as string);
        setUpdatedAt(reviews[randomRview].updatedAt as string);

        const images = getProductVariantsImages(
          reviews[randomRview].product?.productVariants,
        );

        setImage(images[0]);
      }
    };
    getHeaders();
  }, [reviews]);

  return (
    <>
      {!loading && reviews.length !== 0 ? (
        <SEOstatic
          page={{
            name: title,
            url: `${router.asPath}`,
            desc: `Интернет-магазин Fingarden - ${shortDesc}`,
            keywords: keywords,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }}
          image={`${baseUrl}/api/images/${image}` ?? '/img_not_found.png'}
        />
      ) : (
        <Head>
          <title>Отзывы | Fingarden</title>
        </Head>
      )}
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
            <span>Отзывы</span>
          </div>
          <div className="header-divder-wrapper"></div>
        </HeaderWrapper>
        <Wrapper
          flex_direction="column"
          gap="40px"
          style={{ flexDirection: 'column', padding: '50px 0' }}
        >
          {!loading ? (
            reviews.length !== 0 ? (
              <ReviewsList>
                {reviews?.map((review, index) => {
                  return <ReviewsItems review={review} key={index} />;
                })}
              </ReviewsList>
            ) : (
              <div>У вас еще нет отзывов</div>
            )
          ) : (
            <Loading />
          )}

          {!loading && !!reviews && (
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

const ReviewsList = styled.ul`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

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

Reviews.PageLayout = StoreLayout;

export default Reviews;
