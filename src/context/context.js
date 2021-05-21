import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// you have access to the provider and the consumer
// GithubContext.Provider can be used to access it 
const error_function=()=>{
    return(
        <div>
            <h3>User DOesnt esist!</h3>
        </div>
    )
}
const GithubProvider = ({children}) => {
    const [githubUser,setGithubUser] = useState([]);
    const [repos,setRepos] = useState([]);
    const [followers,setFollowers] = useState([]);

    //request loading
    const [requests,setRequests] = useState(0);
    const [loading,setIsLoading] = useState(false);

    //error
    useEffect(()=>{
        console.log('hello');

    },[]);

    const searchGithubUser = async(user)=>{
        console.log(user);
        const response = await axios(`${rootUrl}/users/${user}`).catch(err=> console.log(err))
        
        console.log(response);

        if(response){
            setGithubUser(response.data);
            const {login ,followers_url} = response.data;
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).
            then(response=>
                setRepos(response.data)
                )
            
            //https://api.github.com/users/john-smilga/repos?per_page=100
                return(true);



        }
        else{
            console.log('errrrrooRR');
           alert("Github username doesnt exist");
           return(false);
        }
    
    
    
    }

    return (<GithubContext.Provider 
    value={{githubUser,repos,followers,searchGithubUser}}>{children}
    </GithubContext.Provider>);
};


export {GithubProvider, GithubContext};