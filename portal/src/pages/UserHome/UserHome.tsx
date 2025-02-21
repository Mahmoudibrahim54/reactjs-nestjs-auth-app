import './UserHome.scss';
import { FC } from 'react';

export const UserHome: FC = () => {
  const userInfo = { name: 'Mahmoud Ibrahim' };
  return (
    <div className="user-home-page-wrapper">
      <h1 className="home-page-welcome">
        <div>Welcome, </div>
        <div className="user-name">{userInfo.name} </div>
        <div>to My Website.</div>
      </h1>
    </div>
  );
};
