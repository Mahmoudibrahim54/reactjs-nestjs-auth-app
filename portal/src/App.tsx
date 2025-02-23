import './App.css';
import HttpClient from './api/index';
import { Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { MainLayout } from './components/MainLayout/MainLayout';
import { UserHome } from './pages/UserHome/UserHome';
import { NotificationContext } from './context/NotificationContext';
import useAlert from './customHooks/useNotification';
function App() {
  const notification = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user_info') || sessionStorage.getItem('user_info');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      localStorage.removeItem('user_info');
      localStorage.removeItem('token');

      sessionStorage.removeItem('user_info');
      sessionStorage.removeItem('token');

      if (location.pathname !== '/') navigate('/');
    }

    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    console.log(location);

    if (!token) {
      localStorage.removeItem('user_info');
      localStorage.removeItem('token');

      sessionStorage.removeItem('user_info');
      sessionStorage.removeItem('token');
      if (location.pathname !== '/') navigate('/');
    }

    if (token) {
      HttpClient.post('/auth/verify-token', { token }).catch((e) => {
        console.log(e);
        notification.alertError('Token Expired');
        localStorage.removeItem('user_info');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user_info');
        sessionStorage.removeItem('token');

        if (location.pathname !== '/') navigate('/');
      });
    }
  }, []);

  return (
    <NotificationContext.Provider value={notification}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<UserHome />} />
        </Routes>
        {notification.contextHolder}
      </MainLayout>
    </NotificationContext.Provider>
  );
}

export default App;
