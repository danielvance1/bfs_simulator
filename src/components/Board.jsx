import Cell from "./Cell"
import Maps from "./Maps"

import classes from "./Board.module.css"

import { useState, useEffect } from "react"

import { BsBricks } from "react-icons/bs";
import { RxValueNone } from "react-icons/rx";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { FaFlagCheckered } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";

function Board(){
    let rows = 21
    let cols = 21
    //d, r, u, l
    let dir = [-1,0,1,0,-1]

    //clicking mode
    const [mode, setMode] = useState("wall")
    const [clicked, setClicked] = useState(false)

    //grid simulation grid
    let tmpGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
    const [grid, setGrid] = useState(tmpGrid)

    //how did i get here grid
    let tmpDirGrid = Array.from({ length: rows }, () => Array(cols).fill(-1));
    const [dirGrid, setDirGrid] = useState(tmpDirGrid)

    //is edit mode currently
    const [isEditing, setIsEditing] = useState(true)

    //start square data
    const [startRow, setStartRow] = useState(-1)
    const [startCol, setStartCol] = useState(-1)
    const [hasStart, setHasStart] = useState(false)

    //end square data
    const [endRow, setEndRow] = useState(-1)
    const [endCol, setEndCol] = useState(-1)
    const [hasEnd, setHasEnd] = useState(false)

    //maze solved
    const [mazeSolved, setMazeSolved] = useState(false)

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
        if(!isEditing) return

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
        if(!clicked || !isEditing) return

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
        console.log("step has been called")
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        let newDirGrid = Array.from({ length: rows }, () => Array(cols).fill(-1));
        let changes = 0
        let hitEnd = false

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = grid[i][j]
                newDirGrid[i][j] = dirGrid[i][j]

                if(newGrid[i][j] !== "empty" && newGrid[i][j] !== "destination") continue

                for(let f = 0; f < 4; f++){
                    let I = i + dir[f]
                    let J = j + dir[f+1]

                    if(I < 0 || I >= rows || J < 0 || J >= cols) continue
                    if(grid[I][J] !== "active" && grid[I][J] !== "start") continue

                    if(newDirGrid[i][j] === -1) newDirGrid[i][j] = f
                    
                    if(grid[i][j]==="destination") {
                        hitEnd = true
                    }
                    else{
                        newGrid[i][j] = "active"
                    }

                    changes++
                }
            }
        }

        console.log("dirGrid: ")
        console.log(dirGrid)

        //if we hit the end point then make the line
        if(hitEnd){
            let currX = endRow + dir[newDirGrid[endRow][endCol]]
            let currY = endCol + dir[newDirGrid[endRow][endCol] + 1]

            console.log("currX: " + currX)
            console.log("currY: " + currY)

            console.log("newDirGrid[endRow][endCol]: " + newDirGrid[endRow][endCol])

            while(currX !== startRow || currY !== startCol){
                console.log("currX: " + currX)
                console.log("currY: " + currY)

                if(currX <0 || currY < 0 || currX >= rows || currY >= cols) break

                newGrid[currX][currY] = "path"

                console.log("newDirGrid[currX][currY]: " + newDirGrid[currX][currY])
                let nextX = currX + dir[newDirGrid[currX][currY]]
                let nextY = currY + dir[newDirGrid[currX][currY] + 1]
                currX=nextX
                currY=nextY
            }

            setMazeSolved(true)
        }

        //if we didn't get anywhere then we tell the user we are trapped

        setGrid(newGrid)
        setDirGrid(newDirGrid)
        console.log(grid)

        console.log("newDirGrid: ")
        console.log(newDirGrid)
        console.log("end coords: " + endRow + ", " + endCol)



        return changes > 0
    }

    function removeVirus(){
        let newGrid = Array.from({ length: rows }, () => Array(cols).fill("empty"));
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                newGrid[i][j] = grid[i][j]
                if(grid[i][j] === "active" || grid[i][j] === "path") {
                    newGrid[i][j] = "empty"
                }
            }
        }

        setGrid(newGrid)
        let tmpDirGrid = Array.from({ length: rows }, () => Array(cols).fill(-1));
        setDirGrid(tmpDirGrid)
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
        setHasEnd(false)

        setGrid(newGrid)
    }

    function changeMode(){
        if(isEditing){
            let tmpDirGrid = Array.from({ length: rows }, () => Array(cols).fill(-1));
            setDirGrid(tmpDirGrid)
            setIsEditing(false)
        }
        else{
            setMazeSolved(false)
            setIsEditing(true)
        }
    }

    function useGridFromDatabase(gridFromDatabase){
        setGrid(gridFromDatabase)
        setMazeSolved(false)

        let tmpDirGrid = Array.from({ length: rows }, () => Array(cols).fill(-1));
        setDirGrid(tmpDirGrid)

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                if(gridFromDatabase[i][j] === "start"){
                    setHasStart(true)
                    setStartRow(i)
                    setStartCol(j)
                }
                else if(gridFromDatabase[i][j] === "destination"){
                    setHasEnd(true)
                    setEndRow(i)
                    setEndCol(j)
                }
            }
        }
    }

    return (
        <>
            <h1>Breadth-first search simulator</h1>
            <div className={classes.boardAndControls}>
                <Maps useGridFromDatabase={useGridFromDatabase} startGood={hasStart} endGood={hasEnd} gridBoard={grid}/>
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
                <div className={classes.controls}>
                    {isEditing &&
                        <>
                            <button className={(!hasStart || !hasEnd) ? classes.control : classes.controlStart} onClick={changeMode} disabled={!hasEnd || !hasStart}>
                                <span>Run <FaPlay /></span>
                                {!hasStart &&
                                    <p className={classes.error}>start required</p>
                                }
                                {!hasEnd &&
                                    <p className={classes.error}>end required</p>
                                }
                            </button>
                            <button className={classes.control} onClick={() => {setMode("wall")}}>
                                <span>Wall <BsBricks /></span>
                            </button>
                            <button className={classes.control} onClick={() => {setMode("empty")}}>
                                <span>Empty <RxValueNone /></span>
                            </button>
                            <button className={classes.control} onClick={() => {setMode("start")}}>
                                <span>Start <FaMapPin /></span>
                            </button>
                            <button className={classes.control} onClick={() => {setMode("destination")}}>
                                <span>End <FaFlagCheckered /></span>
                            </button>
                            <button className={classes.control} onClick={reset}>
                                <span>Reset <GrPowerReset /></span>
                            </button>
                        </>
                    }
                    {!isEditing &&
                        <>
                            <button className={classes.control} onClick={() => {setIsEditing(true); removeVirus();}}>
                                <span>Edit <MdEdit /></span>
                            </button>
                            <button className={classes.control} onClick={removeVirus}>
                                <span>Restart <GrPowerReset /></span>
                            </button>
                            <button className={classes.control} onClick={step}>
                                <span>Next <GrLinkNext /></span>
                            </button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Board