import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <div className="MainDiv">
        <div class="jumbotron text-center bg-sky">
            <h3>Top Candidates!</h3>
        </div>
      <br/><br/>
        <div className="container">
            <table id="example" class="display table">
              <thead class="thead-dark">
                  <tr>
                      <th>Name</th>
                      <th>Gpa</th>
                      <th>Coding score</th>
                      <th>Languages</th>
                      <th>Email</th>
                  </tr>
              </thead>
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
    );
  
}
export default DispCandidate
