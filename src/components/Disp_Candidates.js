import React,{useState,useEffect} from 'react';
//import css from 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { Link } from 'react-router-dom';

function DispCandidate() {
  const [blogs,setBlogs]=useState([])
  const [skill,setSkill]=useState('')
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
    {
      var data = item.data();
      setBlogs(arr => [...arr , data]);
        
    })
    
  }
  
  


  function compare_gpa( a, b ) {
    if ( a.gpa < b.gpa ){
      return 1; // for increasing order make this -1
    }
    if ( a.gpa > b.gpa ){
      return -1;
    }
    return 0;
  }
  function compare_score( a, b ) {
    if ( a.score < b.score ){
      return 1; // for increasing order make this -1
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
   

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blogs are gonna be changed!")
    Object.keys(blogs).map(function(keyName, keyIndex) {
     
      //RECOMMENDER LOGIC!
      blogs[keyName].score = blogs[keyName].score*blogs[keyName].gpa
      console.log("Keyname",blogs[keyName].score);
    })
    blogs.sort(compare_score)
    setBlogs(blogs)
  };

  // if(skill=='')
  // {
    //blogs.sort(compare_gpa)
    //setBlogs(blogs)
  //}
  //else
  //{
   
  //}
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

import React,{useState,useEffect} from 'react';
//import css from 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { Link } from 'react-router-dom';

// function DispCandidate() {
//   const [blogs,setBlogs]=useState([])
//   const [skill,setSkill]=useState('')
//   const { requests, error, searchGithubUser, isLoading } = React.useContext(
//     GithubContext
//   );

//   useEffect(() => {
//     fetchBlogs();
//   },[])

//   const fetchBlogs=async()=>{
//     const response=firebase.firestore().collection('users');
//     const data=await response.get();
//     data.docs.forEach(item=>
//     {
//       var data = item.data();
//       setBlogs(arr => [...arr , data]);
        
//     })
    
//   }
  
  


//   function compare_gpa( a, b ) {
//     if ( a.gpa < b.gpa ){
//       return 1; // for increasing order make this -1
//     }
//     if ( a.gpa > b.gpa ){
//       return -1;
//     }
//     return 0;
//   }
//   function compare_score( a, b ) {
//     if ( a.score < b.score ){
//       return 1; // for increasing order make this -1
//     }
//     if ( a.score > b.score ){
//       return -1;
//     }
//     return 0;
//   }
   
// blogs.sort(compare_gpa)
// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Blogs are gonna be changed!")
//     Object.keys(blogs).map(function(keyName, keyIndex) {
     
//       //RECOMMENDER LOGIC!
//       blogs[keyName].score = blogs[keyName].score*blogs[keyName].gpa
//       console.log("Keyname",blogs[keyName].score);
//     })
//     blogs.sort(compare_score)
//     setBlogs(blogs)
//   };

//   // if(skill=='')
//   // {
//     //blogs.sort(compare_gpa)
//     //setBlogs(blogs)
//   //}
//   //else
//   //{
   
//   //}
//   return (
//       <Wrapper>
//         <center> <WrappeR>
                
//                 <form onSubmit={handleSubmit}>
            
//                 <div className='form-control'>
//                     {/* <MdSearch /> */}
            
//                     <input
//                     type='text'
//                     placeholder='Language'
//                     value={skill}
//                     onChange={(e) => setSkill(e.target.value)}
//                     />
//                     {/* {!isLoading && ( */}
//                     <button className="btn" type="submit" >Search</button>
//                     {/* )} */}
//                 </div>
//                 </form>
//             </WrappeR>
//           </center>
//       <div className="MainDiv">
//         <div class="jumbotron text-center bg-sky">
//             {/* <center><h3>Top Candidates!</h3></center> */}
//         </div>
//       <br/><br/>
//         <div className="container">
//             <table>
//               <thead class="thead-dark">
//                   <tr>
//                       <th>Name</th>
//                       <th>Gpa</th>
//                       <th>Languages</th>
//                       <th>Skills</th>
//                       <th>Email</th>
//                       <th>Profile</th>
//                   </tr>
//               </thead>
//               <tbody>
              
//               {blogs.map(data => {
                 
//                   return (
//                       <tr  key={data.github_ID}>     
//                       <td >{data.name}</td>
//                       <td>{data.gpa}</td>
//                       <td>{data.first_lang},{data.second_lang}</td>
//                       <td>none</td>
//                       <td>{data.email}</td>
//                       <td><Link to={`${data.github_ID}`} className="btn" target="_blank" >View</Link></td>
//                       </tr>
                      
//                   );
                  
                 
//                   })}
          
                
//               </tbody>
              
//            </table>
            
//        </div>
//       </div>
//       </Wrapper>
//     );
  
// }

// const Wrapper = styled.section`
//   .container{
//     padding-left:5rem;
//     padding-right:5rem;
//   }
//   table{
//     width:100%;
//   }
//   // table, th, td {
//   //  border: 1px solid black;
//   // }  
//   table {
//     border-collapse: collapse;
//   }
//   th, td {
//     padding: 15px;
//     text-align: left;
//     border-bottom: 1px solid black;
//   }
//   // .btn{
//   //   top:2rem;
//   // }
// `;

// const WrappeR = styled.div`
// //   position: relative;
// //   display: grid;
// //   gap: 1rem 1.75rem;
// //   @media (min-width: 768px) {
// //     grid-template-columns: 1fr max-content;
// //     align-items: center;
// //     h3 {
// //       padding: 0 0.5rem;
// //     }
// //   }
//   .form-control {
   
//     display: absolute ;
//     // position: fixed;
//     align-items: center;
//     grid-template-columns: auto 1fr auto;
//     column-gap: 0.5rem;
//     border-radius: 5px;
//     padding: 0.5rem;
//     margin-bottom:2rem;
//     input {
//       border-color: transparent;
//       outline-color: var(--clr-grey-10);
//       letter-spacing: var(--spacing);
//       color: var(--clr-grey-3);
//       padding: 0.5rem 2rem;
//       border-radius:5px;
//       margin-right:1rem;
//       // position: fixed;
//       // right:50%;
//     }
//     input::placeholder {
//       color: var(--clr-grey-3);
//       text-transform: capitalize;
//       letter-spacing: var(--spacing);
//     }
//     button {
//       font-size:1rem;
//     //   border-radius: 5px;
//     //   border-color: transparent;
//     //   padding: 0.38rem 0.5rem;
//     //   text-transform: capitalize;
//     //   letter-spacing: var(--spacing);
//     //   background: var(--clr-primary-5);
//     //   color: var(--clr-white);
//     //   transition: var(--transition);
//     //   cursor: pointer;
//     //   &:hover {
//     //     background: var(--clr-primary-8);
//     //     color: var(--clr-primary-1);
//       }
//     }

//     svg {
//       color: var(--clr-grey-5);
//     }
//     input,
//     button,
//     svg {
//       font-size: 1.3rem;
//     }
//     @media (max-width: 800px) {
//       button,
//       input,
//       svg {
//         font-size: 1remrem;
//       }
//     }
//   }
//   h3 {
//     margin-bottom: 0;
//     color: var(--clr-grey-5);
//     font-weight: 400;
//   }
// `;
// export default DispCandidate


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/users'

const DispCandidate = () => {
    const [employees, setEmployees] = useState([])
    const [arr, setArr] = useState([])
    useEffect(() => {
        getData()
    }, [])

    function compare_gpa( a, b ) {
          if ( a.gpa < b.gpa ){
            return 1; // for increasing order make this -1
          }
          if ( a.gpa > b.gpa ){
            return -1;
          }
          return 0;
        }
        function compare_score( a, b ) {
          if ( a.score < b.score ){
            return 1; // for increasing order make this -1
          }
          if ( a.score > b.score ){
            return -1;
          }
          return 0;
        }

    const getData = async () => {

        //const response = await axios.get(URL)
        var x =[]
        const response=firebase.firestore().collection('users');
        const data=await response.get();
        //console.log("data",data);
        data.docs.forEach(item=>
               {
                 var d = item.data();
                 //console.log("data",d);
                 setEmployees(x=>[...x,d]);
                 //x.push(d)
                 arr.push(d)

                  
               })
        //employees.sort(compare_gpa)
        //setEmployees(x)
        //setArr(x)
        console.log("data",employees);
    }

    const removeData = (id) => {

        //axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            console.log(del)
            setEmployees(del)
        //})
    }

    const renderHeader = () => {
        let headerElement = ['github_ID', 'name', 'email', 'gpa']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
      console.log("rerender",employees)

        return employees.map(data => {
          
          //console.log("hmm",data)
            return (
                <tr key={data.github_ID}>
                  
                    <td>{data.github_ID}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gpa}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(data.github_ID)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default DispCandidate