import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { MainLayout } from './components/MainLayout/MainLayout';
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/*" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
