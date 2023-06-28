import { TOTAL_SLOTS, storageNodeMap } from "../utils/util.js";
export function hash(key) {
	// Convert the key to a UTF-8 encoded byte array
	var byteArray = new TextEncoder().encode(key);

	// Calculate the sum of the byte values
	var sum = 0;
	for (var i = 0; i < byteArray.length; i++) {
		sum += byteArray[i];
	}

	// Take the modulus with 5 to get the hash value in the range [0, 4]
	return sum % TOTAL_SLOTS;
}

export function findNearestStorageNode(key, lookupArray) {
	const keyHash = hash(key);
	// console.log(keyHash, "hash of key");
	const sortedLookupArray = lookupArray.sort((a, b) => a - b);

	//should use binary search but for now let's just use linear search
	for (let i = 0; i < sortedLookupArray.length; i++) {
		if (keyHash <= sortedLookupArray[0]) {
			return storageNodeMap.get(sortedLookupArray[0]);
		}

		// looking for the just right node
		if (keyHash > sortedLookupArray[i] && keyHash <= sortedLookupArray[i + 1]) {
			return storageNodeMap.get(sortedLookupArray[i + 1]);
		}
	}
	return storageNodeMap.get(sortedLookupArray[0]);
}

export function assignDataToStorageNode(key, value, lookupArray) {
	const nearestStorageNode = findNearestStorageNode(key, lookupArray);
	nearestStorageNode.add(key, value);
}

export function findNextNode(currentNode, lookUpArray) {
	const sortedLookupArray = lookUpArray.sort((a, b) => a - b);
	const tempIndex = sortedLookupArray.indexOf(hash(currentNode.ip));
	if (tempIndex === lookUpArray.length - 1) {
		const nextNode = storageNodeMap.get(lookUpArray[0]);
		return nextNode;
	} else {
		const nextNode = storageNodeMap.get(lookUpArray[tempIndex + 1]);
		return nextNode;
	}
}

export function findNextNodeForNewNode(newNodeHashValue, lookUpArray) {
	const sortedLookupArray = lookUpArray.sort((a, b) => a - b);
	let tempIndex = 0;
	while (
		tempIndex < sortedLookupArray.length &&
		sortedLookupArray[tempIndex] < newNodeHashValue
	) {
		tempIndex++;
	}
	if (tempIndex === sortedLookupArray.length) {
		const nextNode = storageNodeMap.get(sortedLookupArray[0]);
		return nextNode;
	} else {
		const nextNode = storageNodeMap.get(sortedLookupArray[tempIndex]);
		return nextNode;
	}
}
