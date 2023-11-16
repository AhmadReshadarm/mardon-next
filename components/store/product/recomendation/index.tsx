import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import WeRecomend from './WeRecomend';
import BuyTogether from './BuyTogether';

const Recomendation = ({ product }) => {
  return (
    <Container
      key="container-product-section-two"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="50px 0"
      bg_color={color.textPrimary}
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
