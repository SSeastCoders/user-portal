import React from 'react';
import './App.css';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './pages/Home';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          <PublicRoute exact path="/login">
            <Login></Login>
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register></Register>
          </PublicRoute>
          <PrivateRoute path="/home">
            <Home></Home>
          </PrivateRoute>
        </Switch>
      </Router >
    </QueryClientProvider >
  );
}

export default App;
