import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useAuth, authContext } from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';

import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  const auth = useAuth();
  if (auth.isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <authContext.Provider value={auth}>
      <Switch>
        <Route exact path="/login" render={props => <Login {...props} />} />
        <PrivateRoute exact path="/" view={Dashboard} />
      </Switch>
    </authContext.Provider>
  );
}

export default App;
