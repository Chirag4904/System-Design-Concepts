const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
	"localhost:40000",
	grpc.credentials.createInsecure()
);

const text = process.argv[2];

client.createTodo(
	{
		text: text || "Default todo text",
	},
	(err, response) => {
		console.log("Received from server");
		if (!err) {
			console.log("Todo: ", response);
		} else {
			console.error(err);
		}
	}
);

// client.readTodos({}, (err, response) => {
// 	console.log("Received from server");
// 	if (!err) {
// 		console.log("Todo: ", response);
// 	} else {
// 		console.error(err);
// 	}
// });

//server will stream data to client

const call = client.readTodosStream();

call.on("data", (item) => {
	console.log("received item from server", JSON.stringify(item));
});

call.on("error", (err) => {
	console.error(err);
});

call.on("end", () => {
	console.log("server done");
});
