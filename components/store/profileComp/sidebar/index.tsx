import UserInfo from './UserInfo';
import Nav from './Nav';
import styles from '../styles/profile.module.css';
const SideBar = (props: any) => {
  return (
    <div className={styles.containerSideBar}>
      <UserInfo {...props} />
      <Nav {...props} />
    </div>
  );
};

export default SideBar;
