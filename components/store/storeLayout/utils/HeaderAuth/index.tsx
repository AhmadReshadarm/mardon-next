import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { PopupDisplay } from '../../constants';
import AuthBtn from './AuthBtn';
import Authorization from './authorize';
import { UsePagination } from './authorize/helpers';
import { handleAfterAuthorized } from './helpers';
import { Profile } from './Profile';
import { fetchUserById } from 'redux/slicers/authSlicer';
import { getAccessToken } from 'common/helpers/jwtToken.helpers';
import { session } from 'redux/slicers/authSlicer';
const Authorize = () => {
  const [direction, authType, paginate] = UsePagination();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && user?.id) dispatch(fetchUserById({ userId: user?.id! }));
  }, [isOpened]);

  useEffect(() => {
    dispatch(session());
  }, [isOpened]);
  return (
    <>
      <AuthBtn
        user={user}
        isSignedIn={!!user}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
        paginate={paginate}
        btnNode={btnNode}
      />
      <PopupWrapper
        ref={menuNode}
        style={{ display }}
        animate={isOpened ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <AuthContent>
          {user ? (
            <Profile
              user={user}
              direction={direction}
              setDisplay={setDisplay}
              setIsOpened={setIsOpened}
            />
          ) : (
            <Authorization
              direction={direction}
              authType={authType}
              paginate={paginate}
              onAfterAuthorized={handleAfterAuthorized(setDisplay, setIsOpened)}
            />
          )}
        </AuthContent>
      </PopupWrapper>
    </>
  );
};

const PopupWrapper = styled(motion.div)`
  width: 400px;
  height: 412px;
  position: absolute;
  top: 60px;
  right: -90px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
  z-index: 99;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default Authorize;
