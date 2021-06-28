import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//only if logged in you will be redirected to the profile page
const PrivateRoute = ({ children, ...rest }) => {

  const { isAuthenticated, user } = useAuth0();
  
  const isUser = isAuthenticated && user;

  console.log("USER-DET",user);
  
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to='/login'></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
