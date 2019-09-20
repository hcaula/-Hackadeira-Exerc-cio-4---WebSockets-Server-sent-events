var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({ port: 8080, path: '/temperature' });
wss.on('connection', function(ws) {
    setInterval(() => {
        ws.send('data: ' + randomInt(100, 127) + '\n\n');
    }, 2000);
});
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
