import React from 'react'
import { NavBar } from '../components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { SideBar } from '../components/sidebar/SideBar';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
      <div className="wrapper">
      <NavBar></NavBar>
      <SideBar></SideBar>
        <Switch>
          <Route exact path="/home/profile" component={Profile}>

          </Route>
        </Switch>
      </div >
      
    );
}