const { createServer } = require('http');
const { Server } = require('socket.io');
const PORT = 3001;

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:3000",
        ]
    }
});

let socketClients = new Map();

const currentTime = () => new Date().toLocaleTimeString();

io.on("connection", (socket) => {
    socketClients.set(socket.id, socket);
    console.log(`Client ${socket.id} connected, Time: ${currentTime()}`);

    socket.on("disconnect", () =>{
        socketClients.delete(socket.id);
        console.log(`Client ${socket.id} disconnected, Time: ${currentTime()}`);
    });

    socket.on("setCounterValue", (newValue) => {
        console.log(`Client ${socket.id}, Counter: ${newValue}, Time: ${currentTime()}`);
    });
});

setInterval(() => {
    socketClients.forEach((client) => {
        client.emit('getCounterValue');
    })
}, 1000)

io.listen(PORT);
