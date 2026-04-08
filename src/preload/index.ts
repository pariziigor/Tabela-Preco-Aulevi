// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  generatePdf: (html: string, title?: string) =>
    ipcRenderer.invoke('generate-pdf', html, title),

  process: {
    versions: process.versions,
  },
})