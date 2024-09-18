import React from 'react'
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom'


const Item =(props)=>{

  var goingToUpdate=async()=>{
    props.history.push({
      pathname:`/project/${props.id}`,
      state:props.id
    })

  }



    return(
        <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{props.name}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>Project id:{props.id}</h3>
              <p>{props.desc}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <NavLink to={`/projectboard/${props.id}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                  </li>
                </NavLink>
                  <li className="list-group-item update">
                    <i onClick={goingToUpdate} className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                {/* <NavLink to="#"> */}
                  <li className="list-group-item delete">
                    <i onClick={()=>props.Deleting(props.id)} className="fa fa-minus-circle pr-1"> Delete Project</i>
                  </li>
                {/* </NavLink> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}


export default withRouter(Item);