import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './component/Dashboard'
import AddProject from './component/Project/AddProject'
import Update from './component/Project/UpdateProject'
import { withRouter, Switch, Route }  from 'react-router-dom'
import ProjectBoard from './component/ProjectBoard/ProjectBoard'
import addProjectTask from './component/ProjectBoard/ProjectTask/addProjectTask';
import UpdateProjectTask from './component/ProjectBoard/ProjectTask/UpdateProjectTask';




const All=(props)=>{

  // 
    return(
        <div>
       {/* {props.location.pathname==="/"||props.location.pathname==='/register'||props.location.pathname==='/login' ? null : }  */}
        <Switch>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path="/addproject" component={AddProject}/>
          <Route exact path="/project/:id" component={Update}/>
          <Route exact path='/projectboard/:id' component={ProjectBoard}/>
          <Route exact path='/addprojecttask/:id' component={addProjectTask}/>
          <Route exact path='/updateprojecttask/:id/:id2' component={UpdateProjectTask}/>
        </Switch>
        </div>
    
    )
}


export default withRouter(All);