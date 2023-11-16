import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CategoryInTree } from 'swagger/services';
import variants from 'components/store/lib/variants';

type Props = {
  categories: CategoryInTree[];
  index: number;
  page: any;
  direction: any;
};

const ImageSlider: React.FC<Props> = ({
  categories,
  index,
  page,
  direction,
}) => {
  return (
    <ImageSliderWrapper>
      {/* <Link
        href={
          categories && categories[index]?.url ? categories[index]?.url! : ''
        }
      > */}
      <AnimatePresence initial={false} custom={direction}>
        <Slider
          key={page}
          src={categories ? `/api/images/${categories[index]?.image}` : ''}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
          custom={direction}
          variants={variants.slider}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
        />
      </AnimatePresence>
      {/* </Link> */}
    </ImageSliderWrapper>
  );
};

const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  min-height: 270px;
  max-height: 270px;
`;

const Slider = styled(motion.img)`
  width: 80%;
  height: 100%;
  position: absolute;
  right: 50px;
  top: 0;
  object-fit: cover;
`;

export default ImageSlider;
