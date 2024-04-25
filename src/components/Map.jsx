import classes from "./Map.module.css"

import Preview from "./Preview"

import { CiLocationArrow1 } from "react-icons/ci";

function Map(props){
    console.log("maps prop: " + props)
    let grid = JSON.parse(props.gridBoard)

    return <div className={classes.map}>
        <Preview gridBoard={grid}/>
        <div className={classes.controls}>
            <h3 className={classes.title}>{props.title}</h3>
            <button onClick={() => props.useGridFromDatabase(grid)} className={classes.useGridButton}>use this grid <CiLocationArrow1 /></button>
        </div>
    </div>
}

export default Map