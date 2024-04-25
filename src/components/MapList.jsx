import classes from "./MapList.module.css"

import Map from "./Map"

function MapList(props){
    console.log("props.grids.length: " + props.grids.length)

    return <div className={classes.mapList}>
        {props.grids.length > 0 && 
            props.grids.map(grid => <Map id={grid.id} deleteGridFromDatabase={props.deleteGridFromDatabase} useGridFromDatabase={props.useGridFromDatabase} gridBoard={grid.stringBoard} title={grid.title} key={grid.id}/>)
        }
    </div>
}

export default MapList