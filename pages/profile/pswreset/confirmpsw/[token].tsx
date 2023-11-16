import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';

import Head from 'next/head';
import ConfirmResetPsw from 'components/store/profileComp/confirmResetPsw';

const ConfirmPswReset = () => {
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
        padding="50px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="30px"
          >
            <ConfirmResetPsw />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

ConfirmPswReset.PageLayout = StoreLayout;

export default ConfirmPswReset;
