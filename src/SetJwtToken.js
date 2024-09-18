import Axios from "axios"

const setJwtToken=token=>{
    if(token){
        Axios.defaults.headers.common["Authorization"]= token;
    }else{
        delete Axios.defaults.headers.common["Authorization"]
    }
}

export default setJwtToken;