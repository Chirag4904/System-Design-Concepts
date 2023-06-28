import express from "express";
import { lookUpArray, storageNodeMap } from "../utils/util.js";
import {
	hash,
	findNextNode,
	findNextNodeForNewNode,
} from "../helpers/helper.js";
import { StorageNode } from "../utils/StorageNode.js";
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
				hash: hash(value.ip),
			});
			return;
		}
	}
	res.status(404).send("Node not found");
});

nodeRouter.post("/", (req, res) => {
	const { ip } = req.body;
	const id = storageNodeMap.size + 1;
	const newNode = new StorageNode(id, ip);
	const hashValue = hash(ip);
	const isHashAlreadyPresent = lookUpArray.includes(hashValue);
	if (isHashAlreadyPresent) {
		res.status(409).send("Hash already present");
		return;
	}

	const nextNode = findNextNodeForNewNode(hashValue, lookUpArray);
	console.log(nextNode, "next node line 41");
	//add new node to the ring
	storageNodeMap.set(hashValue, newNode);
	lookUpArray.push(hashValue);

	//transfer data from next node to new node (only keys which new node will take)
	for (const [key, value] of nextNode.map.entries()) {
		if (hash(key) <= hashValue) {
			newNode.add(key, value);
			nextNode.remove(key);
		}
	}
	res.status(200).send("Successfully added");
});

nodeRouter.delete("/", (req, res) => {
	const { nodeId } = req.body;

	for (const node of storageNodeMap.values()) {
		if (node.id === +nodeId) {
			try {
				const tempIndex = lookUpArray.indexOf(hash(node.ip));
				const nextNode = findNextNode(node, lookUpArray);

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
