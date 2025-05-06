import styled from 'styled-components';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import styles from './cartStyles.module.css';

const CartItemLoader = ({ windowWidth }) => {
  return (
    <li className={styles.ProductItemWrapper}>
      <span
        style={{
          width: windowWidth <= 1024 ? `${windowWidth - 60}px` : '180px',
          height: windowWidth <= 1024 ? `${windowWidth - 60}px` : '180px',
          borderRadius: 0,
        }}
        className={`${styles.loader_img} ${styles.LoaderMask}`}
      />

      <div className={styles.product_details_wrapper}>
        <div className={styles.product_title_description_wrapper}>
          <span
            style={{ width: '200px', height: '25px' }}
            className={styles.LoaderMask}
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

const ProductItemWrapper = styled.li`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  background-color: ${color.backgroundPrimary};
  border: 1px solid #e5e2d9;
  border-radius: 30px;
  .loader {
    width: 180px;
    height: 180px;
    min-width: 180px;
    object-fit: cover;
    border-radius: 30px;
  }

  .product-details-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    .product-title-description-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 15px;

      a {
        padding: 0;
        h1 {
          font-size: 1.1rem;
        }
      }
    }

    .price-sperator-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 40px;
      .old-new-price-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        .old-price {
          text-decoration: line-through;
          font-size: 0.8rem;
          color: ${color.textBase};
        }
      }

      .total-price-wrapper {
        font-size: 1.5rem;
      }
    }
  }

  .action-buttons-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 10px 10px 0;
    gap: 20px;
  }

  @media ${devices.laptopS} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
    }
  }
  @media ${devices.tabletL} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
    }
  }
  @media ${devices.tabletS} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileM} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  @media ${devices.mobileS} {
    flex-direction: column;
    height: unset;
    .loader {
      width: 100%;
      height: 100%;
      min-width: unset;
      min-height: unset;
    }
    .action-buttons-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export default CartItemLoader;
