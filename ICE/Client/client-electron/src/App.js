import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";
import SongInfos from "./Components/SongInfos";
import UseDataBase from "./Hooks/useDataBase";

function App() {
    const [currentView, setCurrentView] = React.useState("musicList");
    const [selectedSong, setSelectedSong] = React.useState({title:"", artist:"", album:"", cover:"", fileURI:""});
    const [playingSong, setPlayingSong] = React.useState({title: "", artist: "", cover:"", favorite: false});
    //TODO: add a state for playing song

    return (
    <div className="h-screen bg-black flex flex-col select-none ">
        <UseDataBase />
        <Menu setView={setCurrentView} view={currentView}/>
        {currentView === "musicList" && <MusicList setView={setCurrentView} view={currentView} setSong={setSelectedSong} setPlay={setPlayingSong}/>}
        {currentView === "addMusic" && <AddMusic setView={setCurrentView} view={currentView}/>}
        {currentView === "songInfos" && <SongInfos song={selectedSong}/>}
        <Player infos={playingSong}/>
    </div>
    );
}

export default App;
