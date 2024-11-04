import Link from 'next/link';
import {
  CatelogSVG,
  BasketSVG,
  WishlistSVG,
  HomePageIconSVG,
} from 'assets/icons/UI-icons';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import { useRouter } from 'next/router';
import styles from '../../styles/mobileNav.module.css';

const NavMobile = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const router = useRouter();

  return (
    <div className={styles.NavWrap}>
      <Link aria-label="главная страница" href="/" prefetch={false}>
        <span className={styles.icons_wrapper_mobile}>
          <HomePageIconSVG
            colorState={router.pathname == '/' ? '#000000' : '#545454'}
          />
          <span
            style={{ color: router.pathname == '/' ? '#000000' : '#545454' }}
          >
            Главная
          </span>
        </span>
      </Link>
      <Link aria-label="каталог" href="/catalog" prefetch={false}>
        <span className={styles.icons_wrapper_mobile}>
          <CatelogSVG
            colorState={router.pathname == '/catalog' ? '#000000' : '#545454'}
          />
          <span
            style={{
              color: router.pathname == '/catalog' ? '#000000' : '#545454',
            }}
          >
            Каталог
          </span>
        </span>
      </Link>

      <div className={styles.ParentWrapper}>
        {!!cart?.orderProducts?.length && (
          <span className={styles.Counter}>{cart?.orderProducts?.length}</span>
        )}
        <Link aria-label="корзина" href="/cart" prefetch={false}>
          <span className={styles.icons_wrapper_mobile}>
            <BasketSVG
              fill={router.pathname == '/cart' ? '#000000' : '#545454'}
            />
            <span
              style={{
                color: router.pathname == '/cart' ? '#000000' : '#545454',
              }}
            >
              Корзина
            </span>
          </span>
        </Link>
      </div>
      <div className={styles.ParentWrapper}>
        {!!wishlist?.items?.length && (
          <span className={styles.Counter}>{wishlist?.items?.length}</span>
        )}
        <Link aria-label="избранное" href="/wishlist" prefetch={false}>
          <span className={styles.icons_wrapper_mobile}>
            <WishlistSVG
              fill={router.pathname == '/wishlist' ? '#000000' : '#545454'}
            />
            <span
              style={{
                color: router.pathname == '/wishlist' ? '#000000' : '#545454',
              }}
            >
              Избранное
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
