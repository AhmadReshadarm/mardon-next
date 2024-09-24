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
import { useAppSelector } from 'redux/hooks';
import { Product } from 'swagger/services';
import { TAuthState } from 'redux/types';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
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
  const { isInViewport, ref } = useInViewport();
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
          <Box
            sx={{
              width: '100%',
            }}
            ref={ref}
          >
            <Box>
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="reviews label"
              >
                <Tab
                  ref={reviewRef}
                  label={`${product?.reviews?.length} Отзыв(ов) о товаре`}
                  {...a11yProps(0)}
                />
                <Tab
                  ref={questionRef}
                  label={`${product?.questions?.length} Вопрос(ов) о товаре`}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            {isInViewport ? (
              <>
                <TabPanel value={tab} index={0}>
                  <Reviews />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Quastions productId={product?.id} userId={user?.id!} />
                </TabPanel>
              </>
            ) : (
              ''
            )}
          </Box>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default ReveiwsAndQuastions;
