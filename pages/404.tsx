import StoreLayout from 'components/store/storeLayout/layouts';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import Head from 'next/head';
import styled from 'styled-components';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Страница не найдена | Fingarden 404</title>
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
        padding="20px 0"
        bg_color={color.textPrimary}
        position="relative"
        style={{
          height: '100vh',
        }}
      >
        <ContentBackground></ContentBackground>
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="20px"
            style={{ userSelect: 'none' }}
          >
            <Error className="error">404 ОШИБКА</Error>
            <ContentWrapper>
              <h2>Упс.. Кажется, такой страницы не существует</h2>
              <h4>Пожалуйста, перезагрузите страницу</h4>
            </ContentWrapper>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Error = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-family: ricordi;
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #cda172 -6.8%,
    #fef5ca 34.14%,
    #fff8d7 50.87%,
    #fdf3c8 66.52%,
    #cda172 107.04%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  z-index: 2;
  h2,
  h4 {
    font-size: 1.5rem;
    font-family: ricordi;
    font-weight: 300;
    color: #fff;
  }
`;

const ContentBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background: url(/newsler_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  filter: grayscale(100%);
  &::after {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background-color: #000;
    opacity: 0.6;
  }
`;

NotFound.PageLayout = StoreLayout;
export default NotFound;
