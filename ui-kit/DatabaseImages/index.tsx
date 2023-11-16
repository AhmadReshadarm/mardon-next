import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CloseSVG from '../../assets/close_black.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageDBList } from 'redux/slicers/imagesSlicer';
import { Spin } from 'antd';
import Pagination from 'ui-kit/Pagination';
import { fetchImages } from 'redux/slicers/imagesSlicer';
import Files from './Files';
import { Slide } from 'swagger/services';
type Props = {
  setOpen: any;
  isOpen?: boolean;
  prodcutVariantIndex?: number;
  isProducts: boolean;
  slideNum?: number;
};

const DatabaseImages = ({
  setOpen,
  isOpen,
  prodcutVariantIndex,
  isProducts,
  slideNum,
}: Props) => {
  const dispatch = useAppDispatch();
  const imageDBs = useAppSelector((state) => state.images.imageListInDB);
  const isLoadingImageDB = useAppSelector((state) => state.images.loading);
  const paginationLength = useAppSelector(
    (state) => state.images.paginationLength,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(paginationLength / recordsPerPage);

  useEffect(() => {
    dispatch(
      fetchImages({
        offset: `${indexOfFirstRecord}`,
        limit: `${indexOfLastRecord}`,
      }),
    );
    return () => {
      dispatch(clearImageDBList());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchImages({
        offset: `${indexOfFirstRecord}`,
        limit: `${indexOfLastRecord}`,
      }),
    );
  }, [currentPage]);

  return (
    <Contaienr style={{ display: isOpen ? 'flex' : 'none' }}>
      <Wrapper>
        <CloseBtn onClick={() => setOpen(false)}>
          <CloseSVG />
        </CloseBtn>
        <ImagesWrapper>
          {!isLoadingImageDB ? (
            imageDBs.map((image: any, index) => {
              return (
                <Files
                  key={index}
                  prodcutVariantIndex={prodcutVariantIndex}
                  image={image}
                  index={index}
                  isProducts={isProducts}
                  setOpen={setOpen}
                  slideNum={slideNum}
                />
              );
            })
          ) : (
            <Spin
              style={{ display: 'block', marginTop: '100px' }}
              size="large"
            />
          )}
        </ImagesWrapper>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nPages={nPages}
        />
      </Wrapper>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff36;
  z-index: 9;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  box-shadow: 0px 0px 10px -2px #000;
  padding: 20px;
  position: relative;
`;

const ImagesWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: scroll;
  overflow-x: hidden;
  grid-gap: 50px;
  li {
    width: 200px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    .image-container {
      width: 100%;
      height: 100%;
      transition: 150ms;
      &:hover {
        transform: scale(1.05);
      }
      img {
        width: 100%;
        height: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        background: no-repeat url('/not_found.jpg');
        background-size: cover;
        font-size: 0;
      }
    }
    .title-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      position: relative;
      .file-name {
        cursor: pointer;
      }
      .notification-copy {
        width: 80%;
        position: absolute;
        top: 30px;
        right: 15px;
        border-radius: 3px;
        padding: 5px;
        box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
        background-color: ${color.bgProduct};
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        transition: 300ms;
      }
      span {
        text-align: center;
      }
      .delete-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: 150ms;
        &:hover {
          transform: scale(1.05);
        }
        span {
          color: ${color.hover};
        }
      }
    }
  }
`;

const CloseBtn = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -2px #000;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -30px;
  top: -30px;
`;

export default DatabaseImages;
