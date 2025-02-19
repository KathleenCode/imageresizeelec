const os = require("os");
const path = require("path");
const Toastify = require("toastify-js");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("os", {
    homedir: () => os.homedir()
})

contextBridge.exposeInMainWorld("path", {
    join: (...args) => path.join(...args)
})

contextBridge.exposeInMainWorld("Toastify", {
    toast: (options) => Toastify(options).showToast()
})

contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
})

// contextBridge.exposeInMainWorld("versions", {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron
// })

// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })