import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
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
  const [pageSize, setPageSize]: [number, any] = useState(12);
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);

    const offset = Number(pageSize) * (Number(page ?? 1) - 1);
    dispatch(
      fetchReviews({
        offset: `${offset}`,
        limit: `${pageSize}`,
      }),
    );
  };
  // _____________________ paginition end ________________________
  const [title, setTitle] = useState('Отзывы');
  const [shortDesc, setShortDesc] = useState('Отзывы');
  const [keywords, setKeyword] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  // const [image, setImage] = useState('');
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

        // const images = getProductVariantsImages(
        //   reviews[randomRview].product?.productVariants,
        // );

        // setImage(images[0]);
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
            desc: `Интернет-магазин NBHOZ - ${shortDesc}`,
            keywords: keywords,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }}
          image={`${baseUrl}/static/logo_800x800.png`}
        />
      ) : (
        <Head>
          <title>Отзывы | NBHOZ</title>
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
          <Pagination
            style={{ marginTop: '20px' }}
            defaultCurrent={currentPage}
            current={currentPage}
            total={reviewsLenght}
            pageSize={pageSize}
            pageSizeOptions={[12, 24, 36, 50, 100]}
            onChange={(current, pageSize) => {
              handlePageChange(current, pageSize, current);
            }}
          />
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

Reviews.PageLayout = StoreLayout;

export default Reviews;
