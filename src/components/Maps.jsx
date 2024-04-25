import classes from "./Maps.module.css"

import NewMap from "./NewMap"
import MapList from "./MapList"

import { useState, useEffect } from "react"

function Maps(props){
    const [grids, setGrids] = useState([])

    function uploadGrid(){
        const titleValue = document.getElementById('title-input').value.trim();

        let newGrid = Array.from({ length: 21 }, () => Array(21).fill("empty"));
        for(let i = 0; i < 21; i++){
            for(let j = 0; j < 21; j++){
                if(props.gridBoard[i][j] === "path" || props.gridBoard[i][j] === "active") newGrid[i][j] = "empty"
                else newGrid[i][j] = props.gridBoard[i][j]
            }
        }

        const stringBoard = JSON.stringify(newGrid)

        const boardData = {
            title: titleValue,
            stringBoard: stringBoard
        };
    
        console.log("board data")
        console.log("title: " + titleValue)
        console.log("stringBoard: " + stringBoard)

        fetch("https://meal-app-34d27-default-rtdb.firebaseio.com/maps.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardData),
        })
        .then(response => {
            if (!response.ok) {
                console.log('there was an error adding the map')
                throw new Error('there was an error adding the map');
            }
            console.log('Map added');
            window.location.reload();
        })
        .catch(error => {
            console.error('there was an error adding the recipe');
        });
    }

    useEffect(() => {
        const fetchMaps = async () => {
            try{
                
                const response = await fetch(
                    "https://meal-app-34d27-default-rtdb.firebaseio.com/maps.json"
                )

                if(!response.ok){
                    throw new Error("something went wrong!!")
                }

                const responseData = await response.json()

                //console.log(responseData)

                const loadedMaps = []
                for(const key in responseData){

                    loadedMaps.push({
                        id: key,
                        title: responseData[key].title,
                        stringBoard: responseData[key].stringBoard
                    })

                    console.log(loadedMaps[loadedMaps.length-1])
                }

                setGrids(loadedMaps)
            }
            catch(error){
                
            }
        }

        fetchMaps()       
    }, [])

    console.log("grid: " + grids)

    return <div className={classes.maps}>
        <NewMap startGood={props.startGood} endGood={props.endGood} gridBoard={props.gridBoard} upload={uploadGrid}/>
        <MapList grids={grids} useGridFromDatabase={props.useGridFromDatabase}/>
    </div>
}

export default Maps