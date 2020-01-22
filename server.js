const net = require("net");
const crypto = require("crypto");

net.createServer( (socket) => {
    socket.on("data", (data) => {
        var key = data.toString().split("\r\n")[11].split(": ")[1];
        var accept = key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
        var acceptSha = crypto.createHash('sha1').update(accept);
        var acceptB64 = acceptSha.digest('base64');

        var header = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
        "Upgrade: websocket\r\n" +
        "Connection: Upgrade\r\n" +
        "WebSocket-Origin: http://localhost\r\n" +
        "WebSocket-Location: ws://localhost:9090\r\n"+
        "Sec-WebSocket-Accept:" + acceptB64 + "\r\n\r\n";
        console.log(header);
        socket.write(header);

    });
})
    .listen({ host: "localhost", port: 9090 }, () => console.log("Se ha iniciado el servidor en el puerto 9090"));