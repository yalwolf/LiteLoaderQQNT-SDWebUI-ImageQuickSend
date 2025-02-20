import { contextBridge, ipcRenderer } from 'electron';

let { webContentsId } = ipcRenderer.sendSync('___!boot');
if (!webContentsId) {
  webContentsId = 2;
}

contextBridge.exposeInMainWorld('SDWebUI_ImageQuickSend', {
  invokeNative: (eventName, cmdName, registered, ...args) => invokeNative(eventName, cmdName, registered, ...args),
});

/**
 * 调用一个qq底层函数，并返回函数返回值。
 * 
 * @param { String } eventName 函数事件名。
 * @param { String } cmdName 函数名。
 * @param { Boolean } registered 函数是否为一个注册事件函数。
 * @param  { ...any } args 函数参数。
 * @returns { Promise<any> } 函数返回值。
 */
function invokeNative(eventName, cmdName, registered, ...args) {
  return new Promise(resolve => {
    const callbackId = crypto.randomUUID();
    const callback = (event, ...args) => {
      void event;
      if (args?.[0]?.callbackId == callbackId) {
        ipcRenderer.off(`IPC_DOWN_${webContentsId}`, callback);
        resolve(args[1]);
      }
    };
    ipcRenderer.on(`IPC_DOWN_${webContentsId}`, callback);
    ipcRenderer.send(`IPC_UP_${webContentsId}`, {
      type: 'request',
      callbackId,
      eventName: `${eventName}-${webContentsId}${registered ? '-register' : ''}`
    }, [cmdName, ...args]);
  });
} 