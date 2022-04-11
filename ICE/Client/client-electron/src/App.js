import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";
import SongInfos from "./Components/SongInfos";
import useDataBase from "./Hooks/useDataBase";
import useQueueSong from "./Hooks/useQueueSong";
import useMusics from "./Hooks/useMusics";

function App() {
    const [currentView, setCurrentView] = React.useState("musicList");
    const [selectedSong, setSelectedSong] = React.useState({});
    //TODO: add a state for playing song

    const useDB = useDataBase()
    const useQueue = useQueueSong(useDB.data)
    const useMusicsList = useMusics()

    return (
    <div className="h-screen bg-black flex flex-col select-none ">
        <Menu setView={setCurrentView} view={currentView} useQueue={useQueue} useMusics={useMusicsList}/>
        {currentView === "musicList" && <MusicList setView={setCurrentView} view={currentView} setSong={setSelectedSong} setPlay={useQueue.setPlayingSong} musiques={useMusicsList.musics} changeIndex={useQueue.setCurrentSong}/>}
        {currentView === "addMusic" && <AddMusic addToDb={useDB.addToDb} setView={setCurrentView} error={useDB.error}/>}
        {currentView === "songInfos" && <SongInfos song={selectedSong} deleteSong={useDB.deleteFromDbById} error={useDB.error} setView={setCurrentView} updateSong={useDB.updateFromDbById}/>}
        <Player updateSong={useDB.updateFromDbById} useQueue={useQueue}/>
    </div>
    );
}

export default App;
