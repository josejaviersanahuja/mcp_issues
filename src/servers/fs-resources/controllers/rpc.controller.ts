// src/servers/fs-resources/controllers/rpc.controller.ts

import { Context } from "oak";
const LOGS_DIR = "./logs";

export async function handleRpc(ctx: Context) {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
    const { jsonrpc, id, method, params } = body;

    if (jsonrpc !== "2.0") {
      throw new Error("Invalid JSON-RPC version");
    }

    if (method === "resources/read") {
      const uri = params?.uri;

      if (!uri) {
        ctx.response.status = 400;
        ctx.response.body = {
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: "Missing 'uri' parameter" }
        };
        return;
      }

      const filename = uri.replace("file:///", "");
      const logPath = `${LOGS_DIR}/${filename}`;

      try {
        const content = await Deno.readTextFile(logPath);
        ctx.response.body = {
          jsonrpc: "2.0",
          id,
          result: {
            contents: [
              {
                uri,
                mimeType: "text/plain",
                text: content
              }
            ]
          }
        };
      } catch (err) {
        ctx.response.body = {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32000,
            message: `Error reading file: ${err instanceof Error ? err.message : "Unknown"}`
          }
        };
      }

    } else {
      ctx.response.body = {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Method '${method}' not found`
        }
      };
    }

  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32603,
        message: err instanceof Error ? err.message : "Unknown error"
      }
    };
  }
}
