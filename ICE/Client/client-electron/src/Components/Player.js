import React, {useEffect} from 'react';
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

let timeout = null

function Player(props) {
    const [playing, setPlaying] = React.useState(true)
    const [volume, setVolume] = React.useState(50)
    const [muted, setMuted] = React.useState(false)
    const [src, setSrc] = React.useState(volumeUp)
    const [alt, setAlt] = React.useState("Volume Up")
    const [like, setLike] = React.useState("false")
    const [shuffle, setShuffle] = React.useState(false)
    const [repeat, setRepeat] = React.useState(false)
    const [title, setTitle] = React.useState("Titre")
    const [artist, setArtist] = React.useState("Artiste")
    const [cover, setCover] = React.useState("https://picsum.photos/45")
    const refVideoStream = React.createRef()

    useEffect(() => {
        if(title !== props.useQueue.playingSong.title) {
            setArtist(props.useQueue.playingSong.artist)
            setCover(props.useQueue.playingSong.cover)
            setTitle(props.useQueue.playingSong.title)
            setLike(props.useQueue.playingSong.favorite)
            setPlaying(false)
        }
    }, [title, props.useQueue])


    const handleMute = () => {
        if(muted) {
            setMuted(false)
            setSrc(handleSrc())
            window["electronAPI"].playerCommand({cmd: "volume", value: volume})
        } else {
            setMuted(true)
            setSrc(volumeOff)
            window["electronAPI"].playerCommand({cmd: "volume", value: 0})
        }
    }

    const handleVolume = (value) => {
        setVolume(parseInt(value))
        setAlt(handleAlt())
        clearTimeout(timeout)
        if(!muted) {
            setSrc(handleSrc())
            timeout = setTimeout(() => window["electronAPI"].playerCommand({cmd: "volume", value: volume}), 500)
        }
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

    const handleLikeAction = () =>{
        like === "false" ? setLike("true") : setLike("false")
        props.updateSong(props.useQueue.playingSong.id, props.useQueue.playingSong.album, props.useQueue.playingSong.artist, props.useQueue.playingSong.duration, props.useQueue.playingSong.cover, props.useQueue.playingSong.title, like === "false" ? "true" : "false")
        console.log(like)
    }

    const handlePreviousAction = () => {
        props.useQueue.lastSong()
        setPlaying(false)
    }

    const handleNextAction = () => {
        props.useQueue.nextSong()
        setPlaying(false)
    }

    const handleShuffleAction = () => {
        if(!shuffle) props.useQueue.shuffleQueue()
        setShuffle(!shuffle)
    }

    const handleRepeatAction = () => {
        window["electronAPI"].playerCommand({cmd: "repeat", state: !repeat})
        setRepeat(!repeat)
    }

    const handlePlayPauseAction = () => {
        window['electronAPI'].playerCommand({cmd: "play", state: playing})
        if(playing) {
            refVideoStream.current.src = "http://127.0.0.1:5555"
            refVideoStream.current.load()
            refVideoStream.current.play()
        } else {
            refVideoStream.current.pause()
        }
    }

    return (
        <div className={"flex bg-neutral-800 w-full h-[90px] mb-0 border-t border-neutral-600"}>
            <video ref={refVideoStream} datatype={"audio/mp3"} autoPlay={false} src={"http://127.0.0.1:5555"} className={"w-0 h-0"}/>
            <img draggable={false} src={cover} className={"h-[50px] w-[50px] my-auto ml-5 mr-2 rounded-xl hover:cursor-pointer bg-neutral-700 overflow-hidden text-xs"} alt={"album musique joué"}/>
            <div className={"flex text-white my-auto ml-2 text-sm w-[360px]"}>
                <div className={"flex flex-col mr-5"}>
                    <p className={"select-text whitespace-nowrap overflow-ellipsis"}>{title}</p>
                    <p className={"select-text whitespace-nowrap overflow-ellipsis text-gray-400"}>{artist}</p>
                </div>
                <img draggable={false} src={like === "true" ? favorite : favoriteBorder} className={"hover:cursor-pointer h-[30px] my-auto mr-20"} onClick={() => handleLikeAction()} alt={"like button"}/>
            </div>
            <img draggable={false} src={shuffle ? shuffleOn : shuffleOff} className={"hover:cursor-pointer h-[30px] my-auto mr-4"} onClick={() => handleShuffleAction()} alt={"shuffle button"}/>
            <img draggable={false} src={skipPrevious} alt={"icône precedent"} className={"hover:cursor-pointer h-[40px] my-auto mr-4"} onClick={() => handlePreviousAction()}/>
            <div className={"rounded-full bg-neutral-600 h-[50px] w-[50px] my-auto hover:cursor-pointer flex mr-4"} onClick={() => setPlaying(!playing)}>
                <img draggable={false} src={playing ? play : pause} alt={"icône play/pause"} height={50} className={"h-[40px] m-auto"} onClick={() => handlePlayPauseAction()}/>
            </div>
            <img draggable={false} src={skipNext} alt={"icône suivant"} className={"hover:cursor-pointer h-[40px] my-auto mr-4"} onClick={() => handleNextAction()}/>
            <img draggable={false} src={repeat ? repeatOn : repeatOff} className={"hover:cursor-pointer h-[30px] my-auto mr-4"} onClick={() => handleRepeatAction()} alt={"repeat button"}/>
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
    );
}

export default Player;
