
import React from "react"
import "./Backdrop.css"

const backdrop=(props)=>(
    props.show ? <div className="back" onClick={props.click}></div>:null
)

export default backdrop