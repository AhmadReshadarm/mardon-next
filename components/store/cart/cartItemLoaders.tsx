import styles from './cartStyles.module.css';

const CartItemLoader = () => {
  return (
    <li className={styles.ProductItemWrapper}>
      <div className={styles.loader_imageLoader_wrapper}>
        <span className={`${styles.loader_img} ${styles.LoaderMask}`} />
        <div className={styles.action_btn_loader_wrapper}>
          <div
            className={styles.LoaderMask}
            style={{
              width: '120px',
              height: '50px',
              borderRadius: '30px',
            }}
          />
          <div
            className={styles.LoaderMask}
            style={{
              width: '120px',
              height: '50px',
              borderRadius: '30px',
            }}
          />
        </div>
      </div>

      <div className={styles.product_details_wrapper}>
        <div className={styles.product_title_description_wrapper}>
          <span
            // style={{ width: '200px', height: '25px' }}
            className={`${styles.LoaderMask} ${styles.loader_title}`}
          />

          {/* ------------ rating --------------- */}
          <div className={styles.rating_wrapper}>
            <span className={styles.review_star}>
              <span
                style={{ width: '11px', height: '11px', borderRadius: '50%' }}
                className={styles.LoaderMask}
              />
            </span>
            <span
              style={{ width: '11px', height: '11px', borderRadius: '50%' }}
              className={styles.LoaderMask}
            />
          </div>
          {/* ------------- end of rating ---------------- */}
          {/* ----------- color ------------------- */}
          <div className={styles.artical_wrapper}>
            <span
              style={{ width: '50px', height: '15px' }}
              className={styles.LoaderMask}
            />
            <span
              style={{ width: '11px', height: '11px', borderRadius: '50%' }}
              className={styles.LoaderMask}
            />
            <span
              style={{ width: '11px', height: '11px', borderRadius: '50%' }}
              className={styles.LoaderMask}
            />
            <span
              style={{ width: '11px', height: '11px', borderRadius: '50%' }}
              className={styles.LoaderMask}
            />
          </div>
          {/* ---------- end of color ----------- */}
        </div>

        <div className={styles.price_sperator_wrapper}>
          <div className={styles.old_new_price_wrapper}>
            <span
              style={{ width: '50px', height: '15px' }}
              className={styles.LoaderMask}
            />

            <span
              style={{ width: '50px', height: '15px' }}
              className={styles.LoaderMask}
            />
          </div>
          <span
            style={{ width: '80px', height: '20px' }}
            className={styles.LoaderMask}
          />
        </div>
      </div>
      <div className={styles.action_buttons_wrapper}>
        <div
          className={styles.LoaderMask}
          style={{
            width: '150px',
            height: '50px',
            borderRadius: '30px',
          }}
        />
        <div
          className={styles.LoaderMask}
          style={{
            width: '150px',
            height: '50px',
            borderRadius: '30px',
          }}
        />
      </div>
    </li>
  );
};

export default CartItemLoader;
