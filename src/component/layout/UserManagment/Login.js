import React, { useState, useEffect, useRef } from 'react'
import classes from 'classnames'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Loging } from '../../../action'


const Login=(props)=>{
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [pressed,setPressed]=useState(false)

    let run=useRef(true)
    useEffect(()=>{
      if(run.current){
        run.current=false
        return
      }
      if(props.token){
        props.history.push('/dashboard')
      }

      // eslint-disable-next-line
    },[props.token])

  var changingState=(e,settype)=>{
    let content=e.target.value
    settype(content)
  }

  var submiting=()=>{
    setPressed(true)
    if(username===""||password==="") return;
    let obj={username,password}
    props.logingIn(obj)
  }
  return(
        <div style={{position:'relative', top:'200px'}} className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form action="dashboard.html">
                <div className="form-group">
                  <input
                    type="email"
                    className={classes("form-control form-control-lg",{
                    "is-invalid":username===""&&pressed
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={(e)=>changingState(e,setUsername)}


                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classes("form-control form-control-lg",{
                      "is-invalid":password===""&&pressed
                      })}              
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>changingState(e,setPassword)}
                  />
                </div>
                <input type="button" onClick={submiting} className="btn btn-info btn-block mt-4" defaultValue="Submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}


const maptostate=state=>{
  return{
    token:state.auth.token
  }
}

const maptoprops=dispatch=>{
  return{
    logingIn:(obj)=>dispatch(Loging(obj))
  }
}

export default connect(maptostate,maptoprops)(withRouter(Login));