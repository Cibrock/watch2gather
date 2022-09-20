import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Room from './Room';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import NotFound from './NotFound';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router base="/">
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/Room" element={<Room/>}/>
        <Route path="/NotFound" element={<NotFound/>}/>
        <Route path="*" element={<App/>}/>
    </Routes>
</Router>
);