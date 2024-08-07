import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import CloseSVG from '../../../assets/close_black.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageDBList } from 'redux/slicers/imagesSlicer';
import styles from './products.module.scss';
import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { DataType } from 'common/interfaces/data-type.interface';
import { fetchImages } from 'redux/slicers/imagesSlicer';
import { columnsImages } from './constantsImages';
import { AppContext } from 'common/context/AppContext';
import { Image } from 'swagger/services';
type Props = {
  setOpen: any;
  isOpen?: boolean;
  prodcutVariantIndex?: number;
  isProducts: boolean;
};

const DatabaseImages = ({
  isOpen,
  setOpen,
  prodcutVariantIndex,
  isProducts,
}: Props) => {
  const dispatch = useAppDispatch();
  const imageDBs: Image[] = useAppSelector(
    (state) => state.images.imageListInDB,
  );
  const isLoadingImageDB = useAppSelector((state) => state.images.loading);
  const paginationLength = useAppSelector(
    (state) => state.images.paginationLength,
  );
  useEffect(() => {
    dispatch(
      fetchImages({
        offset: String(offset),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearImageDBList());
    };
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dataSource = imageDBs?.map(({ id, filename, originalName }) => {
    return {
      key: id,
      filename,
      originalName,
      url: `/api/images/${filename}`,
      isProducts,
      setOpen,
      prodcutVariantIndex,
      dispatch,
      offset,
    };
  }) as unknown as DataType[];
  const [byFileName, setByFileName] = useState(false);
  const fetchImagesWithSearch = (evt) => {
    dispatch(
      fetchImages({
        offset: String(0),
        limit: '20',
        originalName: !byFileName ? evt.target.value : '',
        filename: byFileName ? evt.target.value : '',
      }),
    );
    return () => {
      dispatch(clearImageDBList());
    };
  };

  return (
    <Contaienr style={{ display: isOpen ? 'flex' : 'none' }}>
      <Wrapper>
        <CloseBtn onClick={() => setOpen(false)}>
          <CloseSVG />
        </CloseBtn>

        {isLoadingImageDB ? (
          <Spin className={styles.spinner} size="large" />
        ) : (
          <TableWrapper>
            {' '}
            <Table
              scroll={{
                y: 768,
              }}
              columns={
                columnsImages as (
                  | ColumnGroupType<DataType>
                  | ColumnType<DataType>
                )[]
              }
              pagination={{
                pageSize: 20,
                current: currentPage,
                total: paginationLength,
              }}
              dataSource={dataSource}
              onChange={(event) => {
                const newOffset = ((event.current as number) - 1) * 20;
                setOffset(newOffset);
                dispatch(
                  fetchImages({
                    offset: String(newOffset),
                    limit: '20',
                  }),
                );
                setCurrentPage(event.current as number);
              }}
            />
          </TableWrapper>
        )}
        <input
          className="image-search-input"
          type="text"
          placeholder={byFileName ? 'Имя файла' : 'Имя изображения'}
          onChange={fetchImagesWithSearch}
        />
        <label className="image-seach-check-by-file-name">
          <input
            onChange={() => setByFileName(!byFileName)}
            type="checkbox"
            name="check by file name"
            id=""
          />
          <span>Поиск по имени файла</span>
        </label>
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
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  box-shadow: 0px 0px 10px -2px #000;
  padding: 20px;
  position: relative;
  .image-search-input {
    position: absolute;
    bottom: 10px;
    left: 30px;
    width: 300px;
    height: 50px;
    padding: 5px 10px;
    border-radius: 15px;
    border: 1px solid #00000042;
  }
  .image-seach-check-by-file-name {
    position: absolute;
    left: 35px;
    bottom: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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
