import styled from 'styled-components';
import React from 'react';
import TextField from '@mui/material/TextField';
import color from '../../lib/ui.colors';
import { handleHiddenInputChange } from './helpers';
import { InputsTooltip } from '../helpers';
import { initialStateAdress } from './constant';
import { GeoLocateSVG, CloseSVGBlack } from 'assets/icons/UI-icons';

const AutoFill = (props: any) => {
  const { address, setAddress, setPostCode, setViewPort, mapRef } = props;
  const handleReset = () => {
    setViewPort({ ...initialStateAdress });
    mapRef.current.setCenter(initialStateAdress.center);
    mapRef.current.setZoom(initialStateAdress.zoom);
  };
  return (
    <>
      <TextAreaWrapper>
        <label htmlFor="address-autofill">
          <b>
            <span>Ваш адрес</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="address-tip"
            title={
              <React.Fragment>
                <span>
                  Пример: Санкт-Петербург, ТЦ Villa - ул. Савушкина д.119,
                  корп.3, 2 этаж, В-59
                </span>
                <span>Или</span>
                <span>
                  Определить местоположение с нажав на кнопку местоположения
                </span>
                <span>
                  <GeoLocateSVG />
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        {address != '' ? (
          <span className="address-clear-btn" onClick={() => handleReset()}>
            <CloseSVGBlack />
          </span>
        ) : (
          ''
        )}
        <TextField
          fullWidth
          label="Укажите адресс"
          multiline
          maxRows={Infinity}
          value={address}
          defaultValue=""
          onChange={(e) => handleHiddenInputChange(e, setAddress)}
        />
      </TextAreaWrapper>
    </>
  );
};

const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  position: relative;
  user-select: none;
  .address-clear-btn {
    position: absolute;
    right: 0px;
    top: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px;

    .tool-tip {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
      text-align: center;
      font-size: 12px;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

const AutoFillWrapper = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 0;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

export default AutoFill;
