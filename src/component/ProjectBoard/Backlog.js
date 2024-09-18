import React, { useState, useEffect, useRef } from 'react'
import {withRouter} from 'react-router-dom'
import ProjectTask from './ProjectTask/ProjectTask'
import {connect} from 'react-redux'


const Backlog=(props)=>{
    const [todoTasks,setToDoTasks]=useState([])
    const [inProgress,setInprogress]=useState([])
    const [done,setDone]=useState([])



let run= useRef(1)
    useEffect(()=>{
        if(run.current===1){
            run.current--
            return
        }
        console.log(props.tasks)
        for(let task of props.tasks){
            if(task.status==="TO_DO"){
                setToDoTasks(todoTasks=>[...todoTasks,task])
            }else if(task.status==="IN_PROGRESS"){
                setInprogress(inProgress=>[...inProgress,task])
            }else{
                setDone(done=>[...done,task])
            }
        }
// eslint-disable-next-line 
    },[run.current])

    

    let sortedtodo=todoTasks.sort((a,b)=>(a.priority>b.priority)?1:-1)
    let sortedinprog=inProgress.sort((a,b)=>(a.priority>b.priority)?1:-1)
    let sorteddone=done.sort((a,b)=>(a.priority>b.priority)?1:-1)

   
    return(
        <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {
                sortedtodo.map(t=>(
                    <ProjectTask key={t.projectSequence} projectSequence={t.projectSequence}
                    priorityString={t.priority} summary={t.summary} 
                    acceptanceCriteria={t.acceptanceCriteria}/>
                ))
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {
                sortedinprog.map(t=>(
                    <ProjectTask key={t.projectSequence} projectSequence={t.projectSequence}
                    priorityString={t.priority} summary={t.summary} 
                    acceptanceCriteria={t.acceptanceCriteria}/>
                ))
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {
                sorteddone.map(t=>(
                    <ProjectTask key={t.projectSequence} projectSequence={t.projectSequence}
                    priorityString={t.priority} summary={t.summary} 
                    acceptanceCriteria={t.acceptanceCriteria}/>
                ))
            }
          </div>
        </div>
      </div>
    )
}



const maptostate=state=>{
    return{
        tasks:state.backlog.projectTasks,
    }
}


export default connect(maptostate)(withRouter(Backlog))