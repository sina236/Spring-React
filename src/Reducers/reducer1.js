import '../action'
const initialreducer={
    error:false,
    projects:[]
}



const reducer=(state=initialreducer,action)=>{
    if(action.type==="response"){
        
        return{
            ...state,
            error:true
        }

    }
    if(action.type==='projects'){
        return{
            ...state,
            projects:action.projects
        }
    }
    return reducer
}

export default reducer

