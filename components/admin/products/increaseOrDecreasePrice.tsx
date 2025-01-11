import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import Input from 'antd/es/input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AppDispatch } from 'redux/store';
import {
  addSelectedProducts,
  handleCheckBoxEnabled,
} from 'redux/slicers/store/catalogSlicer';
import { openErrorNotification } from 'common/helpers';
import { editProduct, fetchChosenProduct } from 'redux/slicers/productsSlicer';
import { clearQueryParams } from 'common/helpers/manageQueryParams.helper';
import { motion } from 'framer-motion';
import { fetchProducts } from 'redux/slicers/store/catalogSlicer';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { Modal } from 'antd';

const IncreaseOrDecreasePrice = () => {
  const [increasePrice, setIncreasePrice] = useState(false);
  const [decreasePrice, setDecreasePrice] = useState(false);
  const [progress, setProgress] = useState(0);
  const [increaseDecreaseValue, setIncreaseDEcreaseValue] = useState(1);
  const [visibleIncreasePrice, setVisibleIncreasePrice] = useState(false);
  const [visibleDecreasePrice, setVisibleDecreasePrice] = useState(false);
  const { isCheckBoxEnabled, selectedProducts } = useAppSelector(
    (state) => state.catalog,
  );
  const dispatch = useAppDispatch();
  const handleSelectionIsEnabled = (
    dispatch: AppDispatch,
    isCheckBoxEnabled: boolean,
  ) => {
    dispatch(handleCheckBoxEnabled(isCheckBoxEnabled));
  };
  const handleIncreaseOrDecreasePrice = (
    selectedProducts,
    dispatch: AppDispatch,
    increaseDecrease: boolean,
  ) => {
    if (selectedProducts.length === 0) {
      openErrorNotification('please select products');
      return;
    }
    if (increaseDecreaseValue < 1 || increaseDecreaseValue > 100) {
      openErrorNotification('value between 0 to 100');
      return;
    }
    dispatch(handleCheckBoxEnabled(!isCheckBoxEnabled));
    let counter = 0;
    const handleUpdates = async (selectedProducts: string[]) => {
      if (selectedProducts.length > counter) {
        const response = await dispatch(
          fetchChosenProduct(selectedProducts[counter] as string),
        );
        let chosenProduct: any = response.payload;

        const changeValueTo = increaseDecrease
          ? increaseDecreaseValue
          : -increaseDecreaseValue;
        const payload: any = {
          id: chosenProduct.id,
          name: chosenProduct.name,
          desc: chosenProduct.desc,
          shortDesc: chosenProduct.shortDesc,
          keywords: chosenProduct.keywords,
          category: chosenProduct.category,
          brand: chosenProduct.brand,
          tags: chosenProduct.tags.map((tag) => tag.id),
          sizes: chosenProduct.sizes,
          url: chosenProduct.url,
          rating: chosenProduct.rating,
          reviews: chosenProduct.reviews,
          questions: chosenProduct.questions,
          parameterProducts: chosenProduct.parameterProducts,
          productVariants: chosenProduct.productVariants?.map((variant) => {
            return {
              id: variant.id,
              artical: variant.artical,
              available: variant.available,
              color: variant.color,
              images: variant.images,
              oldPrice: variant.oldPrice,
              wholeSalePrice: variant.wholeSalePrice,
              price: Math.round(
                variant.price! + (changeValueTo * variant.price!) / 100,
              ),
            };
          }),
        };

        const isSaved: any = await dispatch(
          editProduct({
            ...payload,
            id: chosenProduct.id,
          }),
        );

        if (!isSaved.error) {
          counter += 1;
          setProgress(Math.floor((100 * counter) / selectedProducts.length));
          handleUpdates(selectedProducts);
        }
      }
      if (selectedProducts.length <= counter) {
        setIncreaseDEcreaseValue(1);
        setProgress(0);
        clearQueryParams();
        setIncreasePrice(false);
        setDecreasePrice(false);
      }
    };

    handleUpdates(selectedProducts);
    dispatch(addSelectedProducts([]));
  };
  const paginationLength = useAppSelector(
    (state) => state.catalog.productsLength,
  );
  const handleAllProductIncreaseDecreasePrice = async (
    dispatch: AppDispatch,
    dataLength: number,
    increaseDecrease: boolean,
  ) => {
    openErrorNotification('feching products');
    const payload: any = {
      sortBy: 'id',
      orderBy: 'DESC',
      limit: dataLength + 1,
      offset: 0,
    };
    const selectedProducts: string[] = [];
    const fetchData = async (payload) => {
      const fetchedProducts: any = await dispatch(fetchProducts(payload));
      openSuccessNotification('products fetched');

      openErrorNotification('starting serialization');
      const serializeIds = async (products) => {
        await products.map((product, index) => {
          selectedProducts.push(product.id);
          setProgress(Math.floor((100 * index + 1) / products.length));
          if (index > products.length - 2) {
            openSuccessNotification('serialization complete');
          }
        });
      };

      await serializeIds(fetchedProducts.payload.rows);

      setProgress(0);
    };
    await fetchData(payload);
    handleIncreaseOrDecreasePrice(selectedProducts, dispatch, increaseDecrease);
  };

  const showOrDontModalIncreasePrice = () => {
    setVisibleIncreasePrice(!visibleIncreasePrice);
  };
  const showOrDontModalDecreasePrice = () => {
    setVisibleDecreasePrice(!visibleDecreasePrice);
  };

  return (
    <Wrapper>
      {!increasePrice ? (
        <Buttons
          onClick={() => {
            if (decreasePrice) {
              openErrorNotification('close decrease price fist');
              return;
            }
            setIncreasePrice(true);
          }}
        >
          <span>Увеличить цену</span>
        </Buttons>
      ) : (
        <FormWrapper>
          <HeaderWrapper>
            <h3>Увеличить цену {progress !== 0 ? progress + '%' : ''}</h3>
            <button
              onClick={() => {
                setIncreasePrice(false);
                handleSelectionIsEnabled(dispatch, false);
              }}
            >
              <motion.svg
                width="25"
                height="25"
                viewBox="0 0 44 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key="menu-global-indecator-normat-state"
                initial="init"
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 1 }}
              >
                <path
                  d="M32.7214 29.836L13.2763 10.3907C12.7559 9.87025 11.912 9.8693 11.3907 10.3907C10.8693 10.912 10.8702 11.7559 11.3907 12.2763L30.8358 31.7216C31.3562 32.242 32.2 32.243 32.7214 31.7216C33.2428 31.2002 33.2418 30.3564 32.7214 29.836Z"
                  fill={color.inactiveIcons}
                />
                <path
                  d="M13.2764 31.7215L32.7217 12.2764C33.2422 11.756 33.2431 10.9122 32.7217 10.3908C32.2004 9.86943 31.3565 9.87037 30.8361 10.3908L11.3908 29.8359C10.8704 30.3564 10.8694 31.2002 11.3908 31.7215C11.9122 32.2429 12.756 32.242 13.2764 31.7215Z"
                  fill={color.inactiveIcons}
                />
              </motion.svg>
            </button>
          </HeaderWrapper>

          <Input
            value={increaseDecreaseValue}
            min={1}
            max={100}
            suffix={<p style={{ fontSize: '14px' }}>%</p>}
            style={{
              borderRadius: '4px',
              backgroundColor: color.rangeBgcolor,
            }}
            type="number"
            placeholder="мин: 1% | макс: 100%"
            onChange={(evt) =>
              setIncreaseDEcreaseValue(Number(evt.target.value))
            }
          />
          <ButtonWrapper>
            <Buttons onClick={showOrDontModalIncreasePrice}>
              <span>применяется ко всем</span>
            </Buttons>
            <Modal
              title="Подтвердите действие."
              open={visibleIncreasePrice}
              onOk={() =>
                handleAllProductIncreaseDecreasePrice(
                  dispatch,
                  paginationLength,
                  true,
                )
              }
              onCancel={showOrDontModalIncreasePrice}
            >
              <p>
                Вы уверены, что хотите увеличить цену на {increaseDecreaseValue}
                %?
              </p>
            </Modal>
            <Buttons
              style={{
                backgroundColor: isCheckBoxEnabled
                  ? color.btnPrimary
                  : color.btnSecondery,
              }}
              onClick={() =>
                isCheckBoxEnabled
                  ? handleIncreaseOrDecreasePrice(
                      selectedProducts,
                      dispatch,
                      true,
                    )
                  : handleSelectionIsEnabled(dispatch, true)
              }
            >
              <span
                style={{
                  color: isCheckBoxEnabled
                    ? color.textPrimary
                    : color.textSecondary,
                }}
              >
                {isCheckBoxEnabled
                  ? 'Применить изменения'
                  : 'применить к выбранному'}
              </span>
            </Buttons>
          </ButtonWrapper>
        </FormWrapper>
      )}
      <div className="spaerator"></div>
      {/* -----------------------------------------------------  end of Increase price  ---------------------------- */}
      {!decreasePrice ? (
        <Buttons
          onClick={() => {
            if (increasePrice) {
              openErrorNotification('close increase price first');
              return;
            }
            setDecreasePrice(!decreasePrice);
          }}
        >
          <span>Уменьшить цену</span>
        </Buttons>
      ) : (
        <FormWrapper>
          <HeaderWrapper>
            <h3>Увеличить цену {progress !== 0 ? progress + '%' : ''}</h3>
            <button
              onClick={() => {
                setDecreasePrice(false);
                handleSelectionIsEnabled(dispatch, false);
              }}
            >
              <motion.svg
                width="25"
                height="25"
                viewBox="0 0 44 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key="menu-global-indecator-normat-state"
                initial="init"
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 1 }}
                //   variants.fadeInSlideIn
              >
                <path
                  d="M32.7214 29.836L13.2763 10.3907C12.7559 9.87025 11.912 9.8693 11.3907 10.3907C10.8693 10.912 10.8702 11.7559 11.3907 12.2763L30.8358 31.7216C31.3562 32.242 32.2 32.243 32.7214 31.7216C33.2428 31.2002 33.2418 30.3564 32.7214 29.836Z"
                  fill={color.inactiveIcons}
                />
                <path
                  d="M13.2764 31.7215L32.7217 12.2764C33.2422 11.756 33.2431 10.9122 32.7217 10.3908C32.2004 9.86943 31.3565 9.87037 30.8361 10.3908L11.3908 29.8359C10.8704 30.3564 10.8694 31.2002 11.3908 31.7215C11.9122 32.2429 12.756 32.242 13.2764 31.7215Z"
                  fill={color.inactiveIcons}
                />
              </motion.svg>
            </button>
          </HeaderWrapper>

          <Input
            value={increaseDecreaseValue}
            min={1}
            max={100}
            suffix={<p style={{ fontSize: '14px' }}>%</p>}
            style={{
              borderRadius: '4px',
              backgroundColor: color.rangeBgcolor,
            }}
            type="number"
            placeholder="мин: 1% | макс: 100%"
            onChange={(evt) =>
              setIncreaseDEcreaseValue(Number(evt.target.value))
            }
          />
          <ButtonWrapper>
            <Buttons onClick={showOrDontModalDecreasePrice}>
              <span>применяется ко всем</span>
            </Buttons>
            <Modal
              title="Подтвердите действие."
              open={visibleDecreasePrice}
              onOk={() =>
                handleAllProductIncreaseDecreasePrice(
                  dispatch,
                  paginationLength,
                  false,
                )
              }
              onCancel={showOrDontModalDecreasePrice}
            >
              <p>
                Вы уверены, что хотите снизить цену на {increaseDecreaseValue}
                %?
              </p>
            </Modal>
            <Buttons
              style={{
                backgroundColor: isCheckBoxEnabled
                  ? color.btnPrimary
                  : color.btnSecondery,
              }}
              onClick={() =>
                isCheckBoxEnabled
                  ? handleIncreaseOrDecreasePrice(
                      selectedProducts,
                      dispatch,
                      false,
                    )
                  : handleSelectionIsEnabled(dispatch, true)
              }
            >
              <span
                style={{
                  color: isCheckBoxEnabled
                    ? color.textPrimary
                    : color.textSecondary,
                }}
              >
                {isCheckBoxEnabled
                  ? 'Применить изменения'
                  : 'применить к выбранному'}
              </span>
            </Buttons>
          </ButtonWrapper>
        </FormWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-itmes: flex-start;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: solid 1px;
  padding: 10px;
  .spaerator {
    width: 100%;
    height: 1px;
    background-color: black;
  }
`;

const Buttons = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${color.btnSecondery};
  cursor: pointer;
  transition: 300ms;
  &:hover {
    background-color: ${color.searchBtnBg};

    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
  span {
    font-family: ver(--font-Jost);
    font-size: 1rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  button {
    width: 25px;
    height: 25px;
  }
`;

export default IncreaseOrDecreasePrice;
