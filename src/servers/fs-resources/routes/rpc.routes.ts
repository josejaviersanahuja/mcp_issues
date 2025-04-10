// src/servers/fs-resources/routes/logs.routes.ts

import { Router } from "oak";
import { handleRpc } from "../controllers/rpc.controller.ts";

const router = new Router();

router.post("/rpc", handleRpc);

export default router;
