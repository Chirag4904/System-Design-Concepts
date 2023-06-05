export default class LeakyBucket {
	constructor(bucketSize, leakRate) {
		// console.log("LeakyBucket constructor called");
		this.bucketSize = bucketSize;
		this.leakRate = leakRate;
		this.tokens = bucketSize;
		this.lastLeakTime = Date.now();
		setInterval(() => {
			// console.log("huihui");
			// Calculate the time since the last refresh
			const timeElapsed = Date.now() - this.lastLeakTime;

			// Calculate the number of tokens to add to the bucket based on the elapsed time
			const tokensToAdd = Math.floor((timeElapsed * this.leakRate) / 1000);

			// Add the tokens to the bucket, up to the maximum size
			this.tokens = Math.min(this.bucketSize, this.tokens + tokensToAdd);

			// Update the last refresh time
			this.lastLeakTime = Date.now();
		}, 1000);
	}

	// Add tokens to the bucket
	addTokens(numTokens) {
		// Calculate the time elapsed since the last leak
		const now = Date.now();
		const timeElapsed = now - this.lastLeakTime;

		// Leak tokens based on the elapsed time
		const leakedTokens = (timeElapsed * this.leakRate) / 1000;
		this.tokens = Math.max(this.tokens - leakedTokens, 0);

		// Add tokens to the bucket
		this.tokens = Math.min(this.tokens + numTokens, this.bucketSize);

		// Update the last leak time
		this.lastLeakTime = now;
	}

	// Check if there are enough tokens in the bucket
	checkTokens(numTokens) {
		// Calculate the time elapsed since the last leak
		const now = Date.now();
		const timeElapsed = now - this.lastLeakTime;
		// console.log(this.tokens, "before leak");
		// Leak tokens based on the elapsed time
		const leakedTokens = (timeElapsed * this.leakRate) / 1000;
		this.tokens = Math.max(this.tokens - leakedTokens, 0);
		// console.log(this.tokens, "after leak");
		// Check if there are enough tokens
		if (numTokens <= this.tokens) {
			this.tokens -= numTokens;
			return true;
		} else {
			return false;
		}
	}
}
