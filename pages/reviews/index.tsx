import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Container } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import ReviewsItems from 'components/store/reviews';
const Reviews = () => {
  return (
    <>
      <Head>
        <title>Отзывов | NBHOZ</title>
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
        bg_color={color.textPrimary}
      >
        <ReviewsItems />
      </Container>
    </>
  );
};

Reviews.PageLayout = StoreLayout;

export default Reviews;
