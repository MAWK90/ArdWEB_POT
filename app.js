// Ustawienie transmisji szeregowej
var SerialPort  = require("serialport").SerialPort;
    sp = new SerialPort("/dev/ttyUSB0", {
	   baudrate: 9600
    });

            sp.on("open", function () {
                console.log("SerialPort: OPEN");
            });

            sp.on("close", function (err) {
                console.log("SerialPort: CLOSE");
            });

            sp.on("error", function (err) {
                console.error("SerialPort: ERROR :", err);
            });

// Ustawienie express - struktury sieci dla node.js
var express = require('express');
    app = express();
    server = app.listen(3000);
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/web'));
server.listen(3000);

console.log("Server uruchomiony na localhost:3000");

io.sockets.on("connection", function (socket) {
    console.log('Socket polaczony'); 
    socket.emit('Socket polaczony');

            socket.on("message", function (msg) {
                console.log("Socket msg: " +msg);
            });
    
            socket.on("disconnect", function () {
                console.log("Socket: Disconnected");
            });
});

var cleanData = ""; // Tu przechowujemy czysty wynik pomiaru ADC
    readData = "";  // Tu przechowujemy bufer

sp.on("data", function (data) {
	
    console.log("Serial Port: " + data.toString());
    
    readData += data.toString(); 
    if (readData.indexOf("B") >= 0 && readData.indexOf("A") >= 0) 
    {
        cleanData = readData.substring(readData.indexOf("A") + 1, readData.indexOf("B"));
        readData = "";
        io.sockets.emit("message", cleanData);
    }
});