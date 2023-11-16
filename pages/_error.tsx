import StoreLayout from 'components/store/storeLayout/layouts';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import Head from 'next/head';

const Error = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Ошибка Сервиса | Fingarden 500</title>
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
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="20px"
            style={{ userSelect: 'none' }}
          >
            <img
              style={{ width: '90%', paddingTop: '50px' }}
              src="/500_server_error.png"
              alt="server error"
            />
            <div style={{ width: '60%', textAlign: 'center' }}>
              <h1>Упс..Кажется, что-то сломалось или же это Ошибка Сервиса</h1>
            </div>
            <span style={{ textAlign: 'center' }}>
              Мы знаем о проблеме и уже работаем над ней. Попробуйте зайти
              позже. Спасибо за Ваш выбор. С Уважением, Ваш FINGARDEN
            </span>
            <span>
              <p>
                {statusCode
                  ? `An error ${statusCode} occurred on server`
                  : 'An error occurred on client'}
              </p>
            </span>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

// export default Error;
Error.PageLayout = StoreLayout;
export default Error;
