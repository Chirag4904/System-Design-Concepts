import loadtest from "loadtest";

const options = {
	url: "http://localhost:3000/leakyBucket",
	concurrency: 5,
	maxRequests: 50,
	requestsPerSecond: 10,
};

loadtest.loadTest(options, function (error, result) {
	if (error) {
		console.error("Load test error:", error);
	} else {
		console.log("Load test results:", result);
	}
});
