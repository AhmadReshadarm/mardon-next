// components/store/profileComp/settings/index.tsx
// REMOVED: import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
// REMOVED: import { Container, Header } from '../common';
import styles from '../styles/profile.module.css'; // NEW
import { useEffect, useMemo, useState } from 'react';
import Notifactions from './Notification';
import UserData from './userData';
import { devices } from 'components/store/lib/Devices';

const Settings = (props: any) => {
  const { settingsRef, setActive } = props;
  const [isOpen, setOpen] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('settings');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(settingsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [settingsRef, observer]);
  return (
    <div className={styles.settingsContainer} id="settings" ref={settingsRef}>
      <h2 className={styles.sectionHeader}>Настройки</h2>
      <Notifactions {...props} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px 0',
        }}
      >
        <h2 className={styles.sectionHeader} style={{ fontSize: '1.2rem' }}>
          Изменить личные данные
        </h2>
        <button
          className={styles.secondaryButton}
          onClick={() => setOpen(true)}
        >
          Изменить данные
        </button>
      </div>
      <UserData isOpen={isOpen} setOpen={setOpen} {...props} />
    </div>
  );
};

export default Settings;
