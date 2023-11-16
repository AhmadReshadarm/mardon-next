import styled from 'styled-components';
import color from '../lib/ui.colors';
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from './constant';
import { devices } from 'components/store/lib/Devices';
import Link from 'next/link';
import { useCopyToClipboard } from './helpers';
import { useEffect } from 'react';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
const MapContainer = (props: any) => {
  const { viewport, viewportUser, setViewPortUser } = props;
  const [copiedText, setCopiedText, copy] = useCopyToClipboard();
  useEffect(() => {
    if (copiedText) openSuccessNotification('Скопировано в буфер обмена');
  }, [copiedText]);
  return (
    <>
      <MapContianer>
        <Map
          {...viewportUser}
          onMove={(evt) => setViewPortUser(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <Marker
            longitude={viewport.longitude}
            latitude={viewport.latitude}
            color={color.btnPrimary}
          />

          <GeolocateControl positionOptions={{ enableHighAccuracy: true }} />

          <NavigationControl />
        </Map>
      </MapContianer>
      <MapAndAddressWrapper>
        <div className="address-container">
          <ContactsHeaderWrapper>
            <h2>Интернет-магазин fingarden товаров для загородной жизни</h2>
          </ContactsHeaderWrapper>
          <ContactContentWrapper>
            <div className="first-column">
              <div className="first-column-content-wrapper">
                <img src="/icons/location.png" alt="location" />
                <span
                  className="address-copied"
                  onClick={() => {
                    copy();
                    setTimeout(() => {
                      setCopiedText(false);
                    }, 1000);
                  }}
                  onTouchStart={() => {
                    copy();
                    setTimeout(() => {
                      setCopiedText(false);
                    }, 1000);
                  }}
                  title="Нажмите, чтобы скопировать адрес"
                >
                  Санкт-Петербург, ТЦ Villa - ул. Савушкина д.119, корп.3, 2
                  этаж, В-59
                </span>
              </div>
              <div className="first-column-content-wrapper">
                <img src="/icons/available_time.png" alt="working hours" />
                <span>Пн-Все 10.00-22.00</span>
              </div>
              <div className="first-column-content-wrapper">
                <img src="/icons/email.png" alt="mail to" />
                <span>
                  <Link target="_blank" href="mailto:info@fingarden.ru">
                    info@fingarden.ru
                  </Link>
                </span>
              </div>
              <div className="first-column-last-content">
                <span>ИНН: 7814726563</span>
                <span>ОГРН: 1187847112111</span>
              </div>
            </div>
            <div className="second-column">
              <div className="second-column-content-wrapper">
                <img
                  src="/icons/phone_call.png"
                  alt="call fingarden via phone"
                />
                <span>
                  <Link target="_blank" href="tel:+78124253130">
                    +7 812 425-31-30
                  </Link>
                </span>
              </div>
              <div className="second-column-content-wrapper">
                <img
                  src="/icons/whatsApp_call.png"
                  alt="call fingarden via WhatsApp"
                />
                <span>
                  <Link target="_blank" href="https://wa.me/0079313539004">
                    +7 931 353-90-04
                  </Link>
                </span>
              </div>
            </div>
          </ContactContentWrapper>
        </div>
      </MapAndAddressWrapper>
    </>
  );
};

const MapAndAddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  .address-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 30px;
    z-index: 99;
    background-color: ${color.textPrimary};
    box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
    border-radius: 15px;
    padding: 30px;
    margin-top: -200px;
  }
  @media ${devices.mobileL} {
    align-items: center;
    .address-container {
      margin-top: -85px;
    }
  }
  @media ${devices.mobileM} {
    align-items: center;
    .address-container {
      margin-top: -85px;
    }
  }
  @media ${devices.mobileS} {
    align-items: center;
    .address-container {
      margin-top: -85px;
    }
  }
`;

const ContactsHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  h2 {
    width: 55%;
    font-family: Anticva;
    font-weight: 100;
    line-height: 2rem;
  }

  @media ${devices.laptopS} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileL} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileM} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
  @media ${devices.mobileS} {
    h2 {
      width: 100%;
      font-size: 1.2rem;
    }
  }
`;

const ContactContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 20%;
  gap: 90px;
  span {
    font-weight: 600;
  }
  .first-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 50%;
    .first-column-content-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      .address-copied {
        cursor: pointer;
      }
    }
    .first-column-last-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
    }
  }

  .second-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    .second-column-content-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
    }
    .second-column-last-content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
      .goto-contact-page-btn {
        width: 200px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        background-color: ${color.btnSecondery};
        cursor: pointer;
        transition: 300ms;
        span {
          font-weight: 400;
        }
        &:hover {
          background-color: ${color.btnPrimary};
          color: ${color.textPrimary};
          transform: scale(1.02);
        }
        &:active {
          transform: scale(1);
        }
        span {
          font-family: 'Jost';
          font-size: 1rem;
        }
      }
    }
  }
  @media ${devices.laptopS} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }

  @media ${devices.mobileL} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }
  @media ${devices.mobileM} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }

  @media ${devices.mobileS} {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    .first-column {
      width: 100%;
    }
    .second-column {
      width: 100%;
    }
  }
`;

const MapContianer = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-contente: center;
  align-items: flex-end;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;

  @media ${devices.mobileL} {
    height: 40vh;
  }
`;

export default MapContainer;
