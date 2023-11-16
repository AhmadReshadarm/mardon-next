import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Link from 'next/link';

type Props = {
  category: string;
  subCategory: string;
  setOnWhichNav: any;
};
const TagsModal: React.FC<Props> = ({
  category,
  subCategory,
  setOnWhichNav,
}) => {
  const { tags } = useAppSelector<TGlobalState>((state) => state.global);

  return (
    <TagsWrapper>
      {tags.map((tag, index) => {
        return (
          <Link
            key={index}
            onClick={() => setOnWhichNav('')}
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
