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
  return (
    <Layout className="main-layout-wrapper">
      <Layout.Header className="main-layout-header">
        <div className={`home-menu-item`}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? '#f0754d' : 'black',
              borderBottom: isActive ? 'solid' : 'unset',
              borderColor: isActive ? '#f0754d' : 'unset',
              borderWidth: isActive ? '5px' : 'unset',
            })}
            to="/home"
          >
            Home
          </NavLink>
        </div>
        <div className="auth-menu-wrapper">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? '#f0754d' : 'black',
              borderBottom: isActive ? 'solid' : 'unset',
              borderColor: isActive ? '#f0754d' : 'unset',
              borderWidth: isActive ? '5px' : 'unset',
            })}
            to="/sign-up"
          >
            Sign Up
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? '#f0754d' : 'black',
              borderBottom: isActive ? 'solid' : 'unset',
              borderColor: isActive ? '#f0754d' : 'unset',
              borderWidth: isActive ? '5px' : 'unset',
            })}
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
