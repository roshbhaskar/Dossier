import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Verify() {
    return (
        <div>
            Verify Page
            <Link to = "/profile" className="btn">Next</Link>
        </div>
    )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;

export default Verify;
