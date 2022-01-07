import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

import { firebase } from '@firebase/app';
import '@firebase/firestore'


  var firebaseConfig = {
    apiKey: "AIzaSyCl15mvuayHnJt7XAt4o5SlrmyjZN4fS0g",
    authDomain: "dossier-8ca16.firebaseapp.com",
    projectId: "dossier-8ca16",
    storageBucket: "dossier-8ca16.appspot.com",
    messagingSenderId: "525843140571",
    appId: "1:525843140571:web:82d7ea61692d637c6961fe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-2ued0m1v.us.auth0.com'
      clientId='ppT2iwRi8euI9rWxuDXPWsfBgioDfmmr'
      // redirectUri={window.location.origin} 
      // redirectUri="http://localhost:3000/recruiter"
      // cacheLocation='localstorage' //local storage of login
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
