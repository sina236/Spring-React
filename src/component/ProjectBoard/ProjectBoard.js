import React, { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import Backlog from './Backlog'
import {connect} from 'react-redux'
import {gettingTasks} from '../../action'

const ProjectBoard=(props)=>{
    const [id]=useState(props.match.params.id)
    
    

  useEffect(()=>{
    props.requestingTasks(id)
  // eslint-disable-next-line  
    },[])


    let content;

    if(props.error){
    content=<div className="alert alert-danger text-center" role="alert" >We can't find any project with this id {props.match.params.id}</div>
      setTimeout(() => {
        props.history.push('/dashboard')
      }, 3000);
    }else{
      content=(  
         <div className="container">
      <NavLink to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </NavLink>
      <br />
      <hr />
      <Backlog/>
    </div>
    )
    }

    return(
      <Fragment>
         {content}
      </Fragment>
    );
}
const maptostate=state=>{
  return{
    error:state.backlog.error,
  }

}
var maptoprops=dispatch=>{
  return{
      requestingTasks:(id)=>dispatch(gettingTasks(id))
  }
}



export default connect(maptostate,maptoprops)(withRouter(ProjectBoard));