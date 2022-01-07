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
  const [school,setSchool]=useState('');
  const [loc,setLoc]=useState('');
  const [easy,setEasy]=useState(0);
  const [med,setMed]=useState(0);
  const [hard,setHard]=useState(0);
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
   
    {
      var data = item.data();
      if(data.github_ID == handle)
      {  console.log("data",data.name) 
        setName(data.name);
        setGpa(data.gpa);
        setEmail(data.email.toLowerCase());
        setEasy(data.easy);
        setMed(data.medium);
        setHard(data.hard);
        setLoc(data.country);
        setSchool(data.school);
      }
      
  }
    )
   
  }
  
  
  return (
    <Wrapper>
      {/* <Navbar></Navbar> */}
      <img src={loginImg} className='dossier' />
      <br/>
      <br/>
      {/* <center><h1>Name of candidate</h1></center> */}
      <center><h2>{name}</h2><br/></center>
      <div className="headings" ><h3 className="gpa">GPA : {gpa}</h3><h3 className="email">Email : {email}</h3>
      {/* <User /> */}
      <h3 className="school">School : {school}</h3><h3 className="loc">  Location : {loc}</h3></div>
      <br/>
      <div className="bground">
      <text className="leet">Leetcode problems</text>
      <div className="badges" style={{display:"flex"}}>
      <div className="easy">Easy : {easy}</div>
      <div className="med">Med : {med}</div>
      <div className="hard">Hard : {hard}</div>
      </div>
      <br/>
      </div>
      <br/>
      <Dec_repos/>
    </Wrapper>
  );
  
};
const Wrapper = styled.section`
text-align: center;
place-items: center;
// .gpa {
//   margin-right:3rem;
// }
// .email,.loc {
//   margin-left:10rem;
// }
.leet{
  text-anchor: middle;
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
}
}
.badges{
  gap : 10rem;
  margin-left:27%;
  margin-top:1rem;
}
.bground {
    margin-left: 8rem;
    margin-right:8rem;
    background: rgb(255, 255, 255);
  }
.easy {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: rgb(44, 174, 186);
}
.med {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: rgb(255, 197, 51);
}
.hard {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: rgb(242, 114, 111);
}
// .school {
//   margin-right:3rem;
// }
  h3 {
    //margin-top:1rem;
    color: var(--clr-grey-3);
    //margin-bottom: 2rem;
    font-size:1.2rem;
  }
  h4{
    margin-top:1rem;
  }
  
  // .headings{
  //   // place-items: center;
  //   // justify-items: center;
  //    margin-left:10%;
  //   // display: flex
  // }
  // .headingss{
  //   // place-items: center;
  //   // justify-items: center;
  //   margin-left:10%;
  //   // display: flex
  //   // gap:4rem;
  // }
  .dossier{
   display:revert;
    width: 15%;
    height: 15%;
    //width:20px;
  }
`;
export default Recruiter_Dashboard;
