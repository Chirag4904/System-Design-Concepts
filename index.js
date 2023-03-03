import express from "express";
import TokenBucket from "./TokenBucket.js";

const app = express();

// Create a new TokenBucket instance with a capacity of 10 tokens and a refill rate of 1 token per second
const bucket = new TokenBucket(2, 1);

// Middleware function to apply rate limiting to incoming requests
function rateLimit(req, res, next) {
	if (bucket.tryConsume(1)) {
		next(); // Allow the request to continue to the next middleware
	} else {
		res.status(429).send("Too many requests"); // Return a "Too Many Requests" response
	}
}

// Use the rateLimit middleware for all routes
app.use(rateLimit);

// Define your routes here...
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server started on port 3000"));
