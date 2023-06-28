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
	{ key: "key1", value: "value1" },
	{ key: "key2", value: "value2" },
	{ key: "key3", value: "value3" },
	{ key: "key4", value: "value4" },
	{ key: "key5", value: "value5" },
	{ key: "key6", value: "value6" },
	{ key: "key7", value: "value7" },
	{ key: "key8", value: "value8" },
	{ key: "key9", value: "value9" },
	{ key: "key10", value: "value10" },
	{ key: "key11", value: "value11" },
	{ key: "key12", value: "value12" },
	{ key: "key13", value: "value13" },
];

export const lookUpArray = [];
export const storageNodeMap = new Map();
