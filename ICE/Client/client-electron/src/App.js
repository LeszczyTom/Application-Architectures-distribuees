import React from 'react';
import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";
import AddMusic from "./Components/AddMusic";

function App() {
    const [addMusic, setAddMusic] = React.useState(false);

    return (
    <div className="h-screen bg-black flex flex-col">
        <Menu setAddMusic={setAddMusic} addMusic={addMusic}/>
        {addMusic ? <AddMusic /> : <MusicList setAddMusic={setAddMusic}/>}
        <Player />
    </div>
    );
}

export default App;
