import React, { useState, useEffect } from "react"
import { NavLink, withRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { logOut } from "../../action";
import {connect} from 'react-redux'



const Header=(props)=>{
  const [name,setName]=useState("")

 
  useEffect(()=>{
   
          let token =localStorage.getItem('jwt')
          if(token){
            let decode=jwt_decode(token)
            setName(decode.fullname)
          }
  
  },[props.decodedToken])
    
 
   var pressedForLogOut=()=>{
     try{
      props.logout()
      setName("")
      props.history.push('/')
     }catch(e){
       console.log(e)
     }

   }
   let singButtons;
   if(name===""){
     singButtons=(
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link " to="/register">
          Sign Up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
     )
   }else{
    singButtons=(
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          <i  className="fas fa-user-circle mr-1" />
          {name}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={pressedForLogOut}>
          Logout
        </NavLink>
      </li>
    </ul>
    )
   }
    return(

        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="/Dashboard.html">
            Personal Project Management Tool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
            {singButtons}
          </div>
        </div>
      </nav>
    );
}


const maptostate=state=>{
  return{
    decodedToken:state.auth.token
  }
}

const maptoprops=dispatch=>{
  return{
    logout:()=>dispatch(logOut())
  }
}

export default withRouter(connect(maptostate,maptoprops)(Header));