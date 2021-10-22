import React from 'react';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import { useAuth0 } from '@auth0/auth0-react';
import { Timestamp } from '@firebase/firestore-types';

export default function Resume_parse() {

    const { user  } = useAuth0();

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().collection('resume').doc(user.email).set({upload:true,file_name:"",skills:"",gpa:0,email:""});
        const a = firebase.firestore
          .Timestamp.now().toDate().toString();
        console.log(a)
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
          <div className='form-control'>
            {/* <MdSearch /> */}

            <button
             className="btn" 
              type="submit"
            >Upload!</button>
            
          </div>
        </form>
        </div>
    )
}
