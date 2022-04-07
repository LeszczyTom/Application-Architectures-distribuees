const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    playerCommand: (data) => ipcRenderer.send('player-command', data)
})
