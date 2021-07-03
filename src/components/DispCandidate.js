import React,{useState,useEffect} from 'react';
//import css from 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

import { firebase } from '@firebase/app';
import '@firebase/firestore'



function DispCandidate() {
  const [blogs,setBlogs]=useState([])

  const fetchBlogs=async()=>{
    const response=firebase.firestore().collection('users');
    const data=await response.get();
    data.docs.forEach(item=>{
     setBlogs([...blogs,item.data()])
    })
    console.log("data",data,"response",response);
  }
  
  useEffect(() => {
    fetchBlogs();
  }, [])

  console.log("blogs?",blogs);

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

    return (
      <Wrapper>
      <div className="MainDiv">
        <div class="jumbotron text-center bg-sky">
            <center><h3>Top Candidates!</h3></center>
        </div>
      <br/><br/>
        <div className="container">
            <table>
              {/* <thead class="thead-dark"> */}
                  <tr>
                      <th>Name</th>
                      <th>Gpa</th>
                      <th>Coding score</th>
                      <th>Languages</th>
                      <th>Email</th>
                  </tr>
              {/* </thead> */}
              <tbody>
              {blogs.map(data => {
                  
                  return (
                      <tr>     
                      <td>{data.name}</td>
                      <td>{data.gpa}</td>
                      <td>50%</td>
                      <td>{data.first_lang},{data.second_lang}</td>
                      <td>{data.email}</td>
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
`;

export default DispCandidate