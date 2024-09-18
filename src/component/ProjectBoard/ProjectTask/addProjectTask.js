import React ,{useState, useEffect, Fragment}from 'react'
import {withRouter,NavLink} from 'react-router-dom'
import classes from 'classnames'
import {connect} from 'react-redux'
import {addingProjectTask} from '../../../action'
import Modal from '../../../Modal/Modal'



const AddProjectTask=(props)=>{
    const [id,setid]=useState(null)
    const [summary,setsummary]=useState("")
    const [acceptanceCriteria,setacceptanceCriteria]=useState("")
    const [duedate,setduedate]=useState("")
    const [priority,setpriority]=useState(0)
    const [status,setstatus]=useState("")
    const [pressedSubmit,setPressedSubmit]=useState(false)
    const [closeModal,setCloseModal]=useState(false)

    useEffect(()=>{
        setid(props.match.params.id)
  // eslint-disable-next-line  
    },[])

    var onchange=(e,settype)=>{
        e.preventDefault();
        let content=e.target.value
        settype(content)
        
    }
    var Sendingdata=async(e)=>{
        e.preventDefault();
        setPressedSubmit(true)
        let task={
            summary:summary,
            acceptanceCriteria:acceptanceCriteria,
            dueDate:duedate,
            priority:priority,
            status:status,
        }
        for(let val of Object.values(task)){
            if(val===""|| val===0){
              return;
            }
          }
          props.SendingdataToAction(task,id)
          setTimeout(() => {
             backtoBoard()
         }, 2000);
        }
       

    var backtoBoard=()=>{
        props.history.push(`/projectboard/${id}`)
    }
    var close=()=>{
        setCloseModal(true)
      }

    return(
     <Fragment>
        {props.error&& closeModal===false ? <Modal close={close} show={props.error}>There is an error with your request, please try again</Modal>:null}  
        <div className="add-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
            <NavLink  to={`/projectBoard/${id}`} className="btn btn-light">
                Back to Project Board
            </NavLink>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form>
                <div className="form-group">
                <input
                    type="text"
                    className={classes("form-control form-control-lg",{
                        "is-invalid":summary===""&&pressedSubmit
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    onChange={(e)=>onchange(e,setsummary)}
                />
                </div>
                <div className="form-group">
                <textarea
                    className={classes("form-control form-control-lg",{
                        "is-invalid":acceptanceCriteria===""&&pressedSubmit
                    })}
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    onChange={(e)=>onchange(e,setacceptanceCriteria)}

                />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                <input
                    type="date"
                    className={classes("form-control form-control-lg",{
                        "is-invalid":duedate===""&&pressedSubmit
                    })}
                    name="dueDate"
                    onChange={(e)=>onchange(e,setduedate)}

                />
                </div>
                <div className="form-group">
                <select
                    className={classes("form-control form-control-lg",{
                        "is-invalid":priority===0&&pressedSubmit
                    })}
                    name="priority"
                    onChange={(e)=>onchange(e,setpriority)}

                >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
                </div>

                <div className="form-group">
                <select
                    className={classes("form-control form-control-lg",{
                        "is-invalid":status===""&&pressedSubmit
                    })}
                    name="status"
                    onChange={(e)=>onchange(e,setstatus)}

                >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                </div>

                <input
                type="button"
                className="btn btn-primary btn-block mt-4"
                defaultValue="Submit"
                onClick={Sendingdata}
                />
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
        error:state.backlog.error
    }
}

const maptoprops=dispatch=>{
    return{
        SendingdataToAction:(task,backlog_id)=>dispatch(addingProjectTask(task,backlog_id))
    }
}

export default withRouter(connect(maptostate,maptoprops)(AddProjectTask));