import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Verify from './pages/Verify';
import Recruiter from './pages/Recruiter';
import Recruiter_Dashboard from './pages/Recruiter_Dashboard.js';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>

          <PrivateRoute path='/profile' exact={true}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          
          <PrivateRoute path='/' exact={true}> 
          {/* always gets redirected here on click */}
            <Verify/>
          </PrivateRoute>
          
          <PrivateRoute path='/recruiter' exact={true}>
            <Recruiter/>
          </PrivateRoute>

         
          {/* <Route path='/verify' exact={true}>
            <Verify/>
          </Route> */}
          
          <Route path='/login' >
            <Login></Login>
          </Route>
          
         
        
          <Route path='/:handle' exact={true}>
            <Recruiter_Dashboard/>
          </Route>

          <Route path='*'>
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
