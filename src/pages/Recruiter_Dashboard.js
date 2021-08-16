import React,{useEffect} from 'react';
// import { Dec_repos, Navbar } from '../components';
import Dec_repos from '../components/Dec_repos.js';
import loadingImage from '../images/150x150.gif';
import { GithubContext } from '../context/context';
import Webscraper from '../components/Webscraper';
import Search from '../components/Search'
import { useParams } from 'react-router';

const Recruiter_Dashboard = () => {
  const { isLoading, searchGithubUser ,name } = React.useContext(GithubContext);
  const { handle } = useParams()

  useEffect(() => {
    console.log("HANDLEEEE",name)
    searchGithubUser(handle);
       // updateGithub();
    },[])
  

  if (isLoading) {
    return (
      <main>
        {/* <Navbar /> */}
        {/* <Search /> */}
        <img src={loadingImage} className='loading-img' alt='loding' />
      </main>
    );
    
  }
  
//   const updateGithub = async () =>{
//     searchGithubUser(handle);
//     const response = await axios(`${rootUrl}/users/${handle}`).catch((err) =>
//       console.log(err)
//     );
//     if(response){
//       console.log("ITS DONE HERE!",error);
//       //firebase.firestore().collection('users').doc(user.email).set({name:user.name, github_ID:github_User,email:user.email,gpa:5});
//     }
//     else{
//       console.log("no response");
//     }
//   }
//   useEffect(() => {
//     updateGithub();
//   },[])
  // get things from global context
//   const handleSubmit = () => {
//     //e.preventDefault();
//     if (handle) {
//       // more logic coming up soon
//       searchGithubUser(handle)
//       // console.log("lol",searchGithubUser(github_User));
//       updateGithub()
//       //optional
//       // setUser('');
//     }
//   };
//   handleSubmit()
  
  
  
  
  //console.log(handle,"HANDLE")
  
  return (
    <main>
      {/* <Navbar></Navbar> */}
      <br/>
      <center><h1>Name of candidate</h1></center>
      {/* <Webscraper/> */}
      {/* <Search /> */}
      {/* <Info /> */}
      {/* <User /> */}
      <Dec_repos/>
    </main>
  );
  
};

export default Recruiter_Dashboard;
