import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import firebase from 'firebase';

const Dashboard = (props) => {
  //firebase.firestore().collection('users').doc(props.user).set({nick: "Name"},{merge:true});
  //console.log("USer in Dashboard",props.user);
  return (
    <main>
      {/* <Navbar>

      </Navbar> */}

      {/* <Search/> */}
    <center><h2>Candidates Profile</h2></center>
      {/* <Info/> */}
      {/* <User/> */}
      {/* <Repos/>// user={user}/> */}
      <Repos user={props.user}/>
      
    </main>
  );
};

export default Dashboard;
