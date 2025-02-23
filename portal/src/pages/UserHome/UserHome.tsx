import { Button } from 'antd';
import './UserHome.scss';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
interface User {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  username: string;
  password: string;
  remember: boolean;
}
const defaultUserInfo = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  username: '',
  password: '',
  remember: false,
};

export const UserHome: FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User>(defaultUserInfo);
  useEffect(() => {
    const loggedUser =
      localStorage.getItem('user_info') || sessionStorage.getItem('user_info');
    if (!loggedUser) {
      navigate('/');
    }
    setUserInfo(JSON.parse(loggedUser || 'null'));
  }, []);

  return (
    <div className="user-home-page-wrapper">
      <h1 className="home-page-welcome">
        <div>Welcome, </div>
        <div className="user-name">
          {userInfo?.first_name + ' ' + userInfo?.last_name}{' '}
        </div>
        <div>to My Website.</div>
      </h1>
      <Button
        className="user-home-page-button"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_info');

          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user_info');
          navigate('/');
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};
