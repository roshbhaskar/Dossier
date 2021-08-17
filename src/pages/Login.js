import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/Dossier.png';


//Login Button
const Login = () => {
  const { loginWithRedirect } = useAuth0(); //using react hooks
  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='github user' />
        {/* <p className="dossier">Dossier.</p> */}
        <button className='btn' onClick={()=>loginWithRedirect({ redirectUri: 'http://localhost:3000/' })}>
          Candidate
        </button>
        <button className='btn' onClick={()=>loginWithRedirect({ redirectUri: 'http://localhost:3000/recruiter' })}>
          Recruiter
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .dossier{
    font-family: 'Brush Script MT', cursive;
    font-size:6rem;
  background: -webkit-linear-gradient(#52d1da,#31103b);
  // background: -webkit-linear-gradient(#52d1da,#080808);
  // background: -webkit-linear-gradient(#ffc8ed,#6f1351);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  .btn{
    margin: 1rem;
  }
`;
export default Login;
