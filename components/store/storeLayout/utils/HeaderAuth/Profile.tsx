import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import variants from 'components/store/lib/variants';
import { handleLogout } from './authorize/helpers';
import { useAppDispatch } from 'redux/hooks';
import { User } from 'swagger/services';
import { handleMenuStateRedux } from '../../helpers';
import {
  changeAuthFormDisplayState,
  changeAuthFormState,
} from 'redux/slicers/store/globalUISlicer';
import { useAppSelector } from 'redux/hooks';
import { TGlobalUIState } from 'redux/types';
type StyleProps = {
  width: number;
};

type Props = {
  user: User | null;
  direction: number;
};

const Profile: React.FC<Props> = ({ user, direction }) => {
  const dispatch = useAppDispatch();
  const { isAuthFormOpen, authDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );

  return (
    <AuthContent
      key={'profile'}
      custom={direction}
      variants={variants.slider_auth}
      initial="enter"
      animate="center"
    >
      <ProfileWrapper>
        <AuthDevider style={{ justifyContent: 'flex-start' }}>
          <Link legacyBehavior href="/profile" prefetch={false}>
            <span>
              <motion.img
                src={
                  user?.image
                    ? `/api/images/${user.image}`
                    : `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`;
                }}
                alt="profile"
                className="user-profile-image"
              />
            </span>
          </Link>
          <ProfileDataWrapper>
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <span className="user-email">{user?.email}</span>
            <Link href="/profile" prefetch={false}>
              <span
                className="user-profile-link"
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeAuthFormState,
                  changeAuthFormDisplayState,
                  isAuthFormOpen,
                  authDisplay,
                )}
              >
                <b>Личные данные</b>
              </span>
            </Link>
          </ProfileDataWrapper>
        </AuthDevider>
      </ProfileWrapper>
      <div className="profile-action-btn">
        <Link href="/profile#reviews" prefetch={false}>
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuStateRedux(
              dispatch,
              changeAuthFormState,
              changeAuthFormDisplayState,
              isAuthFormOpen,
              authDisplay,
            )}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="29"
                height="29"
                rx="1.5"
                stroke="#707F8D"
              />
              <line
                x1="5"
                y1="6"
                x2="24"
                y2="6"
                stroke="#707F8D"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="5"
                y1="22"
                x2="24"
                y2="22"
                stroke="#707F8D"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="5"
                y1="14"
                x2="24"
                y2="14"
                stroke="#707F8D"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span>Мои отзывы</span>
          </AuthDevider>
        </Link>
        <Link href="/orders" prefetch={false}>
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuStateRedux(
              dispatch,
              changeAuthFormState,
              changeAuthFormDisplayState,
              isAuthFormOpen,
              authDisplay,
            )}
          >
            <span style={{ width: '35px', height: '35px' }}>
              <svg
                fill="#606060"
                fillRule="evenodd"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18.41 19.38"
              >
                <defs>
                  <style></style>
                </defs>
                <path
                  className="cls-1"
                  d="M6.06,2.32c0-.41,.33-.73,.73-.73h4.93c.41,0,.73,.33,.73,.73v3.61H6.06V2.32Zm7.38,0v3.61h3.98l-.04,.53-.98,11.62-.04,.45H2.17l-.04-.45L1.15,6.46l-.04-.53h3.98V2.32c0-.95,.77-1.71,1.71-1.71h4.93c.95,0,1.71,.77,1.71,1.71ZM3.07,17.55l-.9-10.64h14.19l-.9,10.64H3.07Zm2.53-7.25h7.36v-.92H5.6v.92Z"
                />
              </svg>
            </span>
            <span>Мои заказы</span>
          </AuthDevider>
        </Link>
        <Link href="/profile#settings" prefetch={false}>
          <AuthDevider
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            onClick={handleMenuStateRedux(
              dispatch,
              changeAuthFormState,
              changeAuthFormDisplayState,
              isAuthFormOpen,
              authDisplay,
            )}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.4644 11.851L26.3587 11.4938C26.1394 10.7856 25.8574 10.1025 25.5127 9.45078L26.7535 7.71484C27.28 6.97534 27.1985 5.96636 26.553 5.32714L24.6855 3.45959C24.3345 3.10864 23.8708 2.91437 23.3757 2.91437C22.9871 2.91437 22.6174 3.03344 22.304 3.25905L20.5618 4.4999C19.885 4.14269 19.1768 3.84814 18.4436 3.6288L18.0926 1.54818C17.9422 0.652005 17.1714 0.000244141 16.2627 0.000244141H13.6243C12.7156 0.000244141 11.9448 0.652005 11.7944 1.54818L11.4309 3.67893C10.729 3.89828 10.0459 4.18656 9.39413 4.5375L7.67073 3.29665C7.35738 3.07104 6.98136 2.95197 6.59281 2.95197C6.09773 2.95197 5.62771 3.14624 5.28303 3.49719L3.40921 5.36474C2.76998 6.00397 2.68225 7.01294 3.20867 7.75244L4.46206 9.51345C4.11738 10.1715 3.84163 10.8546 3.62855 11.5627L1.54793 11.9137C0.651761 12.0641 0 12.8349 0 13.7436V16.382C0 17.2907 0.651761 18.0615 1.54793 18.212L3.67869 18.5754C3.89803 19.2773 4.18631 19.9604 4.53726 20.6122L3.30267 22.3293C2.77625 23.0688 2.85772 24.0778 3.50322 24.717L5.37076 26.5846C5.72171 26.9355 6.18546 27.1298 6.68055 27.1298C7.0691 27.1298 7.43885 27.0107 7.7522 26.7851L9.51321 25.5317C10.1462 25.8639 10.8105 26.1334 11.4936 26.3464L11.8445 28.4521C11.9949 29.3483 12.7657 30.0001 13.6744 30.0001H16.3191C17.2278 30.0001 17.9986 29.3483 18.149 28.4521L18.5063 26.3464C19.2144 26.1271 19.8975 25.8451 20.5493 25.5004L22.2852 26.7412C22.5986 26.9669 22.9746 27.0859 23.3631 27.0859C23.8582 27.0859 24.322 26.8917 24.6729 26.5407L26.5405 24.6732C27.1797 24.0339 27.2674 23.025 26.741 22.2855L25.5002 20.5433C25.8448 19.8852 26.1331 19.2021 26.3462 18.5002L28.4519 18.1493C29.3481 17.9989 29.9998 17.228 29.9998 16.3193V13.681C30.0123 12.7723 29.3606 12.0014 28.4644 11.851ZM28.3203 16.3193C28.3203 16.4008 28.2639 16.4697 28.1824 16.4823L25.5503 16.921C25.2181 16.9774 24.9549 17.2218 24.8735 17.5414C24.6353 18.4626 24.2718 19.3463 23.783 20.1672C23.6138 20.4555 23.6263 20.8127 23.8206 21.0885L25.3685 23.2694C25.4124 23.332 25.4061 23.426 25.3497 23.4824L23.4822 25.35C23.4383 25.3939 23.3945 25.4001 23.3631 25.4001C23.3255 25.4001 23.2942 25.3876 23.2691 25.3688L21.0945 23.8209C20.825 23.6266 20.4615 23.6141 20.1733 23.7833C19.3523 24.2721 18.4687 24.6356 17.5474 24.8737C17.2215 24.9552 16.9771 25.2247 16.927 25.5505L16.482 28.1826C16.4695 28.2641 16.4006 28.3205 16.3191 28.3205H13.6807C13.5992 28.3205 13.5303 28.2641 13.5178 28.1826L13.0791 25.5505C13.0227 25.2184 12.7783 24.9552 12.4587 24.8737C11.5625 24.6418 10.6977 24.2846 9.88922 23.8209C9.75762 23.7457 9.60721 23.7081 9.46307 23.7081C9.29386 23.7081 9.11839 23.7582 8.97425 23.8647L6.78082 25.4252C6.74949 25.444 6.71815 25.4565 6.68682 25.4565C6.66175 25.4565 6.61162 25.4503 6.56775 25.4064L4.7002 23.5388C4.6438 23.4824 4.63753 23.3947 4.6814 23.3258L6.22307 21.1637C6.41734 20.8879 6.42987 20.5245 6.26067 20.2362C5.77185 19.4215 5.39583 18.5378 5.15769 17.6166C5.06995 17.297 4.80674 17.0526 4.48086 16.9962L1.82994 16.5449C1.74847 16.5324 1.69207 16.4635 1.69207 16.382V13.7436C1.69207 13.6622 1.74847 13.5932 1.82994 13.5807L4.44326 13.142C4.7754 13.0856 5.04488 12.8412 5.12635 12.5153C5.35823 11.5941 5.71544 10.7042 6.198 9.8832C6.3672 9.59492 6.3484 9.2377 6.15413 8.96823L4.59366 6.7748C4.54979 6.71213 4.55606 6.61813 4.61246 6.56172L6.48001 4.69418C6.52388 4.65031 6.56775 4.64404 6.59908 4.64404C6.63668 4.64404 6.66802 4.65658 6.69309 4.67538L8.85518 6.21704C9.13092 6.41132 9.4944 6.42385 9.78268 6.25464C10.5974 5.76582 11.481 5.38981 12.4023 5.15166C12.7219 5.06393 12.9663 4.80072 13.0227 4.47483L13.4739 1.82392C13.4864 1.74245 13.5554 1.68605 13.6368 1.68605H16.2752C16.3567 1.68605 16.4256 1.74245 16.4382 1.82392L16.8769 4.43723C16.9333 4.76938 17.1777 5.03886 17.5035 5.12033C18.4499 5.35847 19.3523 5.72822 20.1921 6.22331C20.4803 6.39252 20.8376 6.37998 21.1133 6.18571L23.2754 4.63151C23.3067 4.61271 23.3381 4.60017 23.3694 4.60017C23.3945 4.60017 23.4446 4.60644 23.4885 4.65031L25.356 6.51786C25.4124 6.57426 25.4187 6.66199 25.3748 6.73093L23.8269 8.90556C23.6326 9.17503 23.6201 9.53852 23.7893 9.8268C24.2781 10.6478 24.6416 11.5314 24.8797 12.4526C24.9612 12.7785 25.2307 13.0229 25.5566 13.0731L28.1887 13.518C28.2701 13.5306 28.3265 13.5995 28.3265 13.681V16.3193H28.3203V16.3193Z"
                fill="#707F8D"
              />
              <path
                d="M15.003 8.5231C11.4309 8.5231 8.5293 11.4247 8.5293 14.9968C8.5293 18.569 11.4309 21.4706 15.003 21.4706C18.5752 21.4706 21.4768 18.569 21.4768 14.9968C21.4768 11.4247 18.5752 8.5231 15.003 8.5231ZM15.003 19.7785C12.3647 19.7785 10.2214 17.6352 10.2214 14.9968C10.2214 12.3585 12.3647 10.2152 15.003 10.2152C17.6414 10.2152 19.7847 12.3585 19.7847 14.9968C19.7847 17.6352 17.6414 19.7785 15.003 19.7785Z"
                fill="#707F8D"
              />
            </svg>
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
        onClick={handleLogout(dispatch)}
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
    font-weight: 500;
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
