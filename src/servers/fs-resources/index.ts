// src/servers/fs-resources/index.ts

import { Application } from "oak";
import { config } from "dotenv";
import rpcRouter from "./routes/rpc.routes.ts";

await config();

const PORT = Number(Deno.env.get("FS_RESOURCES_PORT") ?? 8001);

const app = new Application();

// Error handler - siempre lo primero
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Unhandled error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

// Logger - siempre antes de las rutas
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// Rutas principales
app.use(rpcRouter.routes());
app.use(rpcRouter.allowedMethods());

// Arrancar el servidor solo si es ejecutado directamente
if (import.meta.main) {
  console.log(`✅ MCP FS Resources Server listening on http://localhost:${PORT}`);
  await app.listen({ port: PORT });
}