const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

// console.log("todoPackage", todoPackage);

const server = new grpc.Server();

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
	createTodo: createTodo,
	readTodos: readTodos,
	readTodosStream: readTodosStream,
});

server.start();
console.log("server started at port 40000");

const todos = [];

function createTodo(call, callback) {
	// console.log("call", call);
	const todoItem = {
		id: todos.length + 1,
		text: call.request.text,
	};
	todos.push(todoItem);
	callback(null, todoItem);
}

function readTodos(call, callback) {
	callback(null, { items: todos });
}

function readTodosStream(call, callback) {
	todos.forEach((item) => call.write(item));
	call.end();
}
