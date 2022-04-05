import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";
import SongInfos from "./Components/SongInfos";
import useDataBase from "./Hooks/useDataBase";

function App() {
    const [currentView, setCurrentView] = React.useState("musicList");
    const [selectedSong, setSelectedSong] = React.useState({id:"", title:"", artist:"", album:"", cover:"", fileURI:""});
    const [playingSong, setPlayingSong] = React.useState({title: "", artist: "", cover:"", favorite: false});
    //TODO: add a state for playing song

    const useDB = useDataBase("http://localhost:2222/selectAllFromDB");

    return (
    <div className="h-screen bg-black flex flex-col select-none ">
        <Menu setView={setCurrentView} view={currentView} selectAllFromDb={useDB.selectAllFromDb}/>
        {currentView === "musicList" && <MusicList setView={setCurrentView} view={currentView} setSong={setSelectedSong} setPlay={setPlayingSong} musiques={useDB.data}/>}
        {currentView === "addMusic" && <AddMusic addToDb={useDB.addToDb} setView={setCurrentView} error={useDB.error}/>}
        {currentView === "songInfos" && <SongInfos song={selectedSong} deleteSong={useDB.deleteFromDbById} error={useDB.error} setView={setCurrentView}/>}
        <Player infos={playingSong}/>
    </div>
    );
}

export default App;
