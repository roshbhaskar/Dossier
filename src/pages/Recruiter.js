import React,{useState,useEffect} from 'react';
import { Navbar } from '../components';
import DispCandidate from '../components/DispCandidate';
import styled from 'styled-components';

function Recruiter() {

  const [skill,setSkill]=useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
      };
    //console.log("This is skill",skill);
    return (
        <div>
            <Navbar/>
       {/* <center> <Wrapper>
                
            <form onSubmit={handleSubmit}>
        
            <div className='form-control'>
                <input
                type='text'
                placeholder='Language/Skill'
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                />
              
                <button className="btn" type="submit" >Search</button>
               
            </div>
            </form>
        </Wrapper>
        
        </center> */}
            {/* <h2>HI</h2> */}
            <DispCandidate />
        </div>
    )
}

const Wrapper = styled.div`
//   position: relative;
//   display: grid;
//   gap: 1rem 1.75rem;
//   @media (min-width: 768px) {
//     grid-template-columns: 1fr max-content;
//     align-items: center;
//     h3 {
//       padding: 0 0.5rem;
//     }
//   }
  .form-control {
   
    display: absolute ;
    // position: fixed;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom:2rem;
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

export default Recruiter;
