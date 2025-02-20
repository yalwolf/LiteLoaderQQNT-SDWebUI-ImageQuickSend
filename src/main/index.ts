import { BrowserWindow } from 'electron';


export const onBrowserWindowCreated = (window: BrowserWindow) => {
  //监听preload发来的请求webContentsID
  window.webContents.on('ipc-message-sync', (event, channel) => {
    if (channel == '___!boot') {
      event.returnValue = {
        enabled: true,
        webContentsId: window.webContents.id.toString(),
      };
    }
  });
};