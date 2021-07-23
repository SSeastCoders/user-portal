import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
        </Switch>
      </Router >
    </QueryClientProvider >
  );
}

export default App;
