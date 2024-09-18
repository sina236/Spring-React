import '../action'


const initialState={
    projectTasks:null,
    projectTask:null,
    error:false,
}


const reducer=(state=initialState, action)=>{

    if(action.type==='tasks'){
        return{
            ...state,
            projectTasks:action.tasks
        }
    }

    if(action.type==='error'){
        return{
            ...state,
            error:true
        }
    }
    return state
}


export default reducer