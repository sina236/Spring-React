import '../action'

const initialstate={
    token:null,
    error:null
    
}




const reducer=(state=initialstate,action)=>{

    if(action.type==='errorForAuth'){
        return{
            ...state,
            error:action.resp
        }
    }

    if(action.type==="tokenRecieved"){
        return{
            ...state,
            token:action.token,
            error:false
        }
    }

    if(action.type==="logout"){
        return{
            ...state,
            token:null,
            error:null
        }
    }

    return state

}


export default reducer