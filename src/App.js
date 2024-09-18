import React  from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Switch, Route }  from 'react-router-dom'
import Landing from './component/layout/Landing';
import Register from './component/layout/UserManagment/Register';
import Login from './component/layout/UserManagment/Login';
import All from './AllExceptMain'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux';
import { sendTokenToReducer, logOut } from './action';
import setJwtToken from './SetJwtToken';
import Header from "./component/layout/header"


let token=localStorage.getItem('jwt')
if(token){
  let decoded=jwt_decode(token)
  let current= Date.now()/1000
  if(decoded.exp<current){
    logOut()
    window.location.href='/'
  }else{
    sendTokenToReducer(decoded)
    setJwtToken(token)
  }
}

function App(props) {
  return (
    <BrowserRouter>
    <div className="App">
    <Header />
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
      <All/>
    </div>
  </BrowserRouter>


  );
}

const maptoprops=dispatch=>{
  return{
    logingIn:(token)=>dispatch(sendTokenToReducer(token)),
    logout:()=>dispatch(logOut)
  }
}

export default connect(null,maptoprops)(App);
