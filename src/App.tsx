import React from 'react';
import './App.css';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { DashBoard } from './pages/dashboard/DashBoard';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>
          <PublicRoute exact path="/login">
            <Login></Login>
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register></Register>
          </PublicRoute>
          <PrivateRoute path="/dashboard">
            <DashBoard></DashBoard>
          </PrivateRoute>
        </Switch>
      </Router >
    </QueryClientProvider >
  );
}

export default App;
