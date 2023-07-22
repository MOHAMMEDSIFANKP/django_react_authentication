import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css'
import home from './components/home/home'
import Login from './components/login/login'
import Register from './components/register/register';
function App(){
  return (
    <div>
      <Routes>
        <Route Component={home} path='/' />
        <Route Component={Login} path='/login' />
        <Route Component={Register} path='/register' />
      </Routes>
    </div>
  );
};


export default App;
