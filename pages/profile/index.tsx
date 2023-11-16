import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import ProfileComp from 'components/store/profileComp';
import { useState } from 'react';

const Profile = () => {
  const [isActive, setActive] = useState('profile');

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
        padding="50px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="center"
            align_items="center"
            gap="30px"
          >
            <ProfileComp isActive={isActive} setActive={setActive} />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

Profile.PageLayout = StoreLayout;

export default Profile;
