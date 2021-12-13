import React from "react";
import styled from 'styled-components';
import axios from 'axios';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';

const Leetcode =()=> {
  const [Leet_User, setUser] = React.useState('');
  const GRAPHQL_API = "https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql";
  const [data,setData] = React.useState([])
  const [error,setError] = React.useState(false)
  const { user  } = useAuth0();
  
  const fetchDetails=async()=> {
   
    const QUERY = `
        { matchedUser(username: "${Leet_User}") {
            username
            submitStats: submitStatsGlobal {
            acSubmissionNum {
            difficulty
            count
            submissions
                            }
                }
            }
        }
        `;
        const fetchData = async() =>{
            const queryResult = await axios.post(
              GRAPHQL_API,{
                query : QUERY
              }
            ).catch((err) =>
            console.log(err)
          );
          if(queryResult){
          const result = queryResult.data.data;
          if(result.matchedUser){
            
            setData({data: result.matchedUser.submitStats.acSubmissionNum})
            console.log("Leetcode API Responded",result.matchedUser.submitStats.acSubmissionNum[1].count)
            firebase.firestore().collection('users').doc(user.email).set({
              easy:result.matchedUser.submitStats.acSubmissionNum[1].count,
              medium:result.matchedUser.submitStats.acSubmissionNum[2].count,
              hard:result.matchedUser.submitStats.acSubmissionNum[3].count
            },{merge:true});
            setError(false)
            
          }
          else{
            console.log('Leetcode username is invalid')
            setError(true)
          }
        }
            
        };
        fetchData();
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Leet_User) {
     
      fetchDetails()
      
    }
  };

    return (
      <Wrapper>
        
        {error && (
          <ErrorWrapper>
            <p>Invalid Leetcode Username!</p>
          </ErrorWrapper>
        )}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            {/* <MdSearch /> */}
            
            <input
              type='text'
              placeholder='Leetcode'
              value={Leet_User}
              onChange={(e) => setUser(e.target.value)}
            />
            {/* {!isLoading && ( */}
              <button className="btn" type='submit'>Verify</button>
            {/* )} */}
          </div>
        </form>
      </Wrapper>
    );
  
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
   
    display: absolute ;
    // position: fixed;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
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

const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
    top: 100px;
    position: relative;
    //right:80px;
  }
`;

export default Leetcode;