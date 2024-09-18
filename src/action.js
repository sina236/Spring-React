import axios from 'axios'
import setJwtToken from './SetJwtToken'
import jwt_decode from 'jwt-decode'

export const createProject=(project,history)=>{
    return async dispatch=>{
        try{
            const resp= await axios.post("/api/project",project)
            const data=await resp.data
        }catch(e){
            console.log(e.response.data)
            dispatch(gettingResponse())

        }
    }
  
}

export const gettingResponse=()=>{
    return{
        type:'response',
    }
}


export const allProjectsRecieved=(projects)=>{
    return{
        type:"projects",
        projects:projects
    }
}

export const errorProjectTask=()=>{
    return{
        type:'error'
    }
}


export const addingProjectTask=(task,backlog_id)=>{
    return async dispatch=>{
        try{
            const resp= await axios.post(`/api/backlog/${backlog_id}`,task)
            const data = await resp.data
        }catch(e){
            console.log(e.response.data)
            dispatch(errorProjectTask())
        }
    }
 
}

export const taskToReducer=(tasks)=>{
    return{
        type:'tasks',
        tasks:tasks
    }
}

export const gettingTasks=(id)=>{
    return async dispatch=>{
        try{
            const resp = await axios.get(`/api/backlog/${id}`)
            const data = await resp.data
            dispatch(taskToReducer(data))
        }catch(e){
            console.log(e.response.data)
            dispatch(errorProjectTask())
        }
    }
}

export const authneticate=(obj)=>{
    return async dispatch=>{
        try{
            const resp= await axios.post('/api/users/register',obj)
            const data= await resp.data
            dispatch(errorToToken(false))
        }catch(e){
            console.log(e.response.data)
            dispatch(errorToToken(e.response.data))
        }
    }
}

export const sendTokenToReducer=(token)=>{
    return{
        type:'tokenRecieved',
        token:token
    }
}

export const errorToToken=(resp)=>{
    return {
        type:'errorForAuth',
        resp:resp
    }
}

export const Loging=(obj)=>{
    return async dispatch=>{
        try{
            const resp = await axios.post('/api/users/login',obj)
            const data = await resp.data
            let token=data.token
            localStorage.setItem("jwt",token)
            setJwtToken(token)
            let decoded=jwt_decode(token)
            dispatch(sendTokenToReducer(decoded))
        }catch(e){
            console.log(e.response.data)
            dispatch(errorToToken(e.response.data))
        }
    }
}

export const logOut=()=>{
    localStorage.removeItem('jwt')
    setJwtToken(false)
    return{
        type:'logout'
    }
}
