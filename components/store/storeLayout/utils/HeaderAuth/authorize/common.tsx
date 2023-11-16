import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  a {
    width: 100%;
    text-align: start;
    padding: 10px 0;
  }
`;

const AuthBtns = styled(motion.button)`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direcion: row;
  justify-content: center;
  align-items: center;
  background-color: ${(p: styleProps) => p.bgcolor};
  color: ${(p: styleProps) => p.textcolor};
  border-radius: 5px;
  font-family: 'intro';
`;

const BtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  h4 {
    font-size: 1rem;
  }
  .newsletter-wrapper {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
`;

const AuthInputsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: relative;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    .tool-tip {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

const AuthInput = styled(motion.input)`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1rem;
  background: transparent;
  &::placeholder {
    color: ${color.bgSecondary};
  }
  &::-ms-input-placeholder {
    color: ${color.bgSecondary};
  }
`;
const ConfidentialityWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 5px;
  .content-confidentiality {
    width: 35px;
    height: 25px;
    overflow: hidden;
    position: relative;
    span {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff59;
  position: absolute;
  top: 0;
  left: 0;
`;

export {
  Content,
  AuthBtns,
  BtnsWrapper,
  FormWrapper,
  AuthInput,
  AuthInputsWrapper,
  ConfidentialityWrapper,
  Loading,
};
