import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css'
import Login from './components/login/login'
import Register from './components/register/register';
import Admin from './components/admin/admin'
import Adduser from './components/admin/adduser'
import Edituser from './components/admin/edituser'
import { PrivateRoute } from './components/PrivateRoute';
function App(){
  return (
    <div>
      <Routes>
      <Route Component={PrivateRoute} path='/' />
        <Route Component={Login} path='/login' />
        <Route Component={Register} path='/register' />
        <Route Component={Admin} path='/admin' />
        <Route Component={Adduser} path='/adduser' />
        <Route Component={Edituser} path='/edituser/:index' />
      </Routes>
    </div>
  );
};


export default App;
