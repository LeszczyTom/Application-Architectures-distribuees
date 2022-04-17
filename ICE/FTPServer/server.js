// Quick start, create an active ftp server.
const FtpSrv = require('ftp-srv');

const port=21;
const ftpServer = new FtpSrv({
    url: "ftp://127.0.0.1:" + port,
    anonymous: true
});

ftpServer.on('login', (data, resolve, reject) => {
    if(data.username === 'anonymous' && data.password === '@anonymous'){
        return resolve({ root:__dirname + "/Musics" });
    }
    return reject( new Error('Invalid username or password') );
});

ftpServer.listen().then(() => {
    console.log('Ftp server is starting...')
});
