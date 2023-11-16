import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import MapContainer from './MapContainer';
import { useEffect, useState, useRef } from 'react';
import { styleProps } from 'components/store/lib/types';
import { geoLocatClick } from './helpers';
import AutoFill from './Autofill';
import Locate from '../../../../assets/geolocate.svg';
import AddressDetails from './AddressDetails';
import ReciverData from './ReciverData';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setDeliveryInfo } from 'redux/slicers/store/checkoutSlicer';
import { TStoreCheckoutState, TCartState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { initialStateAdress } from './constant';
// import * as turf from '@turf/turf';

const UserData = ({ setStep, backToFinal, setHasAddress }) => {
  const dispatch = useAppDispatch();
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { isOneClickBuy } = useAppSelector<TCartState>((state) => state.cart);

  const [address, setAddress] = useState('');
  const mapRef: any = useRef(null);
  // const [viewport, setViewPort]: [any, any] = useState({
  //   latitude: 59.98653,
  //   longitude: 30.22623,
  //   zoom: 10,
  //   width: 'fit',
  // });

  const [viewport, setViewPort] = useState({ ...initialStateAdress });

  // useEffect(() => {
  //   const { latitude, longitude } = viewport;

  //   let from = turf.point([59.98653, 30.22623]);
  //   let to = turf.point([latitude, longitude]);

  //   let distance = turf.distance(from, to, { units: 'kilometers' });
  //   console.log(distance);
  // }, [viewport]);
  const [zipCode, setPostCode] = useState('');
  const [roomOrOffice, setRoomOrOffice] = useState('');
  const [door, setDoor] = useState('');
  const [floor, setFloor] = useState('');
  const [rignBell, setRingBell] = useState('');
  const [receiverName, setFullname] = useState('');
  const [receiverPhone, setPhone] = useState('+7');
  const [emailWithoutRegister, setEmailWithoutRegister] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleClickBack = () => {
    setStep(2);
    setHasAddress(true);
  };

  const handleClickSave = () => {
    const payload = {
      address,
      receiverName,
      receiverPhone,
      receiverEmail: emailWithoutRegister,
      floor,
      door,
      roomOrOffice,
      zipCode,
      rignBell,
    };
    dispatch(setDeliveryInfo(payload));
    setStep(2);
    setHasAddress(true);
  };

  useEffect(() => {
    setPostCode(deliveryInfo?.zipCode ?? '');
    setRoomOrOffice(deliveryInfo?.roomOrOffice ?? '');
    setDoor(deliveryInfo?.door ?? '');
    setFloor(deliveryInfo?.floor ?? '');
    setRingBell(deliveryInfo?.rignBell ?? '');
    setFullname(deliveryInfo?.receiverName ?? '');
    setPhone(deliveryInfo?.receiverPhone ?? '');
    setEmailWithoutRegister(deliveryInfo?.receiverEmail ?? '');
    setAddress(deliveryInfo?.address ?? '');
  }, [deliveryInfo]);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  useEffect(() => {
    isEmpty(address) || isEmpty(receiverName) || isEmpty(receiverPhone)
      ? setSubmitDisabled(true)
      : setSubmitDisabled(false);
    if (isOneClickBuy) {
      isEmpty(address) ||
      isEmpty(receiverName) ||
      isEmpty(receiverPhone) ||
      !isEmail(emailWithoutRegister) ||
      isEmpty(emailWithoutRegister)
        ? setSubmitDisabled(true)
        : setSubmitDisabled(false);
    }
  }, [address, receiverName, receiverPhone, emailWithoutRegister]);

  return (
    <Container>
      <MapContainer
        viewport={viewport}
        setViewPort={setViewPort}
        setAddress={setAddress}
        mapRef={mapRef}
        setPostCode={setPostCode}
      />
      <FormContainer
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
      >
        {backToFinal ? (
          <ActionBtns bgcolor={color.btnSecondery} onClick={handleClickBack}>
            Назад
          </ActionBtns>
        ) : (
          ''
        )}
        <FormWrapper>
          <h3>Куда доставить заказ?</h3>
          <span className="sub-addres-info">
            Укажите адрес на карте или нажмите кнопку "Определить
            местоположение"
          </span>
          <AutoFill
            address={address}
            setAddress={setAddress}
            setPostCode={setPostCode}
            setViewPort={setViewPort}
            mapRef={mapRef}
          />
          <button
            className="geolocate"
            onTouchStart={geoLocatClick}
            onClick={geoLocatClick}
          >
            <span>
              <Locate />
            </span>
            <span>Определить местоположение</span>
          </button>
          <AddressDetails
            roomOrOffice={roomOrOffice}
            setRoomOrOffice={setRoomOrOffice}
            postCode={zipCode}
            setPostCode={setPostCode}
            door={door}
            setDoor={setDoor}
            floor={floor}
            setFloor={setFloor}
            rignBell={rignBell}
            setRingBell={setRingBell}
          />
          <ReciverData
            fullName={receiverName}
            setFullname={setFullname}
            phone={receiverPhone}
            setPhone={setPhone}
            emailWithoutRegister={emailWithoutRegister}
            setEmailWithoutRegister={setEmailWithoutRegister}
          />
          <ActionBtns
            bgcolor={submitDisabled ? color.textSecondary : color.btnSecondery}
            // emailWithoutRegister
            disabled={submitDisabled}
            onClick={handleClickSave}
          >
            Сохранить и продолжить
          </ActionBtns>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 30px;
  @media (min-width: 768px) and (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
`;

const FormContainer = styled(motion.div)`
  width: 450px;
  // height: 95vh;
  // min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // z-index: 10;
  // overflow-y: scroll;
  // overflow-x: hidden;
  user-select: none;
  &::-webkit-scrollbar {
    width: 5px;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileL} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileM} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
  @media ${devices.mobileS} {
    padding: 15px;
    position: relative;
    overflow-y: unset;
    width: 100%;
    height: auto;
  }
`;

const ActionBtns = styled.button`
  width: 100%;
  height: 40px;
  min-height: 40px;
  border-radius: 3px;
  background-color: ${(p: styleProps) => p.bgcolor};
  cursor: pointer;
  transition: 300ms;
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
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .sub-addres-info {
    color: ${color.textSecondary};
  }
  .geolocate {
    width: 100%;
    display: flex;
    flex-direction: row;
    jusitfy-content: flex-start;
    align-items: center;
    gap: 10px;
    span {
      color: ${color.ok};
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
    }
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default UserData;
