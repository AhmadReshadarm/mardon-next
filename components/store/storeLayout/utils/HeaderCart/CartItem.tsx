import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import CloseSVG from '../../../../../assets/close_black.svg';
import ItemCounter from '../../../../../ui-kit/ItemCounter';
import { handleRemoveClick } from './helpers';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';
import { useAppSelector } from 'redux/hooks';
type Props = {
  item: OrderProduct;
  onRemove: (product: Product) => void;
  onCountChange: (counter: number, product: Product) => void;
};

const CartItem: React.FC<Props> = ({ item, onRemove, onCountChange }) => {
  const { name } = item.product!;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const curVariant = item.productVariant
    ? item.productVariant
    : item.product?.productVariants![0]
    ? item.product?.productVariants![0]
    : ({} as any);

  const images = getProductVariantsImages(item.product?.productVariants);

  return (
    <Link href={`/product/${item.product?.url}`}>
      <Item>
        <motion.img
          whileHover="hover"
          whileTap="tap"
          custom={1.05}
          variants={variants.grow}
          src={`/api/images/${images[0]}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
        />
        <ItemDetails>
          <h4>{name}</h4>
          <ItemDetialDivider>
            <h3>
              {user?.role === Role.SuperUser
                ? curVariant.wholeSalePrice
                : curVariant.price}
              ₽
            </h3>
            <ItemCounter
              qty={item.qty!}
              product={item.product!}
              onCountChange={onCountChange}
            />
          </ItemDetialDivider>
        </ItemDetails>
        <motion.button
          custom={1.1}
          whileTap="tap"
          whileHover="hover"
          variants={variants.grow}
          onClick={handleRemoveClick(item.product!, onRemove)}
        >
          <CloseSVG />
        </motion.button>
      </Item>
    </Link>
  );
};

const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  img {
    width: 80px;
    height: 80px;
    min-width: 70px;
    object-fit: contain;
  }
  button {
    justify-self: flex-end;
    align-self: flex-start;
    width: 30px;
    height: 30px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  h4 {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0;
  }
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
  }
`;

const ItemDetialDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default CartItem;
