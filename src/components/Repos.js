import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import firebase from 'firebase';

const Repos = (props) => {
  const {repos} = React.useContext(GithubContext);

  if(repos.length == 0)
  {
    return <div><br/><br/><center><h4>No user selected</h4></center></div>
  }
  
  console.log("REPOS ARE EMPTY",repos);
  let languages = repos.reduce((total,item)=>{
    const {language ,stargazers_count} =item;
    if(!language) return total; // you're about to do sm like dictionary, like count all unique lang in all repo and then do maths

    if(!total[language]){
      total[language]= {label:language,value:1 , stars:stargazers_count}
    }
    else{
    total[language] = {...total[language],
      value:total[language].value+1,
    stars: total[language].stars + stargazers_count};
    }
    return total;
  },{})

  console.log(languages);

  const mostUsed = Object.values(languages).sort((a,b)=>{
return b.value-a.value;
  }).slice(0,6);//youre only bout to display top arrays okay


  //most stars per language
  const mostPopular = Object.values(languages).sort((a,b)=>{
    return b.stars - a.stars;
  }).map((item)=>{
    return {...item,value:item.stars}; //switching the stars to the value property cuz the charts only use value prop
  }).slice(0,6)

//stars,forks

  let {stars,forks}=repos.reduce((total,item)=>{
    const {stargazers_count,name,forks} = item;
    total.stars[stargazers_count] = {label: name, value: stargazers_count};

    total.forks[forks]={label:name,value:forks}
    return total;
  },{
    stars:{},forks:{}
  });

  stars = Object.values(stars).slice(-5).reverse();

  forks = Object.values(stars).slice(-5).reverse();




  const chartData = [
    {
      label: "Venezuela",
      value: "12"
    },
    {
      label: "Saudi",
      value: "23"
    },
    {
      label: "Canada",
      value: "80"
    },
    
  ];
  //firebase.firestore().collection('users').doc(props.user).set({lang: "Pyhotn"},{merge:true});

  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUsed}/>
      <Column3D data={stars}/>
      <Doughnut2D data = {mostPopular}/>
      <Bar3D data = {forks}/>
  </Wrapper></section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
