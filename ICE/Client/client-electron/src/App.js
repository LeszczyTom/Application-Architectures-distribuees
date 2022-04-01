import './App.css';
import Menu from "./Components/Menu";
import Player from "./Components/Player";

function App() {
  return (
    <div className="h-screen bg-black flex flex-col">
        <Menu />
        <div className={"h-full w-full"}/>
        <Player />
    </div>
  );
}

export default App;
