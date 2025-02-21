import './Home.scss';
import { FC } from 'react';
import { NavLink } from 'react-router';

export const Home: FC = () => {
  return (
    <div className="home-page-wrapper">
      <h1 className="home-page-welcome">Welcome to my Home Page</h1>
      <NavLink to="/login" className="home-page-button">
        Sign In
      </NavLink>
      <h2 className="home-page-call-to-action">
        Or, Sign Up If You Don't Have an Account
      </h2>
      <NavLink to="/sign-up" className="home-page-button sign-up-button">
        Sign Up
      </NavLink>
    </div>
  );
};
