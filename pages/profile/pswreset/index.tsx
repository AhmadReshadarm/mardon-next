import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import EmailResetPsw from 'components/store/profileComp/emailresetpsw';

const PswReset = () => {
  return (
    <>
      <Head>
        <title>Сброс пароля | Fingarden</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="order-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="100px"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="30px"
          >
            <EmailResetPsw />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

PswReset.PageLayout = StoreLayout;

export default PswReset;
