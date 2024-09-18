import React, { useState, Fragment } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../action'
import {withRouter}from 'react-router-dom'
import classNames from 'classnames'
import Modal from '../../Modal/Modal'

const AddProject=(props)=>{
    const[projectName,setProjectName]=useState("");
    const [projectIdentifier,setProjectIdentifier]=useState("");
    const [description,setDescription]=useState("");
    const [start,setStart]=useState("");
    const [end,setEnd]=useState("");
    const [pressedSubmit,setPressedSubmit]=useState(false)
    const [closeModal,setCloseModal]=useState(false)

    var onChange=(e,settype)=>{
        let content=e.target.value
        settype(content)
        
    }

    var onSubmit=(e)=>{
        e.preventDefault();
        setPressedSubmit(true)
        setCloseModal(false)
        let obj={
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            start_date: start,
            end_date: end
        }

         for(let val of Object.values(obj)){
          if(val===""){
            return;
          }
        }
     
        props.createProject(obj,props.history)
        if(!props.error){
          props.history.push('/dashboard')

        }
    }

    var close=()=>{
      setCloseModal(true)
    }


    return(
      <Fragment>
        {props.error&& closeModal===false ? <Modal close={close} show={props.error}>There is an error with your request, please try again</Modal>:null}
        <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Project form</h5>
                <hr />
                <form >
                  <div className="form-group">
                    <input
                      type="text"
                      className={classNames("form-control form-control-lg ",{
                        "is-invalid":projectName===""&&pressedSubmit
                      })}
                      placeholder="Project Name"
                      name="projectName"
                      value={projectName}
                      onChange={(e)=>onChange(e,setProjectName)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classNames("form-control form-control-lg",{
                        "is-invalid":projectIdentifier===""&&pressedSubmit
                      })}
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={projectIdentifier}
                      onChange={(e)=>onChange(e,setProjectIdentifier)}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classNames("form-control form-control-lg",{
                        "is-invalid":description===""&&pressedSubmit
                      })}
                      placeholder="Project Description"
                      name="description"
                      value={description}
                      onChange={(e)=>onChange(e,setDescription)}
                    />
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classNames("form-control form-control-lg",{
                        "is-invalid":start===""&&pressedSubmit
                      })}
                      name="start_date"
                      value={start}
                      onChange={(e)=>onChange(e,setStart)}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classNames("form-control form-control-lg",{
                        "is-invalid":end===""&&pressedSubmit
                      })}                  
                      name="end_date"
                      value={end}
                      onChange={(e)=>onChange(e,setEnd)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={onSubmit}
                    className="btn btn-primary btn-block mt-4">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    );
    
}

const maptostate=state=>{
  return{
    error:state.reducer.error
  }
}

const maptoprops=dispatch=>{
  return{
    createProject:(project,history)=>dispatch(createProject(project,history))
  }
}


export default withRouter(connect(maptostate,maptoprops)(AddProject));