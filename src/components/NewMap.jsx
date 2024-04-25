import classes from "./NewMap.module.css"

import MapList from "./MapList"

import { FaCloudUploadAlt } from "react-icons/fa";

import { useState } from "react"

function NewMap(props){
    const [mapName, setMapName] = useState("")

    function mapNameChangeHandler(event){
        setMapName(event.target.value)
    }

    return (
        <div className={classes.newMap}>
            <input id="title-input" className={classes.mapName} type="text" placeholder="Name your map" onChange={mapNameChangeHandler}/>
            
            {!props.startGood &&
                <p className={classes.error}>Start cell required</p>
            }

            {!props.endGood &&
                <p className={classes.error}>End cell required</p>
            }

            {mapName.trim().length===0 &&
                <p className={classes.error}>Map name required</p>
            }

            <button onClick={props.upload} className={(!props.endGood || !props.startGood || mapName.trim().length===0) ? classes.disabledSaveMap : classes.saveMap} disabled={!props.endGood || !props.startGood || mapName.trim().length===0}>
                <span>Upload your map <FaCloudUploadAlt /></span>
            </button>
        </div>
    )
}

export default NewMap

// <button className={classes.invalidMap}>
//                     <span>Save your map!</span>
//                     <p></p>
//                 </button>