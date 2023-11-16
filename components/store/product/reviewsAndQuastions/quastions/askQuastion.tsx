import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Share from '../../../../../assets/shareWhite.svg';
import { useAppDispatch } from 'redux/hooks';
import { createQuestion } from 'redux/slicers/store/productInfoSlicer';

const AskQuastion = ({ userId, productId }) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleAskQuestion = () => async (e) => {
    e.preventDefault();
    await dispatch(
      createQuestion({
        text: input,
        productId,
        userId,
      }),
    );
    setInput('');
  };

  return (
    <AddReviewContainer
      custom={0}
      initial="init"
      whileInView="animate"
      variants={variants.fadeOutSlideOut}
    >
      <form>
        <span>Мы вернемся к вашему вопросу как можно скорее</span>
        <TextField
          fullWidth
          label="Ваш вопрос"
          multiline
          rows={4}
          value={input}
          defaultValue=""
          onChange={(e) => setInput(e.target.value)}
        />
        <motion.button
          whileHover={{ boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)' }}
          whileTap={{ boxShadow: '0px 0px 0px 0px #ffffff' }}
          custom={0}
          animate={input.length == 0 ? 'init' : 'animate'}
          variants={variants.fadeOutSlideOut}
          style={{ display: input.length == 0 ? 'none' : 'flex' }}
          onClick={handleAskQuestion()}
        >
          <span>Опубликовать вопрос</span>
          <span>
            <Share />
          </span>
        </motion.button>
      </form>
    </AddReviewContainer>
  );
};

const AddReviewContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border-radius: 20px;
  gap: 20px;
  .success-review {
    color: ${color.ok};
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    textarea {
      width: 100%;
    }
    input {
      display: none;
    }
    button {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      border-radius: 15px;
      span {
        display: flex;
      }
    }
  }
`;

export default AskQuastion;
