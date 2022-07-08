// try {
//     require("electron-reloader")(module);
//   } catch(err) {}
require("dotenv").config();

const { app, BrowserWindow } = require('electron');
const querystring = require('node:querystring');
const https = require("node:https");

// Your GitHub Applications Credentials

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});


function createWindow() {
    const options = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scopes: ["..."] // Scopes limit access for OAuth tokens.
    };
    
    const authWindow = new BrowserWindow({ width: 800, height: 600 });
    const githubUrl = 'https://github.com/login/oauth/authorize?';
    const authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
    
    // console.log({ authWindow })
    authWindow.loadURL(authUrl);

    authWindow.on("ready-to-show", () => authWindow.show())

    // RENDER CONTENT BELLOW WHEN AUTHENTICATED
    // mainWindow.loadFile('index.html')
    
    authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
        var raw_code = /code=([^&]*)/.exec(newUrl) || null,
        code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
        error = /\?error=(.+)$/.exec(newUrl);
        
        if (code || error) {
            // Close the browser if code found or error
            authWindow.close();
        }
        
        // If there is a code in the callback, proceed to get token from github
        if (code) {
            console.log("code recieved: " + code);
            
            var postData = querystring.stringify({
                "client_id" : options.client_id,
                "client_secret" : options.client_secret,
                "code" : code
            });
            
            var post = {
                host: "github.com",
                path: "/login/oauth/access_token",
                method: "POST",
                headers: 
                { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length,
                    "Accept": "application/json"
                }
            };
            
            var req = https.request(post, function(response){
                var result = '';
                response.on('data', function(data) {
                    result = result + data;
                });
                response.on('end', function () {
                    var json = JSON.parse(result.toString());
                    console.log("access token recieved: " + json.access_token);
                    if (response && response.ok) {
                        // Success - Received Token.
                        // Store it in localStorage maybe?
                        console.log(response.body.access_token);
                    }
                });
                response.on('error', function (err) {
                    console.log("GITHUB OAUTH REQUEST ERROR: " + err.message);
                });
            });
            
            req.write(postData);
            req.end();
        } else if (error) {
            alert("Oops! Something went wrong and we couldn't log you in using Github. Please try again.");
        }
    });
    
    // Reset the authWindow on close
    authWindow.on('close', function() {
        authWindow = null;
    }, false);
}