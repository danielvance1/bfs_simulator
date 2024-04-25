import classes from "./PreviewCell.module.css"

function PreviewCell(props){
    let cellClass = classes.previewCellEmpty
    if(props.type === "empty") cellClass = classes.previewCellEmpty
    else if(props.type === "wall") cellClass = classes.previewCellWall
    else if(props.type === "start") cellClass = classes.previewCellStart
    else if(props.type === "destination") cellClass = classes.previewCellDestination

    return <div className={cellClass}></div>
}

export default PreviewCell