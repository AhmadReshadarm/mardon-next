import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import { styleProps } from '../lib/types';
import { devices } from '../lib/Devices';

const HeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    font-family: Anticva;
    font-size: 1.2rem;
    margin: 0;
  }
`;

const SliderImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: auto;
  top: auto;
  // object-fit: cover;
`;

const LoadMoreBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background-color: ${color.btnPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${color.textPrimary};
  }
`;

const ReviewContainer = styled.ul`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;

  @media ${devices.laptopS} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ReviewReplyWrapper = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding-left: ${(p: styleProps) => p.padding};
  user-select: none;
`;

const ReviewReplyContent = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  .reply-logo,
  .user-profile-img {
    width: 70px;
    height: 70px;
    min-height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 800;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    border-radius: 50%;
    border: 2px solid ${color.textPrimary};
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const ReviewReplyItem = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 7px;

  .review-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 1rem;
      font-family: Anticva;
    }
    .replied-to-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 5px;

      h3 {
        font-size: 1rem;
        font-family: Anticva;
      }

      span {
        padding: 10px;
        border-radius: 20px;
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
    }
    .date-stars {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;

      .post-date {
        color: ${color.textSecondary};
        display: flex;
        flex-direction: column;

        button {
          text-align: right;
          cursor: pointer;
          &:hover {
            color: ${color.hover};
          }
        }
      }

      @media ${devices.mobileL} {
        display: flex;
        flex-direction: column-reverse;
        gap: 5px;
      }
    }
  }
  .product-details {
    color: ${color.yellow};
    width: 100%;
    padding: 20px 0;
    font-size: 0.875rem;
  }

  .user-post-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: felx-start;
    gap: 10px;
    h3 {
      font-family: Anticva;

      font-size: 1rem;
    }
  }
  @media ${devices.mobileL} {
    .review-header {
      flex-direction: column;
      align-items: flex-end;
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
  @media ${devices.mobileM} {
    .review-header {
      flex-direction: column;
      align-items: flex-end;
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }

  @media ${devices.mobileS} {
    .review-header {
      flex-direction: column;
      align-items: flex-end;
      .replied-to-wrapper {
        h3 {
          width: 100%;
          display: flex;
          flex-direciton: row;
          align-items: center;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }
`;

const UserImageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .side-line {
    width: 1px;
    height: 100%;
    background-color: ${color.textSecondary};
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

export {
  HeaderWrapper,
  SliderImage,
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyWrapper,
  ReviewReplyContent,
  ReviewReplyItem,
  UserImageWrapper,
};
