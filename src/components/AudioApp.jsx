import React, {useState,useEffect, useRef} from "react";
import "./AudioApp.css"
import Controls from "./Controls";

const AudioApp = ({tracks})=>{
    const [trIn, setTrIn] = useState(0);
    const [trProgress, setTrProgress] = useState(0);
    const [trPlaying, setTrPlaying] = useState(false);

    const {  title, artist, audioSrc, image, color}= tracks[trIn];


    //Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const {duration} = audioRef.current
    const curPos = duration ? `${(trProgress / duration) * 100}%` : '0%';
    const trackStyle = `
     -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${curPos}, #fff), color-stop(${curPos}, #777))
    `;


    function toPrevTrack (){
        if (trIn -1 < 0){
            setTrIn(tracks.length-1)
        }else {
            setTrIn(trIn - 1)
        }
    }

    function toNextTrack (){
        if (trIn < tracks.length - 1 ){
            setTrIn(trIn + 1 )
        } else {
            setTrIn(0)
        }
    }

    function startTimer(){
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(()=>{
            if(audioRef.current.ended) {
                toNextTrack()
            }else{
                setTrProgress(audioRef.current.currentTime)
            }
        },[1000])

    }

    useEffect(()=>{
        if (trPlaying){
            audioRef.current.play();
            startTimer();
        }else {
            clearInterval(intervalRef.current)
            audioRef.current.pause();
        }
    }, [trPlaying])

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(()=>{
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc)
        setTrProgress(audioRef.current.currentTime)
        if (isReady.current){
            audioRef.current.play();
            setTrPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    },[trIn])

    function onScrub(value){
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrProgress(audioRef.current.currentTime)
    }


    function onScrubEnd(){
        if (!trPlaying) {
            setTrPlaying(true);
        }
        startTimer();
    }

    return(
        <div className='audio-player'>
            <div className="track-info">
                <img className="artwork"
                          src = {image}
                          alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className='title'>{title}</h2>
                <h3 className="artist">{artist}</h3>
                <Controls
                    isPlay={trPlaying}
                    toNextTrack={toNextTrack}
                    toPrevTrack={toPrevTrack}
                    setPlay={setTrPlaying}
                />
                <input
                type='range'
                value={trProgress}
                step='1'
                min={0}
                max={duration ? duration : `${duration}`}
                className="progress"
                onChange={(e)=> onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                style={{ background: trackStyle }}
                />
            </div>
        </div>
    )

}

export  default AudioApp