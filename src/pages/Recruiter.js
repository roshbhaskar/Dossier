import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Recruiter = () => {
  return (
    <main>
      {/* <Navbar>

      </Navbar> */}
<center><h2>Recruiters Profile</h2></center>
<br/>
      <Search/>

      {/* <Info/> */}
       {/* <User/>  */}
      <Repos/> 
    </main>
  );
};

export default Recruiter;
