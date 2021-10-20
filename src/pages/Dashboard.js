import React,{useEffect,useState} from 'react';
import { Repos, Navbar } from '../components';
import loadingImage from '../images/150x150.gif';
import { GithubContext } from '../context/context';
import Webscraper from '../components/Webscraper';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import styled from 'styled-components';


const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [school,setSchool]=useState('');
  const [loc,setLoc]=useState('');
  const [gpa,setGpa]=useState(0);
  const [easy,setEasy]=useState(0);
  const [med,setMed]=useState(0);
  const [hard,setHard]=useState(0);
  const { user  } = useAuth0();

  useEffect(() => {
       fetchBlogs();
    },[])

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
      if(data.email == user.email)
      {  console.log("data",data) 
        setName(data.name);
        setGpa(data.gpa);
        setEmail(data.email.toLowerCase());
        setEasy(data.easy);
        setMed(data.medium);
        setHard(data.hard);
        setLoc(data.country);
        setSchool(data.school);
      }
        //setBlogs(arr => [...arr , data]);
     // arr.push(data)
     //blogs.push(data)
        
  }
    )
    //console.log("INside:",blogs)
    //console.log("data",data,"response",response);
  }
  

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
    <Wrapper>
    <main>
      <Navbar></Navbar>
      {/* <Webscraper/> */}
      {/* <Search />
      <Info /> */}
      <center><center><div className="headings" style={{display:"flex"}}><h3 className="gpa">GPA : {gpa}</h3><br/><h3>Email : {email}</h3></div></center></center>
      {/* <User /> */}
      <center><center><div className="headingss" style={{display:"flex"}}><h3 className="school">School : {school}</h3><br/><br/><h3>  Location : {loc}</h3></div></center></center>
      <div className="badges" style={{display:"flex"}}>
      <div className="easy">Easy : {easy}</div>
      <div className="med">Med : {med}</div>
      <div className="hard">Hard : {hard}</div>
      </div>
      <Repos />
    </main>
    </Wrapper>
  );
  
};
const Wrapper = styled.section`
text-align: center;
place-items: center;
.gpa {
  margin-right:6rem;
}
.badges{
  gap : 10rem;
  margin-left:30%;
}
.easy {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: green;
}
.med {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: orange;
}
.hard {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: red;
}
.school {
  margin-right:3rem;
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
  .headingss{
    // place-items: center;
    // justify-items: center;
    margin-left:10%;
    display: flex
    gap:4rem;
  }
  .dossier{
   display:revert;
    width: 15%;
    height: 15%;
    //width:20px;
  }
`;
export default Dashboard;
