export class StorageNode {
	constructor(id, ip) {
		this.id = id;
		this.ip = ip;
		this.map = new Map();
	}
	getId() {
		return this.id;
	}
	getIp() {
		return this.ip;
	}

	get(key) {
		return this.map.get(key);
	}

	getAllData() {
		if (this.map.size === 0) {
			console.log("No data in this node");
			return;
		}
		for (const value of this.map.values()) {
			console.log(value);
		}
	}

	add(key, value) {
		this.map.set(key, value);
	}

	remove(key) {
		this.map.delete(key);
	}
}
