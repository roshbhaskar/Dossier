import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-2ued0m1v.us.auth0.com'
      clientId='ppT2iwRi8euI9rWxuDXPWsfBgioDfmmr'
      // redirectUri={window.location.origin} 
      redirectUri="http://localhost:3000/recruiter"
      // cacheLocation='localstorage' //local storage of login
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
