import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Rating } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handleFileChange } from './helpers';
import Upload from '../../../../../assets/upload.svg';
import Delete from '../../../../../assets/delete.svg';
import Share from '../../../../../assets/shareWhite.svg';
import { TAuthState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { Product } from 'swagger/services';
import { AppDispatch } from 'redux/store';
import { createReview } from 'redux/slicers/store/productInfoSlicer';
import { openErrorNotification } from 'common/helpers';

type Props = {
  product: Product | undefined;
};
const AddReview: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [rate, setRate] = useState(0);
  const [src, setSrc] = useState([]);
  const [input, setInput] = useState('');
  const [success, setSuccess] = useState('');
  const inputRef = useRef<any>(null);
  const imageList = useAppSelector<any[]>((state) => state.images.imageList);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleClick = (evt: any, setUploadBtnAvailable) => {
    evt.preventDefault();
    setUploadBtnAvailable(false);
    inputRef.current.click();
  };

  const handleDelete = (passed: any) => {
    setSrc(src.filter((item) => item != passed));
  };

  const handleReviewPublish =
    (
      dispatch: AppDispatch,
      rating: number,
      images: string[],
      text: string,
      userId: string,
      productId: string,
    ) =>
    async (e) => {
      e.preventDefault();

      if (rating < 1) {
        openErrorNotification('Пожалуйста, дайте этому товару оценку');
        return;
      }
      if (text.length > 300 || text.length === 0) {
        openErrorNotification(
          'Минимальное количество символов: 2, максимальное количество символов: 300.',
        );
        return;
      }
      const payload = {
        rating,
        text,
        images: images.join(', '),
        productId,
        userId,
      };
      await dispatch(createReview(payload));

      setSuccess('Ваш отзыв опубликован');
      setTimeout(() => setSuccess(''), 2000);
    };

  useEffect(() => {
    return () => {
      dispatch(clearImageList());
    };
  }, []);
  const [uploadBtnAvailable, setUploadBtnAvailable] = useState(true);

  return (
    <AddReviewContainer
      custom={0}
      initial="init"
      whileInView="animate"
      variants={variants.fadeOutSlideOut}
    >
      <StarsWrapper>
        <span>Оцените этот товар</span>
        <Rating
          value={rate}
          size="medium"
          onChange={(event, newValue: any) => {
            setRate(newValue);
          }}
        />
      </StarsWrapper>
      <form>
        <span>Напишите комментарий об этом товаре</span>
        <TextField
          fullWidth
          label="Комментарий"
          multiline
          rows={4}
          value={input}
          defaultValue=""
          onChange={(e) => setInput(e.target.value)}
        />

        <span>Загрузите изображения товара</span>
        <input
          ref={inputRef}
          type="file"
          name="img"
          multiple
          max={4}
          accept="image/png, image/gif, image/jpeg"
          onClick={() => setUploadBtnAvailable(false)}
          onChange={(evt) =>
            handleFileChange(evt, setSrc, dispatch, setUploadBtnAvailable)
          }
        />
        {uploadBtnAvailable || src.length == 0 ? (
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={(evt) => handleClick(evt, setUploadBtnAvailable)}
          >
            <span>Выберите изображения</span>
            <span>
              <Upload />
            </span>
          </motion.button>
        ) : (
          ''
        )}
        <motion.button
          whileHover={{ boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)' }}
          whileTap={{ boxShadow: '0px 0px 0px 0px #ffffff' }}
          custom={0}
          animate={input.length == 0 ? 'init' : 'animate'}
          variants={variants.fadeOutSlideOut}
          style={{ display: input.length == 0 ? 'none' : 'flex' }}
          onClick={handleReviewPublish(
            dispatch,
            rate,
            imageList,
            input,
            user?.id!,
            product?.id!,
          )}
        >
          <span>Опубликовать обзор</span>
          <span>
            <Share />
          </span>
        </motion.button>
      </form>
      <motion.span
        className="success-review"
        custom={0}
        animate={success.length == 0 ? 'init' : 'animate'}
        variants={variants.fadeOutSlideOut}
      >
        {/* {success} */}
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
                  <Delete />
                </span>
              </motion.span>
            </motion.li>
          );
        })}
      </PreviewWrapper>
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
    width: 80px;
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
