import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";
import SongInfos from "./Components/SongInfos";

function App() {
    const [currentView, setCurrentView] = React.useState("musicList");

    return (
    <div className="h-screen bg-black flex flex-col">
        <Menu setView={setCurrentView} view={currentView}/>
        {currentView === "musicList" && <MusicList setView={setCurrentView} view={currentView}/>}
        {currentView === "addMusic" && <AddMusic setView={setCurrentView} view={currentView}/>}
        {currentView === "songInfos" && <SongInfos setView={setCurrentView} view={currentView}/>}
        <Player />
    </div>
    );
}

export default App;
