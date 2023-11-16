import { MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import TabPanel from './TabPanel';
import { a11yProps } from './helpers';
import Reviews from './reviews';
import Quastions from './quastions';
import { HeaderWrapper } from '../common';
import { useAppSelector } from 'redux/hooks';
import { Product } from 'swagger/services';
// import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import { TAuthState } from 'redux/types';
type Props = {
  reviewRef: MutableRefObject<null>;
  questionRef: MutableRefObject<null>;
  product: Product | undefined;
};
const ReveiwsAndQuastions: React.FC<Props> = ({
  reviewRef,
  questionRef,
  product,
}) => {
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <Container
      id="reveiws-quastions"
      key="container-product-section-one"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="50px 0"
      bg_color={color.bgProduct}
      initial="start"
      whileInView="middle"
      variants={variants.fadInOut}
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="30px"
        >
          <HeaderWrapper
            custom={0.2}
            initial="init"
            whileInView="animate"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
            style={{ position: 'relative' }}
          >
            <h3>Отзывы и вопросы о товаре</h3>
            <TotalReviews>{product?.reviews?.length}</TotalReviews>
          </HeaderWrapper>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box>
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="reviews label"
              >
                <Tab
                  ref={reviewRef}
                  label="Отзывы о товаре"
                  {...a11yProps(0)}
                />
                <Tab
                  ref={questionRef}
                  label="Вопросы и ответы о товаре"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <Reviews />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Quastions productId={product?.id} userId={user?.id!} />
            </TabPanel>
          </Box>
        </Content>
      </Wrapper>
    </Container>
  );
};

const TotalReviews = styled.span`
  position: absolute;
  top: -12px;
  left: 330px;
  color: ${color.textSecondary};
  font-family: intro;
  font-size: 1rem;
`;

const NoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  h3 {
    font-family: 'intro';
    font-size: 1.2rem;
    color: ${color.hover};
  }
`;

export default ReveiwsAndQuastions;
