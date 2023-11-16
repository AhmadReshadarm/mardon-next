import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import VerifyAcountByToken from 'components/store/profileComp/verifyaccount';

const VerifyAcount = () => {
  return (
    <>
      <Head>
        <title>Личные кабинет | Fingarden</title>
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
        padding="200px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <VerifyAcountByToken />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

VerifyAcount.PageLayout = StoreLayout;

export default VerifyAcount;
