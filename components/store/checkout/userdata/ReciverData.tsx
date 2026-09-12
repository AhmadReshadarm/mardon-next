// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputsTooltip } from '../helpers';
import React from 'react';
import { DetailsRowWrapper, DetailsColumnWrapper } from './common';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';

const ReciverData = (props: any) => {
  const { isOneClickBuy } = useAppSelector<TCartState>((state) => state.cart);
  const {
    fullName,
    setFullname,
    phone,
    setPhone,
    emailWithoutRegister,
    setEmailWithoutRegister,
  } = props;
  return (
    <>
      <h3>Данные получателя</h3>
      <DetailsRowWrapper justifycontent="center">
        <DetailsColumnWrapper>
          <label htmlFor="address-reciver-fullname">
            <b>
              <span>Имя и фамилия</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-reciver-fullname-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          {/* <TextField
            id="address-reciver-fullname"
            fullWidth
            label="Имя и фамилия"
            multiline
            rows={1}
            value={fullName}
            defaultValue=""
            onChange={(e) => setFullname(e.target.value)}
          /> */}
          <OutlinedInput
            id="address-reciver-fullname"
            fullWidth
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            inputProps={{ 'data-enter-nav': true }}
          />
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
      <DetailsRowWrapper justifycontent="center">
        <DetailsColumnWrapper>
          <label htmlFor="address-reciver-phone">
            <b>
              <span>Телефон</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="address-reciver-phone-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <InputMask
            mask="+7 (999) 999 99 99"
            value={phone}
            disabled={false}
            maskChar=" "
            onChange={(e) => setPhone(e.target.value)}
          >
            {/* {() => (
              <PhoneField>
                <TextField
                  id="address-reciver-phone"
                  fullWidth
                  label="Телефон"
                  rows={1}
                  defaultValue=""
                  placeholder="+7 (999) 999 99 99"
                />
              </PhoneField>
            )} */}
            {(inputProps: any) => (
              <OutlinedInput
                {...inputProps}
                id="address-reciver-phone"
                fullWidth
                inputProps={{ 'data-enter-nav': true }}
              />
            )}
          </InputMask>
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
      {isOneClickBuy ? (
        <DetailsRowWrapper justifycontent="center">
          <DetailsColumnWrapper>
            <label htmlFor="address-reciver-email">
              <b>
                <span>Адрес электронной почты</span>
                <span className="required">*</span>
              </b>
              <InputsTooltip
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                key="address-reciver-email-tip"
                title={
                  <React.Fragment>
                    <span>Это поле обязательно к заполнению</span>
                  </React.Fragment>
                }
              >
                <span className="tool-tip">?</span>
              </InputsTooltip>
            </label>
            {/* <TextField
              id="address-reciver-email"
              fullWidth
              label="Адрес электронной почты"
              placeholder="email@example.com"
              type="email"
              multiline
              rows={1}
              value={emailWithoutRegister}
              defaultValue=""
              onChange={(e) => setEmailWithoutRegister(e.target.value)}
            /> */}
            <OutlinedInput
              id="address-reciver-email"
              fullWidth
              placeholder="mail@mail.ru"
              type="email"
              value={emailWithoutRegister}
              onChange={(e) => setEmailWithoutRegister(e.target.value)}
              inputProps={{ 'data-enter-nav': true }}
            />
          </DetailsColumnWrapper>
        </DetailsRowWrapper>
      ) : (
        ''
      )}
    </>
  );
};

const PhoneField = styled.div`
  display: flex;
  width: 100%;
`;

export default ReciverData;
