import classes from "./Preview.module.css"

import PreviewCell from "./PreviewCell"

function Preview(props){
    //console.log(props.gridBoard)
    return <div className={classes.preview}>
        {props.gridBoard.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
                <PreviewCell 
                    key={colIndex*20 + rowIndex} 
                    type={props.gridBoard[rowIndex][colIndex]}
                />
            ))
        ))}
    </div>
}

export default Preview