import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
// import WeRecomend from './WeRecomend';
// import BuyTogether from './BuyTogether';
import dynamic from 'next/dynamic';
const WeRecomend = dynamic(() => import('./WeRecomend'));
const BuyTogether = dynamic(() => import('./BuyTogether'));

const Recomendation = ({ product }) => {
  return (
    <Container
      key="container-product-section-two"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="80px 0"
      bg_color="#595959"
      initial="start"
      whileInView="middle"
      viewport={{ once: true }}
      variants={variants.fadInOut}
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="130px"
        >
          <WeRecomend product={product} />
          <BuyTogether product={product} />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Recomendation;
