import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '../components';
import Webscraper from '../components/Webscraper';
import loginImg from '../images/Dossier.png';

function Verify() {
    return (
        <Wrapper>

        <img src={loginImg} className='dossier' />
            <h3 className="verifyHeading">Enter usernames </h3>
            <Search/>
            <br/>
            <br/>
            <Webscraper/>
            <br/>
            <br/>
            <Link to = "/profile" className="btn">Continue</Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
text-align: center;
place-items: center;
  h3 {
    margin-top:1rem;
    color: var(--clr-grey-4);
    margin-bottom: 2rem;
  }
  .dossier{
   display:revert;
    width: 15%;
    height: 15%;
    //width:20px;
  }
`;

export default Verify;
