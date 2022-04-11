import React, {useEffect} from 'react';

function UseMusics() {
    const [musicsAvailable, setMusicsAvailable] = React.useState(null)
    const [musics, setMusics] = React.useState(null)
    const [refresh, setRefresh] = React.useState(true)

    const search = (str, filterArtist, filterTitle) => {
        console.log(musicsAvailable)
        if (filterArtist && !filterTitle) searchByArtist(str)
        else if (filterTitle && !filterArtist) searchByTitle(str)
        else searchByArtistAndTitle(str)
    }

    const searchByTitle = (str) => {
        let tmp = []
        for(let i in musicsAvailable.Items) {
            if (musicsAvailable.Items[i].SongTitle.S.includes(str)) {
                tmp.push(musicsAvailable.Items[i])
            }
        }
        if(tmp.length === 0) setMusics(null)
        else setMusics({Items: tmp})
    }

    const searchByArtist = (str) => {
        let tmp = []
        for (let i in musicsAvailable.Items) {
            if (musicsAvailable.Items[i].Artist.S.includes(str)) {
                tmp.push(musicsAvailable.Items[i])
            }
        }
        if(tmp.length === 0) setMusics(null)
        else setMusics({Items: tmp})
    }

    const searchByArtistAndTitle = (str) => {
        let tmp = []
        for (let i in musicsAvailable.Items) {
            if (musicsAvailable.Items[i].Artist.S.includes(str) || musicsAvailable.Items[i].SongTitle.S.includes(str)) {
                if(!tmp.includes(musicsAvailable.Items[i])) tmp.push(musicsAvailable.Items[i])
            }
        }
        if(tmp.length === 0) setMusics(null)
        else setMusics({Items: tmp})
    }

    useEffect(() => {
        if (refresh) {
            fetch("http://localhost:2222/selectAllFromDB")
                .then(response => response.json())
                .then(d => {
                    setMusicsAvailable(d)
                    setMusics(d)
                    setRefresh(false)
                })
                .catch(e => {
                    console.log(e)
                })
            setRefresh(false)
        }
    }, [refresh])
    return {
        setMusicsAvailable,
        musics,
        setRefresh,
        search
    }
}

export default UseMusics;
