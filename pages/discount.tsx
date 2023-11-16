import styled from 'styled-components';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import Head from 'next/head';
import Link from 'next/link';
const Discount = () => {
  return (
    <>
      <Head>
        <title>Акции | Fingarden</title>
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
            <Headers>Акции</Headers>
            <Contents>Информацию по акциям уточняйте по телефону</Contents>
            <ListsDots>
              <li>
                <Link href="tel:+78124253130">
                  <Links>+7 812 425 31 30</Links>
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://wa.me/0079313539004">
                  <Links>+7 931 353-90-04</Links>
                </Link>
              </li>
            </ListsDots>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-family: 'Anticva';
  font-size: 1.5rem;
  @media ${devices.mobileL} {
    max-width: 95vw;
  }
`;

const Contents = styled.span`
  width: 80%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ListsDots = styled.ul`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: circle;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const Links = styled.span`
  color: ${color.hoverBtnBg};
  &:hover {
    color: ${color.ok};
  }
`;

Discount.PageLayout = StoreLayout;
export default Discount;
