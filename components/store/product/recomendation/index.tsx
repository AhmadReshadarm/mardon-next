import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import { ContentWrapper, ProductFlexEmpty } from './common';
import { HeaderWrapper } from '../common';
import dynamic from 'next/dynamic';
const WeRecomend = dynamic(() => import('./WeRecomend'), {
  ssr: false,
  loading: () => (
    <ContentWrapper>
      <HeaderWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <h3>Рекомендуем также</h3>
      </HeaderWrapper>
      <ProductFlexEmpty />
    </ContentWrapper>
  ),
});
const BuyTogether = dynamic(() => import('./BuyTogether'), {
  ssr: false,
  loading: () => (
    <ContentWrapper>
      <HeaderWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <h3>Покупают вместе</h3>
      </HeaderWrapper>
      <ProductFlexEmpty />
    </ContentWrapper>
  ),
});

const Recomendation = ({ product }) => {
  const { isInViewport, ref } = useInViewport();
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
      ref={ref}
    >
      {isInViewport ? (
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
      ) : (
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
            gap="130px"
          >
            <ContentWrapper>
              <HeaderWrapper
                custom={0.2}
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
              >
                <h3>Рекомендуем также</h3>
              </HeaderWrapper>
              <ProductFlexEmpty />
            </ContentWrapper>
            <ContentWrapper>
              <HeaderWrapper
                custom={0.2}
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
              >
                <h3>Покупают вместе</h3>
              </HeaderWrapper>
              <ProductFlexEmpty />
            </ContentWrapper>
          </Content>
        </Wrapper>
      )}
    </Container>
  );
};

export default Recomendation;
