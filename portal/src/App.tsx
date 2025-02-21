import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { MainLayout } from './components/MainLayout/MainLayout';
import { UserHome } from './pages/UserHome/UserHome';
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<UserHome />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
