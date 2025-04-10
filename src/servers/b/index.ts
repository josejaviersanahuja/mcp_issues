import { Application, Router } from "oak";
import { config } from "dotenv";

await config({ export: true });

const router = new Router();

// Tool 1: Check server status
router.get("/status", async (context) => {
  try {
    const response = await fetch("http://localhost:3000/api/status");
    const data = await response.json();
    context.response.body = data;
  } catch (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
  }
});

// Tool 2: Create GitHub issue
router.post("/github/issues", async (context) => {
  try {
    const { title, body } = await context.request.body().value;
    const token = Deno.env.get("GITHUB_TOKEN");

    const response = await fetch(
      "https://api.github.com/repos/your-org/your-repo/issues",
      {
        method: "POST",
        headers: {
          "Authorization": `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      },
    );

    const data = await response.json();
    context.response.body = data;
  } catch (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8002;
console.log(`MCP Server B (Tools) running on port ${PORT}`);
await app.listen({ port: PORT });
