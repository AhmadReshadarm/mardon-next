import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import InfoDropdown from './DropDownsParrent';
import { CategoryInTree } from 'swagger/services';
import Link from 'next/link';

type Props = {
  categories: CategoryInTree[];
  setIndex: any;
  stateIndex: number;
  paginateImage: any;
};
const CatalogModal: React.FC<Props> = ({
  categories,
  setIndex,
  stateIndex,
  paginateImage,
}) => {
  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      {categories.map((category, index) => {
        return (
          <InfoDropdown
            paginateImage={paginateImage}
            setIndex={setIndex}
            index={index}
            stateIndex={stateIndex}
            key={`${category.url}${index}`}
            title={category.name!}
          >
            <div className="dropdown-content">
              <span className="dropdown-text">{category.desc}</span>
              <div className="button-wrapper">
                <Link href={`/catalog?categories=${category.url!}`}>
                  <span>ПЕРЕЙТИ К ТОВАРАМ</span>
                </Link>
              </div>
            </div>
          </InfoDropdown>
        );
      })}
    </InfoContainer>
  );
};

const InfoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-itmes: center;
  border-radius: 15px;
  overflow: hidden;
  user-select: none;
  .dropdown-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;
    .dropdown-text {
      width: 100%;
      padding: 30px 0 0 80px;
      text-align: left;
    }
    .button-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      a {
        width: 200px;
        height: 40px;
        background-color: ${color.btnSecondery};
        cursor: pointer;
        transition: 300ms;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
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
          font-family: 'Jost';
          font-size: 1rem;
        }
      }
    }
  }
`;

export default CatalogModal;
