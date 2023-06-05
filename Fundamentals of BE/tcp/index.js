import net from "net";

const server = net.createServer((socket) => {
	console.log(
		"TCP handshake successful" + socket.remoteAddress + ":" + socket.remotePort
	);
	socket.write("Hello from server");
	socket.on("data", (data) => {
		console.log("Data received from client: " + data.toString());
	});
});

server.listen(6000, "localhost", () => {
	console.log("TCP server listening on port 6000");
});

server.on("error", () => {
	console.log("Error occurred");
	
});

server.on("close", () => {
	console.log("TCP server closed");
});
