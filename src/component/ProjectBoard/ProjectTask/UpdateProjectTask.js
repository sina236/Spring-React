import React, { useState, useEffect, Fragment } from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import Axios from 'axios'
import classes from 'classnames'

const UpdateTask=(props)=>{
    const [task,settask]=useState(null)
    const [error,setError]=useState(false)
    const [pressed,setPressed]=useState(false)
    useEffect(()=>{
        var getTask=async()=>{
            try{
                const resp = await Axios.get(`/api/backlog/${props.match.params.id}/${props.match.params.id2}`)
                const data= await resp.data
                settask(data)
            }catch(e){
                console.log(e)
                setError(true)
                setTimeout(() => {
                  props.history.push(`/projectboard/${props.match.params.id}`)
                }, 3000);
            }
           
        }
        getTask()

  // eslint-disable-next-line
    },[])
     


    var onchange=(e,name)=>{
        e.preventDefault()
        let clone={...task}
        let taskPart=clone[name]
        taskPart=e.target.value
        clone[name]=taskPart
        settask(clone)
        
    }


    var sendingtoBackEnd=async()=>{
        setPressed(true)
        for(let val of Object.values(task)){
            if(val===""|| val===0){
              return;
            }
          }
        try{
            const resp = await Axios.patch(`/api/backlog/${props.match.params.id}/${props.match.params.id2}`,task)
            const data = await resp.data
            console.log(data)
            props.history.push(`/projectboard/${props.match.params.id}`)

        }catch(e){
            console.log(e)
            setError(true)
            setTimeout(() => {
                props.history.push(`/projectboard/${props.match.params.id}`)
            }, 3000);
        }
    }
    let content;
    if(error || task===null){
        content=<div className="alert alert-danger text-center" role="alert" >We can't find any project Task with this id {props.match.params.id2}</div>
    }else{
        content=(
            <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <NavLink to={`/projectboard/${props.match.params.id}`} className="btn btn-light">
                Back to Project Board
              </NavLink>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className={classes("form-control form-control-lg",{"is-invalid":task.summary===""&&pressed})}  
                     name="summary"
                    placeholder="Project Task summary"
                    defaultValue={task ? task.summary:null}
                    onChange={(e)=>onchange(e,'summary')}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classes("form-control form-control-lg",{"is-invalid":task.acceptanceCriteria===""&&pressed})} 
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    defaultValue={task ? task.acceptanceCriteria:null}
                    onChange={(e)=>onchange(e,'acceptanceCriteria')}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classes("form-control form-control-lg",{"is-invalid":task.dueDate===""&&pressed})} 
                    name="dueDate"
                    defaultValue={task? task.dueDate:null}
                    onChange={(e)=>onchange(e,'dueDate')}

                  />
                </div>
                <div className="form-group">
                   your last choice is: {task ? task.priority:null}
                  <select
                    className={classes("form-control form-control-lg",{"is-invalid":task.priority===0&&pressed})} 
                    name="priority"
                    onChange={(e)=>onchange(e,'priority')}

                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group" >
                    your last choice is: {task ? task.status:null}
                  <select
                    className={classes("form-control form-control-lg",{"is-invalid":task.status===""&&pressed})} 
                    name="status"
                    onChange={(e)=>onchange(e,'status')}

                  >
                    <option value="">select status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="button"
                  className="btn btn-primary btn-block mt-4"
                  defaultValue="Submit"
                  onClick={sendingtoBackEnd}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
        )
    }
    return(
        <Fragment>
            {content}
        </Fragment>
    )
}

export default withRouter(UpdateTask);