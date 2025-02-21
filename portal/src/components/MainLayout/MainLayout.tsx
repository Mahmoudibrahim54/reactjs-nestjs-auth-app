// import './MainLayout.scss';
// import { FC } from 'react';
// interface MyProps {
//   children?: React.ReactNode;
// }
// export const MainLayout: FC<MyProps> = ({ children }) => {
//   return <div className="main-layout-wrapper">{children}</div>;
// };

import './MainLayout.scss';
import { FC } from 'react';
interface MyProps {
  children?: React.ReactNode;
}
import { Layout } from 'antd';

export const MainLayout: FC<MyProps> = ({ children }) => {
  return (
    <Layout className="main-layout-wrapper">
      <Layout.Header className="main-layout-header">
        <div className="home-menu-item">
          <div>Home</div>
        </div>
        <div className="auth-menu-wrapper">
          <div>Sign Up</div>
          <div>Sign In</div>
        </div>
      </Layout.Header>
      <Layout.Content className="main-layout-content">
        <div className="main-layout-content-elements-wrapper">{children}</div>
      </Layout.Content>
      <Layout.Footer className="main-layout-footer">
        Mahmoud Ibrahim ©{new Date().getFullYear()} Created by Mahmoud Ibrahim
      </Layout.Footer>
    </Layout>
  );
};
