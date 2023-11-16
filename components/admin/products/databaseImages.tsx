import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Delete from '../../../assets/delete.svg';
import CloseSVG from '../../../assets/close_black.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setDefaultImageList } from 'redux/slicers/mutipleImagesSlicer';
import {
  clearImageDBList,
  deleteImage,
  setDefaultSingleImageList,
} from 'redux/slicers/imagesSlicer';
import styles from './products.module.scss';
import { Spin } from 'antd';
import Pagination from 'ui-kit/Pagination';
import { fetchImages } from 'redux/slicers/imagesSlicer';
type Props = {
  setOpen: any;
  index?: number;
  isProducts: boolean;
};

const DatabaseImages = ({ setOpen, index, isProducts }: Props) => {
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

  const [content, setContent] = useState('<- Нажмите, чтобы скопировать URL');
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

  const handleImageDelete = async (fileName) => {
    dispatch(deleteImage({ fileName }));
  };

  const handleSelectedImage = (image) => () => {
    if (isProducts) {
      dispatch(
        setDefaultImageList({
          file: { name: image.filename, url: `/api/images/${image.filename}` },
          index,
        }),
      );
    } else {
      dispatch(
        setDefaultSingleImageList({
          name: image.filename,
          url: `/api/images/${image.filename}`,
        }),
      );
    }

    setOpen(false);
  };

  const Files = ({ index, image }) => {
    const [isHover, setHover] = useState(false);
    return (
      <li key={index}>
        <div className="image-container">
          <img
            src={`/api/images/${image.filename}`}
            alt={image.originalName}
            onClick={handleSelectedImage(image)}
          />
        </div>

        <div className="title-wrapper">
          <span
            onClick={() => {
              navigator.clipboard.writeText(`/api/images/${image.filename}`);
              setContent('URL скопирован');
              setTimeout(() => {
                setContent('<- Нажмите, чтобы скопировать URL');
              }, 500);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="file-name"
          >
            {image.originalName}
          </span>
          <span
            style={{
              display: isHover ? 'flex' : 'none',
              opacity: isHover ? 1 : 0,
            }}
            className="notification-copy"
          >
            {content}
          </span>
          <button
            onClick={() => handleImageDelete(image.filename)}
            className="delete-wrapper"
          >
            <span>Удалить Файл</span>
            <span>
              <Delete />
            </span>
          </button>
        </div>
      </li>
    );
  };

  return (
    <Contaienr>
      <Wrapper>
        <CloseBtn onClick={() => setOpen(false)}>
          <CloseSVG />
        </CloseBtn>
        <ImagesWrapper>
          {!isLoadingImageDB ? (
            imageDBs.map((image: any, index) => {
              return <Files key={index} image={image} index={index} />;
            })
          ) : (
            <Spin className={styles.spinner} size="large" />
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
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        background: no-repeat url('/not_found.jpg');
        background-size: cover;
        font-size: 0;
      }
      img:before {
        content: 'Изображение не найдено';
        font-size: 1rem;
        display: block;
        margin-bottom: 10px;
      }

      img:after {
        content: '';
        display: block;
        font-size: 12px;
      }
    }
    .title-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
      position: relative;
      .file-name {
        cursor: pointer;
      }
      .notification-copy {
        width: 80%;
        position: absolute;
        top: 0;
        right: -160px;
        border-radius: 3px;
        padding: 5px;
        box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
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
