import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GithubContext } from '../context/context';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const Search = () => {
  const [github_User, setUser] = React.useState('');

  const { user  } = useAuth0();
  
  const { requests, error, searchGithubUser, isLoading, setError } = React.useContext(
    GithubContext
  );

  const updateGithub = async () =>{
    const response = await axios(`${rootUrl}/users/${github_User}`).catch((err) =>
      console.log(err)
    );
    if(response){
      console.log("Github API Responded!",response,user);
      if(response.data.name==user.given_name || response.data.name==user.family_name)
      {
      firebase.firestore().collection('users').doc(user.email).set({name:user.name, github_ID:github_User,email:user.email},{merge:true});
      setError({show:false,msg:''})  
    }
      else
      {
        setError({show:true,msg:'Invalid Github username!'})
      }

    }
    else{
      console.log("no response");
    }
  }
  // get things from global context
  const handleSubmit = (e) => {
    e.preventDefault();
    if (github_User) {
      // more logic coming up soon
      searchGithubUser(github_User)
      // console.log("lol",searchGithubUser(github_User));
      updateGithub()
      //optional
      // setUser('');
    }
  };
  
  return (
    <section className='section'>
     
      <Wrapper className='section-center'>
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
     
     
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            {/* <MdSearch /> */}
     
            <input
              type='text'
              placeholder='Github'
              value={github_User}
              onChange={(e) => setUser(e.target.value)}
            />
            {requests > 0 && !isLoading && (
              <button className="btn" type='submit'>Verify</button>
            )}
          </div>
        </form>
        {/* <h3>requests : {requests} / 60</h3> */}
      </Wrapper>
    </section>
  );
};

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
    right:80px;
  }
`;
export default Search;
