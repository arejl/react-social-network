import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userToken = useSelector(state => state.token);
  return (<Route {...rest} render={props => (
    userToken ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />)
};
  

export default PrivateRoute;
