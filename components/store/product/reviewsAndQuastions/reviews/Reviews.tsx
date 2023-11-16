import { Rating } from '@mui/material';
import { Modal } from 'antd';
import { Reaction } from 'common/enums/reaction.enum';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import moment from 'moment';
import { devices } from 'components/store/lib/Devices';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import {
  createComment,
  deleteComment,
  deleteReview,
  sortReviews,
  updateComment,
} from 'redux/slicers/store/productInfoSlicer';
import { TProductInfoState } from 'redux/types';
import styled from 'styled-components';
import {
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyContent,
  ReviewReplyItem,
  ReviewReplyWrapper,
  UserImageWrapper,
} from '../../common';
import { reviewDropdownOption } from '../../constants';
import Filters from '../Filters';
import LikeDisLike from '../LikeOrDisLike';
import {
  getReactionNumber,
  handleCommentReactionClick,
  handleReviewReactionClick,
} from './helpers';
// import UserImagesSlider from './UserImagesSlider';
import SingleUserImagesSlider from './SingleUserImagesSlider';
import { Role } from 'common/enums/roles.enum';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { ThumbnailsWrapper } from '.';
import { handleMenuState } from './helpers';
import CloseSVG from '../../../../../assets/close_black.svg';
import Pagination from '../../productInfo/images/Pagination';

export enum ModalType {
  Review,
  Comment,
}

const Review = ({ product }) => {
  const dispatch = useAppDispatch();
  // const { product } = useAppSelector<TProductInfoState>(
  //   (state) => state.productInfo,
  // );
  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [isCommentSendVisibleMap, setIsCommentSendVisibleMap] = useState({});
  const [isCommentEditeSendVisibleMap, setIsCommentEditeSendVisibleMap] =
    useState({});
  const [commentValueMap, setCommentValueMap] = useState({});
  const [commentEditeValueMap, setCommentEditeValueMap] = useState({
    text: '',
  });
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  // ____________  user images hooks start ___________

  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [seleteduser, setSeletedUser] = useState(0);
  // ____________ user images hooks end ______________
  // _________________ paginition _______________________
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  // ____________________________________________________

  const onReviewRemoveClick = (id: string) => () => {
    setIsReviewModalVisible(true);
    setReviewId(id);
  };

  const handleReviewRemove = (id: string) => () => {
    setIsReviewModalVisible(false);
    dispatch(deleteReview(id));
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
  };

  const onCommentRemoveClick = (id: string) => () => {
    setIsCommentModalVisible(true);
    setCommentId(id);
  };

  const handleCommentRemove = (id: string) => () => {
    setIsCommentModalVisible(false);
    dispatch(deleteComment(id));
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
  };

  const handleLeaveCommentClick = (reviewId: string) => () => {
    setIsCommentSendVisibleMap((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };
  const handleEditeCommentClick =
    (commentId: string, commentText: string) => () => {
      setCommentEditeValueMap((prev) => ({
        ...prev,
        text: commentText,
      }));

      setIsCommentEditeSendVisibleMap((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    };
  const handleCommentValueChange = (reviewId: string) => (e) => {
    setCommentValueMap((prev) => ({
      ...prev,
      [reviewId]: e.target.value,
    }));
  };
  const handleCommentEditeValueChange = (commentId: string) => (e) => {
    setCommentEditeValueMap((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleCreateComment =
    (reviewId: string, commentValue: string, userId: string) => async () => {
      if (commentValue == '' || commentValue == undefined) return;

      await dispatch(createComment({ reviewId, text: commentValue, userId }));
      setIsCommentSendVisibleMap((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    };

  const handleUpdateComment =
    (
      commentId: string,
      reviewId: string,
      commentValue: string,
      userId: string,
    ) =>
    async () => {
      if (commentValue == '' || commentValue == undefined) return;
      const payload = {
        reviewId,
        text: commentValue,
        userId,
      };
      await dispatch(
        updateComment({
          commentId,
          payload,
        }),
      );

      setIsCommentEditeSendVisibleMap((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    };

  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortReviews(option));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(sortReviews(reviewDropdownOption[1]));
    }, 1000);
  }, []);

  const getImages = (review) => {
    return review.images ? review.images?.split(', ') : [];
  };

  return (
    <>
      <Filters
        options={reviewDropdownOption}
        value={filterValue}
        setValue={handleSortChange}
      />
      <ReviewContainer>
        {!product?.reviews?.length && <div>Отзывов пока нет.</div>}
        {product?.reviews?.map((review, key) => {
          const isReviewLiked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Like,
          );
          const isReviewDisliked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Dislike,
          );
          const likeNum = getReactionNumber(review.reactions, Reaction.Like);
          const dislikeNum = getReactionNumber(
            review.reactions,
            Reaction.Dislike,
          );
          const thumbnails = review.images ? review.images?.split(', ') : [];

          return (
            <React.Fragment key={`review-${key}`}>
              <ReviewReplyWrapper
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.2}
                variants={variants.fadInSlideUp}
                padding="0"
              >
                <ReviewReplyContent>
                  <UserImageWrapper>
                    <div className="user-profile-img">
                      {review.user?.role === Role.Admin ? (
                        <span>Fingarden</span>
                      ) : (
                        <img
                          src={
                            review.user?.image
                              ? `/api/images/${review.user.image}`
                              : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${review.user?.firstName}`;
                          }}
                          alt={review.user?.firstName}
                        />
                      )}
                    </div>
                    <div className="side-line"></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <h3>{review?.user?.firstName}</h3>
                      <span className="date-stars">
                        <span className="post-date">
                          {moment(review.createdAt).format('DD.MM.YYYY')}
                          {review.user?.id == user?.id &&
                          review.comments?.length == 0 ? (
                            <button onClick={onReviewRemoveClick(review.id!)}>
                              Удалить
                            </button>
                          ) : (
                            ''
                          )}
                        </span>
                        <span>
                          <Rating
                            value={review.rating}
                            size="medium"
                            readOnly
                          />
                        </span>
                      </span>
                    </div>
                    <div className="user-post-text">
                      <h3>Отзыв</h3>
                      <span>{review.text}</span>
                    </div>
                    {/* fullscreen mode  start */}
                    {thumbnails?.length! > 0 ? (
                      <ThumbnailsWrapper>
                        <h3 className="title-users-images">Фото покупатель</h3>
                        <div className="client-images-wrapper">
                          {thumbnails.map((image, index) => {
                            return (
                              <img
                                key={index}
                                src={`/api/images/${image}`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = '/img_not_found.png';
                                }}
                                className="image-container"
                              />
                            );
                          })}
                        </div>
                        {/* ___________ open full screen _______________ */}
                        <button
                          onClick={handleMenuState(
                            setIsOpened,
                            setSelectedIndex,
                            setSeletedUser,
                            key,
                          )}
                          className="show-all-action-btn"
                        >
                          Смотреть все
                        </button>
                      </ThumbnailsWrapper>
                    ) : (
                      ''
                    )}

                    <ProductImagesFullScreenWrapper
                      style={{
                        display:
                          isOpened && seleteduser == key ? 'flex' : 'none',
                      }}
                      animate={
                        isOpened && seleteduser == key ? 'open' : 'close'
                      }
                      variants={variants.fadeInReveal}
                    >
                      <div className="pagination-and-slider-wrapper">
                        <span
                          onClick={handleMenuState(
                            setIsOpened,
                            setSelectedIndex,
                            setSeletedUser,
                            key,
                          )}
                          className="close-btn-wrapper"
                        >
                          <CloseSVG />
                        </span>
                        <SingleUserImagesSlider
                          images={getImages(review)}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          isOpened={isOpened}
                          direction={direction}
                          page={page}
                          paginateImage={paginateImage}
                        />
                        <Pagination
                          images={getImages(review)}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}
                          paginateImage={paginateImage}
                          alt={product?.name}
                          isOpened={isOpened}
                        />
                      </div>
                    </ProductImagesFullScreenWrapper>
                    {/* fullscreen mode  end */}
                    <LikeDisLike
                      likeNum={likeNum}
                      dislikeNum={dislikeNum}
                      isLiked={isReviewLiked}
                      isDisliked={isReviewDisliked}
                      bgColor={color.textPrimary}
                      onLikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Like,
                        user,
                      )}
                      onDislikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Dislike,
                        user,
                      )}
                    />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
              {/* _____________  Comments Start _____________ */}

              {review.comments?.map((comment, index) => {
                const isCommentLiked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Like,
                );
                const isCommentDisliked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Dislike,
                );
                const likeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Like,
                );
                const dislikeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Dislike,
                );

                return (
                  <ReviewReplyWrapper
                    key={`comments-reviwe-${index}`}
                    initial="init"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={0.3}
                    variants={variants.fadInSlideUp}
                    padding="50px"
                  >
                    {/* ______ edite mode start  _______ */}
                    {isCommentEditeSendVisibleMap[comment?.id!] ? (
                      <UserCommentWrapper>
                        <UserCommentField
                          placeholder="Напишите комментарий"
                          value={commentEditeValueMap.text}
                          onChange={handleCommentEditeValueChange(comment?.id!)}
                        />
                        <div className="comment-action-btns-wrapper">
                          <SendUserCommentBtn
                            onClick={handleUpdateComment(
                              comment?.id!,
                              review?.id!,
                              commentEditeValueMap.text,
                              user?.id!,
                            )}
                          >
                            Отправить
                          </SendUserCommentBtn>
                          <SendUserCommentBtn
                            onClick={handleEditeCommentClick(
                              comment?.id!,
                              comment.text!,
                            )}
                          >
                            Отмена
                          </SendUserCommentBtn>
                        </div>
                      </UserCommentWrapper>
                    ) : (
                      // edite mode end
                      <ReviewReplyContent>
                        <UserImageWrapper>
                          <div className="user-profile-img">
                            {comment.user?.role === Role.Admin ? (
                              <span>Fingarden</span>
                            ) : (
                              <img
                                src={
                                  comment.user?.image
                                    ? `/api/images/${comment.user.image}`
                                    : `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${comment.user?.firstName}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = `https://api.dicebear.com/7.x/micah/svg?radius=50&backgroundColor=ECEEE7&seed=${comment.user?.firstName}`;
                                }}
                                alt={comment.user?.firstName}
                              />
                            )}
                          </div>
                          <div className="side-line"></div>
                        </UserImageWrapper>
                        <ReviewReplyItem>
                          <div className="review-header">
                            <div className="replied-to-wrapper">
                              <h3>{comment.user?.firstName}</h3>
                              <span>{`в ответ ${review.user?.firstName}`}</span>
                            </div>
                            <span className="date-stars">
                              <span className="post-date">
                                {moment(comment.createdAt).format('DD.MM.YYYY')}
                                {comment.user?.id == user?.id && (
                                  <button
                                    onClick={onCommentRemoveClick(comment.id!)}
                                  >
                                    Удалить
                                  </button>
                                )}
                                {user?.role === Role.Admin &&
                                comment.user?.id == user?.id ? (
                                  <button
                                    onClick={handleEditeCommentClick(
                                      comment?.id!,
                                      comment.text!,
                                    )}
                                  >
                                    Редактировать
                                  </button>
                                ) : (
                                  ''
                                )}
                              </span>
                            </span>
                          </div>
                          <div className="user-post-text">
                            <span>{comment.text}</span>
                          </div>
                          <LikeDisLike
                            likeNum={likeNum}
                            dislikeNum={dislikeNum}
                            isLiked={isCommentLiked}
                            isDisliked={isCommentDisliked}
                            bgColor={color.textPrimary}
                            onLikeClick={handleCommentReactionClick(
                              review,
                              comment,
                              dispatch,
                              Reaction.Like,
                              user,
                            )}
                            onDislikeClick={handleCommentReactionClick(
                              review,
                              comment,
                              dispatch,
                              Reaction.Dislike,
                              user,
                            )}
                          />
                        </ReviewReplyItem>
                      </ReviewReplyContent>
                    )}
                  </ReviewReplyWrapper>
                );
              })}
              {/* ____________ Comments end _______________ */}
              {user ? (
                (!isCommentSendVisibleMap[review?.id!] &&
                  user.id === review.user?.id &&
                  review.comments?.length !== 0) ||
                user.role === Role.Admin ? (
                  <LoadMoreBtnWrapper>
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                      onClick={handleLeaveCommentClick(review?.id!)}
                    >
                      Оставить комментарий
                    </motion.button>
                  </LoadMoreBtnWrapper>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {/* ________ New comment start __________ */}
              {user && isCommentSendVisibleMap[review?.id!] && (
                <UserCommentWrapper>
                  <UserCommentField
                    placeholder="Напишите комментарий"
                    onChange={handleCommentValueChange(review?.id!)}
                  />
                  <div className="comment-action-btns-wrapper">
                    <SendUserCommentBtn
                      onClick={handleCreateComment(
                        review?.id!,
                        commentValueMap[review?.id!],
                        user?.id!,
                      )}
                    >
                      Отправить
                    </SendUserCommentBtn>
                    <SendUserCommentBtn
                      onClick={handleLeaveCommentClick(review?.id!)}
                    >
                      Отмена
                    </SendUserCommentBtn>
                  </div>
                </UserCommentWrapper>
              )}
              {/* ________ New comment end __________ */}
            </React.Fragment>
          );
        })}
      </ReviewContainer>
      <Modal
        title={'Вы действительно хотите удалить этот отзыв?'}
        open={isReviewModalVisible}
        onOk={handleReviewRemove(reviewId)}
        onCancel={handleReviewCancel}
      ></Modal>
      <Modal
        title={'Вы действительно хотите удалить этот комментарий?'}
        open={isCommentModalVisible}
        onOk={handleCommentRemove(commentId)}
        onCancel={handleCommentCancel}
      ></Modal>
    </>
  );
};

const ProductImagesFullScreenWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  transition: 200ms;
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pagination-and-slider-wrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
  }

  .close-btn-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transition: 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
  @media ${devices.laptopS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }

  @media ${devices.mobileL} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }
  @media ${devices.mobileM} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }

  @media ${devices.mobileS} {
    .pagination-and-slider-wrapper {
      width: 95%;
      flex-direction: column;
    }
    .close-btn-wrapper {
      top: -50px;
    }
  }
`;

const UserCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .comment-action-btns-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px 0;
  }
`;

const UserCommentField = styled.textarea`
  width: 100%;
  max-width: 660px;
  min-height: 100px;
  max-height: 400px;
  display: block;
  background: #ccc;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  padding: 20px;
  outline: none;
  user-select: none;
`;

const SendUserCommentBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: ${color.btnPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${color.textPrimary};
`;

const Slidercontainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.glassmorphismBg};
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  z-index: 25;
  border-radius: 25px;
`;

export default Review;
