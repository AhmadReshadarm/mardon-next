import { motion } from 'framer-motion';
import { useState } from 'react';
import variants from 'components/store/lib/variants';
import { Rating } from '@mui/material';
import Link from 'next/link';
import AddReview from './AddReview';
import { Review } from 'swagger/services';
import styles from '../styles/profile.module.css';

type Props = {
  review: Review;
};
const ReviewsItems: React.FC<Props> = ({ review }) => {
  const [isOpen, setOpen] = useState(false);
  const images = review.product?.productVariants?.map((variants) =>
    variants.images?.split(', '),
  );

  return (
    <>
      {isOpen ? (
        <AddReview setOpen={setOpen} review={review} />
      ) : (
        <li className={styles.reviewItem}>
          <div className={styles.reviewInfo}>
            <Link href={`/product/${review.product?.url}`}>
              <h3 className={styles.reviewProductTitle}>
                {review.product?.name}
              </h3>
            </Link>
            <span>
              <Rating value={review.rating} size="small" readOnly />
            </span>
            <span className={styles.reviewText}>
              {review.text?.slice(0, 100)}
            </span>
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              className={styles.secondaryButton}
              onClick={() => setOpen(true)}
            >
              Редактировать
            </motion.button>
          </div>
          <Link href={`/product/${review.product?.url}`}>
            <div className={styles.reviewImageWrapper}>
              <img
                src={`/api/images/${images![0]![0]}`}
                alt={review.product?.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = '/img_not_found.png';
                }}
              />
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default ReviewsItems;
