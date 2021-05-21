import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import Recruiter from './pages/Recruiter'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Search } from './components';
import { Link } from 'react-router-dom';
import Verify from './pages/Verify';

import firebase from 'firebase';



class App extends React.Component {
  render(){
  return (
    <Router>
      <Switch>
          <Route path="/user" exact={true}>
          <center>
           <br></br><br/><h3>Enter Username and Upload Resume</h3><br/><br/>
           <Verify/></center> 
          </Route>

          <Route path="/dashboard" exact={true}>
            <Dashboard user="raniyer"/>
          </Route>
          
          <Route path="/" exact={true}>
            <Dashboard/>
          </Route>
          
          <Route path="/company" exact={true}>
              <Recruiter/>
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="*">
              <Error></Error>
          </Route>
      </Switch>
    </Router>
  );
  }
}

export default App;
