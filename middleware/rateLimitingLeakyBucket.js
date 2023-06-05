import LeakyBucket from "../Algorithm Classes/LeakyBucket.js";
// Create a leaky bucket with bucket size 10 and leak rate 1 token per second
const bucket = new LeakyBucket(20, 1);

// Middleware function to rate limit requests using the leaky bucket algorithm
export default function rateLimitLeakyBucket(req, res, next) {
	if (req.url.startsWith("/leakyBucket")) {
		const ip = req.ip;
		console.log(ip);
		// Check if there are enough tokens in the bucket

		if (bucket.checkTokens(1)) {
			// bucket.addTokens(1);
			// // If there are, decrement the token count and continue to the next middleware
			// bucket.tokens--;
			console.log(bucket.tokens, "tokens left");
			next();
		} else {
			// If there aren't, return a "Too many requests" error
			res.status(429).send("Too many requests");
		}
	} else {
		// For routes that don't start with "/token", continue to the next middleware
		next();
	}
}
