import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { useState } from 'react';
import { devices } from 'components/store/lib/Devices';
import { useAppDispatch } from 'redux/hooks';
import {
  createSubscriber,
  sendAdminCallEmail,
} from 'redux/slicers/subscriberSlicer';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { openErrorNotification } from 'common/helpers';
import { UsePagination } from './helpers';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { paginateTo } from 'components/store/checkout/constant';
import InputMask from 'react-input-mask';
const Subscribers = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleSubscriber = (name: string, email: string) => {
    if (isEmpty(email))
      return openErrorNotification(
        'адрес электронной почты не может быть пустым',
      );
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');
    if (!isEmail(email))
      return openErrorNotification('Неверный адрес электронной почты');
    dispatch(createSubscriber({ name, email }));
  };
  const handleAdminCall = (name: string, phone: string) => {
    if (isEmpty(phone))
      return openErrorNotification('Номер телефона не может быть пустым');
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');
    dispatch(
      sendAdminCallEmail({
        to: 'info@fingarden.ru',
        subject: `${name} просит перезвонить`,
        html: `имя: ${name}, Номер телефона: ${phone}`,
      }),
    );
  };
  const [subscriber, setSubscriber] = useState({ name: '', email: '' });
  const [client, setClient] = useState({ clientName: '', phone: '' });
  const [direction, authType, paginate] = UsePagination();

  return (
    <PaddingContainer>
      <Container>
        <FormContainer>
          <FormContent>
            <Content
              dragConstraints={{ left: 0, right: 0 }}
              custom={direction}
              variants={variants.authorizeSlideX}
              animate={authType == 'call' ? 'center' : 'enter'}
            >
              <div className="header-wrapper">
                <div className="top-wrapper">
                  <h3>Заказать звонок, </h3>
                  <img
                    style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
                    onClick={() => paginate(paginateTo.forward, 'subscribe')}
                    src="/icons/back_arrow.png"
                    alt="back button"
                  />
                </div>
                <h3>если остались вопросы</h3>
              </div>
              <div className="inputs-wrapper">
                <input
                  value={client.clientName}
                  placeholder="Введите Ваше Имя"
                  type="text"
                  onChange={(evt) =>
                    setClient({ ...client, clientName: evt.target.value })
                  }
                />

                <InputMask
                  mask="+7 (999) 999 99 99"
                  value={client.phone}
                  disabled={false}
                  maskChar=" "
                  onChange={(evt) =>
                    setClient({ ...client, phone: evt.target.value })
                  }
                  style={{ padding: '16.5px 14px' }}
                >
                  {() => (
                    <input
                      placeholder="Введите Ваш номер телефона"
                      type="text"
                    />
                  )}
                </InputMask>
              </div>
              <ActionBtn
                onClick={() => handleAdminCall(client.clientName, client.phone)}
              >
                <span>ЗАКАЗАТЬ ЗВОНОК</span>
              </ActionBtn>
            </Content>
            <Content
              dragConstraints={{ left: 0, right: 0 }}
              custom={direction}
              variants={variants.authorizeSlideX}
              animate={authType == 'subscribe' ? 'center' : 'enter'}
            >
              <div className="header-wrapper">
                <div className="top-wrapper">
                  <h3>Подпишитесь</h3>
                  <img
                    onClick={() => paginate(paginateTo.back, 'call')}
                    src="/icons/back_arrow.png"
                    alt="back button"
                  />
                </div>
                <h3>на рассылку новостей</h3>
              </div>
              <div className="inputs-wrapper">
                <input
                  value={subscriber.name}
                  placeholder="Введите Ваше Имя"
                  type="text"
                  onChange={(evt) =>
                    setSubscriber({ ...subscriber, name: evt.target.value })
                  }
                />
                <input
                  value={subscriber.email}
                  placeholder="Введите Ваш почтовый адрес"
                  type="text"
                  onChange={(evt) =>
                    setSubscriber({ ...subscriber, email: evt.target.value })
                  }
                />
              </div>
              <ActionBtn
                onClick={() =>
                  handleSubscriber(subscriber.name, subscriber.email)
                }
              >
                <span>ПОДПИСАТЬСЯ</span>
              </ActionBtn>
            </Content>
          </FormContent>
        </FormContainer>
      </Container>
    </PaddingContainer>
  );
};

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  position: absolute;
  top: 0;
  left: 0;

  .header-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    h3 {
      color: ${color.textPrimary};
      font-weight: 200;
      font-size: 1.7rem;
    }
    .top-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h3 {
        color: ${color.textPrimary};
        font-weight: 200;
        font-size: 1.7rem;
      }
      img {
        width: 40px;
        cursor: pointer;
        transition: 200ms;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input {
      width: 300px;
      height: 40px;
      padding: 0 20px;
      border: none;
      border-bottom: 1px solid ${color.bgProduct};
      color: ${color.bgProduct};
      font-size: 1rem;
      font-weight: 300;
      background-color: transparent;
      &::placeholder {
        color: ${color.bgProduct};
      }
    }
  }
  @media ${devices.laptopS} {
    height: 95%;
    gap: 20px;
    padding: 10px;
    justify-content: center;
    gap: 50px;
    .header-wrapper {
      width: 100%;
      img {
        width: 50px;
        background: ${color.bgSecondary};
        padding: 8px;
        border-radius: 3px;
      }
    }
    .inputs-wrapper {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }

  @media ${devices.mobileL} {
    height: 95%;
    gap: 20px;
    padding: 10px;
    justify-content: center;
    gap: 50px;
    .header-wrapper {
      width: 100%;
      img {
        width: 50px;
        background: ${color.bgSecondary};
        padding: 8px;
        border-radius: 3px;
      }
    }
    .inputs-wrapper {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
  @media ${devices.mobileM} {
    height: 95%;
    gap: 20px;
    padding: 10px;
    justify-content: center;
    gap: 50px;
    .header-wrapper {
      width: 100%;
      img {
        width: 50px;
        background: ${color.bgSecondary};
        padding: 8px;
        border-radius: 3px;
      }
    }
    .inputs-wrapper {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }

  @media ${devices.mobileS} {
    height: 95%;
    gap: 20px;
    padding: 10px;
    justify-content: center;
    gap: 50px;
    .header-wrapper {
      width: 100%;
      img {
        width: 50px;
        background: ${color.bgSecondary};
        padding: 8px;
        border-radius: 3px;
      }
    }
    .inputs-wrapper {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
`;

const PaddingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: url(/newsler_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  @media ${devices.laptopS} {
    justify-content: flex-end;
  }

  @media ${devices.mobileL} {
    justify-content: flex-end;
  }
  @media ${devices.mobileM} {
    justify-content: flex-end;
  }

  @media ${devices.mobileS} {
    justify-content: flex-end;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${color.glassmorphismSeconderBG};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  @media ${devices.laptopS} {
    width: 100%;
    height: 70%;
  }

  @media ${devices.mobileL} {
    width: 100%;
    height: 70%;
  }
  @media ${devices.mobileM} {
    width: 100%;
    height: 70%;
  }

  @media ${devices.mobileS} {
    width: 100%;
    height: 70%;
  }
`;

const FormContent = styled.div`
  width: 300px;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media ${devices.mobileL} {
    width: 100%;
    height: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
    height: 100%;
  }

  @media ${devices.mobileS} {
    width: 100%;
    height: 100%;
  }
`;

const ActionBtn = styled.div`
  width: 300px;
  height: 40px;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
  display: flex;
  flex-dierction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${color.searchBtnBg};

    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  span {
    font-size: 1.2rem;
    font-weight: 300;
  }
  @media ${devices.laptopS} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
  @media ${devices.mobileM} {
    width: 100%;
  }

  @media ${devices.mobileS} {
    width: 100%;
  }
`;

export default Subscribers;
