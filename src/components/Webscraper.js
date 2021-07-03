import React, { Component } from "react";
import styled from 'styled-components';
import rp from "request-promise";
/*
export default function Webscraper() {
    return (
        <Wrapper>
            Hacker Earth and Hacker Rank content
        </Wrapper>
    )
}
*/


class Webscraper extends Component {
  state = {};

  componentDidMount() {
    // use the request-promise library to fetch the HTML from pokemon.org
    rp("https://cors-anywhere.herokuapp.com/https://leetcode.com/raniyer/")
      .then(html => console.log(html))
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin: 5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
//   gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;
export default Webscraper;