import { Btns } from '../../common';
import { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import variants from 'components/store/lib/variants';
import { paginateTo } from 'components/store/checkout/constant';
import { handleMenuState } from '../../helpers';
import { PopupDisplay } from '../../constants';
import { User } from 'swagger/services';
import ProfileLogedOutSVG from '../../../../../assets/profile_loged_out.svg';
type Props = {
  user: User | null;
  isSignedIn: boolean;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  paginate: any;
  btnNode: any;
};

const AuthBtn: React.FC<Props> = ({
  user,
  isSignedIn,
  setDisplay,
  setIsOpened,
  paginate,
  btnNode,
}) => {
  const [isAnimate, setAnimate] = useState(false);

  return (
    <ParentContainer ref={btnNode}>
      {isSignedIn ? (
        <Btns
          onClick={() => {
            paginate(paginateTo.back, 'selection');
            handleMenuState(setIsOpened, setDisplay)();
          }}
          key="auth-profile"
          initial="init"
          animate={isSignedIn ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
        >
          <span
            style={{
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              backgroundColor: '#000',
              display: 'block',
            }}
          >
            <img
              src={
                user?.image
                  ? `/api/images/${user.image}`
                  : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${user?.firstName}`;
              }}
              className="user-profile-image"
            />
          </span>
        </Btns>
      ) : (
        <motion.button
          className="header-action-btns"
          onClick={(e) => {
            paginate(paginateTo.back, 'selection');
            handleMenuState(setIsOpened, setDisplay)();
            setAnimate(!isAnimate);
            setTimeout(() => setAnimate(false), 200);
          }}
          key="auth"
          initial="init"
          animate={!isSignedIn ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
          title="Войти"
        >
          <span>
            <ProfileLogedOutSVG />
          </span>
        </motion.button>
      )}
    </ParentContainer>
  );
};

const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default AuthBtn;
