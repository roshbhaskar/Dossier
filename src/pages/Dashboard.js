import React from 'react';
import { Repos, Navbar } from '../components';
import loadingImage from '../images/150x150.gif';
import { GithubContext } from '../context/context';
import Webscraper from '../components/Webscraper';



const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        {/* <Search /> */}
        <img src={loadingImage} className='loading-img' alt='loding' />
      </main>
    );
  }
  
  return (
    <main>
      <Navbar></Navbar>
      {/* <Webscraper/> */}
      {/* <Search />
      <Info /> */}
      {/* <User /> */}
      <Repos />
    </main>
  );
  
};

export default Dashboard;
