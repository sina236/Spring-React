import React  from 'react'
import { NavLink , withRouter } from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import { gettingTasks } from '../../../action'


const ProjectTask=(props)=>{

  var deletingTask=async()=>{
    try{
      const resp= await Axios.delete(`/api/backlog/${props.match.params.id}/${props.projectSequence}`)
      const data = await resp.data
      window.location.reload(false)
    }catch(e){
      console.log(e)
      window.alert('there was a problem with your request please try again')
    }
  
  }

  let prioclass;
  let priostring;
  if(props.priorityString===1){
    prioclass='bg-danger text-light'
    priostring="HIGH"
  }else if(props.priorityString===2){
    prioclass="bg-warning text-light"
    priostring="MEDIUM"
  }else{
    prioclass="bg-info text-light"
    priostring="LOW"
  }
    return(
        <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${prioclass}`}>
          <div>ID: {props.projectSequence}</div>
         Priority: {priostring}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{props.summary}</h5>
          <p className="card-text text-truncate ">
            {props.acceptanceCriteria}
          </p>
          <NavLink to={`/updateprojecttask/${props.match.params.id}/${props.projectSequence}`} className="btn btn-primary">
            View / Update
          </NavLink>

          <button onClick={deletingTask} className="btn btn-danger ml-4">Delete</button>
        </div>
      </div>
    )
    
}
const maptoprops=dispatch=>{
  return{
    requestingTasks:(id)=>dispatch(gettingTasks(id))
  }
}


export default connect(null,maptoprops) (withRouter(ProjectTask));