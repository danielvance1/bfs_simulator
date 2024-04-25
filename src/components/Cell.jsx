import { useState } from "react"
import classes from "./Cell.module.css"



function Cell(props){
    let currClass = classes.cellEmpty
    let cellContent = ""

    if(props.active === "active") currClass = classes.cellActive
    if(props.active === "wall") currClass = classes.cellWall
    if(props.active === "path") currClass = classes.cellPath
    if(props.active ===  "start") {
        currClass = classes.cellStart
        cellContent = "S"
    }
    if(props.active ===  "destination") {
        currClass = classes.cellDestination
        cellContent = "E"
    }

    return (
        <div className={currClass}
             onMouseEnter={props.click}
             onMouseDown={props.forceClick}>
            {cellContent}
        </div>
    )
}

export default Cell