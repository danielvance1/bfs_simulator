import classes from "./Maps.module.css"

import NewMap from "./NewMap"
import MapList from "./MapList"

function Maps(props){
    return <div className={classes.maps}>
        <NewMap startGood={props.startGood} endGood={props.endGood}/>
        <MapList/>
    </div>
}

export default Maps