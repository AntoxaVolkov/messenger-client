import { app, BrowserWindow, ipcMain } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */

  mainWindow = new BrowserWindow({
    height: 583,
    minHeight:480,
    useContentSize: true,
    width: 1000,
    minWidth:380,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV == 'development') {
    mainWindow.addDevToolsExtension('node_modules/vue-devtools');
  }
  
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
/*
ipcMain.on('exit', (event, arg) => {
  app.quit();
})
ipcMain.on('minimize', (event, arg) => {
  mainWindow.minimize();
})
ipcMain.on('maximize', (event, arg) => {
  mainWindow.maximize();
})
*/