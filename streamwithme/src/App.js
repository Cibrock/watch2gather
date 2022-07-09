import React from 'react';
import './components/styles/App.css';
import Navbar from './components/Navbar';
import Backgroundvideo from './components/Backgroundvideo';
import CreateRoom from './components/CreateRoom';
import { Helmet } from 'react-helmet'

const TITLE = 'StreamWithMe'


function App() {
  return (
    <div className="App">
      <header>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Navbar/>
        </header>
        <body>
        <CreateRoom/>
        <Backgroundvideo/>
        </body>
    </div>
  );
}

export default App;