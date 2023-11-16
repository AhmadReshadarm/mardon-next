import color from 'components/store/lib/ui.colors';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import Loading from 'ui-kit/Loading';
import { useAppSelector } from 'redux/hooks';
import { Advertisement } from 'swagger/services';
import styled from 'styled-components';
import { devices } from 'components/store/lib/Devices';

const CustomBanner = () => {
  const advertisement = useAppSelector<Advertisement[]>(
    (state) => state.banners.advertisement,
  );
  const isLoading = useAppSelector((state) => state.banners.loading);
  const advertisementLoading = useAppSelector(
    (state) => state.banners.advertisementLoading,
  );

  return (
    <Container
      flex_direction="column"
      justify_content="center"
      padding="20px 0"
      bg_color={color.bgPrimary}
    >
      <Wrapper>
        <TextBanner>
          {isLoading || advertisementLoading ? (
            <Loading />
          ) : advertisement.length > 0 ? (
            <>
              <div className="title-wrapper">
                <h1>{advertisement[0].title ?? ''}</h1>
              </div>
              <div className="description-wrapper">
                <p>{advertisement[0].description?.slice(0, 360)}</p>
                <p>
                  {advertisement[0].description?.slice(
                    360,
                    advertisement[0].description.length,
                  )}
                </p>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </TextBanner>
      </Wrapper>
      <ServiceIconsWrapper>
        <div className="service-container">
          <div className="service-content-wrapper">
            <span>
              <img
                src="/icons/main_page/cart-gray.png"
                alt="Оплата удобным для Вас способом: наличными или по карте"
              />
            </span>
            <span>Оплата удобным для Вас способом: наличными или по карте</span>
          </div>
          <div className="service-content-wrapper">
            <span>
              <img
                src="/icons/main_page/delevary.png"
                alt="Быстрая доставка и отгрузка. Работаем по всей России"
              />
            </span>
            <span>Быстрая доставка и отгрузка. Работаем по всей России</span>
          </div>
          <div className="service-content-wrapper">
            <span>
              <img
                // className="special-icons"
                src="/icons/main_page/gurantee.png"
                alt="Лучшие товары для Вас Гарантия высокого качества"
              />
            </span>
            <span>Лучшие товары для Вас Гарантия высокого качества</span>
          </div>
          <div className="service-content-wrapper">
            <span>
              <img
                className="special-icons"
                src="/icons/main_page/consoltation.png"
                alt="Бесплатная онлайн-консультация"
              />
            </span>
            <span>Бесплатная онлайн-консультация</span>
          </div>
        </div>
      </ServiceIconsWrapper>
    </Container>
  );
};

const TextBanner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 50px;
  padding: 130px 0;
  .title-wrapper {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    h1 {
      width: 100%;
      text-align: left;
      font-family: Anticva;
      font-size: 1.5rem;
      font-weight: 100;
      line-height: 2.5rem;
    }
  }
  .description-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    p {
      width: 100%;
      text-align: left;
    }
  }
  @media ${devices.mobileL} {
    .title-wrapper {
      width: 95%;
      h1 {
        font-size: 1rem;
      }
    }
    .description-wrapper {
      width: 80%;
    }
  }
  @media ${devices.mobileM} {
    .title-wrapper {
      width: 95%;
      h1 {
        font-size: 1rem;
      }
    }
    .description-wrapper {
      width: 80%;
    }
  }
  @media ${devices.mobileS} {
    .title-wrapper {
      width: 95%;
      h1 {
        font-size: 1rem;
      }
    }
    .description-wrapper {
      width: 80%;
    }
  }
`;

const ServiceIconsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-color: ${color.bgProduct};
  padding: 90px 0;
  .service-container {
    max-width: 1100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
    .service-content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 25px;
      .special-icons {
        width: 100px;
      }
      span {
        text-align: center;
      }
      img {
        width: 150px;
        height: 110px;
        object-fit: contain;
      }
    }
  }
  @media ${devices.laptopS} {
    .service-container {
      max-width: unset;
      width: 95%;
      flex-direction: column;
    }
  }

  @media ${devices.mobileL} {
    .service-container {
      max-width: unset;
      width: 95%;
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    .service-container {
      max-width: unset;
      width: 95%;
      flex-direction: column;
    }
  }

  @media ${devices.mobileS} {
    .service-container {
      max-width: unset;
      width: 95%;
      flex-direction: column;
    }
  }
`;

export default CustomBanner;
