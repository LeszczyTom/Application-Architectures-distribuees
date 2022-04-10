import React, {useEffect, useState} from 'react';

const useQueueSong = (props) => {

    const [data, setData] = React.useState(null)
    const [queue, setQueue] = React.useState(null)
    const [currentSong, setCurrentSong] = React.useState(0)
    const [changed, setChanged] = useState(true);
    const [playingSong, setPlayingSong] = React.useState({});

    useEffect(() => {
        if(!changed) return
        setChanged(false)
        fetch("http://localhost:2222/getAllUri")
            .then(response => {
                response.json().then(d => {
                        let tmp = []
                        Object.keys(d.Items).map((key) => {
                            tmp.push(d.Items[key].URI.S)
                        })
                        setData(tmp)
                        setQueue(tmp)
                        console.log(tmp)
                })
            }).catch(e => {
                console.log(e)
            })
    }, [changed])

    const shuffleQueue = () => {
        setQueue(data.sort(() => 0.5 - Math.random()))
        console.log(queue)
    }

    const musicChanged = (ind) => {
        let musique = props.Items[ind]

        setPlayingSong({
            id: musique.id.S,
            title: musique.SongTitle.S,
            artist: musique.Artist.S,
            album: musique.Album.S,
            cover: musique.Cover.S,
            fileURI: musique.URI.S,
            duration: musique.Duration.S,
            favorite: musique.Favorite.S,
        })
    }

    const nextSong = () => {
        let ind = currentSong + 1
        if(ind >= queue.length) {
            ind = 0
        }
        console.log(ind + " -- " + queue[ind])
        setCurrentSong(ind)
        musicChanged(ind)
        window["electronAPI"].playerCommand({cmd: "playSong", value: queue[ind]})
    }

    const lastSong = () => {
        let ind = currentSong - 1
        if(ind < 0) {
            ind = queue.length - 1
        }
        console.log(ind + " -- " + queue[ind])
        setCurrentSong(ind)
        musicChanged(ind)
        window["electronAPI"].playerCommand({cmd: "playSong", value: queue[ind]})
    }

    return {
        queue,
        currentSong,
        shuffleQueue,
        nextSong,
        lastSong,
        playingSong,
        setPlayingSong,
        setCurrentSong
    }
};

export default useQueueSong;
