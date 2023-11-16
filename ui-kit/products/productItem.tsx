import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Slider from './slider';
import { handleHistory } from './helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Basket } from 'swagger/services';
import { checkIfItemInCart, handleCartBtnClick } from 'ui-kit/products/helpers';
import { TrigerhandleCartBtnClick } from 'components/store/storeLayout/utils/SearchBar/helpers';
type Props = {
  product: Product;
  custom: number;
  name: string;
};

const ProductItem: React.FC<Props> = ({ product, custom, name }) => {
  const images = getProductVariantsImages(product.productVariants);
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <ItemWrapper>
        <Slider product={product} images={images} url={product.url} />
        <div className="product-title-add-to-card-wrapper">
          <Link
            className="product-title"
            onClick={() => handleHistory(product.id)}
            href={`/product/${product.url}`}
          >
            <span>
              {product.name?.length! > 55
                ? `${product.name?.slice(0, 55)}...`
                : product.name}
            </span>
          </Link>
          <AddtoCartWrapper
            onClick={TrigerhandleCartBtnClick(
              product,
              handleCartBtnClick(
                product,
                dispatch,
                product.productVariants![0],
                cart,
                name,
              ),
            )}
          >
            <motion.button
              key={'basket-pressed'}
              animate={checkIfItemInCart(product, cart!) ? 'animate' : 'exit'}
              variants={variants.fadeOutSlideOut}
              className="in-cart"
            >
              <span>УЖЕ В КОРЗИНЕ</span>
              <img src="/icons/vector.png" alt="in cart sign" />
            </motion.button>
            <motion.button
              key={'basket-normal'}
              animate={checkIfItemInCart(product, cart!) ? 'exit' : 'animate'}
              variants={variants.fadeOutSlideOut}
              className="not-in-cart"
            >
              <span>В КОРЗИНУ</span>
            </motion.button>
          </AddtoCartWrapper>
        </div>
      </ItemWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled(motion.li)`
  width: 100%;
  min-width: 260px;
  max-width: 275px;
  height: 420px;
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  background-color: ${color.bgProduct};
  border-radius: 10px;

  @media ${devices.mobileL} {
    min-width: 310px;
    max-width: 310px;
    width: 100%;
  }
  @media ${devices.mobileM} {
    min-width: 230px;
    max-width: 230px;
    width: 100%;
  }

  @media ${devices.mobileS} {
    min-width: 210px;
    max-width: 210px;
    width: 100%;
  }
`;

const ItemWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 20px 0;
  .product-title {
    width: 90%;
    padding: 20px 0;
    span {
      width: 100%;
      color: ${color.btnPrimary};
      text-align: right;
      font-size: 20px;
      font-weight: 300;
      &:hover {
        color: ${color.hoverBtnBg};
      }
    }
  }
  .product-title-add-to-card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const AddtoCartWrapper = styled.div`
  width: 90%;
  height: 40px;
  position: relative;
  overflow: hidden;
  transition: 300ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  .in-cart {
    border: 1px solid;
    gap: 10px;
    cursor: pointer;
  }
  .not-in-cart {
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 200;
  }
  button {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default ProductItem;
