import React, { Component } from "react";
import styled from 'styled-components';
import rp from "request-promise";
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Webscraper =()=> {
  const [hacker_User, setUser] = React.useState('');
  const { user  } = useAuth0();
  const [error,setError] = React.useState(false)
  const fetchDetails=async()=> {
    // use the request-promise library to fetch the HTML from pokemon.org
    // rp(`https://cors-anywhere.herokuapp.com/https://www.hackerrank.com/rest/contests/master/hackers/${hacker_User}/profile`)
    //   .then(html => 
    //     {//const nameValue = document.getElementsByClassName("ui-badge-wrap");
    //     console.log(html)
        
    //   })
   // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.hackerrank.com/raniyerhh`);
    // // const json = await response.json();
    // console.log(response);
    const response = await axios(`https://cors-anywhere.herokuapp.com/https://www.hackerrank.com/rest/contests/master/hackers/${hacker_User}/profile`).catch((err) =>
      //console.log(err);
      setError(true)
    );
    if(response){
      console.log("HackerRank API has responded!",response.data.model);
      //firebase.firestore().collection('users').doc(user.email).set({});
      console.log('User info',user)
      
      if(user.given_name!=response.data.model.personal_first_name)
      {
        setError(true)
        console.log('Unauthorized HackerRank username!')
      }
      else
      {
        setError(false)
      if(response.data.model.country!='')
      {
        firebase.firestore().collection('users').doc(user.email).set({country:response.data.model.country},{merge:true});
      }
      if(response.data.model.school!='')
      {
        firebase.firestore().collection('users').doc(user.email).set({school:response.data.model.school},{merge:true});
      }
      }
    }
    else{
      console.log("no response");
      setError(true)
    }
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hacker_User) {
     
      fetchDetails()
      
    }
  };

    return (
      <Wrapper>
        {error && (
          <ErrorWrapper>
            <p>Invalid HackerRank Username!</p>
          </ErrorWrapper>
        )}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            {/* <MdSearch /> */}
     
            <input
              type='text'
              placeholder='HackerRank'
              value={hacker_User}
              onChange={(e) => setUser(e.target.value)}
            />
            {/* {!isLoading && ( */}
              <button className="btn" type='submit'>Verify</button>
            {/* )} */}
          </div>
        </form>
        {/* <br/> */}
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
    //right:10px;
  }
`;

export default Webscraper;