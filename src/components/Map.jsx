import classes from "./Map.module.css"

import Preview from "./Preview"

import { CiLocationArrow1 } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

function Map(props){
    console.log("maps prop: " + props)
    let grid = JSON.parse(props.gridBoard)

    return <div className={classes.map}>
        <Preview gridBoard={grid}/>
        <div className={classes.controls}>
            <h5 className={classes.title}>{props.title}</h5>
            <button onClick={() => props.useGridFromDatabase(grid)} className={classes.useGridButton}>use this grid <CiLocationArrow1 /></button>
            <button onClick={() => props.deleteGridFromDatabase(props.id)} className={classes.deleteGridButton}>delete <FaTrash /></button>
        </div>
    </div>
}

export default Map