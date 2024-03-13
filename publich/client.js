const socket = io.connect("http://localhost:3000");

socket.on("connect", function () {
	console.log("Connected to server");
	socket.emit("join", "Hello server from client");
});

socket.on("disconnect", function () {
	console.log("Disconnected from server");
});

socket.on("thread", function (data) {
	const threadElement = document.getElementById("thread");
	const listItem = document.createElement("li");
	listItem.textContent = data;
	threadElement.appendChild(listItem);
});

document
	.getElementById("message-form")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Ngăn chặn hành vi mặc định của form

		const messageInput = document.getElementById("message");
		const message = messageInput.value;

		// Gửi tin nhắn tới server
		socket.emit("message", message);

		// Xóa nội dung trong input sau khi gửi tin nhắn
		messageInput.value = "";
	});
