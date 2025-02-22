import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { useLocation, useNavigate } from 'react-router';

import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { MainLayout } from './components/MainLayout/MainLayout';
import { UserHome } from './pages/UserHome/UserHome';
import { NotificationContext } from './context/NotificationContext';
import useAlert from './customHooks/useNotification';
// import { useEffect } from 'react';
function App() {
  const notification = useAlert();
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
  //   if (!user && location.pathname != '/') {
  //     navigate('/');
  //   }
  // }, []);
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
