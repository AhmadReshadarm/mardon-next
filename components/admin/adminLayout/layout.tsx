import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { Role } from 'common/enums/roles.enum';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { session } from 'redux/slicers/authSlicer';
import { Page } from 'routes/constants';
import { navigateTo } from 'common/helpers';
import { menueItems } from './constants';
import {
  currentPath,
  getSelectedKeys,
  handleGetSecondHref,
  handleLogout,
  handleSelect,
} from './helpers';
import styles from './layout.module.scss';
import { TAuthState } from 'redux/types';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
const { Header, Content, Footer, Sider } = Layout;

type Props = {
  // user: User | null;
  children: any;
};
// user,
const AdminLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const date = new Date().getFullYear();

  const backRef: string = handleGetSecondHref(router);

  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  // validate session
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(session());

      if (response.payload.message == 'retrying') {
        return;
      }
      if (
        response.payload.user?.role !== Role.Admin &&
        router.pathname.includes('/admin')
      ) {
        navigateTo(router, Page.ADMIN_LOGIN)();
      }
    };
    fetchData();
  }, [router]);
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(!collapsed);
          }}
        >
          <div className={styles['logo']}>
            {collapsed ? 'Fin' : 'Fingarden'}
          </div>
          <Menu
            onSelect={handleSelect(router)}
            theme="dark"
            defaultSelectedKeys={getSelectedKeys(router.pathname)}
            mode="inline"
            items={menueItems}
          />
        </Sider>
        <Layout className="site-layout">
          <Header id="page-top" className={styles['site-layout__header']}>
            {
              <div>
                <span>{user?.email}</span>
                <Button onClick={handleLogout(router, dispatch)} type="link">
                  Выйти
                </Button>
              </div>
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <Link legacyBehavior href="/admin">
                  <a>Администрирование</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link legacyBehavior href={backRef}>
                  <a>{currentPath(router, 1)}</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>{currentPath(router, 2)}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles['site-layout__content']}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Fingarden ©{date} Created by The Best Studio
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
