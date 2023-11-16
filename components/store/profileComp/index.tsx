import color from 'components/store/lib/ui.colors';
import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SideBar from './sidebar';
import UserInfo from './userInfo';
import Reveiws from './reveiws';
import Changepsw from './changepsw';
import Settings from './settings';
import { devices } from '../lib/Devices';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
const ProfileComp = (props: any) => {
  const { setActive } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  const [direction, authType, paginate] = UsePagination();
  const userInfoRef = useRef(null);
  const reveiwsRef = useRef<any>(null);
  const changePswRef = useRef(null);
  const settingsRef = useRef(null);

  return (
    <>
      {!user ? (
        <div
          style={{
            background: 'url(/auth_bg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '350px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PopupWrapper>
            <AuthContent>
              <Authorization
                direction={direction}
                authType={authType}
                paginate={paginate}
              />
            </AuthContent>
          </PopupWrapper>
        </div>
      ) : (
        <Container>
          <SideBar
            userInfoRef={userInfoRef}
            reveiwsRef={reveiwsRef}
            changePswRef={changePswRef}
            settingsRef={settingsRef}
            {...props}
          />
          <Wrapper>
            <UserInfo
              settingsRef={settingsRef}
              userInfoRef={userInfoRef}
              setActive={setActive}
              user={user}
              {...props}
            />
            <Reveiws {...props} reveiwsRef={reveiwsRef} />
            <Changepsw {...props} changePswRef={changePswRef} user={user} />
            <Settings {...props} settingsRef={settingsRef} user={user} />
          </Wrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  @media ${devices.laptopS} {
    flex-direction: column;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
  }
  @media ${devices.mobileM} {
    flex-direction: column;
  }
  @media ${devices.mobileS} {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const PopupWrapper = styled(motion.div)`
  width: 400px;
  height: 412px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export default ProfileComp;
