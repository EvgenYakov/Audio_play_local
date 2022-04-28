import React from "react";
import './TrackList.css'


function TrackList(props){
    const tracks = props.tracks
    const list = tracks.map((obj, ind)=>{
        return(<li className='track' key={ind} >{obj.title}
            <div className='bans'>
            <button className='btn' onClick={()=>props.onClick(ind)}> Любимая</button>
            <button className='btn' style={{background:"rgb(168,30,111)"} }  onClick={()=>props.playTrack(obj)}> Включить</button>
        </div>
        </li>)
    })
    return(
        <div >
            <ul className='TrackList'>
                {list}
            </ul>
        </div>
       );
}

export default TrackList

