import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import styles from '../styles/profile.module.css'; // NEW

const Nav = (props: any) => {
  const {
    isActive,
    setActive,
    userInfoRef,
    reveiwsRef,
    changePswRef,
    settingsRef,
  } = props;

  const handleActive = (value, setActive, ref) => {
    setActive(value);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  const navItems = [
    { id: 'profile', label: 'Личные данные', ref: userInfoRef },
    { id: 'reveiws', label: 'Отзывы', ref: reveiwsRef },
    { id: 'changePsw', label: 'Изменить пароль', ref: changePswRef },
    { id: 'settings', label: 'Настройки', ref: settingsRef },
  ];

  return (
    <ul className={styles.sidebarNav}>
      {navItems.map((item) => (
        <motion.li
          key={item.id}
          className={`${styles.sidebarNavItem} ${
            isActive === item.id ? styles.active : ''
          }`}
          onClick={() => handleActive(item.id, setActive, item.ref)}
        >
          <span
            style={{
              color: isActive === item.id ? color.hover : color.btnPrimary,
            }}
          >
            {item.label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

export default Nav;
