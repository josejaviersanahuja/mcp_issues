// src/servers/fs-resources/index.ts

import { Application } from "oak";
import { config } from "dotenv";
import rpcRouter from "./routes/rpc.routes.ts";
await config();

const PORT = Deno.env.get("FS_RESOURCES_PORT") || 8001;

const app = new Application();

app.use(rpcRouter.routes());
app.use(rpcRouter.allowedMethods());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Unhandled error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

console.log(`✅ MCP Server (FS Resources) running on port ${PORT}`);
await app.listen({ port: parseInt(PORT as string) });
