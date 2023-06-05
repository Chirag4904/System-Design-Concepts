import TokenBucket from "../Algorithm Classes/TokenBucket.js";
// Create a new TokenBucket instance with a capacity of 10 tokens and a refill rate of 1 token per second
const bucket = new TokenBucket(30, 1);

// Middleware function to apply rate limiting to incoming requests
export default function rateLimitTokenBucket(req, res, next) {
	if (req.url.startsWith("/tokenBucket")) {
		// only apply rate limiting to /tokenBucket
		if (bucket.tryConsume(1)) {
			next(); // Allow the request to continue to the next middleware
		} else {
			res.status(429).send("Too many requests"); // Return a "Too Many Requests" response
		}
	} else {
		next(); // Allow the request to continue to the next middleware
	}
}
