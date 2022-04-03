import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";
import SongInfos from "./Components/SongInfos";

function App() {
    const [currentView, setCurrentView] = React.useState("musicList");
    const [selectedSong, setSelectedSong] = React.useState({title:"", artist:"", album:"", cover:"", fileURI:""});

    return (
    <div className="h-screen bg-black flex flex-col select-none ">
        <Menu setView={setCurrentView} view={currentView}/>
        {currentView === "musicList" && <MusicList setView={setCurrentView} view={currentView} setSong={setSelectedSong}/>}
        {currentView === "addMusic" && <AddMusic setView={setCurrentView} view={currentView}/>}
        {currentView === "songInfos" && <SongInfos song={selectedSong}/>}
        <Player />
    </div>
    );
}

export default App;
