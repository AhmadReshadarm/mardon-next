import CatalogModal from './CatalogModal';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalUIState, TGlobalState } from 'redux/types';
import { outsideClickListnerRedux } from '../../helpers';
import {
  changeCatelogDisplayState,
  changeCatelogState,
} from 'redux/slicers/store/globalUISlicer';
import Image from 'next/image';
// import { fetchCategories, fetchTags } from 'redux/slicers/store/globalSlicer';
import { useInViewportNoDelay } from '../../useInViewport';

type Props = {
  catelogButtonRef: HTMLDivElement | any;
};

const HeaderCatalog: React.FC<Props> = ({ catelogButtonRef }) => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const [hoveredCategory, setHoveredCategory] = useState('');
  useEffect(() => {
    let isSet = false;
    if (!loading) {
      categories.map((category) => {
        if (!isSet) {
          setHoveredCategory(`/api/images/${category.image}`);
        }
        isSet = true;
      });
    }
  }, [categories]);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchTags());
  // }, []);

  // ------------------------ UI hooks ------------------------
  const { isCatalogOpen, catelogDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [listening, setListening] = useState(false);
  const [catelogMenuRef, setcatelogMenuRef] = useState(null);
  const catelogMenuNode = useCallback((node: any) => {
    setcatelogMenuRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      catelogButtonRef,
      catelogMenuRef,
      dispatch,
      changeCatelogState,
      changeCatelogDisplayState,
    ),
  );
  const { isInViewport, ref } = useInViewportNoDelay();
  // --------------------- end of UI hooks --------------------

  return (
    <CatalogWrapper
      ref={catelogMenuNode}
      style={{ display: catelogDisplay }}
      animate={isCatalogOpen ? 'open' : 'close'}
      variants={variants.fadeInReveal}
    >
      {isCatalogOpen && (
        <>
          <div className="header-menu-background"></div>
          <div className="catelog-content-wrapper">
            <div ref={ref} className="category-menu-wrapper">
              <div className="header-spacer"></div>
              {isInViewport && (
                <CatalogModal setHoveredCategory={setHoveredCategory} />
              )}
            </div>
            <div className="category-image-wrapper">
              <div className="header-spacer"></div>
              {hoveredCategory !== '' ? (
                <Image
                  src={hoveredCategory}
                  alt={hoveredCategory}
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                />
              ) : (
                <ImageLoader />
              )}
            </div>
          </div>
        </>
      )}
    </CatalogWrapper>
  );
};

const ImageLoader = styled.div`
  width: 100%;
  height: 85%;
  border-radius: 3px;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

const CatalogWrapper = styled(motion.div)`
  width: 80%;
  height: 590px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .header-menu-background {
    width: calc(100% + 50vw);
    height: 100%;
    position: absolute;
    top: 0;
    left: -50vw;
    background-color: ${color.glassmorphismBg};
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(9px);
    z-index: -1;
  }
  .catelog-content-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .category-menu-wrapper {
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 0 0 10px;
      .header-spacer {
        width: 100%;
        height: 120px;
      }
    }
    .category-image-wrapper {
      width: 30%;
      height: 100%;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      padding-bottom: 30px;

      img {
        width: 100%;
        height: 85%;
        object-fit: cover;
      }
      .header-spacer {
        width: 100%;
        height: 120px;
      }
    }
  }
`;

export default HeaderCatalog;
