import express from "express";
import { findNearestStorageNode } from "../helpers/helper.js";
import { storageNodeMap, lookUpArray } from "../utils/util.js";

const dataRouter = express.Router();

dataRouter.get("/:key", (req, res) => {
	const { key } = req.params;
	const nearestStorageNode = findNearestStorageNode(key, lookUpArray);
	const value = nearestStorageNode.get(key);
	if (!value) {
		res.status(404).send("Key not found");
		return;
	}
	res.status(200).send(value);
});

dataRouter.post("/", (req, res) => {
	const { key, value } = req.body;
	const nearestStorageNode = findNearestStorageNode(key, lookUpArray);
	nearestStorageNode.add(key, value);
	res.status(200).send("Successfully added");
});

dataRouter.put("/:key", (req, res) => {
	const { key } = req.params;
	const { value } = req.body;
	const nearestStorageNode = findNearestStorageNode(key, lookUpArray);
	if (nearestStorageNode.get(key) === undefined) {
		res.status(404).send("Key not found");
		return;
	}
	nearestStorageNode.add(key, value);
	res.status(200).send("Successfully updated");
});

dataRouter.delete("/:key", (req, res) => {
	const { key } = req.params;
	const nearestStorageNode = findNearestStorageNode(key, lookUpArray);
	if (nearestStorageNode.get(key) === undefined) {
		res.status(404).send("Key not found");
		return;
	}
	nearestStorageNode.remove(key);
	res.status(200).send("Successfully deleted");
});

export default dataRouter;
