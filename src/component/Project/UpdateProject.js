import React, { useEffect, useState, Fragment } from "react";
import {withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import classes from 'classnames'


const UpdateProject=(props)=>{   
  const [projectName,setprojectName]=useState("")
  const [desc,setdesc]=useState("")
  const [project,setproject]=useState(null)
  const [error,setError]=useState(false)
  const [pressed,setpressed]=useState(false)





  useEffect(()=>{
    var gettingproject=async()=>{
      try{
        const resp=await axios.get(`http://localhost:8080/api/project/${props.history.location.state}`)
        const project = await resp.data
        setprojectName(project.projectName)
        setdesc(project.description)
        setproject(project)
      }catch(e){
        setError(true)
        setTimeout(() => {
          props.history.push('/dashboard')
        }, 2000);
      }
    
    }
    gettingproject()

  //eslint-disable-next-line
  },[])

  var onchange=(e,settype)=>{
    let content=e.target.value
    settype(content)
    
  }
 

  var updatingProject=async()=>{
    setpressed(true)
    if(projectName===""||desc===""){
      // setpressed(false)
      return
    };
    let newproject={...project}
    newproject.projectName=projectName
    newproject.description=desc
    await axios.post(`/api/project/`,newproject)
    props.history.push('/dashboard')
  }
  let updateShow=null
  if(error){
    updateShow= <p style={{fontSize:'40px',position:'absolute', left:'650px',top:'300px'}}>Unfortunately this project doesn't exist</p>
    
  }else{
    updateShow=(
      <Fragment>
    <div className="project">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
        <NavLink  to='/dashboard' className="btn btn-light">
                Back to Project Board
            </NavLink>
          <h5 className="display-4 text-center">Update Project form</h5>
          <hr />
          <form>
            <div className="form-group">
              <input
                type="text"
                className={classes("form-control form-control-lg ",{
                  "is-invalid":projectName==="" &&pressed
                })}
                placeholder="Project Name"
                defaultValue={project ? projectName:null}
                onChange={(e)=>onchange(e,setprojectName)}

              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder={project ? project.projectIdentifier:null}
                disabled
              />
            </div>
            <div className="form-group">
              <textarea
                className={classes("form-control form-control-lg",{
                  "is-invalid":desc===""&&pressed
                })}
                value={project ? desc:"Description..."}
                onChange={(e)=>onchange(e,setdesc)}
                placeholder="Description"

              />
            </div>
            <h6>Start Date</h6>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                name="start_date"
                placeholder={project ? project.start_date: null}
                disabled
              />
            </div>
            <h6>Estimated End Date</h6>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                name="end_date"
                placeholder={project ? project.end_date:null}
                disabled
              />
            </div>
            <input
              type="button"
              className="btn btn-primary btn-block mt-4"
              onClick={updatingProject}
              defaultValue="Update"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
  </Fragment>)
  }
    return (
      <Fragment>
      {updateShow}
      </Fragment>
  );
}
const maptostate=state=>{
  return{
    projects:state.reducer.projects
  }
}

export default connect(maptostate)(withRouter(UpdateProject));
