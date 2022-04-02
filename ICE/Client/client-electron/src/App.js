import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";
import MusicList from "./Components/MusicList";

function App() {
  return (
    <div className="h-screen bg-black flex flex-col">
        <Menu />
        <MusicList />
        <Player />
    </div>
  );
}

export default App;
