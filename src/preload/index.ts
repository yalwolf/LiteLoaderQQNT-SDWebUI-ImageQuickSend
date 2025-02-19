import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('SDWebUIImageQuickSend', {
  greeting: (name: string) => {
    ipcRenderer.send('SDWebUIImageQuickSend.Greeting', name);
  }
});