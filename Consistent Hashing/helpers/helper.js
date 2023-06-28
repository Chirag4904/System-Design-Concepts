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
			return sortedLookupArray[0];
		}

		// looking for the just right node
		if (keyHash > sortedLookupArray[i] && keyHash <= sortedLookupArray[i + 1]) {
			return sortedLookupArray[i + 1];
		}
	}
	return sortedLookupArray[0];
}

export function assignDataToStorageNode(key, value, lookupArray) {
	const nearestStorageNode = findNearestStorageNode(key, lookupArray);
	storageNodeMap.get(nearestStorageNode).add(key, value);
}
