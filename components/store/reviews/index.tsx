import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { Review } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';

type Props = {
  review: Review;
};
const ReviewsItems: React.FC<Props> = ({ review }) => {
  const images = review.product?.productVariants![0].images?.split(', ');

  return (
    <ReviewsItem>
      <div className="review-info-wrapper">
        <Link href={`/product/${review.product?.url}`}>
          <h1 className="product-title">{review.product?.name}</h1>
        </Link>
        <div className="review-and-profile-wrapper">
          <div className="profile-rating-wrapper">
            <span className="rating-wrapper">
              <Rating value={review.rating} size="small" readOnly />
            </span>
            <ReviewWrapper>
              <img
                src={
                  review.user?.image !== ''
                    ? `/api/images/${review.user?.image}`
                    : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`
                }
                alt={review.user?.firstName}
                className="image-wrapper"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`;
                }}
              />
              <div className="review-text-btn-wrapper">
                <h2 className="user-name-wrapper">{review.user?.firstName}</h2>
              </div>
            </ReviewWrapper>
          </div>
          <span className="review-text">{review.text}</span>
        </div>
      </div>

      <div className="product-image-wrapper">
        <img
          src={`/api/images/${images ? images[0] : ''}`}
          alt={review.product?.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/img_not_found.png';
          }}
        />
      </div>
    </ReviewsItem>
  );
};

const ReviewsItem = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: ${color.bgProduct};
  box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
  user-select: none;
  gap: 30px;
  .review-info-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    .product-title {
      font-family: Anticva;
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 100;
      &:hover {
        color: ${color.hoverBtnBg};
        text-decoration: underline;
      }
    }

    .review-and-profile-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 50px;
      .profile-rating-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
      }
    }
  }
  .product-image-wrapper {
    width: 220px;
    min-width: 220px;
    height: 220px;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
      }
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column-reverse;
    gap: 15px;
    .review-info-wrapper {
      align-items: center;
      .product-title {
        text-align: center;
      }

      .review-and-profile-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 0;
        .profile-rating-wrapper {
          align-items: center;
        }
      }
    }
  }
`;

const ReviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  gap: 10px;
  .image-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media ${devices.mobileL} {
    align-items: center;
  }
  @media ${devices.mobileM} {
    align-items: center;
  }
  @media ${devices.mobileS} {
    align-items: center;
  }
`;

export default ReviewsItems;
