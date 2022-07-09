import React from 'react';
import {useEffect} from 'react';
import './components/styles/App.css';
import Navbar from './components/Navbar';
import CreateRoom from './components/CreateRoom';
import Backgroundvideo from './components/Backgroundvideo';
import PostUser from './components/PostUser';
import { Helmet } from 'react-helmet';
import { deleteUser, getUser } from './components/UserController';

const TITLE = 'StreamWithMe'
let user
export async function SetUser(id){
  getUser()
  console.log(user)
  if(user != null){
    deleteUser(user)
  }
  user = id

console.log(user)
}


const App = () => { 
  useEffect(() => {
    const handleTabClose = event => {
       event.preventDefault();

      console.log('beforeunload event triggered');
      deleteUser(user)
      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);
  return (
    <div className="App">
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Navbar/>
        <CreateRoom/>
        <Backgroundvideo/>
        <PostUser />
    </div>

  );
}

export default App;