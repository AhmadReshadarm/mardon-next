import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import { ContentCotainer, Grid, NavWrapper } from '.';
import styled from 'styled-components';
import { ImagesContainer } from './images';
import { SliderWrapper } from './images/Slider';
import {
  ConvoContainer,
  ConvoWrappers,
  DetailsContainer,
  PriceWrapper,
  SizePickerWrapper,
} from './details';
import { UserSelectWrapper } from './details/common';
import { ActionBtnContainer, ActionBtnsWrapper } from './details/ActionBtns';
import {
  ColorPickerContainer,
  ColorPickerItems,
  ColorPickerList,
} from './details/ColorPicker';
import { emptyLoading } from 'common/constants';

const LoaderProduct = () => {
  return (
    <>
      <MaskLoader style={{ width: '100%', height: '90px' }} />
      <Container
        flex_direction="row"
        justify_content="center"
        align_items="center"
        padding="30px 0"
      >
        <Wrapper style={{ flexDirection: 'column', gap: '10px' }}>
          <MaskLoader style={{ width: '100%', height: '25px' }} />
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
            gap="40px"
          >
            <NavWrapper width={`200px`}>
              <div className="nav-rightWrapper">
                <MaskLoader style={{ width: '50%', height: '20px' }} />
              </div>
              <MaskLoader style={{ width: '100px', height: '20px' }} />
            </NavWrapper>
            <ContentCotainer>
              <Grid>
                <ImagesContainer>
                  <SliderWrapper>
                    <MaskLoader style={{ width: '100%', height: '100%' }} />
                  </SliderWrapper>
                </ImagesContainer>
                <DetailsContainer>
                  <UserSelectWrapper textWidth={46}>
                    <div className="product-title-wrapper">
                      <MaskLoader style={{ width: '100%', height: '20px' }} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                      className="short-description-wrapper"
                    >
                      <MaskLoader style={{ width: '100%', height: '15px' }} />
                      <MaskLoader style={{ width: '100%', height: '15px' }} />
                    </div>
                    <ConvoContainer>
                      <div className="convo-contentWrapper">
                        <ConvoWrappers>
                          <MaskLoader
                            style={{ width: '100px', height: '20px' }}
                          />
                        </ConvoWrappers>
                        <ConvoWrappers>
                          <span className="reviews-text-wrapper">
                            <MaskLoader
                              style={{ width: '150px', height: '15px' }}
                            />
                          </span>
                        </ConvoWrappers>
                        <ConvoWrappers>
                          <span>
                            <MaskLoader
                              style={{ width: '150px', height: '15px' }}
                            />
                          </span>
                        </ConvoWrappers>
                      </div>
                      <PriceWrapper>
                        <MaskLoader style={{ width: '50px', height: '20px' }} />
                        <MaskLoader style={{ width: '50px', height: '20px' }} />
                      </PriceWrapper>
                    </ConvoContainer>

                    <SizePickerWrapper>
                      <div className="info-size-wrapper">
                        <MaskLoader
                          style={{ width: '150px', height: '20px' }}
                        />
                      </div>

                      <ColorPickerContainer></ColorPickerContainer>
                    </SizePickerWrapper>
                  </UserSelectWrapper>
                  <ColorPickerList>
                    {emptyLoading.map((item, index) => {
                      return (
                        <ColorPickerItems key={index}>
                          <MaskLoader
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '5px',
                            }}
                          />
                        </ColorPickerItems>
                      );
                    })}
                  </ColorPickerList>
                  <ActionBtnContainer>
                    <ActionBtnsWrapper>
                      <MaskLoader
                        style={{
                          width: '150px',
                          height: '50px',
                          borderRadius: '30px',
                        }}
                      />
                      <MaskLoader
                        style={{
                          width: '150px',
                          height: '50px',
                          borderRadius: '30px',
                        }}
                      />
                    </ActionBtnsWrapper>
                  </ActionBtnContainer>
                </DetailsContainer>
              </Grid>
            </ContentCotainer>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const MaskLoader = styled.div`
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default LoaderProduct;
