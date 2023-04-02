const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:4200"
    },
});

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("edit", (contact) => {
        io.emit("edited", contact)
    })
})