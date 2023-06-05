import express from "express";
import rateLimitTokenBucket from "./middleware/rateLimitTokenBucket.js";
import rateLimitLeakyBucket from "./middleware/rateLimitingLeakyBucket.js";

const app = express();

// Use the rateLimit middleware for all routes using token bucket algorithm
app.use(rateLimitTokenBucket);
app.use(rateLimitLeakyBucket);
// Define your routes here...
app.get("/tokenBucket", (req, res) => res.send("Hello token bucket!"));
app.get("/leakyBucket", (req, res) => {
	console.log("leaky bucket");
	res.send("Hello leaky bucket!");
});

app.listen(3000, () => console.log("Server started on port 3000"));
