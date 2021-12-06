import classNames from 'classnames';
import React, { useState } from 'react';
import { Navbar, NavLink } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { MainNavBar } from '../../components/MainNavBar/MainNavBar';
import { SideBar } from '../../components/sidebar/SideBar';
import PrivateRoute from '../../routes/PrivateRoute';
import StateRequiredRoute from '../../routes/StateRequiredRoute';
import { AccountCardList } from '../account/AccountCardList';
import { AccountDetails } from '../account/accountDetails/AccountDetails';
import { AccountRegistration } from '../openAccount/AccountRegistration';
import { OpenAccount } from '../openAccount/OpenAccount';
import { Profile } from '../profile/Profile';
import { OpenCard } from '../openCard/OpenCard';
import { CardRegistration} from '../openCard/CardRegistration';
import { OpenLoan } from '../openLoan/OpenLoan';
import { LoanRegistration} from '../openLoan/LoanRegistration';

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
        <Navbar className={classNames("main-header tw-z-0", (disabled && "tw-hidden"))} bg="primary">
          <NavLink className="hover:tw-bg-linkhover" as={Link} to="/dashboard/overviewAccounts">Accounts</NavLink>
          {/* <i className="fas tw-text-2xl fa-caret-up"></i> */}
        </Navbar>
        <Switch>
          <PrivateRoute exact path="/dashboard/profile"><Profile/></PrivateRoute>
          <PrivateRoute exact path="/dashboard/accountOpening"><OpenAccount></OpenAccount></PrivateRoute>
          <PrivateRoute exact path="/dashboard/accountOpening/accountType"><AccountRegistration></AccountRegistration></PrivateRoute>
          <PrivateRoute exact path="/dashboard/cardOpening"><OpenCard></OpenCard></PrivateRoute>
          <PrivateRoute exact path="/dashboard/cardOpening/cardType"><CardRegistration></CardRegistration></PrivateRoute>
          <PrivateRoute exact path="/dashboard/loanOpening"><OpenLoan></OpenLoan></PrivateRoute>
          <PrivateRoute exact path="/dashboard/loanOpening/loanType"><LoanRegistration></LoanRegistration></PrivateRoute>
          <PrivateRoute exact path="/dashboard/overviewAccounts"><AccountCardList></AccountCardList></PrivateRoute>
          <PrivateRoute exact path="/dashboard/overviewAccounts/overview/account"><AccountDetails></AccountDetails></PrivateRoute>
        </Switch>
      </div >
    </AccountsBarContext.Provider >

  );
}