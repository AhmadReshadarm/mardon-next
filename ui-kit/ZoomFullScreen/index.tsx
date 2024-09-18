import { Image } from 'antd';
import { ZoomSVG } from 'assets/icons/UI-icons';
import { useEffect } from 'react';
import styled from 'styled-components';

type PropsFullScreen = {
  images: string[];
  zoom?: boolean;
  setZoom?: any;
  imageIndex?: any;
  setZoomImgSrc?: any;
  zoomImgSrc?: string;
  zoomStyles?: string;
};

type StyleProps = {
  zoomStyles?: string;
};

const ZoomFullScreen: React.FC<PropsFullScreen> = ({
  images,
  zoom,
  setZoom,
  imageIndex,
  setZoomImgSrc,
  zoomImgSrc,
  zoomStyles,
}) => {
  useEffect(() => {
    function hideOnClickOutside(element1, element2) {
      const outsideClickListener = (event) => {
        if (
          !element1.contains(event.target) &&
          !element2.contains(event.target) &&
          isVisible(element1) &&
          isVisible(element2)
        ) {
          //
          // removeClickListener();
          setZoom(false);
        }
      };

      // const removeClickListener = () => {
      //   document.removeEventListener('click', outsideClickListener);
      // };

      document.addEventListener('click', outsideClickListener);
    }

    const isVisible = (elem) =>
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

    setTimeout(() => {
      if (zoom) {
        let zoomImg = document.querySelector('.ant-image-preview-img');
        let zoomCtr = document.querySelector('.ant-image-preview-operations');
        hideOnClickOutside(zoomImg, zoomCtr);
      }
    }, 300);
  }, [zoom]);

  return (
    <>
      <ImageZoomButtonWrapper zoomStyles={zoomStyles}>
        <ImageZoomButton
          onClick={(e) => {
            e.preventDefault();
            setZoom(true);
            setZoomImgSrc(`/api/images/${images[imageIndex]}`);
            setTimeout(() => {
              const btnImg: any = document.querySelector('.hidden-image-zoom');
              btnImg.click();
            }, 300);
          }}
        >
          <ZoomSVG />
        </ImageZoomButton>
      </ImageZoomButtonWrapper>
      {zoom ? (
        <Image
          className="hidden-image-zoom"
          style={{ display: 'none' }}
          width={200}
          preview={{ src: zoomImgSrc }}
        />
      ) : (
        ''
      )}
    </>
  );
};

const ImageZoomButtonWrapper = styled.div<StyleProps>`
  width: 100%;
  height: 40px;
  position: absolute;
  //   bottom: 0;
  //   right: 0;
  z-index: 3;
  display: flex;
  flex-direction: row;
  //   justify-content: flex-end;
  //   align-items: center;
  //   padding: 0 5px 5px 0;
  ${(props) => {
    return `${props.zoomStyles}`;
  }};
`;
const ImageZoomButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #00000052;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default ZoomFullScreen;
