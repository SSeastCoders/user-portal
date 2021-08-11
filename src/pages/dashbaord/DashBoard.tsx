import React, { useState } from 'react'
import { MainNavBar } from '../../components/MainNavBar/MainNavBar';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Profile } from '../profile/Profile';
import { SideBar } from '../../components/sidebar/SideBar';
import { Navbar, NavLink } from 'react-bootstrap';
import './DashBoard.css';
import { OpenAccount } from '../openAccount/OpenAccount';
import { AccountRegistration } from '../openAccount/AccountRegistration';


interface DashBoardProps {

}

export const AccountsBarContext = React.createContext((state: boolean) => { });
export const DashBoard: React.FC<DashBoardProps> = ({ }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  return (
    <AccountsBarContext.Provider value={setDisabled}>
      <div className="wrapper">
        <MainNavBar></MainNavBar>
        <SideBar></SideBar>
        <Navbar className="main-header es-menu-nav-bar" bg="primary" style={{ display: disabled ? "none" : "" }}>
          <NavLink className="es-menu-nav-link" as={Link} to="/accounts">Accounts</NavLink>
        </Navbar>
        <Switch>
          <Route exact path="/dashboard/profile" component={Profile}>
          </Route>
          <Route exact path="/dashboard/accountOpening" component={OpenAccount}></Route>
          <Route exact path="/dashboard/accountOpening/accountType" component={AccountRegistration}></Route>
        </Switch>
      </div >
    </AccountsBarContext.Provider >

  );
}