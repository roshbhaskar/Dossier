import React,{useState,useEffect} from 'react';
//import css from 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { Link } from 'react-router-dom';

function DispCandidate() {
  const [blogs,setBlogs]=useState([])


  const { requests, error, searchGithubUser, isLoading } = React.useContext(
    GithubContext
  );

  
  useEffect(() => {
    fetchBlogs();
  },[])

  const fetchBlogs=async()=>{
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
      setBlogs(arr => [...arr , data]);
        
  }
    )
    
    //console.log("data",data,"response",response);
  }
  
  const handleClick = (github_User) =>{
    //searchGithubUser(github_User);
    console.log("clicked",github_User);
  }
  // useEffect(() => {
  //   fetchBlogs();
  // }, [])

  function compare( a, b ) {
    if ( a.gpa < b.gpa ){
      return 1; // for increasing order make this -1
    }
    if ( a.gpa > b.gpa ){
      return -1;
    }
    return 0;
  }
   
  //const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    // window.addEventListener('load', () => {
    //     Fetchdata();
    //   });
  
    // // Fetch the required data using the get() method
    // const Fetchdata =async()=>{
    //   firebase.firestore().collection('users').get().then((querySnapshot) => {
             
    //         // Loop through the data and store
    //         // it in array to display
    //         querySnapshot.forEach(element => {
    //             var data = element.data();
    //             setBlogs(arr => [...arr , data]);
                  
    //         });
    //     })
    // }

  console.log("blogs?",blogs);//,"lsit",List);

//   return (
//     <div className="App">
//       {
//         blogs && blogs.map(blog=>{
//           return(
//             <div className="blog-container">
//               <h4>{blog.name}</h4>
//               <p>{blog.github_ID}</p>
//             </div>
//           )
//         })
//       }
//     </div>
//   );

const [skill,setSkill]=useState('')
const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blogs are gonna be changed!")
    Object.keys(blogs).map(function(keyName, keyIndex) {
     
      //RECOMMENDER LOGIC!
      blogs[keyName].score = blogs[keyName].score*blogs[keyName].gpa
      console.log("Keyname",blogs[keyName].score);
    })
  };

  // setBlogs(blogs.sort(compare));
  blogs.sort(compare)
  console.log("This is blog",blogs)

  

  //console.log("Bruh",superSecret);




    return (
      <Wrapper>
        <center> <WrappeR>
                
                <form onSubmit={handleSubmit}>
            
                <div className='form-control'>
                    {/* <MdSearch /> */}
            
                    <input
                    type='text'
                    placeholder='Language'
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    />
                    {/* {!isLoading && ( */}
                    <button className="btn" type="submit" >Search</button>
                    {/* )} */}
                </div>
                </form>
            </WrappeR>
          </center>
      <div className="MainDiv">
        <div class="jumbotron text-center bg-sky">
            {/* <center><h3>Top Candidates!</h3></center> */}
        </div>
      <br/><br/>
        <div className="container">
            <table>
              {/* <thead class="thead-dark"> */}
                  <tr>
                      <th>Name</th>
                      <th>Gpa</th>
                      <th>Languages</th>
                      <th>Skills</th>
                      <th>Email</th>
                      <th>Profile</th>
                  </tr>
              {/* </thead> */}
              <tbody>
              {blogs.map(data => {
                  
                  return (
                      <tr>     
                      <td >{data.name}</td>
                      <td>{data.gpa}</td>
                      <td>{data.first_lang},{data.second_lang}</td>
                      <td>none</td>
                      <td>{data.email}</td>
                      <td><Link to={`${data.github_ID}`} className="btn" target="_blank" >View</Link></td>
                      </tr>
                      
                  );
                 
                  })}
          
                 
              </tbody>
              
           </table>
            
       </div>
      </div>
      </Wrapper>
    );
  
}

const Wrapper = styled.section`
  .container{
    padding-left:5rem;
    padding-right:5rem;
  }
  table{
    width:100%;
  }
  // table, th, td {
  //  border: 1px solid black;
  // }  
  table {
    border-collapse: collapse;
  }
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid black;
  }
  // .btn{
  //   top:2rem;
  // }
`;

const WrappeR = styled.div`
//   position: relative;
//   display: grid;
//   gap: 1rem 1.75rem;
//   @media (min-width: 768px) {
//     grid-template-columns: 1fr max-content;
//     align-items: center;
//     h3 {
//       padding: 0 0.5rem;
//     }
//   }
  .form-control {
   
    display: absolute ;
    // position: fixed;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom:2rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.5rem 2rem;
      border-radius:5px;
      margin-right:1rem;
      // position: fixed;
      // right:50%;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      font-size:1rem;
    //   border-radius: 5px;
    //   border-color: transparent;
    //   padding: 0.38rem 0.5rem;
    //   text-transform: capitalize;
    //   letter-spacing: var(--spacing);
    //   background: var(--clr-primary-5);
    //   color: var(--clr-white);
    //   transition: var(--transition);
    //   cursor: pointer;
    //   &:hover {
    //     background: var(--clr-primary-8);
    //     color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 1remrem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
export default DispCandidate
