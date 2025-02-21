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
import { NavLink } from 'react-router';

export const MainLayout: FC<MyProps> = ({ children }) => {
  const getNavLinkActiveStyle = (isActive: boolean) => {
    return {
      color: isActive ? '#f0754d' : 'black',
      borderBottom: isActive ? 'solid' : 'unset',
      borderColor: isActive ? '#f0754d' : 'unset',
      borderWidth: isActive ? '5px' : 'unset',
    };
  };
  return (
    <Layout className="main-layout-wrapper">
      <Layout.Header className="main-layout-header">
        <div className={`home-menu-items`}>
          <NavLink
            style={({ isActive }) => getNavLinkActiveStyle(isActive)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => getNavLinkActiveStyle(isActive)}
            to="/welcome"
          >
            User Welcome
          </NavLink>
        </div>
        <div className="auth-menu-wrapper">
          <NavLink
            style={({ isActive }) => getNavLinkActiveStyle(isActive)}
            to="/sign-up"
          >
            Sign Up
          </NavLink>
          <NavLink
            style={({ isActive }) => getNavLinkActiveStyle(isActive)}
            to="/login"
          >
            Sign In
          </NavLink>
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
