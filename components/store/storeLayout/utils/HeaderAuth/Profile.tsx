import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import ReviewsSVG from '../../../../../assets/reviews.svg';
import BasketNormalSVG from '../../../../../assets/basket_normal.svg';
import SettingskSVG from '../../../../../assets/settings.svg';
import variants from 'components/store/lib/variants';
import { handleMenuState } from '../../helpers';
import { handleLogout } from './authorize/helpers';
import { useAppDispatch } from 'redux/hooks';
import { User } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../../constants';

type StyleProps = {
  width: number;
};

type Props = {
  user: User | null;
  direction: number;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

const Profile: React.FC<Props> = ({
  user,
  direction,
  setDisplay,
  setIsOpened,
}) => {
  const dispatch = useAppDispatch();

  return (
    <AuthContent
      key={'profile'}
      custom={direction}
      variants={variants.slider_auth}
      initial="enter"
      animate="center"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      }}
    >
      <ProfileWrapper>
        <AuthDevider style={{ justifyContent: 'flex-start' }}>
          <Link legacyBehavior href="/profile">
            <span>
              <motion.img
                src={
                  user?.image
                    ? `/api/images/${user.image}`
                    : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`;
                }}
                alt="profile"
                className="user-profile-image"
              />
            </span>
          </Link>
          <ProfileDataWrapper>
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <span className="user-email">{user?.email}</span>
            <Link href="/profile">
              <span
                className="user-profile-link"
                onClick={handleMenuState(setIsOpened, setDisplay)}
              >
                <b>Личные данные</b>
              </span>
            </Link>
          </ProfileDataWrapper>
        </AuthDevider>
      </ProfileWrapper>
      <div className="profile-action-btn">
        <Link href="/profile#reviews">
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuState(setIsOpened, setDisplay)}
          >
            <ReviewsSVG />
            <span>Мои отзывы</span>
          </AuthDevider>
        </Link>
        <Link href="/orders">
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuState(setIsOpened, setDisplay)}
          >
            <span style={{ width: '35px', height: '35px' }}>
              <BasketNormalSVG />
            </span>
            <span>Мои заказы</span>
          </AuthDevider>
        </Link>
        <Link href="/profile#settings">
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuState(setIsOpened, setDisplay)}
          >
            <SettingskSVG />
            <span>Настройки</span>
          </AuthDevider>
        </Link>
      </div>
      <AuthBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.01}
        variants={variants.grow}
        width="100"
        onClick={handleLogout(dispatch, setDisplay, setIsOpened)}
      >
        Выйти
      </AuthBtns>
    </AuthContent>
  );
};

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .profile-action-btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 25px;
    padding: 10px 0 20px 30px;
  }
`;

const AuthDevider = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const AuthBtns = styled(motion.button)<any>`
  width: ${(p: StyleProps) => p.width}%;
  height: 40px;
  min-height: 40px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${color.hoverBtnBg};
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  .user-profile-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0px 5px 10px ${color.boxShadowBtn};
  }
  .user-email {
    color: ${color.ok};
  }
  .user-profile-link {
    color: ${color.hoverBtnBg};
    font-size: 1.2rem;
    &:hover {
      color: ${color.hover};
    }
  }
`;

export { Profile };
