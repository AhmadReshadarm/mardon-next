import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { Role } from 'common/enums/roles.enum';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import {
  sendVerificationToken,
  signout,
  updateUserById,
} from 'redux/slicers/authSlicer';
import BasketNormalSVG from '../../../../assets/basket_normal.svg';
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';
import { AppDispatch } from 'redux/store';
import { clearSingleImage, createSigleImage } from 'redux/slicers/imagesSlicer';
const UserInfo = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [counter, setCoutner] = useState(30);
  const [iteration, setItration] = useState(0);
  const [counterStart, setCounterStart] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      if (counter == 0) {
        setCoutner(30);
        setCounterStart(false);
        return;
      }
      if (counterStart) setCoutner(counter - 1);
    }, 1000);
  }, [counter, counterStart]);

  // _________________ image upload funtion __________________
  const imageList = useAppSelector<string>((state) => state.images.singleImage);
  const inputRef = useRef<any>(null);
  const [src, setSrc] = useState('');
  const handleUserImageUpload = async (
    event: any,
    setSrc: any,
    dispatch: AppDispatch,
  ) => {
    const fileObj = event.target.files;
    if (!fileObj[0]) {
      return;
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    await dispatch(createSigleImage({ config, file: fileObj[0] }));
    setSrc(URL.createObjectURL(fileObj[0]));

    dispatch(clearSingleImage());
  };

  useEffect(() => {
    if (imageList.length > 1) {
      dispatch(
        updateUserById({ userId: user?.id!, user: { image: imageList } }),
      );
    }
  }, [imageList]);

  const trigerImageUpload = (evt: any) => {
    evt.preventDefault();
    inputRef.current.click();
  };

  //  _______________________________
  return (
    <Wrapper>
      <div className="user-profile-image">
        <img
          src={
            src !== ''
              ? src
              : user?.image
              ? `/api/images/${user.image}`
              : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`;
          }}
        />
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          name="img"
          max={4}
          accept="image/png, image/gif, image/jpeg"
          onChange={(evt) => handleUserImageUpload(evt, setSrc, dispatch)}
        />
        <div
          onClick={(evt) => trigerImageUpload(evt)}
          className="user-image-change"
        ></div>
      </div>

      <h1>
        {`${user?.firstName?.slice(0, 30)} ${user?.lastName?.slice(0, 30)}`}
        <span style={{ color: color.ok, fontSize: '0.7rem' }}>
          {user?.role === Role.SuperUser ? 'премия' : ''}
        </span>
      </h1>
      <span
        style={{ color: user?.isVerified ? color.textSecondary : color.hover }}
      >
        {user?.email}
      </span>
      {!user?.isVerified ? (
        <>
          <Err
            initial="init"
            animate="animate"
            variants={variants.fadInSlideUp}
          >
            Ваш аккаунт не подтвержден
          </Err>
          <ActionBtns
            disabled={counterStart || iteration > 4 ? true : false}
            onClick={() => {
              dispatch(sendVerificationToken());
              setCounterStart(true);
              setItration(iteration + 1);
            }}
          >
            {counterStart
              ? `попробуй еще раз после: ${counter}`
              : iteration > 4
              ? 'Повторите попытку через 24 часа.'
              : 'Отправить мне подтверждение'}
          </ActionBtns>
        </>
      ) : (
        ''
      )}
      <ActionBtns onClick={() => dispatch(signout())}>Выйти</ActionBtns>

      <ActionBtns>
        <Link
          className="action-btn-with-link"
          style={{ width: '100%' }}
          href="/orders"
        >
          <span style={{ width: '20px', height: '20px' }}>
            <BasketNormalSVG />
          </span>
          <span>Мои заказы</span>
        </Link>
      </ActionBtns>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .user-profile-image {
    width: 80px;
    border-radius: 50%;
    position: relative;
    transition: 200ms;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-image-change {
      min-width: 80px;
      min-height: 80px;
      border-radius: 50%;
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
    }
    &:hover {
      &::before {
        content: 'Изменять';
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: ${color.glassmorphismBg};
        backdrop-filter: blur(9px);
        -webkit-backdrop-filter: blur(9px);
      }
    }
  }
  h1 {
    font-family: 'Anticva';
    font-size: 1.5rem;
  }
`;

const Err = styled(motion.span)`
  color: ${color.hover};
`;

const ActionBtns = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background-color: ${color.searchBtnBg};

    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    span {
      color: ${color.textPrimary};
    }
  }
  span {
    font-family: 'Jost';
    font-size: 1rem;
  }
  .action-btn-with-link {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
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

export default UserInfo;
