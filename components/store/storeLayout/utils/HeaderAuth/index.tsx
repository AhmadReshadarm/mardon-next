import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { outsideClickListnerRedux } from 'components/store/storeLayout/helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { TAuthState, TGlobalUIState } from 'redux/types';
import styled from 'styled-components';
import Authorization from './authorize';
import { UsePagination } from './authorize/helpers';
import { Profile } from './Profile';
import { fetchUserById } from 'redux/slicers/authSlicer';
import { getAccessToken } from 'common/helpers/jwtToken.helpers';
import { session } from 'redux/slicers/authSlicer';
import {
  changeAuthFormDisplayState,
  changeAuthFormState,
} from 'redux/slicers/store/globalUISlicer';

type Props = {
  authButtonRef: HTMLDivElement | any;
  windowWidth: number;
};

const Authorize: React.FC<Props> = ({ authButtonRef, windowWidth }) => {
  const dispatch = useAppDispatch();

  // ---------------------- UI hooks ------------------------
  const [direction, authType, paginate] = UsePagination();
  const { isAuthFormOpen, authDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );

  const [authMenuRef, setAuthMenuRef] = useState(null);
  const [listening, setListening] = useState(false);
  const authMenuNode = useCallback((node: any) => {
    setAuthMenuRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      authMenuRef,
      authButtonRef,
      dispatch,
      changeAuthFormState,
      changeAuthFormDisplayState,
    ),
  );

  //  ------------------------ end of UI hooks ----------------------------------
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && user?.id) dispatch(fetchUserById({ userId: user?.id! }));
  }, [isAuthFormOpen]);

  useEffect(() => {
    dispatch(session());
  }, [isAuthFormOpen]);
  return (
    <>
      <PopupWrapper
        ref={authMenuNode}
        style={{ display: windowWidth < 1024 ? 'none' : authDisplay }}
        animate={isAuthFormOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <div className="header-authorization-form-background"></div>
        <AuthContent>
          {user ? (
            <Profile user={user} direction={direction} />
          ) : (
            <Authorization
              direction={direction}
              authType={authType}
              paginate={paginate}
            />
          )}
        </AuthContent>
      </PopupWrapper>
    </>
  );
};

const PopupWrapper = styled(motion.div)`
  width: 80%;
  height: 590px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 0 50px 50px;
  .header-authorization-form-background {
    width: calc(100% + 50vw);
    height: 100%;
    position: absolute;
    top: 0;
    right: -50vw;
    background-color: ${color.glassmorphismBg};
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(9px);
    z-index: -1;
  }
`;

const AuthContent = styled(motion.div)`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.backgroundPrimary};
  overflow: hidden;
`;

export default Authorize;
