//TOKEN BUCKET BASED ON IP ADDRESS

// Define the token bucket parameters (e.g., 5 tokens per second)
const MAX_TOKENS = 5;
const REFILL_INTERVAL_MS = 1000;
const INITIAL_TOKENS = 2;

// Create a map of token buckets for each IP address
const tokenBuckets = new Map();

// Create the middleware function
function tokenBucketMiddleware(req, res, next) {
	if (req.url.startsWith("/token")) {
		// Get the IP address of the request
		const ip = req.ip;

		// Get the token bucket for this IP address, or create a new one if it doesn't exist
		let tokenBucket = tokenBuckets.get(ip);
		if (!tokenBucket) {
			tokenBucket = {
				tokens: INITIAL_TOKENS,
				lastRefill: Date.now(),
			};
			tokenBuckets.set(ip, tokenBucket);
		}

		// Refill the token bucket if it's time
		const now = Date.now();
		const timeSinceLastRefill = now - tokenBucket.lastRefill;
		const tokensToAdd = (timeSinceLastRefill * MAX_TOKENS) / REFILL_INTERVAL_MS;
		tokenBucket.tokens = Math.min(tokenBucket.tokens + tokensToAdd, MAX_TOKENS);
		tokenBucket.lastRefill = now;

		// Check if there are enough tokens to process the request
		if (tokenBucket.tokens >= 1) {
			tokenBucket.tokens -= 1;
			next();
		} else {
			res.status(429).send("Too Many Requests");
		}
	} else {
		// If the request URL doesn't match, skip this middleware
		next();
	}
}

export default tokenBucketMiddleware;
