import classes from "./NewMap.module.css"

import MapList from "./MapList"

import { FaCloudUploadAlt } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

import { useState } from "react"

function NewMap(props){
    const [mapName, setMapName] = useState("")
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    function mapNameChangeHandler(event){
        setMapName(event.target.value)
    }

    function onUploadHandler(){
        props.upload()
        setShowSuccessMessage(true)

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 1500);
    }

    return (
        <div className={classes.newMap}>
            <input maxLength="50" id="title-input" className={classes.mapName} type="text" placeholder="Name your map" onChange={mapNameChangeHandler}/>
            
            {!props.startGood &&
                <p className={classes.error}>Start cell required</p>
            }

            {!props.endGood &&
                <p className={classes.error}>End cell required</p>
            }

            {mapName.trim().length===0 &&
                <p className={classes.error}>Map name required</p>
            }

            <button onClick={onUploadHandler} className={(!props.endGood || !props.startGood || mapName.trim().length===0) ? classes.disabledSaveMap : classes.saveMap} disabled={!props.endGood || !props.startGood || mapName.trim().length===0}>
                <span>Upload your map <FaCloudUploadAlt /></span>
            </button>

            {showSuccessMessage &&
                <>
                    <p>Upload successful!</p>
                    <p>Find it below <FaArrowAltCircleDown /></p>
                </>
            }
        </div>
    )
}

export default NewMap

// <button className={classes.invalidMap}>
//                     <span>Save your map!</span>
//                     <p></p>
//                 </button>