export default class TokenBucket {
	constructor(capacity, rate) {
		//capacity is the maximum number of tokens that the bucket can hold
		this.capacity = capacity;
		//rate is the rate at which the bucket refills with new tokens (in tokens per second).
		this.rate = rate;
		//The tokens property represents the current number of tokens in the bucket. It's initialized to capacity because the bucket starts out full.
		this.tokens = capacity;
		//The lastRefillTime property keeps track of the last time the bucket was refilled.
		this.lastRefill = Date.now();
	}
	//this function refills the bucket depending on the time elapsed since the last refill.
	refill() {
		const now = Date.now();
		const timeElapsed = now - this.lastRefill;
		const newTokens = (timeElapsed * this.rate) / 1000; // 1000 ms in a second
		this.tokens = Math.min(this.capacity, this.tokens + newTokens);
		this.lastRefill = now;
	}

	tryConsume(numTokens) {
		this.refill();

		if (numTokens <= this.tokens) {
			this.tokens -= numTokens; // consume tokens
			return true; // req can go through
		} else {
			return false; // req cannot go through
		}
	}
}
