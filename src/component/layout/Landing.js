import React from 'react'
import { NavLink } from 'react-router-dom'


const Landing=(props)=>{


    return(
        <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Personal Project Management Tool
                </h1>
                <p className="lead">
                  Create your account to join active projects or start your own
                </p>
                <hr />
                <NavLink className="btn btn-lg btn-primary mr-2" to="/register">
                  Sign Up
                </NavLink>
                <NavLink className="btn btn-lg btn-secondary mr-2" to="/login">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Landing