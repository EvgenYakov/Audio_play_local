import React, { useEffect } from 'react';
import './BackDrop.css'

const Backdrop = (props) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--active-color', props.activeColor);
    } );

    return (
        <div className={`color-backdrop ${props.isPlaying ? 'playing' : 'idle'}`} >
            {props.children}
        </div>
    );
};

export default Backdrop