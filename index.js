const electron = require('electron');

const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


function createWindow(){
    mainWindow = new BrowserWindow({width:1200, height:600});
    const startURL = url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:',
        slashes: true
       });
    mainWindow.loadURL(startURL);
    
    mainWindow.on('closed', function(){
        mainWindow = null
        });
    }
    
app.on('ready', createWindow);

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate', function(){
    if(mainWindow === null){
        createWindow()
    }
});