import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '../components';
import Webscraper from '../components/Webscraper';

function Verify() {
    return (
        <Wrapper>
       
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
    margin-top:3rem;
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;

export default Verify;
