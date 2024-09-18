import React, { useEffect, useState } from 'react'
import Item from './Item'
import Button from './Project/Button'
import {connect} from 'react-redux'
import {allProjectsRecieved} from './../action'
import axios from 'axios'



const Dashboard=(props)=>{
  const [projects,setprojects]=useState(null)
  const [reload,setreload]=useState(true)
  useEffect(()=>{
    let token=localStorage.getItem('jwt')
    if(!token){
      props.history.push('/')
    }
    var gettingprojects=async()=>{
      try{

        const resp = await axios.get('/api/project/all')
        const data = await resp.data
        await props.getProjects(data)
        setprojects(data) 
        setreload(false)
      }catch(e){
        console.log(e.response.data)
      }   
   }
   gettingprojects()
  // eslint-disable-next-line 
  },[reload])

  var Deleting=async(id)=>{
    const rep= await axios.delete(`/api/project/${id}`)
    const data= await rep.data
    setreload(true)
  }
    let allproject=null
    if(projects===null||projects.length===0){
      allproject=null
    }else{
      allproject=projects.map(x=>(
         <Item Deleting={Deleting} key={x.projectIdentifier} name={x.projectName} id={x.projectIdentifier} desc={x.description}/>
      ))
    }
    return(
        <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
             <Button/>
              <br />
              <hr />
              {allproject ? allproject:<p style={{fontSize:'50px',left:'400px',position:'absolute'}}>You have no projects</p>}
            </div>
          </div>
        </div>
      </div>
    );

   
    
}


const maptostate=state=>{
  return{
    projects:state.reducer.projects,
    
  }
}


const maptoprops=dispatch=>{
  return{
    getProjects:(projects)=>dispatch(allProjectsRecieved(projects))
  }
}



export default connect(maptostate,maptoprops) (Dashboard);