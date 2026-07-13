import styles from '../styles/profile.module.css'; // NEW
import ReviewsItems from './ReviewItems';
import { useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserReviews } from 'redux/slicers/store/profileSlicer';
import { TProfileState } from 'redux/types';
import { TAuthState } from 'redux/types';
import Loading from 'ui-kit/Loading';

const Reveiws = (props: any) => {
  const dispatch = useAppDispatch();
  const { reveiwsRef, setActive } = props;
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { reviews, loading } = useAppSelector<TProfileState>(
    (state) => state.profile,
  );
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('reveiws');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(reveiwsRef.current);
    dispatch(fetchUserReviews(user?.id!));

    return () => {
      observer.disconnect();
    };
  }, [reveiwsRef, observer]);

  return (
    <div className={styles.reviewsContainer} id="reviews" ref={reveiwsRef}>
      <h2 className={styles.sectionHeader}>Мои отзывы</h2>
      {!loading ? (
        reviews.length !== 0 ? (
          <ul className={styles.reviewsList}>
            {reviews?.map((review, index) => {
              return <ReviewsItems review={review} key={index} />;
            })}
          </ul>
        ) : (
          <div style={{ color: '#666' }}>У вас еще нет отзывов</div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Reveiws;
