import React, {useState, useEffect, useRef, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authneticate } from '../../../action'
import classes from 'classnames'


const Register=(props)=>{
    const [username,setUsername]=useState("")
    const [fullName,setFullname]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [pressed,setpressed]=useState(false)

    let run=useRef(true)
    useEffect(()=>{
        if(run.current){
            run.current=false
            return
        }
    if(props.error===false){
        props.history.push('/login')
    }

    // eslint-disable-next-line
    },[props.error])

    var changingState=(e,settype)=>{
        let content=e.target.value
        settype(content)
      }

    var Submiting=()=>{
            setpressed(true)
            if(username===""||fullName===""||password===""||confirmPassword===""){
                return
            }
            if(password!==confirmPassword) return;
            let obj={username,fullName,password,confirmPassword}
            props.sendingAuthToBack(obj)
        }

    let allRequired
    if(props.error){
       let errors=Object.values(props.error)
        allRequired=errors.map(i=>(
        <p key={i} style={{position:'relative',left:'254px',color:'red'}}>{i}</p>
        ))
    }
  
    return(
        <Fragment>
        <div  style={{position:'relative', top:'100px'}} className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              {pressed &&password!==confirmPassword?<p style={{position:"relative", color:'red',left:'216px'}}>Please make sure that passwords match</p>:null}
              {allRequired}
              <form action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className={classes("form-control form-control-lg",{'is-invalid':pressed&&fullName===""})}
                    placeholder="Full Name"
                    name="fullname"
                    required
                    onChange={(e)=>changingState(e,setFullname)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classes("form-control form-control-lg",{'is-invalid':pressed&&username===""})}
                    placeholder="Email Address"
                    name="username"
                    onChange={(e)=>changingState(e,setUsername)}

                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classes("form-control form-control-lg",{'is-invalid':pressed&&password===""})}
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>changingState(e,setPassword)}

                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classes("form-control form-control-lg",{'is-invalid':pressed&&confirmPassword===""})}
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={(e)=>changingState(e,setConfirmPassword)}

                  />
                </div>
                <input onClick={Submiting} type="button" className="btn btn-info btn-block mt-4" defaultValue="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    )
}

const maptostate=state=>{
    return{
        error:state.auth.error
    }
}


const maptoprops=dispatch=>{
    return{
        sendingAuthToBack:(obj)=>dispatch(authneticate(obj))
    }
}

export default connect(maptostate,maptoprops)(withRouter(Register));