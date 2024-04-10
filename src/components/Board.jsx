import Cell from "./Cell"

import classes from "./Board.module.css"

import { useState, useEffect } from "react"

function Board(){
    let rows = 21
    let cols = 21
    let dir = [-1,0,1,0,-1]

    const [mode, setMode] = useState("wall")
    const [clicked, setClicked] = useState(false)

    let tmpGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
    const [grid, setGrid] = useState(tmpGrid)

    //start square data
    const [startRow, setStartRow] = useState(-1)
    const [startCol, setStartCol] = useState(-1)
    const [hasStart, setHasStart] = useState(false)

    //end square data
    const [endRow, setEndRow] = useState(-1)
    const [endCol, setEndCol] = useState(-1)
    const [hasEnd, setHasEnd] = useState(false)

    function mouseClickedHandler(event){
        event.preventDefault()
        console.log("clicking down mouse")
        setClicked(true)
    }

    function mouseUnclickedHandler(event){
        event.preventDefault()
        console.log("unclicking mouse")
        setClicked(false)
    }

    function forceSwitchCell(row, col){
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = grid[i][j]
            }
        }

        if((mode === "start") !== (newGrid[row][col] === "start")){
            if(mode === "start"){
                if(hasStart){
                    newGrid[startRow][startCol] = "empty"
                }

                setStartRow(row)
                setStartCol(col)
                setHasStart(true)
            }
            else{
                setStartRow(-1)
                setStartCol(-1)
                setHasStart(false)
            }
        }

        if((mode === "destination") !== (newGrid[row][col] === "destination")){
            if(mode === "destination"){
                if(hasEnd){
                    newGrid[endRow][endCol] = "empty"
                }

                setEndRow(row)
                setEndCol(col)
                setHasEnd(true)
            }
            else{
                setEndRow(-1)
                setEndCol(-1)
                setHasEnd(false)
            }
        }

        newGrid[row][col] = mode;
        setGrid(newGrid)
    }

    function switchCell(row, col){
        console.log("clicked: " + clicked)
        if(!clicked) return

        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = grid[i][j]
            }
        }

        if((mode === "start") !== (newGrid[row][col] === "start")){
            if(mode === "start"){
                if(hasStart){
                    newGrid[startRow][startCol] = "empty"
                }

                setStartRow(row)
                setStartCol(col)
                setHasStart(true)
            }
            else{
                setStartRow(-1)
                setStartCol(-1)
                setHasStart(false)
            }
        }

        if((mode === "destination") !== (newGrid[row][col] === "destination")){
            if(mode === "destination"){
                if(hasEnd){
                    newGrid[endRow][endCol] = "empty"
                }

                setEndRow(row)
                setEndCol(col)
                setHasEnd(true)
            }
            else{
                setEndRow(-1)
                setEndCol(-1)
                setHasEnd(false)
            }
        }

        newGrid[row][col] = mode;
        setGrid(newGrid)
    }

    function step(){
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                let neighbors = 0

                for(let f = 0; f < 4; f++){
                    let I = i + dir[f]
                    let J = j + dir[f+1]

                    if(I < 0 || I >= rows || J < 0 || J >= cols) continue

                    if(grid[I][J] === "active" || grid[I][J] === "start") neighbors++
                }
                
                newGrid[i][j] = grid[i][j]
                if(newGrid[i][j] === "empty" && neighbors > 0) newGrid[i][j] = "active"
            }
        }

        setGrid(newGrid)
    }

    function removeVirus(){
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = (grid[i][j] === "active" ? "empty" : grid[i][j])

            }
        }

        setGrid(newGrid)
    }

    function reset(){
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = "empty"

            }
        }

        setStartRow(-1)
        setStartCol(-1)
        setHasStart(false)

        setGrid(newGrid)
    }

    return (
        <div>
            <div className={classes.board} 
                 onMouseDown={mouseClickedHandler} 
                 onMouseUp={mouseUnclickedHandler}
                 onMouseLeave={mouseUnclickedHandler}>
                {grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <Cell 
                            key={colIndex*20 + rowIndex} 
                            active={grid[rowIndex][colIndex]}
                            click={() => switchCell(rowIndex, colIndex)}
                            forceClick={() => forceSwitchCell(rowIndex, colIndex)}
                        />
                    ))
                ))}
            </div>
            <button onClick={() => {setMode("wall")}}>Wall</button>
            <button onClick={() => {setMode("empty")}}>Empty</button>
            <button onClick={() => {setMode("active")}}>Active</button>
            <button onClick={() => {setMode("start")}}>Set Start</button>
            <button onClick={() => {setMode("destination")}}>Set End</button>
            <button onClick={removeVirus}>Remove Virus</button>
            <button onClick={reset}>Reset</button>
            <button onClick={step}>Next</button>
        </div>
    )
}

export default Board