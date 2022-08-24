import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Room from './Room';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router base="/">
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/Room" element={<Room/>}/>
    </Routes>
</Router>
);