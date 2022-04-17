const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const Ice = require("ice").Ice;
const PlayerCommand = require("./PlayerCommands").tl;
const fs = require('fs');

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
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    //if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    //}
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

let player = null
let communicator = null

async function startIce() {
    try {
        communicator = Ice.initialize()
        const base = communicator.stringToProxy("player:default -p 10000")
        player = await PlayerCommand.PlayerCommandsPrx.checkedCast(base)
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
    if(player == null) {
        startIce().then(() => {return "Ice started"})
        return "Player is null"
    }
    try {
        switch (cmd) {
            case "play":
                await player.play(bool)
                return bool ? "Playing" : "Pausing"
            case "stop":
                await player.stop()
                return "Stopping"
            case "repeat":
                await player.repeat(bool)
                return bool ? "RepeatOn" : "RepeatOff"
            case "volume":
                await player.volume(data.value)
                return "Volume at " + data.value
            case "playSong":
                await player.playSong(data.value)
                return "Playing " + data.value
            case "sendFile":
                await player.downloadFile(data.name)
                return "Sending " + data.name
            case "removeFile":
                await player.removeFile(data.name)
                return "Removing " + data.name
            default:
                return "Unknown command"
        }
    } catch (e) {
        console.log(e)
        return "Error"
    }
}
