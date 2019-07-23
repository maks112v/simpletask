import React from 'react';
import { useSession } from '../hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ view: Component, ...rest }) {
  const { auth } = useSession();
  if (auth) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
}
