import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import {
  handleMenuStateRedux,
  outsideClickListnerRedux,
} from 'components/store/storeLayout/helpers';
import { TGlobalUIState, TWishlistState } from 'redux/types';

import HeaderProductItmes from 'ui-kit/HeaderProductItems';
import {
  changeWishlistDisplayState,
  changeWishlistState,
} from 'redux/slicers/store/globalUISlicer';
import Link from 'next/link';

type Props = {
  wishlistButtonRef: HTMLDivElement | any;
};

const HeaderWishlist: React.FC<Props> = ({ wishlistButtonRef }) => {
  const dispatch = useAppDispatch();

  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  //  -------------------------- UI HOOKS ------------------------------
  const { isWishlistOpen, wishlistDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [wishlistWrapperRef, setWishlistWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const wishlistWrapperNode = useCallback((node: any) => {
    setWishlistWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      wishlistWrapperRef,
      wishlistButtonRef,
      dispatch,
      changeWishlistState,
      changeWishlistDisplayState,
    ),
  );
  // ---------------------- end of UI hooks ---------------------

  return (
    <>
      <PopupWrapper
        ref={wishlistWrapperNode}
        style={{ display: wishlistDisplay }}
        animate={isWishlistOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        {isWishlistOpen && (
          <>
            <div className="header-wishlist-form-background"></div>
            <div className="header-spacer"></div>
            {wishlist?.products?.length! <= 0 ? (
              <div className="empty-wrapper">
                <h1>{`Список ИЗБРАННОЕ пуст`.toLocaleUpperCase()}</h1>
              </div>
            ) : (
              <PopupDivider>
                <PopupContent>
                  {wishlist?.products?.map((product, index: any) => {
                    return (
                      <HeaderProductItmes
                        key={`cart-item-${index}`}
                        product={product}
                        dataType="wishlist"
                        handleMenuState={handleMenuStateRedux(
                          dispatch,
                          changeWishlistState,
                          changeWishlistDisplayState,
                          isWishlistOpen,
                          wishlistDisplay,
                        )}
                      />
                    );
                  })}
                </PopupContent>
                <PopupBtnsDivider>
                  <Link href="/wishlist" prefetch={false}>
                    <ActionBtns
                      onClick={handleMenuStateRedux(
                        dispatch,
                        changeWishlistState,
                        changeWishlistDisplayState,
                        isWishlistOpen,
                        wishlistDisplay,
                      )}
                    >
                      {`ИЗБРАННОЕ`.toLocaleUpperCase()}
                    </ActionBtns>
                  </Link>
                </PopupBtnsDivider>
              </PopupDivider>
            )}
          </>
        )}
      </PopupWrapper>
    </>
  );
};

const PopupWrapper = styled(motion.div)`
  width: 80%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px 50px 50px;
  .header-wishlist-form-background {
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
  .header-spacer {
    width: 100%;
    height: 90px;
    min-height: 100px;
  }
  .empty-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-family: var(--font-ricordi);
    }
  }
  @media (min-width: 1024px) and (max-width: 1150px) {
    width: 90%;
  }
`;

const PopupDivider = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PopupContent = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 10px;
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const PopupBtnsDivider = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${color.backgroundPrimary};
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  border: 1px solid #e5e2d9;
  gap: 30px;
`;

const ActionBtns = styled.button`
  width: 200px;
  height: 50px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 30px;
  font-family: var(--font-ricordi);
  &:active {
    border: 1px solid;
    background: ${color.backgroundPrimary};
    color: ${color.textSecondary};
  }
`;

export default HeaderWishlist;
