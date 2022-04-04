const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    test: (data) => ipcRenderer.send('test', data),
    ping: (data) => console.log('ping', data),
})
