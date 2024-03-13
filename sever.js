const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const path = require("path");

app.use(express.static(path.join(__dirname, "publich")));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "publich", "index.html"));
});

// //Whenever someone connects this gets executed
// io.on("connection", function (socket) {
// 	console.log("A user connected - " + socket.id);

// 	//Whenever someone disconnects this piece of code executed
// 	socket.on("disconnect", function () {
// 		console.log("A user disconnected");
// 	});
// });

io.on("connection", function (client) {
	console.log("client connected with id " + client.id);

	client.on("join", function (data) {
		console.log("data: " + JSON.stringify(data));
	});

	client.on("disconnect", function () {
		console.log("A user disconnected");
	});

	client.on("message", function (data) {
		io.emit("thread", data); // Gửi tin nhắn tới tất cả client
	});
});

server.listen(3000, function () {
	console.log("listening on *:3000");
});
