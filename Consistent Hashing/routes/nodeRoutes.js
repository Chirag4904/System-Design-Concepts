import express from "express";
import { lookUpArray, storageNodeMap } from "../utils/util.js";
const nodeRouter = express.Router();

nodeRouter.get("/:id", (req, res) => {
	const { id } = req.params;
	for (const values of storageNodeMap.values()) {
		if (values.getId() === +id) {
			res.status(200).send(values);
			return;
		}
	}
	res.status(404).send("Node not found");
});

nodeRouter.delete("/", (req, res) => {
	const { nodeId } = req.body;
	for (const values of storageNodeMap.values()) {
		if (values.getId() === nodeId) {
			storageNodeMap.delete(hash(values.getIp()));
			lookUpArray.splice(lookUpArray.indexOf(hash(values.getIp())), 1);
			res.status(200).send("Successfully removed");
			return;
		}
	}
	res.status(404).send("Node not found");
});

export default nodeRouter;
