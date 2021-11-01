import React from 'react';
import {Link} from 'react-router-dom';
import UserProfileNav from './UserProfileNav';

interface NavBarProps {}

export const MainNavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <button type="button" className="nav-link" data-widget="pushmenu">
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/dashboard" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/dashboard/accountOpening" className="nav-link">
            Open an account
          </Link>
        </li>
      </ul>
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      <ul className="navbar-nav ml-auto">
        <UserProfileNav></UserProfileNav>
      </ul>
    </nav>
  );
};
