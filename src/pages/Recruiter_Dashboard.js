import React,{useEffect,useState} from 'react';
import loginImg from '../images/Dossier.png';
import Dec_repos from '../components/Dec_repos.js';
import loadingImage from '../images/150x150.gif';
import { GithubContext } from '../context/context';
import Webscraper from '../components/Webscraper';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { useParams } from 'react-router';
import styled from 'styled-components';

const Recruiter_Dashboard = () => {
  const { isLoading, searchGithubUser } = React.useContext(GithubContext);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [gpa,setGpa]=useState(0);
  const { handle } = useParams();

  useEffect(() => {
    console.log("HANDLEEEE",name)
    searchGithubUser(handle);
       // updateGithub();
       fetchBlogs();
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
  const fetchBlogs=async()=>{
    var arr = []
    const response=firebase.firestore().collection('users');
    const data=await response.get();
    data.docs.forEach(item=>
    //   {
    //  setBlogs([...blogs,item.data()])
    // //  console.log(item);
    // setList([...blogs,item]);
    // }
    {
      var data = item.data();
      if(data.github_ID == handle)
      {  console.log("data",data.name) 
        setName(data.name);
        setGpa(data.gpa);
        setEmail(data.email.toLowerCase())
      }
        //setBlogs(arr => [...arr , data]);
     // arr.push(data)
     //blogs.push(data)
        
  }
    )
    //console.log("INside:",blogs)
    //console.log("data",data,"response",response);
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
    <Wrapper>
      {/* <Navbar></Navbar> */}
      <img src={loginImg} className='dossier' />
      <br/>
      <br/>
      {/* <center><h1>Name of candidate</h1></center> */}
      <center><h2>{name}</h2><br/><center><div className="headings" style={{display:"flex"}}><h3 className="gpa">GPA : {gpa}</h3><br/><h3>Email : {email}</h3></div></center></center>
      {/* <Webscraper/> */}
      {/* <Search /> */}
      {/* <Info /> */}
      {/* <User /> */}
      <Dec_repos/>
    </Wrapper>
  );
  
};
const Wrapper = styled.section`
text-align: center;
place-items: center;
.gpa {
  margin-right:6rem;
}
  h3 {
    margin-top:1rem;
    color: var(--clr-grey-3);
    margin-bottom: 2rem;
  }
  .headings{
    // place-items: center;
    // justify-items: center;
    margin-left:30%;
    display: flex
  }
  .dossier{
   display:revert;
    width: 15%;
    height: 15%;
    //width:20px;
  }
`;
export default Recruiter_Dashboard;
