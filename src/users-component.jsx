import React, {useState} from 'react'
import {useEffect} from 'react';
import {useDispatch, connect} from 'react-redux';
import { getApi } from './actions';
import Project from './project-component';

const Users = ({apiObj}) => {
  const dispatch = useDispatch();
  const id = ['registeredusers','unregisteredusers','projectmemberships'];
  const [users,setUsers] = useState([]);
  

  const handleUser = () =>{
  
    setUsers( users => [
                        ...apiObj[id[0]].map(user => ({...user, 
                                         projectArray: apiObj[id[2]].filter( project => user.id === project.userId ),
                                        registered: true})),
                        ...apiObj[id[1]].map(user => ({...user, 
                                         projectArray: apiObj[id[2]].filter( project => user.id === project.userId ),
                                        registered: false}))
                                        
                       ]
            );

  }

  useEffect(() =>{
     id.map( item => dispatch(getApi(item)));
  },[])
  return (
    <>
      <button onClick={handleUser}>
        Get users and associated projects
      </button>
      <div className='users'>
        { users.map( user => 
        <div key={user.id} className='user'>
        <p>Email: {user.emailAddress}</p> 
        <p>Registered User? <> {user.registered ?  <span className='yes'> Yes </span> : <span className='no'> No </span>}</></p>
        <div className='userProjects'>
          <p>User Projects:</p>
         {
         user.projectArray.length === 0 
           ? <>None</>
           :user.projectArray.map( project => <Project key={project.id} project={project}/>)
         }
         </div>
        </div> ) }
      </div>
    </>
  )
}

const mapStateToProps = (state) =>{
   return { apiObj: state.apiObj}
}

export default connect(mapStateToProps)(Users);