import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalState, TGlobalUIState } from 'redux/types';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Link from 'next/link';
import {
  changeCatelogState,
  changeCatelogDisplayState,
} from 'redux/slicers/store/globalUISlicer';
import { handleMenuStateRedux } from '../../helpers';
type Props = {
  category: string;
  subCategory: string;
};
const TagsModal: React.FC<Props> = ({ category, subCategory }) => {
  const { tags } = useAppSelector<TGlobalState>((state) => state.global);
  const dispatch = useAppDispatch();
  const { isCatalogOpen, catelogDisplay, isDropDownOpen } =
    useAppSelector<TGlobalUIState>((state) => state.globalUI);
  return (
    <TagsWrapper>
      {tags.map((tag, index) => {
        return (
          <>
            {tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
            tag.url?.match(/(?:^|\W)main-page(?:$|\W)/) ||
            tag.url?.match(/(?:^|\W)-(?:$|\W)/) ||
            tag.url?.match(/(?:^|\W)_(?:$|\W)/) ||
            tag.url?.match(/(?:^|\W) (?:$|\W)/) ? (
              ''
            ) : (
              <Link
                key={index}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeCatelogState,
                  changeCatelogDisplayState,
                  isCatalogOpen,
                  catelogDisplay,
                )}
                href={`/catalog?categories=${category}&subCategories=${subCategory}&tags=${tag.url}`}
              >
                <span>
                  {tag.products?.find((product: Product) => {
                    return product.category?.url === subCategory;
                  })
                    ? tag.name
                    : ''}
                </span>
              </Link>
            )}
          </>
        );
      })}
    </TagsWrapper>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

export default TagsModal;
