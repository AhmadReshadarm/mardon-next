import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 70px;
  left: 0;
  padding: 60px;
  a {
    width: 100%;
    text-align: start;
    padding: 10px 0;
  }
`;

const AuthorizationFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 25px;
  .form-inputs-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
  }
  .action-buttons-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    button {
      padding: 10px 15px;
      border-radius: 30px;
      background-color: ${color.buttonPrimary};
      color: ${color.textPrimary};
      font-family: ricordi;
    }
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
  align-items: flex-start;
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

const AuthInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid;
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
  FormWrapper,
  AuthInput,
  AuthInputsWrapper,
  Loading,
  AuthorizationFormWrapper,
};
