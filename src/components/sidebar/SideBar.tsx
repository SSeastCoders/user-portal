import React from 'react'
import { Link, NavLink } from 'react-router-dom';

interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = ({}) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">EastCoders Bank</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={'/img/default-profile.png'}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {}
            </Link>
          </div>
        </div>
        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>{}</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" exact className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p>{}</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
