import React from 'react';
import skipNext from "../Ressources/icons/skip_next_white_24dp.svg"
import skipPrevious from "../Ressources/icons/skip_previous_white_24dp.svg"
import play from "../Ressources/icons/play_arrow_white_24dp.svg"
import pause from "../Ressources/icons/pause_white_24dp.svg"
import volumeUp from "../Ressources/icons/volume_up_white_24dp.svg"
import volumeDown from "../Ressources/icons/volume_down_white_24dp.svg"
import volumeMute from "../Ressources/icons/volume_mute_white_24dp.svg"
import volumeOff from "../Ressources/icons/volume_off_white_24dp.svg"
import favorite from "../Ressources/icons/favorite_green_24dp.svg"
import favoriteBorder from "../Ressources/icons/favorite_border_white_24dp.svg"
import share from "../Ressources/icons/share_white_24dp.svg"
import shuffleOff from "../Ressources/icons/shuffle_white_24dp.svg"
import shuffleOn from "../Ressources/icons/shuffle_green_24dp.svg"
import repeatOff from "../Ressources/icons/repeat_white_24dp.svg"
import repeatOn from "../Ressources/icons/repeat_green_24dp.svg"
import cast from "../Ressources/icons/cast_white_24dp.svg"
import more from "../Ressources/icons/more_vert_white_24dp.svg"

function Player() {
    const [playing, setPlaying] = React.useState(true)
    const [volume, setVolume] = React.useState(50)
    const [muted, setMuted] = React.useState(false)
    const [src, setSrc] = React.useState(volumeUp)
    const [alt, setAlt] = React.useState("Volume Up")
    const [like, setLike] = React.useState(false)
    const [shuffle, setShuffle] = React.useState(false)
    const [repeat, setRepeat] = React.useState(false)

    const handleMute = () => {
        if(muted) {
            setMuted(false)
            setSrc(handleSrc())
        } else {
            setMuted(true)
            setSrc(volumeOff)
        }
    }

    const handleVolume = (value) => {
        setVolume(parseInt(value))
        if(!muted) setSrc(handleSrc())
        setAlt(handleAlt())
    }

    const handleSrc = () => {
        if(volume > 0 && volume < 35) return volumeDown
        if(volume >= 35) return volumeUp
        return volumeMute
    }

    const handleAlt = () => {
        if(muted) return "Volume Off"
        if(src === volumeDown) return "Volume Down"
        if(src === volumeUp) return "Volume Up"
        if(src === volumeMute) return "Volume Mute"
    }

    return (
        <>
            <div className={"flex bg-neutral-800 w-full h-[90px] mb-0 border-t border-neutral-600"}>
                <video datatype={"audio/mp3"} src={"http://127.0.0.1:5555"} className={"w-0 h-0"}/>
                <img draggable={false} src={"https://picsum.photos/50"} className={"h-[50px] my-auto ml-5 mr-2 rounded-xl hover:cursor-pointer"} alt={"album musique joué"}/>
                <div className={"flex text-white my-auto ml-2 text-sm w-[150px]"}>
                    <div className={"flex flex-col mr-5"}>
                        <p className={"select-text"}>Titre</p>
                        <p className={"select-text text-gray-400"}>Artiste</p>
                    </div>
                    <img draggable={false} src={like ? favorite : favoriteBorder} className={"hover:cursor-pointer h-[30px] my-auto mr-20"} onClick={() => setLike(!like)} alt={"like button"}/>
                </div>
                <div className={"w-[245px]"}/>
                <img draggable={false} src={shuffle ? shuffleOn : shuffleOff} className={"hover:cursor-pointer h-[30px] my-auto mr-4"} onClick={() => setShuffle(!shuffle)} alt={"shuffle button"}/>
                <img draggable={false} src={skipPrevious} alt={"icône precedent"} className={"hover:cursor-pointer h-[40px] my-auto mr-4"}/>
                <div className={"rounded-full bg-neutral-600 h-[50px] w-[50px] my-auto hover:cursor-pointer flex mr-4"} onClick={() => setPlaying(!playing)}>
                    <img draggable={false} src={playing ? play : pause} alt={"icône play/pause"} height={50} className={"h-[40px] m-auto"}/>
                </div>
                <img draggable={false} src={skipNext} alt={"icône suivant"} className={"hover:cursor-pointer h-[40px] my-auto mr-4"}/>
                <img draggable={false} src={repeat ? repeatOn : repeatOff} className={"hover:cursor-pointer h-[30px] my-auto mr-4"} onClick={() => setRepeat(!repeat)} alt={"repeat button"}/>
                <div className={"w-[74px]"}/>
                <div className={"flex"}>
                    <img draggable={false} src={src} alt={alt} className={"h-[35px] my-auto mr-2 hover:cursor-pointer"} onClick={() => handleMute()}/>
                    <input type={"range"} className={"my-auto"} min={-1} max={101} value={volume} onChange={(event) => handleVolume(event.target.value)}/>
                </div>
                <div className={"w-[74px]"}/>
                <img draggable={false} src={cast} className={"hover:cursor-not-allowed h-[30px] my-auto mr-5"} alt={"cast button"}/>
                <img draggable={false} src={share} className={"hover:cursor-not-allowed h-[30px] my-auto mr-5"} alt={"share button"}/>
                <img draggable={false} src={more} className={"hover:cursor-not-allowed h-[30px] my-auto mr-5"} alt={"more button"}/>
            </div>
        </>
    );
}

export default Player;
