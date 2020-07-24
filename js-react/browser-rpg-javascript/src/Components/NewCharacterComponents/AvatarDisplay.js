import React, {Fragment} from 'react'
import './AvatarDisplayGrid.css';
import joe from '../../sprites/joe.gif'
import alison from '../../sprites/alison.gif'
import kenny from '../../sprites/kenny.gif'
import alex from '../../sprites/alex.gif'

const AvatarDisplay = ({handleClick}) => {

    return(
        <Fragment>
        <h1 className="select-sprite">Select Sprite</h1>
            <div id="grid-container" onClick={handleClick}>
               
            <div className="grid-item"  >
                < img id="1" src={joe}/>
            </div>
            <div className="grid-item" >
                < img id="2" src={alison}/>
            </div>
            <div className="grid-item" >
            < img id="3" src={kenny}/>
            </div>
            <div className="grid-item" >
                < img id="4" src={alex}/>
            </div>
            </div>
            </Fragment>
    )
}

export default AvatarDisplay