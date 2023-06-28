import { StorageNode } from "./StorageNode.js";
const TOTAL_SLOTS = 32;

const storageNodes = [
	new StorageNode(1, "192.168.1.1"),
	new StorageNode(2, "192.168.1.4"),
	new StorageNode(3, "192.168.1.8"),
	new StorageNode(4, "192.168.5.8"),
	new StorageNode(5, "192.168.8.8"),
];

const DATA = [
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

function hash_fn(key, total_slots) {
	// Convert the key to a UTF-8 encoded byte array
	var byteArray = new TextEncoder().encode(key);

	// Calculate the sum of the byte values
	var sum = 0;
	for (var i = 0; i < byteArray.length; i++) {
		sum += byteArray[i];
	}

	// Take the modulus with 5 to get the hash value in the range [0, 4]
	return sum % total_slots;
}

const lookupArray = [];
const storageNodeMap = new Map();
for (let i = 0; i < storageNodes.length; i++) {
	lookupArray.push(hash_fn(storageNodes[i].getIp(), TOTAL_SLOTS));
	storageNodeMap.set(
		hash_fn(storageNodes[i].getIp(), TOTAL_SLOTS),
		storageNodes[i]
	);
}

function findNearestStorageNode(key, lookupArray) {
	const keyHash = hash_fn(key, TOTAL_SLOTS);
	// console.log(keyHash, "hash of key");
	const sortedLookupArray = lookupArray.sort((a, b) => a - b);

	//should use binary search but for now let's just use linear search
	for (let i = 0; i < sortedLookupArray.length; i++) {
		if (keyHash <= sortedLookupArray[0]) {
			return sortedLookupArray[0];
		}

		// looking for the just right node
		if (keyHash > sortedLookupArray[i] && keyHash <= sortedLookupArray[i + 1]) {
			return sortedLookupArray[i + 1];
		}
	}
	return sortedLookupArray[0];

	// console.log(`sortedLookupArray: ${sortedLookupArray}`);
}
for (let i = 0; i < DATA.length; i++) {
	const nearestStorageNode = findNearestStorageNode(DATA[i].key, lookupArray);
	storageNodeMap.get(nearestStorageNode).add(DATA[i].key, DATA[i].value);
}

console.log(`lookupArray: ${lookupArray}`);
storageNodeMap.get(18).getAllData();
// console.log(`storageNodeMap: ${}`);
// const nearestStorageNode = findNearestStorageNode("0", lookupArray);
// console.log(
// 	`nearestStorageNode: ${storageNodeMap.get(nearestStorageNode).getId()}`
// );
// // console.log(findNearestStorageNode("0", lookupArray));
