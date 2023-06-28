import express from "express";
import cors from "cors";
import {
	storageNodes,
	lookUpArray,
	storageNodeMap,
	DATA,
} from "./utils/util.js";
import { hash, assignDataToStorageNode } from "./helpers/helper.js";
import nodeRouter from "./routes/nodeRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/nodes", nodeRouter);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
	for (let i = 0; i < storageNodes.length; i++) {
		lookUpArray.push(hash(storageNodes[i].getIp()));
		storageNodeMap.set(hash(storageNodes[i].getIp()), storageNodes[i]);
	}

	for (let i = 0; i < DATA.length; i++) {
		assignDataToStorageNode(DATA[i].key, DATA[i].value, lookUpArray);
	}
	// console.log(lookUpArray);
	console.log(storageNodeMap);
});
