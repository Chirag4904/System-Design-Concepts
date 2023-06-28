import express from "express";
import { lookUpArray, storageNodeMap } from "../utils/util.js";
import { hash } from "../helpers/helper.js";
const nodeRouter = express.Router();

nodeRouter.get("/:id", (req, res) => {
	const { id } = req.params;
	for (const value of storageNodeMap.values()) {
		if (value.id === +id) {
			const plainObject = Object.fromEntries(value.map);

			res.status(200).send({
				id: value.id,
				ip: value.ip,
				data: plainObject,
			});
			return;
		}
	}
	res.status(404).send("Node not found");
});

nodeRouter.delete("/", (req, res) => {
	const { nodeId } = req.body;

	for (const node of storageNodeMap.values()) {
		if (node.id === +nodeId) {
			try {
				const tempIndex = lookUpArray.indexOf(hash(node.ip));
				// transfer data to the next node
				const nextNode = storageNodeMap.get(lookUpArray[tempIndex + 1]);
				for (const [key, value] of node.map.entries()) {
					nextNode.add(key, value);
				}
				storageNodeMap.delete(lookUpArray[tempIndex]);
				lookUpArray.splice(tempIndex, 1);
				res.status(200).send("Successfully removed");
				return;
			} catch (e) {
				console.log(e);
				res.status(500).send("Internal server error");
				return;
			}
		}
	}
	res.status(404).send("Node not found");
});

export default nodeRouter;
