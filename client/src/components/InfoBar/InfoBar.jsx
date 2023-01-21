import React from 'react';
import './InfoBar.css';
import outline from '../../icon/outline.png';
import close from '../../icon/close.png';

const InfoBar = ({ room }) => {
  return (
    <div className='infoBar'>
        <div className="leftInnerContainer">
            <img className="outLine" src={outline} alt="outline"></img>
            <h3>Room Name</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={close} alt="close"/></a>
        </div>
    </div>
  )
}

export default InfoBar;