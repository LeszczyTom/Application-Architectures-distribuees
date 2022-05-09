const path = require('path');

require('dotenv').config({path: "app/.env"});

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const Ice = require("ice").Ice;
const PlayerCommand = require("./PlayerCommands").tl;

let player1 = null
let player2 = null
let communicator = null

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        resizable:false,
        maximizable:false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    ipcMain.on('player-command', (event, data) => {
        executeCommand(data).then(r => console.log(r));
    })

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    startIce().then(r => console.log(r + ", Ice started"))
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        endIce().then(r => console.log(r + ", Ice ended"));
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


async function startIce() {
    try {
        // Create Initialization Data for the Ice Communicator
        let id = new Ice.InitializationData()
        id.properties = Ice.createProperties()
        id.properties.setProperty("Ice.Default.Locator", process.env.ICE_DEFAULT_LOCATOR)

        // Create the Ice Communicator with the Initialization Data
        communicator = Ice.initialize(id)

        player1 = await PlayerCommand.PlayerCommandsPrx.checkedCast(communicator.stringToProxy("player1@Serv1.PlayerAdapter"))
        player2 = await PlayerCommand.PlayerCommandsPrx.checkedCast(communicator.stringToProxy("player2@Serv2.PlayerAdapter"))

    } catch (e) {
        console.log(e)
        await endIce()
    }
}

async function endIce() {
    if(communicator) {
        await communicator.destroy();
    }
}

async function executeCommand(data) {
    let cmd = data.cmd
    let bool = data.state
    console.log(data.serverId)

    if(player1 == null || player2 == null) {
        startIce().then(() => {return "Ice started"})
        return "Player is null"
    }
    try {
        switch (cmd) {
            case "play":
                if (data.serverId === "0") {
                    console.log("Serv1")
                    await player1.play(bool)
                    if(bool) await player2.play(false)
                 }
                else {
                    console.log("Serv2")
                    await player2.play(bool)
                    if(bool) await player1.play(false)
                }
                return bool ? "Playing" : "Pausing"
            case "stop":
                if (data.serverId === "0") await player1.stop()
                else await player2.stop()
                return "Stopping"
            case "repeat":
                if (data.serverId === "0") await player1.repeat(bool)
                else await player2.repeat(bool)
                return bool ? "RepeatOn" : "RepeatOff"
            case "volume":
                if (data.serverId === "0") await player1.volume(data.volume)
                else await player2.volume(data.volume)
                return "Volume at " + data.value
            case "playSong":
                if (data.serverId === "0") {
                    console.log("Serv1")
                    await player1.playSong(data.value)
                    await player2.play(false)
                }
                else {
                    console.log("Serv2")
                    await player2.playSong(data.value)
                    await player1.play(false)
                }
                return "Playing " + data.value
            case "sendFile":
                if (data.serverId === "0") await player1.downloadFile(data.name)
                else await player2.downloadFile(data.name)
                return "Sending " + data.name
            case "removeFile":
                if (data.serverId === "0") await player1.removeFile(data.name)
                else await player2.removeFile(data.name)
                return "Removing " + data.name
            default:
                return "Unknown command"
        }
    } catch (e) {
        console.log(e)
        return "Error"
    }
}
