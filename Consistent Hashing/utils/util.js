import { StorageNode } from "./StorageNode.js";
export const storageNodes = [
	new StorageNode(1, "192.168.1.1"),
	new StorageNode(2, "192.168.1.4"),
	new StorageNode(3, "192.168.1.8"),
	new StorageNode(4, "192.168.5.8"),
	new StorageNode(5, "192.168.8.8"),
];

export const TOTAL_SLOTS = 32;

export const DATA = [
	{ key: "key1", value: "node 1" },
	{ key: "key2", value: "node 1" },
	{ key: "key3", value: "node 1" },

	{ key: "key10", value: "node 2" },

	{ key: "key11", value: "node 3" },
	{ key: "key12", value: "node 3" },
	{ key: "key13", value: "node 3" },

	{ key: "key24", value: "node 4" },
	{ key: "key33", value: "nade 4" },
	{ key: "key34", value: "node 4" },

	{ key: "key55", value: "node 5" },
];

export const lookUpArray = [];
export const storageNodeMap = new Map();
