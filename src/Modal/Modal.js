import React,{Fragment} from 'react';
import "./Modal.css"
import Back from '../Backdrop'

const Modal=(props)=>{

  
    return( 
         <Fragment>
             <Back show={props.show} click={props.close}/>
             <div className="modal-wrapper " style={{opacity :props.show ? "1":"1",
             transform: props.show ? "translateY(0vh)" : 'translateY(-100vh)' }}>
             <div className="modal-header" >
             <label style={{color:"white",left: "134px",position: "relative"}} > We have encountered an error</label>
             <span   className="close-modal-btn" onClick={props.close}>x</span>

             </div>
             <div className="modal-body">
                <div> {props.children}</div>

             </div>
             <div className="modal-footer">

             </div>
              </div>
         </Fragment>
    )
 
}

export default Modal