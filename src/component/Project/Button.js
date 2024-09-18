import React, { Fragment } from 'react'
import { NavLink} from 'react-router-dom'


const Button=(props)=>{
    return(
<Fragment>  
    <NavLink to="/addProject" className="btn btn-lg btn-info">
        Create a Project
    </NavLink>
 </Fragment>
       
    );
}


export default Button;