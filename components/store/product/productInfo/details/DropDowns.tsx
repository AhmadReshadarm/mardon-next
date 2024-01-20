import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import DeleveryBox from '../../../../../assets/deleveryBox.svg';
import { devices } from 'components/store/lib/Devices';
import { ParameterProduct } from 'swagger/services';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { TProductInfoState } from 'redux/types';
import Loading from 'ui-kit/Loading';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const TextEditorConverter = dynamic(
  () => import('ui-kit/TextEditorConverter'),
  {
    ssr: false,
  },
);
type Props = {
  description?: any;
  parameterProducts?: ParameterProduct[];
};

const DropDowns: React.FC<Props> = ({ description, parameterProducts }) => {
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty(),
  // );

  // useEffect(() => {
  //   if (!loading && product?.desc!.length !== 0) {
  //     setEditorState(
  //       EditorState.createWithContent(
  //         convertFromRaw(JSON.parse(product?.desc!)),
  //       ),
  //     );
  //   }
  // }, [description]);

  // _________________________ preview converter _______________________
  // const [convertedContent, setConvertedContent] = useState(null);
  // useEffect(() => {
  //   const rawContentState = convertToRaw(editorState.getCurrentContent());
  //   const htmlOutput = draftToHtml(rawContentState);
  //   setConvertedContent(htmlOutput);
  // }, [editorState]);

  // function createMarkup(html) {
  //   if (typeof window !== 'undefined') {
  //     const domPurify = DOMPurify(window);
  //     return {
  //       __html: domPurify.sanitize(html),
  //     };
  //   }
  // }

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
      <InfoDropdown title="Описание">
        {/* <TextEditorConverter editorModal={product?.desc!} /> */}
        <p>{product?.desc}</p>
        {/* {loading ? (
          <Loading />
        ) : (
          <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        )} */}
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <SpecsContainer>
          <SpecsKeyValueWrapper>
            {parameterProducts?.map((item, index) => {
              return (
                <>
                  {item.value == '_' ||
                  item.value == '-' ||
                  item.value == '' ? (
                    ''
                  ) : (
                    <span key={`dropdown-below-key-${index}`}>
                      <li
                        className="wrapper-key-vlaue"
                        key={`parameter-product-label-${index}`}
                      >
                        <span id="key-specs">{item.parameter?.name}: </span>
                        <span id="value-specs">{item.value}</span>
                      </li>
                    </span>
                  )}
                </>
              );
            })}
          </SpecsKeyValueWrapper>
        </SpecsContainer>
      </InfoDropdown>
      <InfoDropdown title="Подробнее о доставке">
        <h3>КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?</h3>

        <Contents>
          Минимальная сумма заказа - от 70.000 рублей. Доставка в любую
          транспортную компанию и по Москве бесплатная.
        </Contents>
        <Contents>
          По дополнительным вопросам обращаться по номеру телефона:{' '}
          <Link href="tel:89268999954">
            <span>8-926-899-99-54</span>
          </Link>{' '}
          . Дополнительная скидка рассчитывается индивидуально и зависит от
          количества заказанного товара.
        </Contents>
      </InfoDropdown>
    </InfoContainer>
  );
};

const InfoContainer = styled(motion.div)`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${color.textPrimary};
  margin-top: ${(P: styleProps) => P.margintop};
  user-select: none;
`;

const SpecsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SpecsKeyValueWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  .wrapper-key-vlaue {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    span {
      font-size: 0.875rem;
    }
    #key-specs {
      width: 100%;

      color: ${color.textSecondary};
    }
    #value-specs {
      width: 50%;
    }
  }
`;

const Headers = styled.h1`
  width: 100%;
  text-align: start;
  font-family: 'Anticva';
  font-size: 1.5rem;
  @media ${devices.mobileL} {
    max-width: 95vw;
  }
`;

const Contents = styled.span`
  width: 80%;
  text-align: start;
  line-height: 1.5rem;
  font-size: 1rem;
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ListsDots = styled.ul`
  width: 80%;
  text-align: start;
  padding-left: 15px;
  line-height: 1.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    list-style-type: circle;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export default DropDowns;
