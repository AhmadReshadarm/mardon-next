import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { PopupContainer } from '../common';
import { useAppDispatch } from 'redux/hooks';
import { updateReview } from 'redux/slicers/store/profileSlicer';
import { AppDispatch } from 'redux/store';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { Review } from 'swagger/services';
import { DeleteSVG, ShareWhiteSVG, CloseSVGBlack } from 'assets/icons/UI-icons';

const AddReview = ({ setOpen, review }) => {
  const dispatch = useAppDispatch();
  const [rate, setRate] = useState(review.rating);
  const [src, setSrc] = useState([]);
  const [input, setInput] = useState(review.text);
  const [success, setSuccess] = useState('');

  const handleDelete = (passed: any) => {
    setSrc(src.filter((item) => item != passed));
  };

  const handleReviewPublish =
    (dispatch: AppDispatch, rating: number, text: string, review: Review) =>
    async (e) => {
      e.preventDefault();
      const payload = {
        ...review,
        rating,
        text,
      };
      await dispatch(updateReview({ reviewId: review.id!, payload }));
      setSuccess('Ваш отзыв опубликован');
      setTimeout(() => {
        setSuccess('');
        setOpen(false);
      }, 1000);
    };

  useEffect(() => {
    return () => {
      dispatch(clearImageList());
    };
  }, []);

  return (
    <PopupContainer>
      <AddReviewContainer
        custom={0}
        initial="init"
        whileInView="animate"
        variants={variants.fadeOutSlideOut}
      >
        <span onClick={() => setOpen(false)} className="close-btn">
          <CloseSVGBlack />
        </span>
        <StarsWrapper>
          <span>Пожалуйста, оцените этот товар</span>
          <Rating
            value={rate}
            size="medium"
            onChange={(event, newValue: any) => {
              setRate(newValue);
            }}
          />
        </StarsWrapper>
        <form>
          <span>Пожалуйста, напишите комментарий об этом товаре</span>
          <TextField
            fullWidth
            label="Комментарий"
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
            onClick={handleReviewPublish(dispatch, rate, input, review)}
          >
            <span>Опубликовать обзор</span>
            <span>
              <ShareWhiteSVG />
            </span>
          </motion.button>
        </form>
        <motion.span
          className="success-review"
          custom={0}
          animate={success.length == 0 ? 'init' : 'animate'}
          variants={variants.fadeOutSlideOut}
        >
          {success}
        </motion.span>
        <PreviewWrapper style={{ display: src.length == 0 ? 'none' : 'grid' }}>
          {src.map((item, index) => {
            return (
              <motion.li
                custom={index * 0.02}
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
                key={index}
              >
                <motion.img
                  custom={index * 0.08}
                  initial="init"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={variants.slideInFromRigh}
                  src={item}
                  alt=""
                />
                <motion.span
                  custom={1.05}
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.grow}
                  className="delete-wrapper"
                  onClick={() => handleDelete(item)}
                >
                  <span>Удалить</span>
                  <span>
                    <DeleteSVG />
                  </span>
                </motion.span>
              </motion.li>
            );
          })}
        </PreviewWrapper>
      </AddReviewContainer>
    </PopupContainer>
  );
};

const AddReviewContainer = styled(motion.div)`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border-radius: 20px;
  gap: 5px;
  position: relative;
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .success-review {
    color: ${color.ok};
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
      cursor: pointer;
      span {
        display: flex;
      }
    }
  }
  @media ${devices.tabletL} {
    width: 90%;
    .close-btn {
      top: -20px;
      right: 10px;
    }
  }
  @media ${devices.tabletS} {
    width: 90%;
    .close-btn {
      top: -20px;
      right: 10px;
    }
  }
  @media ${devices.mobileL} {
    width: 90%;
    .close-btn {
      top: -20px;
      right: 10px;
    }
  }
  @media ${devices.mobileM} {
    width: 90%;
    .close-btn {
      top: -20px;
      right: 10px;
    }
  }
  @media ${devices.mobileS} {
    width: 90%;
    .close-btn {
      top: -20px;
      right: 10px;
    }
  }
`;

const StarsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`;

const PreviewWrapper = styled.ul`
  width: 100%;
  height: 125px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  padding: 5px;
  li {
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    .delete-wrapper {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: ${color.hover};
      cursor: pointer;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
`;

export default AddReview;
