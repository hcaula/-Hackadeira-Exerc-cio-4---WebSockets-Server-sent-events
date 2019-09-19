var http = require('http');
var port = 8686;

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

const getTemperatureRes = () => {
    return `data: ${randomInt(100, 127)} \n\n`;
};

http.createServer(function(req, res) {
    console.log('New incoming client request for ' + req.url);

    res.writeHeader(200, {
        'Content-Type': req.headers.accept,
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    let data = getTemperatureRes();

    if (req.headers.accept === 'text/event-stream') {
        res.write(data);
        setInterval(() => {
            res.write(getTemperatureRes());
        }, 2000);
    } else if (req.headers.accept === 'application/json') {
        data = `{${data}}`;
        res.write(data);
        res.end();
    }
}).listen(port);
console.log('Server listening on http://localhost:' + port);

//#A Setting the header to announce we return JSON representations
//#B Read the request URL and provide responses accordingly
//#C Write the temperature result as JSON
//#D Causes to return the results to the client
